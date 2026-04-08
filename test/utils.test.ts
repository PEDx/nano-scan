import { beforeEach, describe, expect, it, vi } from 'vitest';

const { readBarcodesMock } = vi.hoisted(() => ({
  readBarcodesMock: vi.fn(),
}));

vi.mock('zxing-wasm/reader', () => ({
  readBarcodes: readBarcodesMock,
}));

import {
  applyVideoTorch,
  applyVideoZoom,
  checkCameraConstraintsCapabilities,
  closeCamera,
  closeStream,
  drawCameraFrame,
  drawTargetRectangle,
  drawTargetRectangleRotated,
  fixedFPSCall,
  getCameraCapabilitiesZoomRange,
  listCameras,
  openCamera,
  requestCameraPermission,
  scanCanvas,
} from '../lib/utils';

function createTrack(capabilities: Record<string, unknown> = {}) {
  return {
    stop: vi.fn(),
    applyConstraints: vi.fn().mockResolvedValue(undefined),
    getCapabilities: vi.fn(() => capabilities),
  };
}

function createStream(tracks = [createTrack()]) {
  return {
    getTracks: vi.fn(() => tracks),
    getVideoTracks: vi.fn(() => tracks),
  } as unknown as MediaStream;
}

function setMediaDevices(overrides: Partial<MediaDevices>) {
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: {
      enumerateDevices: vi.fn(),
      getUserMedia: vi.fn(),
      ...overrides,
    },
  });
}

function createDrawingContext(width = 100, height = 100) {
  return {
    canvas: { width, height },
    beginPath: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
    stroke: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(), width, height })),
    strokeStyle: '',
    fillStyle: '',
    lineWidth: 0,
  } as unknown as CanvasRenderingContext2D;
}

describe('utils', () => {
  beforeEach(() => {
    readBarcodesMock.mockReset();
  });

  it('detects supported camera constraints and zoom range', () => {
    const zoomTrack = createTrack({ zoom: { min: 1, max: 4 } });
    const video = document.createElement('video');
    video.srcObject = createStream([zoomTrack]);

    expect(checkCameraConstraintsCapabilities(video, 'zoom')).toBe(true);
    expect(getCameraCapabilitiesZoomRange(video)).toEqual({ min: 1, max: 4 });

    const plainVideo = document.createElement('video');
    plainVideo.srcObject = createStream([createTrack()]);

    expect(checkCameraConstraintsCapabilities(plainVideo, 'torch')).toBe(false);
    expect(getCameraCapabilitiesZoomRange(plainVideo)).toEqual({ min: 1, max: 1 });
  });

  it('applies zoom and torch constraints to the active video track', async () => {
    const track = createTrack();
    const video = document.createElement('video');
    video.srcObject = createStream([track]);

    await applyVideoZoom(video, 2.5);
    await applyVideoTorch(video, true);

    expect(track.applyConstraints).toHaveBeenNthCalledWith(1, { advanced: [{ zoom: 2.5 }] });
    expect(track.applyConstraints).toHaveBeenNthCalledWith(2, { advanced: [{ torch: true }] });
  });

  it('throws when zoom or torch is used without a camera track', async () => {
    const video = document.createElement('video');
    video.srcObject = createStream([]);

    await expect(applyVideoZoom(video, 2)).rejects.toThrow('Camera track not found');
    await expect(applyVideoTorch(video, true)).rejects.toThrow('Camera track not found');
  });

  it('lists camera devices only', async () => {
    const enumerateDevices = vi.fn().mockResolvedValue([
      { deviceId: '1', kind: 'audioinput', label: 'mic' },
      { deviceId: '2', kind: 'videoinput', label: 'rear' },
      { deviceId: '3', kind: 'videoinput', label: 'front' },
    ]);

    setMediaDevices({ enumerateDevices });

    await expect(listCameras()).resolves.toEqual([
      { deviceId: '2', kind: 'videoinput', label: 'rear' },
      { deviceId: '3', kind: 'videoinput', label: 'front' },
    ]);
  });

  it('stops every track in a stream', () => {
    const tracks = [createTrack(), createTrack()];
    const stream = createStream(tracks);

    closeStream(stream);

    expect(tracks[0].stop).toHaveBeenCalledTimes(1);
    expect(tracks[1].stop).toHaveBeenCalledTimes(1);
  });

  it('requests camera permission and closes the temporary stream', async () => {
    const stream = createStream();
    const getUserMedia = vi.fn().mockResolvedValue(stream);
    setMediaDevices({ getUserMedia });

    await requestCameraPermission();

    expect(getUserMedia).toHaveBeenCalledWith({
      video: { facingMode: 'environment' },
      audio: false,
    });
    expect(stream.getTracks).toHaveBeenCalledTimes(1);
  });

  it('opens the camera with portrait-aware constraints and starts video playback', async () => {
    const stream = createStream();
    const getUserMedia = vi.fn().mockResolvedValue(stream);
    setMediaDevices({ getUserMedia });
    Object.defineProperty(window.screen, 'availHeight', { configurable: true, value: 900 });
    Object.defineProperty(window.screen, 'availWidth', { configurable: true, value: 400 });

    const video = document.createElement('video');
    video.play = vi.fn().mockResolvedValue(undefined);

    await expect(openCamera({ width: 1080, height: 720, video })).resolves.toBe(stream);

    expect(getUserMedia).toHaveBeenCalledWith({
      video: {
        width: 720,
        height: 1080,
        zoom: true,
        facingMode: 'environment',
      },
      audio: false,
    });
    expect(video.srcObject).toBe(stream);
    expect(video.play).toHaveBeenCalledTimes(1);
  });

  it('closes the stream and clears srcObject when playback fails', async () => {
    const track = createTrack();
    const stream = createStream([track]);
    const getUserMedia = vi.fn().mockResolvedValue(stream);
    setMediaDevices({ getUserMedia });

    const video = document.createElement('video');
    video.play = vi.fn().mockRejectedValue(new Error('play failed'));

    await expect(openCamera({ width: 1080, height: 720, video })).rejects.toThrow('play failed');
    expect(track.stop).toHaveBeenCalledTimes(1);
    expect(video.srcObject).toBeNull();
  });

  it('closes the active camera stream on the video element', async () => {
    const tracks = [createTrack(), createTrack()];
    const video = document.createElement('video');
    video.srcObject = createStream(tracks);

    await closeCamera(video);

    expect(tracks[0].stop).toHaveBeenCalledTimes(1);
    expect(tracks[1].stop).toHaveBeenCalledTimes(1);
    expect(video.srcObject).toBeNull();
  });

  it('reads the first barcode from canvas image data', async () => {
    const ctx = createDrawingContext(200, 120);
    const result = {
      text: 'hello',
      position: {
        topLeft: { x: 10, y: 10 },
        topRight: { x: 20, y: 10 },
        bottomRight: { x: 20, y: 20 },
        bottomLeft: { x: 10, y: 20 },
      },
    };
    readBarcodesMock.mockResolvedValue([result]);

    await expect(scanCanvas(ctx, { tryHarder: true })).resolves.toBe(result);

    expect(ctx.getImageData).toHaveBeenCalledWith(0, 0, 200, 120);
    expect(readBarcodesMock).toHaveBeenCalledWith(
      { data: new Uint8ClampedArray(), width: 200, height: 120 },
      { tryHarder: true },
    );
  });

  it('throws when scanCanvas is called without a context', async () => {
    await expect(scanCanvas(null)).rejects.toThrow('Canvas context not found');
  });

  it('draws target rectangles and rotated markers', () => {
    const ctx = createDrawingContext(100, 100);
    const position = {
      topLeft: { x: 10, y: 20 },
      topRight: { x: 40, y: 20 },
      bottomRight: { x: 40, y: 50 },
      bottomLeft: { x: 10, y: 50 },
      color: 'rgba(255, 0, 0, 0.5)',
    };

    drawTargetRectangle(ctx, position);

    expect(ctx.moveTo).toHaveBeenCalledWith(10, 20);
    expect(ctx.lineTo).toHaveBeenNthCalledWith(1, 40, 20);
    expect(ctx.strokeStyle).toBe('rgba(255, 0, 0, 0.5)');
    expect(ctx.fillStyle).toBe('rgba(255, 0, 0, 0.5)');

    const rotatedCtx = createDrawingContext(100, 100);
    drawTargetRectangleRotated(rotatedCtx, {
      topLeft: { x: 60, y: 40 },
      topRight: { x: 70, y: 40 },
      bottomRight: { x: 70, y: 50 },
      bottomLeft: { x: 60, y: 50 },
      degree: 90,
      color: 'green',
    });

    const [x, y] = (rotatedCtx.moveTo as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(x).toBeCloseTo(60);
    expect(y).toBeCloseTo(60);
    expect(rotatedCtx.strokeStyle).toBe('green');
  });

  it('draws the camera frame using device pixel ratio-aware line width', () => {
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 2 });
    const ctx = createDrawingContext(200, 100);

    drawCameraFrame(ctx, { size: 0.5, length: 0.1, color: '#fff' });

    expect(ctx.beginPath).toHaveBeenCalledTimes(1);
    expect(ctx.moveTo).toHaveBeenCalledTimes(4);
    expect(ctx.lineTo).toHaveBeenCalledTimes(8);
    expect(ctx.strokeStyle).toBe('#fff');
    expect(ctx.lineWidth).toBe(8);
  });

  it('runs a callback on a fixed animation frame interval and cancels it', () => {
    vi.useFakeTimers();

    let rafId = 0;
    const rafTimers = new Map<number, ReturnType<typeof setTimeout>>();

    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        rafId += 1;
        const id = rafId;
        const timer = setTimeout(() => callback(Date.now()), 16);
        rafTimers.set(id, timer);
        return id;
      }),
    );
    vi.stubGlobal(
      'cancelAnimationFrame',
      vi.fn((id: number) => {
        const timer = rafTimers.get(id);
        if (timer) {
          clearTimeout(timer);
        }
      }),
    );

    const call = vi.fn();
    const cancel = fixedFPSCall(call, 10);

    vi.advanceTimersByTime(250);
    expect(call).toHaveBeenCalledTimes(2);

    cancel();
    vi.advanceTimersByTime(250);
    expect(call).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});

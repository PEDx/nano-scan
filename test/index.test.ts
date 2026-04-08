import { beforeEach, describe, expect, it, vi } from 'vitest';

const utilsMocks = vi.hoisted(() => ({
  applyVideoTorchMock: vi.fn(),
  applyVideoZoomMock: vi.fn(),
  checkCameraConstraintsCapabilitiesMock: vi.fn(),
  closeCameraMock: vi.fn(),
  closeStreamMock: vi.fn(),
  drawCameraFrameMock: vi.fn(),
  drawTargetRectangleMock: vi.fn(),
  drawTargetRectangleRotatedMock: vi.fn(),
  fixedFPSCallMock: vi.fn(),
  getCameraCapabilitiesZoomRangeMock: vi.fn(),
  noopMock: vi.fn(),
  openCameraMock: vi.fn(),
  requestCameraPermissionMock: vi.fn(),
  scanCanvasMock: vi.fn(),
}));

const zxingMocks = vi.hoisted(() => ({
  prepareZXingModuleMock: vi.fn(),
}));

vi.mock('../lib/utils', () => ({
  applyVideoTorch: utilsMocks.applyVideoTorchMock,
  applyVideoZoom: utilsMocks.applyVideoZoomMock,
  checkCameraConstraintsCapabilities: utilsMocks.checkCameraConstraintsCapabilitiesMock,
  closeCamera: utilsMocks.closeCameraMock,
  closeStream: utilsMocks.closeStreamMock,
  drawCameraFrame: utilsMocks.drawCameraFrameMock,
  drawTargetRectangle: utilsMocks.drawTargetRectangleMock,
  drawTargetRectangleRotated: utilsMocks.drawTargetRectangleRotatedMock,
  fixedFPSCall: utilsMocks.fixedFPSCallMock,
  getCameraCapabilitiesZoomRange: utilsMocks.getCameraCapabilitiesZoomRangeMock,
  noop: utilsMocks.noopMock,
  openCamera: utilsMocks.openCameraMock,
  requestCameraPermission: utilsMocks.requestCameraPermissionMock,
  scanCanvas: utilsMocks.scanCanvasMock,
}));

vi.mock('zxing-wasm/reader', () => ({
  prepareZXingModule: zxingMocks.prepareZXingModuleMock,
}));

import NanoScan from '../lib/index';

function createTrack() {
  return {
    stop: vi.fn(),
    applyConstraints: vi.fn().mockResolvedValue(undefined),
    getCapabilities: vi.fn(() => ({ zoom: { min: 1, max: 3 } })),
  };
}

function createStream() {
  const track = createTrack();
  return {
    track,
    stream: {
      getTracks: vi.fn(() => [track]),
      getVideoTracks: vi.fn(() => [track]),
    } as unknown as MediaStream,
  };
}

function createCanvasContext(canvas: HTMLCanvasElement) {
  return {
    canvas,
    drawImage: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe('NanoScan', () => {
  beforeEach(() => {
    Object.values(utilsMocks).forEach((mock) => mock.mockReset());
    Object.values(zxingMocks).forEach((mock) => mock.mockReset());

    utilsMocks.closeCameraMock.mockResolvedValue(undefined);
    utilsMocks.requestCameraPermissionMock.mockResolvedValue(undefined);
    utilsMocks.checkCameraConstraintsCapabilitiesMock.mockReturnValue(true);
    utilsMocks.getCameraCapabilitiesZoomRangeMock.mockReturnValue({ min: 1, max: 3 });
    utilsMocks.applyVideoZoomMock.mockResolvedValue(undefined);
    utilsMocks.applyVideoTorchMock.mockResolvedValue(undefined);
    utilsMocks.scanCanvasMock.mockResolvedValue(undefined);
    utilsMocks.fixedFPSCallMock.mockImplementation(() => vi.fn());
  });

  it('requires a container and appends the preview canvas during construction', () => {
    expect(
      () =>
        new NanoScan({
          container: null,
          resolution: { width: 1080, height: 1080 },
        }),
    ).toThrow('Container is required');

    const container = document.createElement('div');
    const scanner = new NanoScan({
      container,
      resolution: { width: 1080, height: 1080 },
    });

    expect(container.contains(scanner.cameraCanvasNode)).toBe(true);
  });

  it('configures a custom wasm url when provided', () => {
    const container = document.createElement('div');

    new NanoScan({
      container,
      resolution: { width: 1080, height: 1080 },
      zxingWASMUrl: 'https://cdn.example.com/zxing.wasm',
    });

    expect(zxingMocks.prepareZXingModuleMock).toHaveBeenCalledTimes(1);
    const config = zxingMocks.prepareZXingModuleMock.mock.calls[0][0];
    expect(config.overrides.locateFile('reader.wasm', '/assets/')).toBe('https://cdn.example.com/zxing.wasm');
    expect(config.overrides.locateFile('reader.js', '/assets/')).toBe('/assets/reader.js');
  });

  it('starts scanning, applies native zoom, and decodes frames from the offscreen canvas', async () => {
    const container = document.createElement('div');
    const onScan = vi.fn();
    const scanner = new NanoScan({
      container,
      resolution: { width: 1080, height: 720 },
      zoom: 2,
      onScan,
    });

    const contextMap = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
    const getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockImplementation(function (this: HTMLCanvasElement) {
        return contextMap.get(this) || null;
      });

    const cameraCtx = createCanvasContext(scanner.cameraCanvasNode);
    const offscreenCtx = createCanvasContext(scanner.offscreenCanvasNode);
    contextMap.set(scanner.cameraCanvasNode, cameraCtx);
    contextMap.set(scanner.offscreenCanvasNode, offscreenCtx);

    const { stream } = createStream();
    utilsMocks.openCameraMock.mockImplementation(async ({ video }) => {
      Object.defineProperty(video, 'videoWidth', { configurable: true, value: 640 });
      Object.defineProperty(video, 'videoHeight', { configurable: true, value: 480 });
      Object.defineProperty(video, 'readyState', {
        configurable: true,
        value: HTMLMediaElement.HAVE_CURRENT_DATA,
      });
      video.srcObject = stream;
      return stream;
    });

    const decodedPosition = {
      topLeft: { x: 10, y: 10 },
      topRight: { x: 20, y: 10 },
      bottomRight: { x: 20, y: 20 },
      bottomLeft: { x: 10, y: 20 },
    };
    utilsMocks.scanCanvasMock.mockResolvedValue({
      text: 'decoded-value',
      position: decodedPosition,
    });

    let scheduledLoop: (() => Promise<void>) | undefined;
    const cancelLoop = vi.fn();
    utilsMocks.fixedFPSCallMock.mockImplementation((loop) => {
      scheduledLoop = loop;
      return cancelLoop;
    });

    await scanner.startScan();
    await scheduledLoop?.();

    expect(utilsMocks.requestCameraPermissionMock).toHaveBeenCalledTimes(1);
    expect(utilsMocks.openCameraMock).toHaveBeenCalledWith({
      width: 1080,
      height: 720,
      video: scanner.videoNode,
    });
    expect(utilsMocks.applyVideoZoomMock).toHaveBeenCalledWith(scanner.videoNode, 2);
    expect(offscreenCtx.translate).toHaveBeenNthCalledWith(1, 320, 240);
    expect(offscreenCtx.rotate).toHaveBeenCalledTimes(1);
    expect(utilsMocks.scanCanvasMock).toHaveBeenCalledWith(
      offscreenCtx,
      expect.objectContaining({ formats: ['QRCode'], maxNumberOfSymbols: 1, tryHarder: true }),
    );
    expect(onScan).toHaveBeenCalledWith('decoded-value');
    expect(utilsMocks.drawCameraFrameMock).toHaveBeenCalledTimes(1);
    expect(utilsMocks.drawTargetRectangleRotatedMock).toHaveBeenCalledWith(
      cameraCtx,
      expect.objectContaining({ degree: -30 }),
    );
    expect(getContextSpy).toHaveBeenCalledTimes(2);
  });

  it('reports startup errors through onError and rethrows normalized errors', async () => {
    const container = document.createElement('div');
    const onError = vi.fn();
    const scanner = new NanoScan({
      container,
      resolution: { width: 1080, height: 1080 },
      onError,
    });

    utilsMocks.requestCameraPermissionMock.mockRejectedValue('permission denied');

    await expect(scanner.startScan()).rejects.toThrow('permission denied');
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    expect(onError.mock.calls[0][0].message).toBe('permission denied');
  });

  it('stops the active scan loop and camera stream', async () => {
    const container = document.createElement('div');
    const scanner = new NanoScan({
      container,
      resolution: { width: 1080, height: 1080 },
    });

    const contextMap = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (this: HTMLCanvasElement) {
      return contextMap.get(this) || null;
    });
    contextMap.set(scanner.cameraCanvasNode, createCanvasContext(scanner.cameraCanvasNode));
    contextMap.set(scanner.offscreenCanvasNode, createCanvasContext(scanner.offscreenCanvasNode));

    const { stream } = createStream();
    utilsMocks.openCameraMock.mockImplementation(async ({ video }) => {
      Object.defineProperty(video, 'videoWidth', { configurable: true, value: 640 });
      Object.defineProperty(video, 'videoHeight', { configurable: true, value: 480 });
      Object.defineProperty(video, 'readyState', {
        configurable: true,
        value: HTMLMediaElement.HAVE_CURRENT_DATA,
      });
      video.srcObject = stream;
      return stream;
    });

    const cancelLoop = vi.fn();
    utilsMocks.fixedFPSCallMock.mockImplementation(() => cancelLoop);

    await scanner.startScan();
    scanner.stopScan();

    expect(cancelLoop).toHaveBeenCalledTimes(1);
    expect(utilsMocks.closeCameraMock).toHaveBeenLastCalledWith(scanner.videoNode);
  });

  it('clamps zoom to the supported range and reports async zoom failures', async () => {
    const container = document.createElement('div');
    const onError = vi.fn();
    const scanner = new NanoScan({
      container,
      resolution: { width: 1080, height: 1080 },
      onError,
    });

    scanner.supportNativeZoom = true;
    scanner.zoomRange = { min: 1, max: 3 };

    scanner.zoomTo(10);
    expect(utilsMocks.applyVideoZoomMock).toHaveBeenCalledWith(scanner.videoNode, 3);

    utilsMocks.applyVideoZoomMock.mockRejectedValueOnce(new Error('zoom failed'));
    scanner.zoomTo(2);
    await Promise.resolve();
    await Promise.resolve();

    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'zoom failed' }));
  });

  it('reports torch failures through onError', async () => {
    const container = document.createElement('div');
    const onError = vi.fn();
    const scanner = new NanoScan({
      container,
      resolution: { width: 1080, height: 1080 },
      onError,
    });

    utilsMocks.applyVideoTorchMock.mockRejectedValueOnce(new Error('torch failed'));

    scanner.toggleTorch(true);
    await Promise.resolve();
    await Promise.resolve();

    expect(utilsMocks.applyVideoTorchMock).toHaveBeenCalledWith(scanner.videoNode, true);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'torch failed' }));
  });

  it('cleans up stale camera streams when a newer scan session supersedes them', async () => {
    const container = document.createElement('div');
    const scanner = new NanoScan({
      container,
      resolution: { width: 1080, height: 1080 },
    });

    const contextMap = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (this: HTMLCanvasElement) {
      return contextMap.get(this) || null;
    });
    contextMap.set(scanner.cameraCanvasNode, createCanvasContext(scanner.cameraCanvasNode));
    contextMap.set(scanner.offscreenCanvasNode, createCanvasContext(scanner.offscreenCanvasNode));

    const { stream } = createStream();
    let resolveOpenCamera!: (value: MediaStream) => void;
    utilsMocks.openCameraMock.mockImplementation(
      ({ video }) =>
        new Promise<MediaStream>((resolve) => {
          resolveOpenCamera = (value) => {
            Object.defineProperty(video, 'videoWidth', { configurable: true, value: 640 });
            Object.defineProperty(video, 'videoHeight', { configurable: true, value: 480 });
            Object.defineProperty(video, 'readyState', {
              configurable: true,
              value: HTMLMediaElement.HAVE_CURRENT_DATA,
            });
            video.srcObject = value;
            resolve(value);
          };
        }),
    );

    const pending = scanner.startScan();
    await Promise.resolve();
    await Promise.resolve();
    scanner.stopScan();
    resolveOpenCamera(stream);
    await pending;

    expect(utilsMocks.closeStreamMock).toHaveBeenCalledWith(stream);
    expect(scanner.videoNode.srcObject).toBeNull();
  });
});

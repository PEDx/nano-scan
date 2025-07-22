import { readBarcodes, ReaderOptions, ReadResult } from 'zxing-wasm/reader';

export function checkCameraConstraintsCapabilities(video: HTMLVideoElement, key: string) {
  const videoTracks = (video.srcObject as MediaStream).getVideoTracks();
  const track = videoTracks[0];
  const capabilities = track?.getCapabilities() as Record<string, any>;
  return !!capabilities?.[key];
}

export function getCameraCapabilitiesZoomRange(video: HTMLVideoElement) {
  const videoTracks = (video.srcObject as MediaStream).getVideoTracks();
  const track = videoTracks[0];
  const capabilities = track?.getCapabilities() as Record<string, any>;
  const ret = {
    min: 1,
    max: 1,
  };
  if ('zoom' in capabilities) {
    ret.min = capabilities['zoom']['min'];
    ret.max = capabilities['zoom']['max'];
  }
  return ret;
}

export async function applyVideoZoom(video: HTMLVideoElement, zoom: number) {
  const track = (video.srcObject as MediaStream).getVideoTracks()[0];
  const constraints = { advanced: [{ zoom: zoom }] };
  await track.applyConstraints(constraints as MediaTrackConstraints);
}

export async function listCameras() {
  const cameras: MediaDeviceInfo[] = [];
  let allDevices = await navigator.mediaDevices.enumerateDevices();
  for (let i = 0; i < allDevices.length; i++) {
    let device = allDevices[i];
    if (device.kind == 'videoinput') {
      cameras.push(device);
    }
  }
  return cameras;
}

export async function applyVideoTorch(video: HTMLVideoElement, torch: boolean) {
  const track = (video.srcObject as MediaStream).getVideoTracks()[0];
  const constraints = { advanced: [{ torch: torch }] };
  await track.applyConstraints(constraints as MediaTrackConstraints);
}

export function closeStream(stream: MediaStream) {
  if (stream) {
    const tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.stop(); // stop the opened tracks
    }
  }
}

export async function requestCameraPermission() {
  try {
    const constraints = { video: true, audio: false, facingMode: 'environment' };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    closeStream(stream);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const resolutions = [
  { width: 3840, height: 2160 },
  { width: 1080, height: 1080 },
  { width: 1280, height: 720 },
  { width: 640, height: 480 },
];

export async function openCamera({ width, height, video }: { width: number; height: number; video: HTMLVideoElement }) {
  const isPortrait = window.screen.availHeight > window.screen.availWidth;

  const videoConstraints = {
    video: {
      width: isPortrait ? height : width,
      height: isPortrait ? width : height,
      zoom: true,
      facingMode: 'environment',
    },
    audio: false,
  };
  try {
    const cameraStream = await navigator.mediaDevices.getUserMedia(videoConstraints);

    video.srcObject = cameraStream;
    await video.play();
  } catch (error) {
    alert(error);
  }
}

export async function closeCamera(video: HTMLVideoElement) {
  const stream = video.srcObject as MediaStream;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }
}

export async function scanCanvas(ctx?: CanvasRenderingContext2D | null, readerOptions?: ReaderOptions) {
  if (!ctx) {
    throw new Error('Canvas context not found');
  }
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const imageDataReadResults = await readBarcodes(imageData, readerOptions);
  return imageDataReadResults[0];
}

export function drawTargetRectangle(
  ctx: CanvasRenderingContext2D,
  position?: ReadResult['position'] & {
    color?: string;
  },
) {
  if (!position) return;
  const { topLeft, topRight, bottomLeft, bottomRight } = position;
  ctx.strokeStyle = position.color || 'rgba(0, 255, 0, 0.5)';
  ctx.beginPath();
  ctx.moveTo(topLeft.x, topLeft.y);
  ctx.lineTo(topRight.x, topRight.y);
  ctx.lineTo(bottomRight.x, bottomRight.y);
  ctx.lineTo(bottomLeft.x, bottomLeft.y);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = position.color || 'rgba(0, 255, 0, 0.5)';
  ctx.fill();
}

export function drawTargetRectangleRotated(
  ctx: CanvasRenderingContext2D,
  position?: ReadResult['position'] & { degree?: number; color?: string },
) {
  if (!position) return;
  const { topLeft, topRight, bottomLeft, bottomRight, color } = position;
  const degree = position.degree || 0;

  // Rotate coordinates 30 degrees counter-clockwise around canvas center
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const angle = (degree * Math.PI) / 180; // 30 degrees in radians

  // Function to rotate a point around the center
  const rotatePoint = (x: number, y: number) => {
    const dx = x - centerX;
    const dy = y - centerY;
    const rotatedX = centerX + dx * Math.cos(angle) - dy * Math.sin(angle);
    const rotatedY = centerY + dx * Math.sin(angle) + dy * Math.cos(angle);
    return { x: rotatedX, y: rotatedY };
  };

  // Rotate all corner points
  const rotatedTopLeft = rotatePoint(topLeft.x, topLeft.y);
  const rotatedTopRight = rotatePoint(topRight.x, topRight.y);
  const rotatedBottomRight = rotatePoint(bottomRight.x, bottomRight.y);
  const rotatedBottomLeft = rotatePoint(bottomLeft.x, bottomLeft.y);

  drawTargetRectangle(ctx, {
    topLeft: rotatedTopLeft,
    topRight: rotatedTopRight,
    bottomLeft: rotatedBottomLeft,
    bottomRight: rotatedBottomRight,
    color,
  });
}

export function drawCameraFrame(
  ctx: CanvasRenderingContext2D,
  {
    size = 0.8,
    length = 0.1,
    color = 'rgba(255, 255, 255, 0.8)',
  }: {
    size?: number;
    length?: number;
    color?: string;
  },
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // Calculate frame dimensions (80% of the canvas size)
  const frameWidth = width * size;
  const frameHeight = height * size;

  // Calculate starting position to center the frame
  const startX = (width - frameWidth) / 2;
  const startY = (height - frameHeight) / 2;

  // Set frame style
  ctx.strokeStyle = color;

  ctx.lineWidth = window.devicePixelRatio * 4;

  // Draw the frame
  ctx.beginPath();

  const frameLength = width * length;

  // Top-left corner
  ctx.moveTo(startX, startY + frameLength);
  ctx.lineTo(startX, startY);
  ctx.lineTo(startX + frameLength, startY);

  // Top-right corner
  ctx.moveTo(startX + frameWidth - frameLength, startY);
  ctx.lineTo(startX + frameWidth, startY);
  ctx.lineTo(startX + frameWidth, startY + frameLength);

  // Bottom-right corner
  ctx.moveTo(startX + frameWidth, startY + frameHeight - frameLength);
  ctx.lineTo(startX + frameWidth, startY + frameHeight);
  ctx.lineTo(startX + frameWidth - frameLength, startY + frameHeight);

  // Bottom-left corner
  ctx.moveTo(startX + frameLength, startY + frameHeight);
  ctx.lineTo(startX, startY + frameHeight);
  ctx.lineTo(startX, startY + frameHeight - frameLength);

  ctx.stroke();
}

export const fixedFPSCall = (call: () => void, fps: number = 60) => {
  let now;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;
  let raf_id = 0;

  function tick() {
    raf_id = requestAnimationFrame(tick);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);
      call();
    }
  }
  tick();
  return () => {
    cancelAnimationFrame(raf_id);
  };
};

export const noop = () => {};

import { ReaderOptions, prepareZXingModule } from 'zxing-wasm/reader';
import {
  checkCameraConstraintsCapabilities,
  fixedFPSCall,
  getCameraCapabilitiesZoomRange,
  noop,
  requestCameraPermission,
  scanCanvas,
  applyVideoZoom,
  openCamera,
  closeCamera,
  drawTargetRectangle,
  drawCameraFrame,
  drawTargetRectangleRotated,
  applyVideoTorch,
} from './utils';

interface INanoScanOptions {
  container: HTMLElement | null;
  zxingOptions?: ReaderOptions;
  zxingWASMUrl?: string;
  resolution: {
    width: number;
    height: number;
  };
  marker?: boolean;
  frame?: boolean;
  fps?: number;
  zoom?: number;
  trick?: boolean;
  onScan?: (result: string) => void;
  onError?: (error: Error) => void;
}

const TRICK_DEGREE = 30;

export default class NanoScan {
  private zoom: number = 1;
  private cancelLoop: () => void = noop;
  videoNode: HTMLVideoElement;
  cameraCanvasNode: HTMLCanvasElement;
  offscreenCanvasNode: HTMLCanvasElement;
  onScan: (result: string) => void;
  onError: (error: Error) => void;
  supportNativeZoom: boolean | null = null;
  zoomRange: { min: number; max: number } | null = null;
  options: INanoScanOptions = {
    container: null,
    marker: true,
    frame: true,
    zxingOptions: {
      tryHarder: true,
      formats: ['QRCode'],
      maxNumberOfSymbols: 1,
    },
    fps: 30,
    zoom: 1,
    trick: true,
    resolution: {
      width: 1080,
      height: 1080,
    },
  };

  constructor(options: INanoScanOptions) {
    this.options = { ...this.options, ...options };
    this.onScan = options.onScan || noop;
    this.onError = options.onError || noop;
    this.videoNode = document.createElement('video');
    this.cameraCanvasNode = document.createElement('canvas');
    this.offscreenCanvasNode = document.createElement('canvas');
    this.cameraCanvasNode.style.width = `100%`;
    this.offscreenCanvasNode.style.width = `100%`;

    if (this.options.zxingWASMUrl) {
      const wasm_url = this.options.zxingWASMUrl;
      prepareZXingModule({
        overrides: {
          locateFile: (path, prefix) => {
            if (path.endsWith('.wasm')) {
              return wasm_url;
            }
            return prefix + path;
          },
        },
      });
    }

    if (!this.options.container) {
      throw new Error('Container is required');
    }
    this.options.container.appendChild(this.cameraCanvasNode);
  }

  async startScan() {
    this.cancelLoop();
    await requestCameraPermission();
    const video = this.videoNode;
    const cameraCanvas = this.cameraCanvasNode;
    const offscreenCanvas = this.offscreenCanvasNode;

    const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true })!;
    const cameraCtx = cameraCanvas.getContext('2d', { willReadFrequently: true })!;

    await openCamera({
      width: this.options.resolution.width,
      height: this.options.resolution.height,
      video,
    });
    this.supportNativeZoom = checkCameraConstraintsCapabilities(this.videoNode, 'zoom');
    this.zoomRange = this.supportNativeZoom ? getCameraCapabilitiesZoomRange(this.videoNode) : { min: 1, max: 10 };

    cameraCanvas.width = video.videoWidth;
    cameraCanvas.height = video.videoHeight;
    offscreenCanvas.width = video.videoWidth;
    offscreenCanvas.height = video.videoHeight;

    if (this.options.trick) {
      // Translate to the center of the canvas for rotation
      offscreenCtx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);

      // Rotate 30 degrees clockwise (in radians)
      offscreenCtx.rotate((TRICK_DEGREE * Math.PI) / 180);

      // Translate back to draw the image centered
      offscreenCtx.translate(-offscreenCanvas.width / 2, -offscreenCanvas.height / 2);
    }

    const drawCanvas = async () => {
      let scanCanvasCtx = cameraCtx;
      const scaledWidth = video?.videoWidth * this.zoom;
      const scaledHeight = video?.videoHeight * this.zoom;
      const scaledX = (video?.videoWidth - scaledWidth) / 2;
      const scaledY = (video?.videoHeight - scaledHeight) / 2;
      cameraCtx?.drawImage(
        video,
        0,
        0,
        video?.videoWidth,
        video?.videoHeight,
        scaledX,
        scaledY,
        scaledWidth,
        scaledHeight,
      );

      if (this.options.frame) {
        drawCameraFrame(cameraCtx, {
          size: 0.8,
          length: 0.1,
          color: 'rgba(255, 255, 255, 0.8)',
        });
      }

      if (this.options.trick) {
        // Draw the image on the offscreen canvas with zoom
        offscreenCtx.drawImage(
          video,
          0,
          0,
          video?.videoWidth,
          video?.videoHeight,
          scaledX,
          scaledY,
          scaledWidth,
          scaledHeight,
        );

        scanCanvasCtx = offscreenCtx;
      }

      const decoded = await scanCanvas(scanCanvasCtx);

      if (!decoded || !decoded.text) return;

      this.onScan(decoded.text);

      if (this.options.marker) {
        if (this.options.trick) {
          (decoded.position as any).degree = -TRICK_DEGREE;
          drawTargetRectangleRotated(cameraCtx, decoded.position);
        } else {
          drawTargetRectangle(cameraCtx, decoded.position);
        }
      }
    };

    this.zoomTo(this.options.zoom || 1);

    this.cancelLoop = fixedFPSCall(drawCanvas, this.options.fps);
  }

  stopScan() {
    this.cancelLoop();
    closeCamera(this.videoNode);
  }

  zoomIn(step: number = 0.1) {
    this.zoomTo(this.zoom + step);
  }

  zoomOut(step: number = 0.1) {
    this.zoomTo(this.zoom - step);
  }

  zoomTo(zoom: number) {
    const _zoom = Math.min(Math.max(zoom, this.zoomRange?.min || 1), this.zoomRange?.max || 1);

    if (this.supportNativeZoom) {
      this.zoom = _zoom;
      applyVideoZoom(this.videoNode, _zoom);
      return;
    }

    this.zoom = _zoom;
  }

  toggleTorch(bool: boolean) {
    applyVideoTorch(this.videoNode, bool);
  }
}

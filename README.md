<h1>
  <img src="./docs/logo.svg" alt="Nano Scan logo" height="64" valign="middle">
  <div>Nano Scan</div>
</h1>

**NanoScan** is a lightweight, high-performance web barcode and QR code scanner powered by [`zxing-wasm`](https://github.com/Sec-ant/zxing-wasm). Designed for maximum compatibility and flexibility, it supports all barcode types recognized by zxing-wasm and includes enhanced support for small or distant codes via canvas-based zooming.

<div align="center">
  <h3>
    <a href="https://pedx.github.io/nano-scan/" target="_blank" rel="noopener noreferrer">
      👉 Try the live demo
    </a>
  </h3>
</div>
---

## ✨ Features

- 🔍 **Supports All ZXing Formats**
  Full access to `zxing-wasm`'s decoding capabilities, including QR codes, EAN, Code 128, and more.

- 🎥 **Camera Zoom Fallback**
  Automatically falls back to canvas-based digital zoom when native camera zoom APIs are not available — ideal for scanning small codes (~1cm).

- ⚡️ **Tiny & Easy to Integrate**
  Minimal footprint and a clean API make NanoScan easy to drop into any web project.

## Install

```bash
npm install nano-scan
```

## Basic Usage

```js
import NanoScan from 'nano-scan';

const nanoScan = new NanoScan({
  container: document.getElementById('camera-container'),
  resolution: {
    width: 1920,
    height: 1080,
  },
  fps: 30,
  zoom: 2,
  onScan: (result) => {
    console.log(result);
  },
  onError: (error) => {
    console.error(error);
  },
});

// Start scanning
nanoScan.startScan();

// Stop scanning
nanoScan.stopScan();
```

## Class: NanoScan

Main class providing barcode/QR code scanning functionality.

### Constructor

```ts
constructor(options: INanoScanOptions)
```

#### Parameters

`options` - Configuration object of type `INanoScanOptions`

### Configuration Options (INanoScanOptions)

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `container` | `HTMLElement \| null` | `null` | **Required**. HTML container element for displaying camera preview |
| `resolution` | `{ width: number, height: number }` | `{ width: 1080, height: 1080 }` | Camera resolution |
| `zxingOptions` | `ReaderOptions` | `{ tryHarder: true, formats: ['QRCode'], maxNumberOfSymbols: 1 }` | zxing-wasm reader options |
| `zxingWASMUrl` | `string` | `undefined` | Custom zxing-wasm WebAssembly file URL |
| `marker` | `boolean` | `true` | Whether to display scan result marker |
| `frame` | `boolean` | `true` | Whether to display scan frame |
| `fps` | `number` | `30` | Scanning frame rate |
| `zoom` | `number` | `1` | Initial zoom level |
| `trick` | `boolean` | `true` | Whether to use rotation trick for optimized scanning (helps with angled codes) |
| `onScan` | `(result: string) => void` | `noop` | Callback function when a result is scanned |
| `onError` | `(error: Error) => void` | `noop` | Callback function when an error occurs |

### Methods

#### startScan()

Starts the scanning process.

```ts
async startScan(): Promise<void>
```

Initializes the camera, sets up canvases, and begins the scanning loop.

#### stopScan()

Stops the scanning process.

```ts
stopScan(): void
```

Stops the camera and scanning loop.

#### zoomIn(step?)

Zooms in the camera view.

```ts
zoomIn(step: number = 0.1): void
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `step` | `number` | `0.1` | Amount to zoom in by |

#### zoomOut(step?)

Zooms out the camera view.

```ts
zoomOut(step: number = 0.1): void
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `step` | `number` | `0.1` | Amount to zoom out by |

#### zoomTo(zoom)

Zooms the camera view to a specific level.

```ts
zoomTo(zoom: number): void
```

| Parameter | Type | Description |
|------|------|------|
| `zoom` | `number` | Zoom level to set |

## License

[MIT](LICENSE)

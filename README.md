<h1>
  <img src="./assets/logo.svg" alt="Nano Scan logo" height="64" valign="middle">
  <div>Nano Scan</div>
</h1>

**NanoScan** is a lightweight, high-performance web barcode and QR code scanner powered by [`zxing-wasm`](https://github.com/Sec-ant/zxing-wasm). Designed for maximum compatibility and flexibility, it supports all barcode types recognized by zxing-wasm and includes enhanced support for small or distant codes via canvas-based zooming.

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


## usage
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

document.getElementById('scan-btn').addEventListener('click', () => {
  nanoScan.startScan();
});

```

## Documentation


## License

[MIT](LICENSE)

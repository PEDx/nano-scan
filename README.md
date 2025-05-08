<h1>
  <img src="./assets/logo.svg" alt="Nano Scan logo" height="64" valign="middle">
  <div>Nano Scan</div>
</h1>
a browser scanning component based on zxing-wasm

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

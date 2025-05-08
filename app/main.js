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

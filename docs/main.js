// Initialize UI elements
const scanBtn = document.getElementById('scan-btn');
const stopBtn = document.getElementById('stop-btn');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const resultElement = document.getElementById('result');

// Create status indicator
function updateStatus(message, isSuccess = true) {
  resultElement.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; background-color: ${isSuccess ? '#10b981' : '#ef4444'};"></div>
      <div>${message}</div>
    </div>
  `;
}

// Initialize NanoScan
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
    updateStatus(`<span style="font-weight: 500;">Scan result:</span> ${result}`);

    // Add copy button
    resultElement.innerHTML += `
      <div style="margin-top: 8px;">
        <button id="copy-btn" style="font-size: 0.75rem; height: 32px; padding: 0 12px;">Copy Result</button>
      </div>
    `;

    // Add copy functionality
    document.getElementById('copy-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(result)
        .then(() => {
          document.getElementById('copy-btn').textContent = 'Copied!';
          setTimeout(() => {
            document.getElementById('copy-btn').textContent = 'Copy Result';
          }, 2000);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    });
  },
  onError: (error) => {
    console.error(error);
    updateStatus(`Error: ${error.message}`, false);
  },
});

// Set initial button states
stopBtn.disabled = true;
zoomInBtn.disabled = true;
zoomOutBtn.disabled = true;

// Start scan event
scanBtn.addEventListener('click', async () => {
  try {
    updateStatus('Starting camera...');
    scanBtn.disabled = true;

    await nanoScan.startScan();

    updateStatus('Scanning... Point your camera at a QR code or barcode.');
    stopBtn.disabled = false;
    zoomInBtn.disabled = false;
    zoomOutBtn.disabled = false;
  } catch (error) {
    updateStatus(`Failed to start camera: ${error.message}`, false);
    scanBtn.disabled = false;
  }
});

// Stop scan event
stopBtn.addEventListener('click', () => {
  nanoScan.stopScan();
  updateStatus('Scanning stopped');
  scanBtn.disabled = false;
  stopBtn.disabled = true;
  zoomInBtn.disabled = true;
  zoomOutBtn.disabled = true;
});

// Zoom in event
zoomInBtn.addEventListener('click', () => {
  nanoScan.zoomIn(0.2);
  updateStatus(`Zoom increased`);
});

// Zoom out event
zoomOutBtn.addEventListener('click', () => {
  nanoScan.zoomOut(0.2);
  updateStatus(`Zoom decreased`);
});

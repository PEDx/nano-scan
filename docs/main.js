// DOM element references
const scanBtn = document.getElementById('scan-btn');
const stopBtn = document.getElementById('stop-btn');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const resultElement = document.getElementById('result');
const statusDot = document.getElementById('status-dot');
const statusMessage = document.getElementById('status-message');
const resultActions = document.getElementById('result-actions');
const copyBtn = document.getElementById('copy-btn');

// Store current scan result
let currentScanResult = '';
let isScanProcessing = false;
let lastScanTime = 0;
const scanCooldown = 2000; // Don't process the same scan result within 2 seconds

// Update status display (using class names instead of innerHTML)
function updateStatus(message, isSuccess = true) {
  statusDot.className = 'status-dot';
  if (isSuccess) {
    statusDot.classList.add('success');
  } else {
    statusDot.classList.add('error');
  }
  statusMessage.textContent = message;
}

// Copy result to clipboard
function setupCopyButton(text) {
  // Remove previous event listeners
  copyBtn.replaceWith(copyBtn.cloneNode(true));

  // Get new button reference and add event listener
  const newCopyBtn = document.getElementById('copy-btn');
  newCopyBtn.textContent = 'Copy Result';

  newCopyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        newCopyBtn.textContent = 'Copied!';
        setTimeout(() => {
          newCopyBtn.textContent = 'Copy Result';
        }, 2000);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  });
}

// Handle scan result
function handleScanResult(result) {
  const now = Date.now();

  // Ignore if it's the same result and within cooldown period
  if (result === currentScanResult && now - lastScanTime < scanCooldown) {
    return;
  }

  // Update time and result
  lastScanTime = now;
  currentScanResult = result;

  // Update UI
  updateStatus(`Scan result: ${result}`, true);

  // Show copy button area
  resultActions.classList.add('visible');

  // Setup copy button
  setupCopyButton(result);
}

// Initialize NanoScan
const nanoScan = new NanoScan({
  container: document.getElementById('camera-container'),
  resolution: {
    width: 1080,
    height: 1080,
  },
  fps: 30,
  zoom: 2,
  onScan: handleScanResult,
  onError: (error) => {
    console.error(error);
    updateStatus(`Error: ${error.message}`, false);
  },
});

// Start scanning
scanBtn.addEventListener('click', async () => {
  try {
    updateStatus('Starting camera...');
    scanBtn.disabled = true;
    resultActions.classList.remove('visible');

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

// Stop scanning
stopBtn.addEventListener('click', () => {
  nanoScan.stopScan();
  updateStatus('Scanning stopped');
  scanBtn.disabled = false;
  stopBtn.disabled = true;
  zoomInBtn.disabled = true;
  zoomOutBtn.disabled = true;
  currentScanResult = '';
});

// Zoom in
zoomInBtn.addEventListener('click', () => {
  nanoScan.zoomIn(1);
  updateStatus('Zoom increased');
});

// Zoom out
zoomOutBtn.addEventListener('click', () => {
  nanoScan.zoomOut(1);
  updateStatus('Zoom decreased');
});

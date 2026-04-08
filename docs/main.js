import NanoScan from './nano-scan.js';

// DOM references
const scanBtn = document.getElementById('scan-btn');
const stopBtn = document.getElementById('stop-btn');
const torchBtn = document.getElementById('torch-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const zoomControl = document.getElementById('zoom-control');
const zoomSlider = document.getElementById('zoom-slider');
const zoomValue = document.getElementById('zoom-value');
const zoomMin = document.getElementById('zoom-min');
const zoomBadge = document.getElementById('zoom-badge');
const resultBox = document.getElementById('result-box');
const statusDot = document.getElementById('status-dot');
const resultText = document.getElementById('result-text');
const resultActions = document.getElementById('result-actions');
const copyBtn = document.getElementById('copy-btn');
const openBtn = document.getElementById('open-btn');
const historyContainer = document.getElementById('history-container');

// State
const MAX_HISTORY = 5;
const SCAN_COOLDOWN = 2000;
let history = [];
let lastScanTime = 0;
let lastScanResult = '';
let currentResult = '';

// Helpers
function isUrl(text) {
  try {
    const url = new URL(text);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function setStatus(text, type = 'idle') {
  resultText.textContent = text;
  statusDot.className = 'status-dot';
  resultBox.className = 'result-box';
  if (type === 'success') {
    statusDot.classList.add('success');
    resultBox.classList.add('success');
    resultBox.classList.add('flash');
    setTimeout(() => resultBox.classList.remove('flash'), 600);
  } else if (type === 'error') {
    statusDot.classList.add('error');
    resultBox.classList.add('error');
  }
}

function showResultActions(result) {
  currentResult = result;
  resultActions.classList.remove('hidden');
  copyBtn.textContent = 'Copy';
  if (isUrl(result)) {
    openBtn.style.display = 'inline-flex';
    openBtn.onclick = () => window.open(result, '_blank', 'noopener,noreferrer');
  } else {
    openBtn.style.display = 'none';
  }
}

function hideResultActions() {
  resultActions.classList.add('hidden');
  openBtn.style.display = 'none';
}

function renderHistory() {
  if (history.length === 0) {
    historyContainer.innerHTML = '<div class="history-empty">No scan history yet</div>';
    return;
  }
  const list = document.createElement('ul');
  list.className = 'history-list';
  history.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.title = item;

    const index = document.createElement('span');
    index.className = 'history-index';
    index.textContent = `#${idx + 1}`;

    const text = document.createElement('span');
    text.className = 'history-text';
    text.textContent = item;

    li.appendChild(index);
    li.appendChild(text);

    if (isUrl(item)) {
      const link = document.createElement('a');
      link.className = 'history-link';
      link.href = item;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open';
      link.onclick = (e) => e.stopPropagation();
      li.appendChild(link);
    }

    const copyButton = document.createElement('button');
    copyButton.className = 'history-copy';
    copyButton.textContent = 'Copy';
    copyButton.onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(item).then(() => {
        copyButton.textContent = 'Copied';
        setTimeout(() => (copyButton.textContent = 'Copy'), 1500);
      });
    };
    li.appendChild(copyButton);

    li.onclick = () => {
      setStatus(item, 'success');
      showResultActions(item);
    };

    list.appendChild(li);
  });
  historyContainer.innerHTML = '';
  historyContainer.appendChild(list);
}

function addToHistory(result) {
  // Dedupe: remove if already exists, then prepend
  history = history.filter((r) => r !== result);
  history.unshift(result);
  if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
  renderHistory();
}

function updateZoomDisplay(zoom) {
  zoomValue.textContent = `${zoom.toFixed(1)}x`;
  zoomBadge.textContent = `Zoom ${zoom.toFixed(1)}x`;
}

// NanoScan instance
const nanoScan = new NanoScan({
  container: document.getElementById('camera-container'),
  resolution: { width: 1080, height: 1080 },
  fps: 30,
  zoom: 2,
  onScan: (result) => {
    const now = Date.now();
    if (result === lastScanResult && now - lastScanTime < SCAN_COOLDOWN) return;
    lastScanTime = now;
    lastScanResult = result;
    setStatus(result, 'success');
    showResultActions(result);
    addToHistory(result);
  },
  onError: (error) => {
    console.error(error);
    setStatus(`Error: ${error.message}`, 'error');
  },
});

// Setup camera state UI
function setScanningUI(isScanning) {
  scanBtn.disabled = isScanning;
  stopBtn.disabled = !isScanning;
  torchBtn.disabled = !isScanning;
  if (isScanning) {
    zoomControl.classList.remove('hidden');
    zoomBadge.style.display = 'inline-flex';
  } else {
    zoomControl.classList.add('hidden');
    zoomBadge.style.display = 'none';
  }
}

// Start scan
scanBtn.addEventListener('click', async () => {
  try {
    setStatus('Starting camera...', 'idle');
    scanBtn.disabled = true;
    hideResultActions();
    loadingOverlay.classList.remove('hidden');

    await nanoScan.startScan();

    loadingOverlay.classList.add('hidden');
    setScanningUI(true);

    // Configure zoom slider from actual zoomRange
    const range = nanoScan.zoomRange || { min: 1, max: 10 };
    zoomSlider.min = range.min;
    zoomSlider.max = range.max;
    zoomSlider.step = Math.max((range.max - range.min) / 100, 0.1);
    const initialZoom = Math.min(Math.max(nanoScan.zoom || 1, range.min), range.max);
    zoomSlider.value = initialZoom;
    zoomMin.textContent = `${range.min}x`;
    updateZoomDisplay(initialZoom);

    // Badge shows native vs digital zoom
    zoomBadge.classList.toggle('native', !!nanoScan.supportNativeZoom);
    zoomBadge.title = nanoScan.supportNativeZoom ? 'Native camera zoom' : 'Digital canvas zoom';

    setStatus('Scanning... Point camera at a code', 'idle');

    // Reset torch UI
    torchBtn.textContent = 'Torch';
    torchBtn.classList.remove('active');
    torchBtn.dataset.torch = 'off';
  } catch (error) {
    loadingOverlay.classList.add('hidden');
    setStatus(`Failed: ${error.message}`, 'error');
    scanBtn.disabled = false;
  }
});

// Stop scan
stopBtn.addEventListener('click', () => {
  nanoScan.stopScan();
  setScanningUI(false);
  setStatus('Scanner stopped', 'idle');
  lastScanResult = '';
  torchBtn.textContent = 'Torch';
  torchBtn.classList.remove('active');
  torchBtn.dataset.torch = 'off';
});

// Torch toggle
torchBtn.addEventListener('click', () => {
  const isOn = torchBtn.dataset.torch === 'on';
  try {
    nanoScan.toggleTorch(!isOn);
    if (isOn) {
      torchBtn.dataset.torch = 'off';
      torchBtn.textContent = 'Torch';
      torchBtn.classList.remove('active');
    } else {
      torchBtn.dataset.torch = 'on';
      torchBtn.textContent = 'Torch On';
      torchBtn.classList.add('active');
    }
  } catch (e) {
    setStatus('Torch not supported', 'error');
  }
});

// Zoom slider
zoomSlider.addEventListener('input', (e) => {
  const z = parseFloat(e.target.value);
  nanoScan.zoomTo(z);
  updateZoomDisplay(z);
});

// Copy current result
copyBtn.addEventListener('click', () => {
  if (!currentResult) return;
  navigator.clipboard.writeText(currentResult).then(() => {
    copyBtn.textContent = 'Copied';
    setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
  });
});

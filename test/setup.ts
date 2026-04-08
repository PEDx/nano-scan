import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(() => {
  document.body.innerHTML = '';

  if (!navigator.mediaDevices) {
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {},
    });
  }
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  document.body.innerHTML = '';
});

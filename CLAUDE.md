# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NanoScan is a lightweight browser-based barcode/QR code scanner library built on `zxing-wasm`. It provides camera access, canvas-based rendering, zoom (native + digital fallback), torch control, and a "trick" rotation technique to improve scanning of angled codes.

Published as an npm package (`nano-scan`) with UMD and ESM outputs.

## Commands

- **Build:** `npm run build` — uses Rolldown to produce `dist/umd/index.js`, `dist/esm/index.js`, and `docs/nano-scan.js`
- **Dev server:** `npm run dev` — runs Vite dev server from the `docs/` directory (demo app)
- **No test or lint commands** are configured.

## Architecture

The library consists of two source files:

- `lib/index.ts` — exports the `NanoScan` class. Manages lifecycle (startScan/stopScan), creates video + two canvas elements (display canvas + offscreen canvas for rotated scanning), runs a fixed-FPS scan loop via `requestAnimationFrame`, and delegates zoom/torch to utils.
- `lib/utils.ts` — all camera and canvas utility functions: camera open/close/permission, zoom/torch application via `MediaStreamTrack.applyConstraints`, barcode reading via `zxing-wasm`'s `readBarcodes`, drawing helpers (scan frame, result marker rectangle, rotated rectangle).

### Key design details

- **Dual canvas approach:** The display canvas (`cameraCanvasNode`) shows the camera feed with frame overlay. The offscreen canvas (`offscreenCanvasNode`) applies a 30-degree rotation ("trick") before scanning, improving detection of tilted codes.
- **Zoom fallback:** If the device camera supports native zoom (checked via `MediaStreamTrack.getCapabilities()`), zoom is applied via constraints. Otherwise, digital zoom is done by scaling the canvas draw region.
- **Build outputs:** Rolldown config (`rolldown.config.ts`) defines two build entries — one for dist (UMD + ESM, minified) and one for the demo app (`docs/nano-scan.js`, ESM, unminified).

### Demo app

`docs/` contains a standalone demo (HTML + JS, no framework) served by Vite in dev mode and deployed to GitHub Pages. It imports from `docs/nano-scan.js` (the unminified ESM build output). Eruda console is conditionally loaded when accessed via IP address (for mobile debugging).

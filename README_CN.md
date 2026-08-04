<h1 align="center">
  <img src="./docs/logo.svg" alt="Nano Scan logo" height="64" valign="middle">
  <div>Nano Scan</div>
</h1>

**NanoScan** 是一个轻量级、高性能的网页条形码和二维码扫描器，由 [`zxing-wasm`](https://github.com/Sec-ant/zxing-wasm) 提供支持。它专为最大兼容性和灵活性而设计，支持 zxing-wasm 识别的所有条形码类型，并通过基于画布的缩放功能增强了对小型或远距离码的支持。

<div align="center">
  <h3>
    <a href="https://pedx.github.io/nano-scan/" target="_blank" rel="noopener noreferrer">
      👉 查看在线演示
    </a>
  </h3>
</div>

<p align="center">
 <img src="./docs/qrcode.svg" alt="Nano Scan QR Code Test" width="1086px" align="middle">
</p>

## ✨ 特性

- 🔍 **支持所有 ZXing 格式** 完全支持 `zxing-wasm` 的解码功能，包括二维码、EAN、Code 128 等。

- 🎥 **相机缩放** 当原生相机缩放 API 不可用时，自动回退到基于画布的数字缩放 — 非常适合扫描小型码（印刷品下约1厘米）。

- ⚡️ **小巧且易于集成** 极小的体积和简洁的 API 使 NanoScan 可以轻松集成到任何网页项目中。

## 安装

```bash
npm install nano-scan
```

## 基本用法

```js
import NanoScan from 'nano-scan';

const nanoScan = new NanoScan({
  container: document.getElementById('camera-container'),
  resolution: {
    width: 1080,
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

// 开始扫描
nanoScan.startScan();

// 停止扫描
nanoScan.stopScan();
```

## 类: NanoScan

提供条形码/二维码扫描功能的主类。

### 构造函数

```ts
constructor(options: INanoScanOptions)
```

#### 参数

`options` - 类型为 `INanoScanOptions` 的配置对象

### 配置选项 (INanoScanOptions)

| 参数          | 类型                                | 默认值                                                           | 描述                                                                     |
| ------------- | ----------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `container`   | `HTMLElement \| null`               | `null`                                                           | **必需**。用于显示相机预览的 HTML 容器元素                               |
| `resolution`  | `{ width: number, height: number }` | `{ width: 1080, height: 1080 }`                                   | 相机分辨率                                                               |
| `zxingOptions`| `ReaderOptions`                     | `{ tryHarder: true, formats: ['QRCode'], maxNumberOfSymbols: 1 }` | zxing-wasm 读取器选项                                                    |
| `zxingWASMUrl`| `string`                            | `undefined`                                                      | 自定义 WebAssembly URL；不传时使用 zxing-wasm 内置 CDN                    |
| `marker`      | `boolean`                           | `true`                                                           | 是否显示扫描结果标记                                                     |
| `frame`       | `boolean`                           | `true`                                                           | 是否显示扫描框                                                           |
| `fps`         | `number`                            | `30`                                                             | 扫描帧率                                                                 |
| `zoom`        | `number`                            | `1`                                                              | 初始缩放级别                                                             |
| `trick`       | `boolean`                           | `true`                                                           | 是否使用旋转技巧进行优化扫描                     |
| `onScan`      | `(result: string) => void`          | `noop`                                                           | 扫描到结果时的回调函数                                                   |
| `onError`     | `(error: Error) => void`            | `noop`                                                           | 发生错误时的回调函数                                                     |

### 方法

#### ready()

下载、编译并初始化 zxing-wasm 模块，返回的 Promise 会被缓存。通常无需手动调用，因为 `startScan()` 会自动等待 ready。

```ts
ready(): Promise<void>
```

#### startScan()

开始扫描过程。

```ts
async startScan(): Promise<void>
```

等待 zxing-wasm ready，初始化相机、设置画布并开始扫描循环。

#### stopScan()

停止扫描过程。

```ts
stopScan(): void
```

停止相机和扫描循环。

#### zoomIn(step?)

放大相机视图。

```ts
zoomIn(step: number = 0.1): void
```

| 参数   | 类型     | 默认值 | 描述           |
| ------ | -------- | ------ | -------------- |
| `step` | `number` | `0.1`  | 放大的步进值   |

#### zoomOut(step?)

缩小相机视图。

```ts
zoomOut(step: number = 0.1): void
```

| 参数   | 类型     | 默认值 | 描述           |
| ------ | -------- | ------ | -------------- |
| `step` | `number` | `0.1`  | 缩小的步进值   |

#### zoomTo(zoom)

将相机视图缩放到特定级别。

```ts
zoomTo(zoom: number): void
```

| 参数   | 类型     | 描述           |
| ------ | -------- | -------------- |
| `zoom` | `number` | 要设置的缩放级别 |

## 许可证

[MIT](LICENSE)

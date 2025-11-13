type CRTTeardown = () => void;

let overlayRoot: HTMLDivElement | null = null;
let scanlineLayer: HTMLDivElement | null = null;
let noiseCanvas: HTMLCanvasElement | null = null;
let noiseContext: CanvasRenderingContext2D | null = null;
let noiseImageData: ImageData | null = null;
let noiseBuffer: Uint8ClampedArray | null = null;
let animationFrameId: number | null = null;
let resizeListener: (() => void) | null = null;
let teardown: CRTTeardown | null = null;

const CRT_ROOT_ID = "crt-overlay-root";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

function getResponsiveScanlineSize(): number {
  const minScanlineSize = 2;
  const maxScanlineSize = 5;
  const minWidth = 320;
  const maxWidth = 1200;

  if (typeof window === "undefined") return maxScanlineSize;

  const screenWidth = Math.min(window.innerWidth, window.innerHeight * 1.5);
  const scanlineSize =
    minScanlineSize +
    (maxScanlineSize - minScanlineSize) *
      Math.min(
        1,
        Math.max(0, (screenWidth - minWidth) / (maxWidth - minWidth)),
      );

  return Math.round(scanlineSize);
}

function ensureNoiseData(width: number, height: number) {
  if (!noiseContext || !noiseCanvas) return;

  noiseCanvas.width = width;
  noiseCanvas.height = height;
  noiseCanvas.style.width = "100%";
  noiseCanvas.style.height = "100%";

  noiseImageData = noiseContext.createImageData(width, height);
  noiseBuffer = noiseImageData.data;
}

function resizeNoiseCanvas() {
  if (!noiseCanvas || typeof window === "undefined") return;

  const dpr = window.devicePixelRatio || 1;
  const scale = dpr > 1 ? 0.65 : 1;
  const width = Math.max(320, Math.floor(window.innerWidth * scale));
  const height = Math.max(240, Math.floor(window.innerHeight * scale));

  ensureNoiseData(width, height);
}

function renderNoiseFrame() {
  if (!noiseContext || !noiseImageData || !noiseBuffer) return;

  for (let i = 0; i < noiseBuffer.length; i += 4) {
    const value = Math.random() * 255;
    noiseBuffer[i] = value;
    noiseBuffer[i + 1] = value;
    noiseBuffer[i + 2] = value;
    noiseBuffer[i + 3] = 35 + Math.random() * 30;
  }

  noiseContext.putImageData(noiseImageData, 0, 0);

  if (prefersReducedMotion?.matches) return;

  animationFrameId = window.requestAnimationFrame(renderNoiseFrame);
}

function updateScanlines() {
  if (!scanlineLayer) return;
  const scanlineSize = getResponsiveScanlineSize();
  scanlineLayer.style.backgroundSize = `100% ${scanlineSize}px`;
}

function stopAnimation() {
  if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function cleanup() {
  stopAnimation();

  if (resizeListener) {
    window.removeEventListener("resize", resizeListener);
    resizeListener = null;
  }

  overlayRoot?.remove();
  overlayRoot = null;
  scanlineLayer = null;
  noiseCanvas = null;
  noiseContext = null;
  noiseImageData = null;
  noiseBuffer = null;

  document.body.classList.remove("crt-ready");
  teardown = null;
}

function createOverlayLayers() {
  if (overlayRoot) return;

  overlayRoot = document.createElement("div");
  overlayRoot.id = CRT_ROOT_ID;
  overlayRoot.className = "crt-effect-root";
  overlayRoot.setAttribute("aria-hidden", "true");

  scanlineLayer = document.createElement("div");
  scanlineLayer.className = "crt-overlay crt-overlay--scanlines";
  overlayRoot.appendChild(scanlineLayer);

  const glowLayer = document.createElement("div");
  glowLayer.className = "crt-overlay crt-overlay--glow";
  overlayRoot.appendChild(glowLayer);

  noiseCanvas = document.createElement("canvas");
  noiseCanvas.className = "crt-noise-layer";
  noiseContext = noiseCanvas.getContext("2d", {
    willReadFrequently: true,
  });

  overlayRoot.appendChild(noiseCanvas);

  const vignetteLayer = document.createElement("div");
  vignetteLayer.className = "crt-overlay crt-overlay--vignette";
  overlayRoot.appendChild(vignetteLayer);

  document.body.appendChild(overlayRoot);
}

export default function initCRTShader(): CRTTeardown | null {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }

  if (teardown) {
    return teardown;
  }

  document.body.classList.add("crt-ready");

  createOverlayLayers();

  if (!noiseCanvas) {
    noiseCanvas = document.createElement("canvas");
    noiseCanvas.className = "crt-noise-layer";
    overlayRoot?.appendChild(noiseCanvas);
  }

  noiseContext = noiseCanvas.getContext("2d", {
    willReadFrequently: true,
  });

  resizeNoiseCanvas();
  updateScanlines();
  renderNoiseFrame();

  resizeListener = () => {
    resizeNoiseCanvas();
    updateScanlines();
    stopAnimation();
    renderNoiseFrame();
  };

  window.addEventListener("resize", resizeListener, { passive: true });

  teardown = cleanup;
  return teardown;
}

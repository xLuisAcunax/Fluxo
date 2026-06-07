# Fluxo Engine

A lightweight, high-performance, and buttery-smooth TypeScript animation library. Coordinate tweening, timelines, scroll binds, staggers, and vector drawing with 0% idle CPU and zero scroll lag.

👉 **[Explore the Live Interactive Showcase & Documentation](https://luis-acuna.dev/fluxo/examples/index.html)** 🚀

Fluxo runs all animations through a centralized frame-rate independent Ticker loop using `requestAnimationFrame`, preventing layout thrashing and minimizing browser paint overhead.

---

## Features

- **Centralized Ticker**: Unified animation loop preventing layout thrashing and synchronizing all elements.
- **Multi-Format Distribution**: Compiles to native ES Modules (ESM), CommonJS (CJS), and IIFE (browser global script).
- **Core Tweens**: `.to()`, `.from()`, and `.fromTo()` interpolators with support for custom CSS units and optimized 3D transforms.
- **Timelines**: Complex sequencing with relative position offsets (`+=`, `-=`, `<`) and timeline-wide flow controls.
- **Scroll Binds**: Sync animations to scroll progress (`scrub: true`) or trigger them when entering customizable viewport thresholds.
- **Interactive Staggers**: Sequenced animations with stagger delays on element collections.
- **Text & SVG Helpers**: Out-of-the-box `splitText` (for typography reveals) and `drawSVG` (for outline path tracing).
- **Looping & Controls**: Flow management via `.play()`, `.pause()`, and `.reverse()`, coupled with `.repeat` and `.alternate` bounce loops.

---

## Installation

Install the library using your package manager of choice:

```bash
# npm
npm install fluxo-animation

# pnpm
pnpm add fluxo-animation

# yarn
yarn add fluxo-animation
```

### CDN Global Import

For direct HTML usage without a bundler, import Fluxo from jsDelivr or unpkg:

```html
<!-- Via jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/fluxo-animation@latest/dist/index.global.js"></script>

<!-- Via unpkg -->
<script src="https://unpkg.com/fluxo-animation@latest/dist/index.global.js"></script>
```

---

## Quick Start

### 1. Modern ESM Import (Vite, Next.js, Rollup, webpack)

```javascript
import { fluxo } from "fluxo-animation";

// Animate a box element 200px on X and rotate 180 degrees
fluxo.to(".box", {
  x: 200,
  rotation: 180,
  duration: 1.2,
  ease: "medium.out",
});
```

### 2. Direct Browser HTML Script (CDN)

When loaded via a CDN, the library exposes a global `fluxo` object on the `window` scope:

```html
<div class="box" style="width: 80px; height: 80px; background: #8b5cf6;"></div>

<script src="https://cdn.jsdelivr.net/npm/fluxo-animation@latest/dist/index.global.js"></script>
<script>
  fluxo.to(".box", {
    x: 300,
    rotation: 360,
    duration: 1.5,
    repeat: -1,
    alternate: true,
    ease: "slow.inOut",
  });
</script>
```

---

## Advanced Usage

### Timelines

Easily sequence animations using chronological timelines with overlap controls:

```javascript
import { fluxo } from "fluxo-animation";

const tl = fluxo.timeline({ repeat: -1, alternate: true });

tl.to(".element-1", { x: 100, duration: 1.0 })
  .to(".element-2", { y: 50, duration: 0.8 }, "-=0.4") // Overlap by 0.4 seconds
  .to(".element-3", { scale: 1.2, duration: 0.6 }, "<"); // Sync start with previous tween
```

### Scroll Animations

Bind animation progression directly to your scrollbar:

```javascript
import { fluxo } from "fluxo-animation";

fluxo.fromTo(
  ".scroll-box",
  { scale: 0.5, opacity: 0.1 },
  {
    scale: 1.3,
    opacity: 1,
    scroll: {
      trigger: ".scroll-box",
      start: "top 85%",
      end: "bottom 20%",
      scrub: true,
    },
  },
);
```

---

## Development

If you want to contribute or modify Fluxo:

1. Clone the repository and install dev dependencies:
   ```bash
   npm install
   ```
2. Build the distribution assets:
   ```bash
   npm run build
   ```
3. Run in watch mode during development:
   ```bash
   npm run watch
   ```

---

## Contributing

We welcome contributions of all kinds! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on how to report issues, suggest features, or submit pull requests.

---

## License

MIT License. Free for both personal and commercial use.

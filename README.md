# Fluxo Engine

A lightweight, high-performance, and buttery-smooth TypeScript animation library. Coordinate tweening, timelines, scroll binds, staggers, and vector drawing with 0% idle CPU and zero scroll lag.

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

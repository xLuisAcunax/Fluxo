# Fluxo

A lightweight, high-performance, and buttery-smooth animation library built in TypeScript. Designed to be developer-friendly, clean, and extremely efficient.

Fluxo coordinates all animations through a centralized frame-rate independent Ticker loop using `requestAnimationFrame`, ensuring zero scroll lag and 0% CPU consumption when idle.

---

## Features

- **Centralized Ticker**: Unified animation loop preventing layout thrashing and synchronizing all elements perfectly.
- **Tweening Core**: Powerful `.to()`, `.from()`, and `.fromTo()` interpolators with support for DOM styles, custom units, and optimized 3D transforms.
- **Physics Easings**: Curated accelerating and decelerating curves (`slow`, `medium`, `fast`, `veryFast` in `.in`, `.out`, and `.inOut` flavors).
- **Timelines**: Advanced chaining and sequencing with relative position offsets (`+=`, `-=`, `<`) and timeline-wide flow controls.
- **Multiple Targets & Staggers**: Sequenced animations with simple stagger delays on element collections.
- **ScrollTrigger**: Bind animations to scroll progress (`scrub: true`) or trigger them when entering customizable viewport thresholds (cached limits on resize for 60fps scrolling).
- **Looping & Controls**: Interactive `.play()`, `.pause()`, and `.reverse()` playback paired with `.repeat` and `.yoyo` bounce loops.

---

## Installation & Usage

Fluxo compiles directly into native ES Modules (ESM) compatible with modern browsers.

### HTML Script Import

Create your markup and import Fluxo directly from your output folder:

```html
<div id="box" style="width: 80px; height: 80px; background: purple;"></div>

<script type="module">
  import { fluxo } from "./dist/index.js";

  // Animate the box to 300px on X and rotate 360 degrees
  fluxo.to("#box", {
    x: 300,
    rotation: 360,
    duration: 1.5,
    ease: "medium.out",
  });
</script>
```

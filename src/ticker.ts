type TickerCallback = (time: number, dt: number) => void;

class Ticker {
  private callbacks: Set<TickerCallback> = new Set();
  private rafId: number | null = null;
  private lastTime: number = 0;
  private time: number = 0;

  constructor() {
    this.tick = this.tick.bind(this);
  }

  add(cb: TickerCallback) {
    this.callbacks.add(cb);
    if (this.rafId === null) {
      this.start();
    }
  }

  remove(cb: TickerCallback) {
    this.callbacks.delete(cb);
    if (this.callbacks.size === 0 && this.rafId !== null) {
      this.stop();
    }
  }

  private start() {
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick(now: number) {
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    this.time += dt;

    const activeCallbacks = Array.from(this.callbacks);
    for (const cb of activeCallbacks) {
      cb(this.time, dt);
    }

    if (this.callbacks.size > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.rafId = null;
    }
  }
}

export const ticker = new Ticker();

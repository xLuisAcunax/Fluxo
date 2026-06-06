class Ticker {
    callbacks = new Set();
    rafId = null;
    lastTime = 0;
    time = 0;
    constructor() {
        this.tick = this.tick.bind(this);
    }
    add(cb) {
        this.callbacks.add(cb);
        if (this.rafId === null) {
            this.start();
        }
    }
    remove(cb) {
        this.callbacks.delete(cb);
        if (this.callbacks.size === 0 && this.rafId !== null) {
            this.stop();
        }
    }
    start() {
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.tick);
    }
    stop() {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }
    tick(now) {
        const dt = (now - this.lastTime) / 1000;
        this.lastTime = now;
        this.time += dt;
        const activeCallbacks = Array.from(this.callbacks);
        for (const cb of activeCallbacks) {
            cb(this.time, dt);
        }
        if (this.callbacks.size > 0) {
            this.rafId = requestAnimationFrame(this.tick);
        }
        else {
            this.rafId = null;
        }
    }
}
export const ticker = new Ticker();
//# sourceMappingURL=ticker.js.map
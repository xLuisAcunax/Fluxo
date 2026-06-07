import { Tween } from "./tween.js";
import { ticker } from "./ticker.js";
export class Timeline {
    children = [];
    vars;
    duration = 0;
    delay;
    startTime = 0;
    started = false;
    completed = false;
    isPlaying = false;
    constructor(vars = {}) {
        this.vars = vars;
        this.delay = vars.delay !== undefined ? vars.delay : 0;
        this.update = this.update.bind(this);
        if (!vars.paused) {
            this.play();
        }
    }
    to(target, vars, position) {
        const tween = new Tween(target, { ...vars, autoPlay: false });
        this.add(tween, position);
        return this;
    }
    from(target, vars, position) {
        const tween = new Tween(target, { ...vars, autoPlay: false }, undefined, true);
        this.add(tween, position);
        return this;
    }
    fromTo(target, fromVars, toVars, position) {
        const tween = new Tween(target, { ...toVars, autoPlay: false }, fromVars);
        this.add(tween, position);
        return this;
    }
    play() {
        if (this.isPlaying)
            return;
        if (this.completed) {
            this.completed = false;
            this.startTime = 0;
        }
        this.isPlaying = true;
        ticker.add(this.update);
    }
    pause() {
        if (!this.isPlaying)
            return;
        this.isPlaying = false;
        ticker.remove(this.update);
        this.startTime = 0;
    }
    kill() {
        this.isPlaying = false;
        ticker.remove(this.update);
        for (const child of this.children) {
            child.tween.kill();
        }
    }
    add(tween, position) {
        let startTime = this.duration;
        const prevChild = this.children[this.children.length - 1];
        if (position !== undefined) {
            if (typeof position === "number") {
                startTime = position;
            }
            else if (typeof position === "string") {
                if (position.startsWith("+=")) {
                    const val = parseFloat(position.slice(2));
                    startTime = this.duration + (isNaN(val) ? 0 : val);
                }
                else if (position.startsWith("-=")) {
                    const val = parseFloat(position.slice(2));
                    startTime = this.duration - (isNaN(val) ? 0 : val);
                }
                else if (position === "<") {
                    startTime = prevChild ? prevChild.startTime : 0;
                }
                else if (position.startsWith("<")) {
                    const offsetStr = position.slice(1);
                    const baseTime = prevChild ? prevChild.startTime : 0;
                    if (offsetStr.startsWith("+=")) {
                        const val = parseFloat(offsetStr.slice(2));
                        startTime = baseTime + (isNaN(val) ? 0 : val);
                    }
                    else if (offsetStr.startsWith("-=")) {
                        const val = parseFloat(offsetStr.slice(2));
                        startTime = baseTime - (isNaN(val) ? 0 : val);
                    }
                }
            }
        }
        const tweenDuration = tween.duration + tween.delay;
        const endTime = startTime + tweenDuration;
        this.children.push({
            tween,
            startTime,
            endTime,
        });
        this.duration = Math.max(this.duration, endTime);
    }
    render(time) {
        if (this.completed && time >= this.duration + this.delay)
            return;
        if (time < this.delay) {
            return;
        }
        const activeTime = time - this.delay;
        if (!this.started) {
            this.started = true;
            if (this.vars.onStart) {
                this.vars.onStart();
            }
        }
        for (const child of this.children) {
            const localTime = activeTime - child.startTime;
            child.tween.render(localTime);
        }
        if (this.vars.onUpdate) {
            this.vars.onUpdate();
        }
        if (activeTime >= this.duration) {
            this.completed = true;
            this.isPlaying = false;
            ticker.remove(this.update);
            if (this.vars.onComplete) {
                this.vars.onComplete();
            }
        }
    }
    update(totalTime, _dt) {
        if (this.startTime === 0) {
            this.startTime = totalTime;
        }
        const elapsed = totalTime - this.startTime;
        this.render(elapsed);
    }
}
//# sourceMappingURL=timeline.js.map
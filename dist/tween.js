import { ticker } from "./ticker.js";
import { getEasing } from "./easings.js";
const TRANSFORM_KEYS = new Set(["x", "y", "rotation", "scale"]);
const RESERVED_KEYS = new Set([
    "duration",
    "delay",
    "ease",
    "onStart",
    "onUpdate",
    "onComplete",
]);
export class Tween {
    target;
    vars;
    duration;
    delay;
    ease;
    startTime = 0;
    started = false;
    completed = false;
    propTweens = [];
    constructor(target, vars) {
        if (typeof target === "string" && typeof document !== "undefined") {
            this.target = document.querySelector(target);
        }
        else {
            this.target = target;
        }
        this.vars = vars;
        this.duration = vars.duration !== undefined ? vars.duration : 0.5;
        this.delay = vars.delay !== undefined ? vars.delay : 0;
        this.ease = getEasing(vars.ease);
        this.update = this.update.bind(this);
        if (this.target) {
            ticker.add(this.update);
        }
    }
    initProperties() {
        this.propTweens = [];
        const isDOM = this.target instanceof HTMLElement ||
            (typeof SVGElement !== "undefined" && this.target instanceof SVGElement);
        let transformState = null;
        if (isDOM) {
            transformState = this.getTransformState(this.target);
        }
        for (const key in this.vars) {
            if (RESERVED_KEYS.has(key))
                continue;
            const endValueRaw = this.vars[key];
            const parsedEnd = this.parseValue(endValueRaw);
            let startValue = 0;
            let unit = parsedEnd.unit;
            const isTransform = isDOM && TRANSFORM_KEYS.has(key);
            if (isTransform && transformState) {
                startValue = transformState[key];
            }
            else if (isDOM) {
                const computedStyle = window.getComputedStyle(this.target);
                const styleVal = computedStyle[key] || this.target.style[key];
                const parsedStart = this.parseValue(styleVal);
                startValue = parsedStart.value;
                if (unit === "" && parsedStart.unit !== "") {
                    unit = parsedStart.unit;
                }
            }
            else {
                startValue =
                    typeof this.target[key] === "number" ? this.target[key] : 0;
            }
            this.propTweens.push({
                key,
                isTransform,
                start: startValue,
                end: parsedEnd.value,
                unit,
            });
        }
    }
    parseValue(val) {
        if (typeof val === "number") {
            return { value: val, unit: "" };
        }
        const num = parseFloat(val);
        if (isNaN(num)) {
            return { value: 0, unit: "" };
        }
        const unit = String(val).replace(/^[-\d.]+/, "");
        return { value: num, unit };
    }
    getTransformState(el) {
        if (!el._fluxoTransform) {
            el._fluxoTransform = { x: 0, y: 0, rotation: 0, scale: 1 };
        }
        return el._fluxoTransform;
    }
    applyTransform(el, state) {
        el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0px) rotate(${state.rotation}deg) scale(${state.scale})`;
    }
    update(totalTime, _dt) {
        if (this.completed)
            return;
        if (this.startTime === 0) {
            this.startTime = totalTime;
        }
        const timeSinceStart = totalTime - this.startTime;
        if (timeSinceStart < this.delay) {
            return;
        }
        if (!this.started) {
            this.started = true;
            this.initProperties();
            if (this.vars.onStart) {
                this.vars.onStart();
            }
        }
        const activeTime = timeSinceStart - this.delay;
        let progress = this.duration > 0 ? activeTime / this.duration : 1;
        if (progress >= 1) {
            progress = 1;
            this.completed = true;
        }
        const easedProgress = this.ease(progress);
        let hasTransform = false;
        const transformState = this.target instanceof HTMLElement ||
            (typeof SVGElement !== "undefined" && this.target instanceof SVGElement)
            ? this.getTransformState(this.target)
            : null;
        for (const pt of this.propTweens) {
            const currentVal = pt.start + (pt.end - pt.start) * easedProgress;
            if (pt.isTransform && transformState) {
                transformState[pt.key] = currentVal;
                hasTransform = true;
            }
            else if (this.target.style !== undefined) {
                this.target.style[pt.key] = currentVal + pt.unit;
            }
            else {
                this.target[pt.key] = currentVal;
            }
        }
        if (hasTransform && transformState) {
            this.applyTransform(this.target, transformState);
        }
        if (this.vars.onUpdate) {
            this.vars.onUpdate();
        }
        if (this.completed) {
            ticker.remove(this.update);
            if (this.vars.onComplete) {
                this.vars.onComplete();
            }
        }
    }
    kill() {
        ticker.remove(this.update);
    }
}
//# sourceMappingURL=tween.js.map
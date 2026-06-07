import { ticker } from "./ticker.js";
import { getEasing } from "./easings.js";
import { resolveTargets } from "./utils.js";
const TRANSFORM_KEYS = new Set(["x", "y", "rotation", "scale"]);
const RESERVED_KEYS = new Set([
    "duration",
    "delay",
    "ease",
    "autoPlay",
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
    fromVars;
    isFrom = false;
    playhead = 0;
    reversed = false;
    started = false;
    completed = false;
    propTweens = [];
    constructor(target, vars, fromVars, isFrom = false) {
        const resolved = resolveTargets(target);
        this.target = resolved.length > 0 ? resolved[0] : null;
        this.vars = vars;
        this.fromVars = fromVars;
        this.isFrom = isFrom;
        this.duration = vars.duration !== undefined ? vars.duration : 0.5;
        this.delay = vars.delay !== undefined ? vars.delay : 0;
        this.ease = getEasing(vars.ease);
        this.update = this.update.bind(this);
        const autoPlay = vars.autoPlay !== false;
        if (this.target) {
            if (this.isFrom || this.fromVars) {
                this.initProperties();
                this.started = true;
            }
            if (autoPlay) {
                ticker.add(this.update);
            }
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
            let currentVal = 0;
            let unit = parsedEnd.unit;
            const isTransform = isDOM && TRANSFORM_KEYS.has(key);
            if (isTransform && transformState) {
                currentVal = transformState[key];
            }
            else if (isDOM) {
                const computedStyle = window.getComputedStyle(this.target);
                const styleVal = computedStyle[key] || this.target.style[key];
                const parsedStart = this.parseValue(styleVal);
                currentVal = parsedStart.value;
                if (unit === "" && parsedStart.unit !== "") {
                    unit = parsedStart.unit;
                }
            }
            else {
                currentVal =
                    typeof this.target[key] === "number" ? this.target[key] : 0;
            }
            let startValue = 0;
            let endValue = 0;
            if (this.fromVars) {
                const parsedFrom = this.parseValue(this.fromVars[key]);
                startValue = parsedFrom.value;
                endValue = parsedEnd.value;
                unit = parsedEnd.unit || parsedFrom.unit || unit;
            }
            else if (this.isFrom) {
                startValue = parsedEnd.value;
                endValue = currentVal;
            }
            else {
                startValue = currentVal;
                endValue = parsedEnd.value;
            }
            this.propTweens.push({
                key,
                isTransform,
                start: startValue,
                end: endValue,
                unit,
            });
            if (this.isFrom || this.fromVars) {
                if (isTransform && transformState) {
                    transformState[key] = startValue;
                }
                else if (isDOM) {
                    this.target.style[key] = startValue + unit;
                }
                else {
                    this.target[key] = startValue;
                }
            }
        }
        if ((this.isFrom || this.fromVars) && transformState && isDOM) {
            this.applyTransform(this.target, transformState);
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
    play() {
        this.reversed = false;
        this.completed = false;
        const maxTime = this.duration + this.delay;
        if (this.playhead >= maxTime) {
            this.playhead = 0;
        }
        ticker.add(this.update);
    }
    reverse() {
        this.reversed = true;
        this.completed = false;
        if (this.playhead <= 0) {
            this.playhead = this.duration + this.delay;
        }
        ticker.add(this.update);
    }
    pause() {
        ticker.remove(this.update);
    }
    render(time) {
        let progress = 0;
        if (time >= this.delay) {
            const activeTime = time - this.delay;
            progress = this.duration > 0 ? activeTime / this.duration : 1;
            if (progress > 1)
                progress = 1;
        }
        if (!this.started && time >= this.delay) {
            this.started = true;
            this.initProperties();
            if (this.vars.onStart) {
                this.vars.onStart();
            }
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
    }
    update(totalTime, dt) {
        if (this.completed)
            return;
        this.playhead += this.reversed ? -dt : dt;
        const maxTime = this.duration + this.delay;
        if (this.reversed) {
            if (this.playhead <= 0) {
                this.playhead = 0;
                this.completed = true;
            }
        }
        else {
            if (this.playhead >= maxTime) {
                this.playhead = maxTime;
                this.completed = true;
            }
        }
        this.render(this.playhead);
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
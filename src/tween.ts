import { ticker } from "./ticker.js";
import { getEasing, EasingFunction, EasingName } from "./easings.js";
import { resolveTargets } from "./utils.js";

export interface TweenVars {
  duration?: number;
  delay?: number;
  ease?: EasingName | EasingFunction;
  autoPlay?: boolean;
  repeat?: number;
  yoyo?: boolean;
  onStart?: () => void;
  onUpdate?: () => void;
  onComplete?: () => void;
  onRepeat?: () => void;
  [key: string]: any;
}

interface PropTween {
  key: string;
  isTransform: boolean;
  start: number;
  end: number;
  unit: string;
}

interface TransformState {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const TRANSFORM_KEYS = new Set(["x", "y", "rotation", "scale"]);

const RESERVED_KEYS = new Set([
  "duration",
  "delay",
  "ease",
  "autoPlay",
  "repeat",
  "yoyo",
  "onStart",
  "onUpdate",
  "onComplete",
  "onRepeat",
]);

export class Tween {
  public target: any;
  public vars: TweenVars;
  public duration: number;
  public delay: number;
  private ease: EasingFunction;

  private fromVars?: TweenVars;
  private isFrom: boolean = false;

  private playhead: number = 0;
  private reversed: boolean = false;
  private started: boolean = false;
  private completed: boolean = false;
  private repeatCount: number = 0;
  private propTweens: PropTween[] = [];

  constructor(
    target: any,
    vars: TweenVars,
    fromVars?: TweenVars,
    isFrom: boolean = false,
  ) {
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

  private initProperties() {
    this.propTweens = [];
    const isDOM =
      this.target instanceof HTMLElement ||
      (typeof SVGElement !== "undefined" && this.target instanceof SVGElement);

    let transformState: TransformState | null = null;
    if (isDOM) {
      transformState = this.getTransformState(this.target);
    }

    for (const key in this.vars) {
      if (RESERVED_KEYS.has(key)) continue;

      const endValueRaw = this.vars[key];
      const parsedEnd = this.parseValue(endValueRaw);

      let currentVal = 0;
      let unit = parsedEnd.unit;

      const isTransform = isDOM && TRANSFORM_KEYS.has(key);

      if (isTransform && transformState) {
        currentVal = transformState[key as keyof TransformState];
      } else if (isDOM) {
        const computedStyle = window.getComputedStyle(this.target);
        const styleVal =
          computedStyle[key as any] || this.target.style[key as any];
        const parsedStart = this.parseValue(styleVal);
        currentVal = parsedStart.value;
        if (unit === "" && parsedStart.unit !== "") {
          unit = parsedStart.unit;
        }
      } else {
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
      } else if (this.isFrom) {
        startValue = parsedEnd.value;
        endValue = currentVal;
      } else {
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
          transformState[key as keyof TransformState] = startValue;
        } else if (isDOM) {
          this.target.style[key as any] = startValue + unit;
        } else {
          this.target[key] = startValue;
        }
      }
    }

    if ((this.isFrom || this.fromVars) && transformState && isDOM) {
      this.applyTransform(this.target, transformState);
    }
  }

  private parseValue(val: any): { value: number; unit: string } {
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

  private getTransformState(el: any): TransformState {
    if (!el._fluxoTransform) {
      el._fluxoTransform = { x: 0, y: 0, rotation: 0, scale: 1 };
    }
    return el._fluxoTransform;
  }

  private applyTransform(el: any, state: TransformState) {
    el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0px) rotate(${state.rotation}deg) scale(${state.scale})`;
  }

  public play() {
    this.reversed = false;
    this.completed = false;
    const maxTime = this.duration + this.delay;
    if (this.playhead >= maxTime) {
      this.playhead = 0;
      this.repeatCount = 0;
    }
    ticker.add(this.update);
  }

  public reverse() {
    this.reversed = true;
    this.completed = false;
    if (this.playhead <= 0) {
      this.playhead = this.duration + this.delay;
      this.repeatCount = 0;
    }
    ticker.add(this.update);
  }

  public pause() {
    ticker.remove(this.update);
  }

  public render(time: number) {
    let progress = 0;

    if (time >= this.delay) {
      const activeTime = time - this.delay;
      progress = this.duration > 0 ? activeTime / this.duration : 1;
      if (progress > 1) progress = 1;
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
    const transformState =
      this.target instanceof HTMLElement ||
      (typeof SVGElement !== "undefined" && this.target instanceof SVGElement)
        ? this.getTransformState(this.target)
        : null;

    for (const pt of this.propTweens) {
      const currentVal = pt.start + (pt.end - pt.start) * easedProgress;

      if (pt.isTransform && transformState) {
        transformState[pt.key as keyof TransformState] = currentVal;
        hasTransform = true;
      } else if (this.target.style !== undefined) {
        this.target.style[pt.key as any] = currentVal + pt.unit;
      } else {
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

  private update(totalTime: number, dt: number) {
    if (this.completed) return;

    this.playhead += this.reversed ? -dt : dt;

    const maxTime = this.duration + this.delay;
    const repeatOption = this.vars.repeat !== undefined ? this.vars.repeat : 0;
    const yoyoOption = this.vars.yoyo === true;

    if (this.reversed) {
      if (this.playhead <= this.delay) {
        if (repeatOption === -1 || this.repeatCount < repeatOption) {
          this.repeatCount++;
          if (this.vars.onRepeat) {
            this.vars.onRepeat();
          }

          if (yoyoOption) {
            this.reversed = false;
            this.playhead = this.delay;
          } else {
            this.playhead = maxTime;
          }
        } else {
          this.playhead = 0;
          this.completed = true;
        }
      }
    } else {
      if (this.playhead >= maxTime) {
        if (repeatOption === -1 || this.repeatCount < repeatOption) {
          this.repeatCount++;
          if (this.vars.onRepeat) {
            this.vars.onRepeat();
          }

          if (yoyoOption) {
            this.reversed = true;
            this.playhead = maxTime;
          } else {
            this.playhead = this.delay;
          }
        } else {
          this.playhead = maxTime;
          this.completed = true;
        }
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

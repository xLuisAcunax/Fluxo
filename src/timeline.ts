import { Tween, TweenVars } from "./tween.js";
import { ticker } from "./ticker.js";
import { resolveTargets } from "./utils.js";

interface TimelineChild {
  tween: Tween;
  startTime: number;
  endTime: number;
}

export interface TimelineVars {
  delay?: number;
  paused?: boolean;
  onStart?: () => void;
  onUpdate?: () => void;
  onComplete?: () => void;
}

export class Timeline {
  private children: TimelineChild[] = [];
  private vars: TimelineVars;
  private duration: number = 0;
  private delay: number;

  private playhead: number = 0;
  private reversed: boolean = false;
  private started: boolean = false;
  private completed: boolean = false;
  private isPlaying: boolean = false;

  constructor(vars: TimelineVars = {}) {
    this.vars = vars;
    this.delay = vars.delay !== undefined ? vars.delay : 0;

    this.update = this.update.bind(this);

    if (!vars.paused) {
      this.play();
    }
  }

  to(target: any, vars: TweenVars, position?: number | string): this {
    const targets = resolveTargets(target);
    const baseTime = this.parsePosition(position);
    const stagger = vars.stagger || 0;

    const tweenVars = { ...vars };
    delete tweenVars.stagger;

    targets.forEach((t, i) => {
      const tween = new Tween(t, { ...tweenVars, autoPlay: false });
      this.addTween(tween, baseTime + i * stagger);
    });

    return this;
  }

  from(target: any, vars: TweenVars, position?: number | string): this {
    const targets = resolveTargets(target);
    const baseTime = this.parsePosition(position);
    const stagger = vars.stagger || 0;

    const tweenVars = { ...vars };
    delete tweenVars.stagger;

    targets.forEach((t, i) => {
      const tween = new Tween(
        t,
        { ...tweenVars, autoPlay: false },
        undefined,
        true,
      );
      this.addTween(tween, baseTime + i * stagger);
    });

    return this;
  }

  fromTo(
    target: any,
    fromVars: TweenVars,
    toVars: TweenVars,
    position?: number | string,
  ): this {
    const targets = resolveTargets(target);
    const baseTime = this.parsePosition(position);
    const stagger = toVars.stagger || 0;

    const tweenVars = { ...toVars };
    delete tweenVars.stagger;

    targets.forEach((t, i) => {
      const tween = new Tween(t, { ...tweenVars, autoPlay: false }, fromVars);
      this.addTween(tween, baseTime + i * stagger);
    });

    return this;
  }

  play() {
    this.reversed = false;
    this.completed = false;
    const maxTime = this.duration + this.delay;
    if (this.playhead >= maxTime) {
      this.playhead = 0;
    }

    this.isPlaying = true;
    ticker.add(this.update);
  }

  reverse() {
    this.reversed = true;
    this.completed = false;
    if (this.playhead <= 0) {
      this.playhead = this.duration + this.delay;
    }

    this.isPlaying = true;
    ticker.add(this.update);
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    ticker.remove(this.update);
  }

  kill() {
    this.isPlaying = false;
    ticker.remove(this.update);
    for (const child of this.children) {
      child.tween.kill();
    }
  }

  private parsePosition(position?: number | string): number {
    let startTime = this.duration;
    const prevChild = this.children[this.children.length - 1];

    if (position !== undefined) {
      if (typeof position === "number") {
        startTime = position;
      } else if (typeof position === "string") {
        if (position.startsWith("+=")) {
          const val = parseFloat(position.slice(2));
          startTime = this.duration + (isNaN(val) ? 0 : val);
        } else if (position.startsWith("-=")) {
          const val = parseFloat(position.slice(2));
          startTime = this.duration - (isNaN(val) ? 0 : val);
        } else if (position === "<") {
          startTime = prevChild ? prevChild.startTime : 0;
        } else if (position.startsWith("<")) {
          const offsetStr = position.slice(1);
          const baseTime = prevChild ? prevChild.startTime : 0;
          if (offsetStr.startsWith("+=")) {
            const val = parseFloat(offsetStr.slice(2));
            startTime = baseTime + (isNaN(val) ? 0 : val);
          } else if (offsetStr.startsWith("-=")) {
            const val = parseFloat(offsetStr.slice(2));
            startTime = baseTime - (isNaN(val) ? 0 : val);
          }
        }
      }
    }
    return startTime;
  }

  private addTween(tween: Tween, startTime: number) {
    const tweenDuration = tween.duration + tween.delay;
    const endTime = startTime + tweenDuration;

    this.children.push({
      tween,
      startTime,
      endTime,
    });

    this.duration = Math.max(this.duration, endTime);
  }

  public render(time: number) {
    let activeTime = 0;

    if (time >= this.delay) {
      activeTime = time - this.delay;
    }

    if (!this.started && time >= this.delay) {
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
  }

  private update(totalTime: number, dt: number) {
    if (this.completed) return;

    this.playhead += this.reversed ? -dt : dt;

    const maxTime = this.duration + this.delay;
    if (this.reversed) {
      if (this.playhead <= 0) {
        this.playhead = 0;
        this.completed = true;
      }
    } else {
      if (this.playhead >= maxTime) {
        this.playhead = maxTime;
        this.completed = true;
      }
    }

    this.render(this.playhead);

    if (this.completed) {
      this.isPlaying = false;
      ticker.remove(this.update);
      if (this.vars.onComplete) {
        this.vars.onComplete();
      }
    }
  }
}

import { Tween, TweenVars } from "./tween.js";
import { ticker } from "./ticker.js";

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

  private startTime: number = 0;
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
    const tween = new Tween(target, { ...vars, autoPlay: false });
    this.add(tween, position);
    return this;
  }

  from(target: any, vars: TweenVars, position?: number | string): this {
    const tween = new Tween(
      target,
      { ...vars, autoPlay: false },
      undefined,
      true,
    );
    this.add(tween, position);
    return this;
  }

  fromTo(
    target: any,
    fromVars: TweenVars,
    toVars: TweenVars,
    position?: number | string,
  ): this {
    const tween = new Tween(target, { ...toVars, autoPlay: false }, fromVars);
    this.add(tween, position);
    return this;
  }

  play() {
    if (this.isPlaying) return;

    if (this.completed) {
      this.completed = false;
      this.startTime = 0;
    }

    this.isPlaying = true;
    ticker.add(this.update);
  }

  pause() {
    if (!this.isPlaying) return;
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

  private add(tween: Tween, position?: number | string) {
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
    if (this.completed && time >= this.duration + this.delay) return;

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

  private update(totalTime: number, _dt: number) {
    if (this.startTime === 0) {
      this.startTime = totalTime;
    }

    const elapsed = totalTime - this.startTime;
    this.render(elapsed);
  }
}

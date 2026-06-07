import { Tween, TweenVars } from "./tween.js";
import { Timeline, TimelineVars } from "./timeline.js";
import { ScrollTrigger, ScrollTriggerVars } from "./scrollTrigger.js";
import { resolveTargets, splitText, drawSVG } from "./utils.js";
import {
  magnetic,
  tilt,
  explodeOnScroll,
  implodeOnScroll,
  revealText,
  scrollReveal,
} from "./effects.js";

export const fluxo = {
  /**
   * Creates an animation that goes FROM the current values of the target
   * TO the values defined in 'vars'. Supports multiple targets, stagger, and ScrollTrigger.
   */
  to(target: any, vars: TweenVars): Tween | Timeline {
    const targets = resolveTargets(target);
    const hasScrollTrigger = vars.scrollTrigger !== undefined;

    const varsWithAutoPlay = { ...vars };
    if (hasScrollTrigger) {
      varsWithAutoPlay.autoPlay = false;
    }

    let animation: Tween | Timeline;

    if (targets.length === 0) {
      animation = new Tween(null, varsWithAutoPlay);
    } else if (targets.length === 1) {
      animation = new Tween(targets[0], varsWithAutoPlay);
    } else {
      const tl = new Timeline({
        delay: varsWithAutoPlay.delay,
        onStart: varsWithAutoPlay.onStart,
        onUpdate: varsWithAutoPlay.onUpdate,
        onComplete: varsWithAutoPlay.onComplete,
        paused: true,
      });

      const stagger = varsWithAutoPlay.stagger || 0;

      const tweenVars = { ...varsWithAutoPlay };
      delete tweenVars.delay;
      delete tweenVars.onStart;
      delete tweenVars.onUpdate;
      delete tweenVars.onComplete;
      delete tweenVars.stagger;
      delete tweenVars.scrollTrigger;

      targets.forEach((t, i) => {
        tl.to(t, tweenVars, i * stagger);
      });

      if (!hasScrollTrigger) {
        tl.play();
      }

      animation = tl;
    }

    if (hasScrollTrigger && vars.scrollTrigger) {
      new ScrollTrigger(animation, vars.scrollTrigger);
    }

    return animation;
  },

  /**
   * Creates an animation that goes FROM the values defined in 'vars'
   * TO the current values of the target. Supports multiple targets, stagger, and ScrollTrigger.
   */
  from(target: any, vars: TweenVars): Tween | Timeline {
    const targets = resolveTargets(target);
    const hasScrollTrigger = vars.scrollTrigger !== undefined;

    const varsWithAutoPlay = { ...vars };
    if (hasScrollTrigger) {
      varsWithAutoPlay.autoPlay = false;
    }

    let animation: Tween | Timeline;

    if (targets.length === 0) {
      animation = new Tween(null, varsWithAutoPlay, undefined, true);
    } else if (targets.length === 1) {
      animation = new Tween(targets[0], varsWithAutoPlay, undefined, true);
    } else {
      const tl = new Timeline({
        delay: varsWithAutoPlay.delay,
        onStart: varsWithAutoPlay.onStart,
        onUpdate: varsWithAutoPlay.onUpdate,
        onComplete: varsWithAutoPlay.onComplete,
        paused: true,
      });

      const stagger = varsWithAutoPlay.stagger || 0;

      const tweenVars = { ...varsWithAutoPlay };
      delete tweenVars.delay;
      delete tweenVars.onStart;
      delete tweenVars.onUpdate;
      delete tweenVars.onComplete;
      delete tweenVars.stagger;
      delete tweenVars.scrollTrigger;

      targets.forEach((t, i) => {
        tl.from(t, tweenVars, i * stagger);
      });

      if (!hasScrollTrigger) {
        tl.play();
      }

      animation = tl;
    }

    if (hasScrollTrigger && vars.scrollTrigger) {
      new ScrollTrigger(animation, vars.scrollTrigger);
    }

    return animation;
  },

  /**
   * Creates an animation that goes FROM the values defined in 'fromVars'
   * TO the values defined in 'toVars'. Supports multiple targets, stagger, and ScrollTrigger.
   */
  fromTo(
    target: any,
    fromVars: TweenVars,
    toVars: TweenVars,
  ): Tween | Timeline {
    const targets = resolveTargets(target);
    const hasScrollTrigger = toVars.scrollTrigger !== undefined;

    const toVarsWithAutoPlay = { ...toVars };
    if (hasScrollTrigger) {
      toVarsWithAutoPlay.autoPlay = false;
    }

    let animation: Tween | Timeline;

    if (targets.length === 0) {
      animation = new Tween(null, toVarsWithAutoPlay, fromVars);
    } else if (targets.length === 1) {
      animation = new Tween(targets[0], toVarsWithAutoPlay, fromVars);
    } else {
      const tl = new Timeline({
        delay: toVarsWithAutoPlay.delay,
        onStart: toVarsWithAutoPlay.onStart,
        onUpdate: toVarsWithAutoPlay.onUpdate,
        onComplete: toVarsWithAutoPlay.onComplete,
        paused: true,
      });

      const stagger = toVarsWithAutoPlay.stagger || 0;

      const tweenVars = { ...toVarsWithAutoPlay };
      delete tweenVars.delay;
      delete tweenVars.onStart;
      delete tweenVars.onUpdate;
      delete tweenVars.onComplete;
      delete tweenVars.stagger;
      delete tweenVars.scrollTrigger;

      targets.forEach((t, i) => {
        tl.fromTo(t, fromVars, tweenVars, i * stagger);
      });

      if (!hasScrollTrigger) {
        tl.play();
      }

      animation = tl;
    }

    if (hasScrollTrigger && toVars.scrollTrigger) {
      new ScrollTrigger(animation, toVars.scrollTrigger);
    }

    return animation;
  },

  /**
   * Creates a new Timeline instance for sequencing multiple animations.
   */
  timeline(vars?: TimelineVars & { scrollTrigger?: any }): Timeline {
    const hasScrollTrigger = vars?.scrollTrigger !== undefined;
    const timelineVars = { ...vars };

    if (hasScrollTrigger) {
      timelineVars.paused = true;
    }

    const tl = new Timeline(timelineVars);

    if (hasScrollTrigger && vars?.scrollTrigger) {
      new ScrollTrigger(tl, vars.scrollTrigger);
    }

    return tl;
  },

  /**
   * Splits text of DOM elements into individual character or word spans,
   * making them ready for cascaded stagger animations.
   */
  splitText(
    target: any,
    options?: { type?: "chars" | "words" },
  ): HTMLElement[] {
    return splitText(target, options);
  },

  /**
   * Animates the outline drawing of SVG paths.
   */
  drawSVG(target: any, vars: TweenVars): Tween {
    const hasScrollTrigger = vars.scrollTrigger !== undefined;

    const varsWithAutoPlay = { ...vars };
    if (hasScrollTrigger) {
      varsWithAutoPlay.autoPlay = false;
    }

    const tween = drawSVG(target, varsWithAutoPlay);

    if (hasScrollTrigger && vars.scrollTrigger) {
      new ScrollTrigger(tween, vars.scrollTrigger);
    }

    return tween;
  },
};

export { Tween, type TweenVars } from "./tween.js";
export { Timeline, type TimelineVars } from "./timeline.js";
export { ScrollTrigger, type ScrollTriggerVars } from "./scrollTrigger.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
export { resolveTargets, splitText, drawSVG } from "./utils.js";

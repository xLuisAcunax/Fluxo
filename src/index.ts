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
  slidingMenu,
} from "./effects.js";

export const fluxo = {
  /**
   * Creates an animation that goes FROM the current values of the target
   * TO the values defined in 'vars'. Supports multiple targets, stagger, and scroll animator.
   */
  to(target: any, vars: TweenVars): Tween | Timeline {
    const targets = resolveTargets(target);
    const hasScroll = vars.scroll !== undefined;

    const varsWithAutoPlay = { ...vars };
    if (hasScroll) {
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
      delete tweenVars.scroll;

      targets.forEach((t, i) => {
        tl.to(t, tweenVars, i * stagger);
      });

      if (!hasScroll) {
        tl.play();
      }

      animation = tl;
    }

    if (hasScroll && vars.scroll) {
      new ScrollTrigger(animation, vars.scroll);
    }

    return animation;
  },

  /**
   * Creates an animation that goes FROM the values defined in 'vars'
   * TO the current values of the target. Supports multiple targets, stagger, and scroll animator.
   */
  from(target: any, vars: TweenVars): Tween | Timeline {
    const targets = resolveTargets(target);
    const hasScroll = vars.scroll !== undefined;

    const varsWithAutoPlay = { ...vars };
    if (hasScroll) {
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
      delete tweenVars.scroll;

      targets.forEach((t, i) => {
        tl.from(t, tweenVars, i * stagger);
      });

      if (!hasScroll) {
        tl.play();
      }

      animation = tl;
    }

    if (hasScroll && vars.scroll) {
      new ScrollTrigger(animation, vars.scroll);
    }

    return animation;
  },

  /**
   * Creates an animation that goes FROM the values defined in 'fromVars'
   * TO the values defined in 'toVars'. Supports multiple targets, stagger, and scroll animator.
   */
  fromTo(
    target: any,
    fromVars: TweenVars,
    toVars: TweenVars,
  ): Tween | Timeline {
    const targets = resolveTargets(target);
    const hasScroll = toVars.scroll !== undefined;

    const toVarsWithAutoPlay = { ...toVars };
    if (hasScroll) {
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
      delete tweenVars.scroll;

      targets.forEach((t, i) => {
        tl.fromTo(t, fromVars, tweenVars, i * stagger);
      });

      if (!hasScroll) {
        tl.play();
      }

      animation = tl;
    }

    if (hasScroll && toVars.scroll) {
      new ScrollTrigger(animation, toVars.scroll);
    }

    return animation;
  },

  /**
   * Creates a new Timeline instance for sequencing multiple animations.
   */
  timeline(vars?: TimelineVars & { scroll?: any }): Timeline {
    const hasScroll = vars?.scroll !== undefined;
    const timelineVars = { ...vars };

    if (hasScroll) {
      timelineVars.paused = true;
    }

    const tl = new Timeline(timelineVars);

    if (hasScroll && vars?.scroll) {
      new ScrollTrigger(tl, vars.scroll);
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
    const hasScroll = vars.scroll !== undefined;

    const varsWithAutoPlay = { ...vars };
    if (hasScroll) {
      varsWithAutoPlay.autoPlay = false;
    }

    const tween = drawSVG(target, varsWithAutoPlay);

    if (hasScroll && vars.scroll) {
      new ScrollTrigger(tween, vars.scroll);
    }

    return tween;
  },

  magnetic(target: any, options?: any) {
    magnetic(target, options);
  },

  tilt(target: any, options?: any) {
    tilt(target, options);
  },

  explodeOnScroll(target: any, options?: any) {
    explodeOnScroll(target, options);
  },

  implodeOnScroll(target: any, options?: any) {
    implodeOnScroll(target, options);
  },

  revealText(target: any, options?: any) {
    revealText(target, options);
  },

  scrollReveal(target: any, options?: any) {
    scrollReveal(target, options);
  },

  slidingMenu(container: any, links: string, pill: any, options?: any) {
    slidingMenu(container, links, pill, options);
  },

  killAllTriggers() {
    ScrollTrigger.killAll();
  },
};

export { Tween, type TweenVars } from "./tween.js";
export { Timeline, type TimelineVars } from "./timeline.js";
export { ScrollTrigger, type ScrollTriggerVars } from "./scrollTrigger.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
export { resolveTargets, splitText, drawSVG } from "./utils.js";
export * from "./effects.js";

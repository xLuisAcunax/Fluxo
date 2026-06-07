import { Tween, TweenVars } from "./tween.js";
import { Timeline, TimelineVars } from "./timeline.js";
export declare const fluxo: {
    /**
     * Creates an animation that goes FROM the current values of the target
     * TO the values defined in 'vars'. Supports multiple targets, stagger, and ScrollTrigger.
     *
     * @param target CSS selector string, DOM element, array of elements, or plain object(s).
     * @param vars Configuration object containing target values, duration, ease, stagger, scrollTrigger, and callbacks.
     */
    to(target: any, vars: TweenVars): Tween | Timeline;
    /**
     * Creates an animation that goes FROM the values defined in 'vars'
     * TO the current values of the target. Supports multiple targets, stagger, and ScrollTrigger.
     *
     * @param target CSS selector string, DOM element, array of elements, or plain object(s).
     * @param vars Configuration object containing start values, duration, ease, stagger, scrollTrigger, and callbacks.
     */
    from(target: any, vars: TweenVars): Tween | Timeline;
    /**
     * Creates an animation that goes FROM the values defined in 'fromVars'
     * TO the values defined in 'toVars'. Supports multiple targets, stagger, and ScrollTrigger.
     *
     * @param target CSS selector string, DOM element, array of elements, or plain object(s).
     * @param fromVars Starting properties for the animation.
     * @param toVars Target properties (including duration, ease, stagger, scrollTrigger, and callbacks).
     */
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween | Timeline;
    /**
     * Creates a new Timeline instance for sequencing multiple animations.
     *
     * @param vars Configuration object containing timeline delay, paused state, and callbacks.
     */
    timeline(vars?: TimelineVars): Timeline;
};
export { Tween, type TweenVars } from "./tween.js";
export { Timeline, type TimelineVars } from "./timeline.js";
export { ScrollTrigger, type ScrollTriggerVars } from "./scrollTrigger.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
export { resolveTargets } from "./utils.js";

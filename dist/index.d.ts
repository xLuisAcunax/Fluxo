import { Tween, TweenVars } from "./tween.js";
import { Timeline, TimelineVars } from "./timeline.js";
export declare const fluxo: {
    /**
     * Creates an animation that goes FROM the current values of the target
     * TO the values defined in 'vars'.
     *
     * @param target CSS selector string, DOM element, or plain JavaScript object.
     * @param vars Configuration object containing target values, duration, delay, ease, and callbacks.
     */
    to(target: any, vars: TweenVars): Tween;
    /**
     * Creates an animation that goes FROM the values defined in 'vars'
     * TO the current values of the target.
     *
     * @param target CSS selector string, DOM element, or plain JavaScript object.
     * @param vars Configuration object containing start values, duration, delay, ease, and callbacks.
     */
    from(target: any, vars: TweenVars): Tween;
    /**
     * Creates an animation that goes FROM the values defined in 'fromVars'
     * TO the values defined in 'toVars'.
     *
     * @param target CSS selector string, DOM element, or plain JavaScript object.
     * @param fromVars Starting properties for the animation.
     * @param toVars Target properties (including duration, delay, ease, and callbacks).
     */
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween;
    /**
     * Creates a new Timeline instance for sequencing multiple animations.
     *
     * @param vars Configuration object containing timeline delay, paused state, and callbacks.
     */
    timeline(vars?: TimelineVars): Timeline;
};
export { Tween, type TweenVars } from "./tween.js";
export { Timeline, type TimelineVars } from "./timeline.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";

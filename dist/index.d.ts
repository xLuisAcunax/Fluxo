import { Tween, TweenVars } from "./tween.js";
import { Timeline, TimelineVars } from "./timeline.js";
export declare const fluxo: {
    /**
     * Creates an animation that goes FROM the current values of the target
     * TO the values defined in 'vars'. Supports multiple targets, stagger, and ScrollTrigger.
     */
    to(target: any, vars: TweenVars): Tween | Timeline;
    /**
     * Creates an animation that goes FROM the values defined in 'vars'
     * TO the current values of the target. Supports multiple targets, stagger, and ScrollTrigger.
     */
    from(target: any, vars: TweenVars): Tween | Timeline;
    /**
     * Creates an animation that goes FROM the values defined in 'fromVars'
     * TO the values defined in 'toVars'. Supports multiple targets, stagger, and ScrollTrigger.
     */
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween | Timeline;
    /**
     * Creates a new Timeline instance for sequencing multiple animations.
     */
    timeline(vars?: TimelineVars): Timeline;
    /**
     * Splits text of DOM elements into individual character or word spans,
     * making them ready for cascaded stagger animations.
     */
    splitText(target: any, options?: {
        type?: "chars" | "words";
    }): HTMLElement[];
    /**
     * Animates the outline drawing of SVG paths.
     */
    drawSVG(target: any, vars: TweenVars): Tween;
};
export { Tween, type TweenVars } from "./tween.js";
export { Timeline, type TimelineVars } from "./timeline.js";
export { ScrollTrigger, type ScrollTriggerVars } from "./scrollTrigger.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
export { resolveTargets, splitText, drawSVG } from "./utils.js";

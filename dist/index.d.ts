import { Tween, TweenVars } from "./tween.js";
import { Timeline, TimelineVars } from "./timeline.js";
export declare const fluxo: {
    /**
     * Creates an animation that goes FROM the current values of the target
     * TO the values defined in 'vars'. Supports multiple targets, stagger, and scroll animator.
     */
    to(target: any, vars: TweenVars): Tween | Timeline;
    /**
     * Creates an animation that goes FROM the values defined in 'vars'
     * TO the current values of the target. Supports multiple targets, stagger, and scroll animator.
     */
    from(target: any, vars: TweenVars): Tween | Timeline;
    /**
     * Creates an animation that goes FROM the values defined in 'fromVars'
     * TO the values defined in 'toVars'. Supports multiple targets, stagger, and scroll animator.
     */
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween | Timeline;
    /**
     * Creates a new Timeline instance for sequencing multiple animations.
     */
    timeline(vars?: TimelineVars & {
        scroll?: any;
    }): Timeline;
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
    magnetic(target: any, options?: any): void;
    tilt(target: any, options?: any): void;
    explodeOnScroll(target: any, options?: any): void;
    implodeOnScroll(target: any, options?: any): void;
    revealText(target: any, options?: any): void;
    scrollReveal(target: any, options?: any): void;
    slidingMenu(container: any, links: string, pill: any, options?: any): void;
    killAllTriggers(): void;
};
export { Tween, type TweenVars } from "./tween.js";
export { Timeline, type TimelineVars } from "./timeline.js";
export { ScrollTrigger, type ScrollTriggerVars } from "./scrollTrigger.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
export { resolveTargets, splitText, drawSVG } from "./utils.js";
export * from "./effects.js";

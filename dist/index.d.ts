import { Tween, TweenVars } from "./tween.js";
export declare const fluxo: {
    /**
     * Creates an animation that goes FROM the current values of the target
     * TO the values defined in 'vars'.
     *
     * @param target CSS selector string, DOM element, or plain JavaScript object.
     * @param vars Configuration object containing target values, duration, delay, ease, and callbacks.
     */
    to(target: any, vars: TweenVars): Tween;
};
export { Tween, type TweenVars } from "./tween.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";

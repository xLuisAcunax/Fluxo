import { Tween } from "./tween.js";
export const fluxo = {
    /**
     * Creates an animation that goes FROM the current values of the target
     * TO the values defined in 'vars'.
     *
     * @param target CSS selector string, DOM element, or plain JavaScript object.
     * @param vars Configuration object containing target values, duration, delay, ease, and callbacks.
     */
    to(target, vars) {
        return new Tween(target, vars);
    },
    /**
     * Creates an animation that goes FROM the values defined in 'vars'
     * TO the current values of the target.
     *
     * @param target CSS selector string, DOM element, or plain JavaScript object.
     * @param vars Configuration object containing start values, duration, delay, ease, and callbacks.
     */
    from(target, vars) {
        return new Tween(target, vars, undefined, true);
    },
    /**
     * Creates an animation that goes FROM the values defined in 'fromVars'
     * TO the values defined in 'toVars'.
     *
     * @param target CSS selector string, DOM element, or plain JavaScript object.
     * @param fromVars Starting properties for the animation.
     * @param toVars Target properties (including duration, delay, ease, and callbacks).
     */
    fromTo(target, fromVars, toVars) {
        return new Tween(target, toVars, fromVars);
    },
};
export { Tween } from "./tween.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
//# sourceMappingURL=index.js.map
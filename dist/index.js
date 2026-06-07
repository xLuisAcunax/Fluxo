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
};
export { Tween } from "./tween.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
//# sourceMappingURL=index.js.map
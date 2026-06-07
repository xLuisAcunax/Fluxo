import { Tween } from "./tween.js";
import { Timeline } from "./timeline.js";
import { resolveTargets } from "./utils.js";
export const fluxo = {
    /**
     * Creates an animation that goes FROM the current values of the target
     * TO the values defined in 'vars'. Supports multiple targets and stagger.
     *
     * @param target CSS selector string, DOM element, array of elements, or plain object(s).
     * @param vars Configuration object containing target values, duration, ease, stagger, and callbacks.
     */
    to(target, vars) {
        const targets = resolveTargets(target);
        if (targets.length === 0) {
            return new Tween(null, vars);
        }
        if (targets.length === 1) {
            return new Tween(targets[0], vars);
        }
        const tl = new Timeline({
            delay: vars.delay,
            onStart: vars.onStart,
            onUpdate: vars.onUpdate,
            onComplete: vars.onComplete,
        });
        const stagger = vars.stagger || 0;
        const tweenVars = { ...vars };
        delete tweenVars.delay;
        delete tweenVars.onStart;
        delete tweenVars.onUpdate;
        delete tweenVars.onComplete;
        delete tweenVars.stagger;
        targets.forEach((t, i) => {
            tl.to(t, tweenVars, i * stagger);
        });
        return tl;
    },
    /**
     * Creates an animation that goes FROM the values defined in 'vars'
     * TO the current values of the target. Supports multiple targets and stagger.
     *
     * @param target CSS selector string, DOM element, array of elements, or plain object(s).
     * @param vars Configuration object containing start values, duration, ease, stagger, and callbacks.
     */
    from(target, vars) {
        const targets = resolveTargets(target);
        if (targets.length === 0) {
            return new Tween(null, vars, undefined, true);
        }
        if (targets.length === 1) {
            return new Tween(targets[0], vars, undefined, true);
        }
        const tl = new Timeline({
            delay: vars.delay,
            onStart: vars.onStart,
            onUpdate: vars.onUpdate,
            onComplete: vars.onComplete,
        });
        const stagger = vars.stagger || 0;
        const tweenVars = { ...vars };
        delete tweenVars.delay;
        delete tweenVars.onStart;
        delete tweenVars.onUpdate;
        delete tweenVars.onComplete;
        delete tweenVars.stagger;
        targets.forEach((t, i) => {
            tl.from(t, tweenVars, i * stagger);
        });
        return tl;
    },
    /**
     * Creates an animation that goes FROM the values defined in 'fromVars'
     * TO the values defined in 'toVars'. Supports multiple targets and stagger.
     *
     * @param target CSS selector string, DOM element, array of elements, or plain object(s).
     * @param fromVars Starting properties for the animation.
     * @param toVars Target properties (including duration, ease, stagger, and callbacks).
     */
    fromTo(target, fromVars, toVars) {
        const targets = resolveTargets(target);
        if (targets.length === 0) {
            return new Tween(null, toVars, fromVars);
        }
        if (targets.length === 1) {
            return new Tween(targets[0], toVars, fromVars);
        }
        const tl = new Timeline({
            delay: toVars.delay,
            onStart: toVars.onStart,
            onUpdate: toVars.onUpdate,
            onComplete: toVars.onComplete,
        });
        const stagger = toVars.stagger || 0;
        const tweenVars = { ...toVars };
        delete tweenVars.delay;
        delete tweenVars.onStart;
        delete tweenVars.onUpdate;
        delete tweenVars.onComplete;
        delete tweenVars.stagger;
        targets.forEach((t, i) => {
            tl.fromTo(t, fromVars, tweenVars, i * stagger);
        });
        return tl;
    },
    /**
     * Creates a new Timeline instance for sequencing multiple animations.
     *
     * @param vars Configuration object containing timeline delay, paused state, and callbacks.
     */
    timeline(vars) {
        return new Timeline(vars);
    },
};
export { Tween } from "./tween.js";
export { Timeline } from "./timeline.js";
export { ticker } from "./ticker.js";
export { easings } from "./easings.js";
export { resolveTargets } from "./utils.js";
//# sourceMappingURL=index.js.map
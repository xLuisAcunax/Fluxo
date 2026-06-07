/**
 * Resolves various target formats (CSS selector, single DOM element, array, NodeList)
 * into a standard array of targets.
 */
export function resolveTargets(target) {
    if (!target)
        return [];
    if (typeof target === "string") {
        if (typeof document !== "undefined") {
            return Array.from(document.querySelectorAll(target));
        }
        return [];
    }
    if (Array.isArray(target)) {
        return target;
    }
    if (typeof NodeList !== "undefined" && target instanceof NodeList) {
        return Array.from(target);
    }
    if (typeof HTMLCollection !== "undefined" &&
        target instanceof HTMLCollection) {
        return Array.from(target);
    }
    return [target];
}
//# sourceMappingURL=utils.js.map
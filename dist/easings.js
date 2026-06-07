export const easings = {
    none: (t) => t,
    linear: (t) => t,
    "slow.in": (t) => t * t,
    "slow.out": (t) => t * (2 - t),
    "slow.inOut": (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    "medium.in": (t) => t * t * t,
    "medium.out": (t) => 1 - Math.pow(1 - t, 3),
    "medium.inOut": (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    "fast.in": (t) => t * t * t * t,
    "fast.out": (t) => 1 - Math.pow(1 - t, 4),
    "fast.inOut": (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
    "veryFast.in": (t) => t * t * t * t * t,
    "veryFast.out": (t) => 1 - Math.pow(1 - t, 5),
    "veryFast.inOut": (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
};
export function getEasing(ease) {
    if (!ease)
        return easings["slow.out"];
    if (typeof ease === "function")
        return ease;
    return easings[ease] || easings["slow.out"];
}
//# sourceMappingURL=easings.js.map
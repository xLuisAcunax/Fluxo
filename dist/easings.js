export const easings = {
    none: (t) => t,
    linear: (t) => t,
    "power1.in": (t) => t * t,
    "power1.out": (t) => t * (2 - t),
    "power1.inOut": (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    "power2.in": (t) => t * t * t,
    "power2.out": (t) => 1 - Math.pow(1 - t, 3),
    "power2.inOut": (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    "power3.in": (t) => t * t * t * t,
    "power3.out": (t) => 1 - Math.pow(1 - t, 4),
    "power3.inOut": (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
    "power4.in": (t) => t * t * t * t * t,
    "power4.out": (t) => 1 - Math.pow(1 - t, 5),
    "power4.inOut": (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
};
export function getEasing(ease) {
    if (!ease)
        return easings["power1.out"];
    if (typeof ease === "function")
        return ease;
    return easings[ease] || easings["power1.out"];
}
//# sourceMappingURL=easings.js.map
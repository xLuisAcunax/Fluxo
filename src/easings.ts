export type EasingFunction = (t: number) => number;

export const easings = {
  none: (t: number) => t,
  linear: (t: number) => t,

  "slow.in": (t: number) => t * t,
  "slow.out": (t: number) => t * (2 - t),
  "slow.inOut": (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,

  "medium.in": (t: number) => t * t * t,
  "medium.out": (t: number) => 1 - Math.pow(1 - t, 3),
  "medium.inOut": (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  "fast.in": (t: number) => t * t * t * t,
  "fast.out": (t: number) => 1 - Math.pow(1 - t, 4),
  "fast.inOut": (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,

  "veryFast.in": (t: number) => t * t * t * t * t,
  "veryFast.out": (t: number) => 1 - Math.pow(1 - t, 5),
  "veryFast.inOut": (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
};

export type EasingName = keyof typeof easings;

export function getEasing(
  ease: EasingName | EasingFunction | undefined,
): EasingFunction {
  if (!ease) return easings["slow.out"];
  if (typeof ease === "function") return ease;
  return easings[ease] || easings["slow.out"];
}

export type EasingFunction = (t: number) => number;

export const easings = {
  none: (t: number) => t,
  linear: (t: number) => t,

  "power1.in": (t: number) => t * t,
  "power1.out": (t: number) => t * (2 - t),
  "power1.inOut": (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,

  "power2.in": (t: number) => t * t * t,
  "power2.out": (t: number) => 1 - Math.pow(1 - t, 3),
  "power2.inOut": (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  "power3.in": (t: number) => t * t * t * t,
  "power3.out": (t: number) => 1 - Math.pow(1 - t, 4),
  "power3.inOut": (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,

  "power4.in": (t: number) => t * t * t * t * t,
  "power4.out": (t: number) => 1 - Math.pow(1 - t, 5),
  "power4.inOut": (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
};

export type EasingName = keyof typeof easings;

export function getEasing(
  ease: EasingName | EasingFunction | undefined,
): EasingFunction {
  if (!ease) return easings["power1.out"];
  if (typeof ease === "function") return ease;
  return easings[ease] || easings["power1.out"];
}

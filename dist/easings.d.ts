export type EasingFunction = (t: number) => number;
export declare const easings: {
    none: (t: number) => number;
    linear: (t: number) => number;
    "slow.in": (t: number) => number;
    "slow.out": (t: number) => number;
    "slow.inOut": (t: number) => number;
    "medium.in": (t: number) => number;
    "medium.out": (t: number) => number;
    "medium.inOut": (t: number) => number;
    "fast.in": (t: number) => number;
    "fast.out": (t: number) => number;
    "fast.inOut": (t: number) => number;
    "veryFast.in": (t: number) => number;
    "veryFast.out": (t: number) => number;
    "veryFast.inOut": (t: number) => number;
};
export type EasingName = keyof typeof easings;
export declare function getEasing(ease: EasingName | EasingFunction | undefined): EasingFunction;

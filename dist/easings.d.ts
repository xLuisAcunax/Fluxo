export type EasingFunction = (t: number) => number;
export declare const easings: {
    none: (t: number) => number;
    linear: (t: number) => number;
    "power1.in": (t: number) => number;
    "power1.out": (t: number) => number;
    "power1.inOut": (t: number) => number;
    "power2.in": (t: number) => number;
    "power2.out": (t: number) => number;
    "power2.inOut": (t: number) => number;
    "power3.in": (t: number) => number;
    "power3.out": (t: number) => number;
    "power3.inOut": (t: number) => number;
    "power4.in": (t: number) => number;
    "power4.out": (t: number) => number;
    "power4.inOut": (t: number) => number;
};
export type EasingName = keyof typeof easings;
export declare function getEasing(ease: EasingName | EasingFunction | undefined): EasingFunction;

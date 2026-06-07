import { EasingName, EasingFunction } from "./easings.js";
export declare function slidingMenu(containerSelector: any, linksSelector: string, pillSelector: any, options?: {
    duration?: number;
    ease?: EasingName | EasingFunction;
}): void;
export declare function magnetic(target: any, options?: {
    strength?: number;
    proximity?: number;
    duration?: number;
    ease?: EasingName | EasingFunction;
}): void;
export declare function tilt(target: any, options?: {
    maxTilt?: number;
    perspective?: number;
    duration?: number;
    ease?: EasingName | EasingFunction;
}): void;
export declare function explodeOnScroll(target: any, options?: {
    strength?: number;
    start?: string;
    end?: string;
    ease?: EasingName | EasingFunction;
}): void;
export declare function implodeOnScroll(target: any, options?: {
    strength?: number;
    start?: string;
    end?: string;
    ease?: EasingName | EasingFunction;
}): void;
export declare function revealText(target: any, options?: {
    type?: "chars" | "words";
    stagger?: number;
    duration?: number;
    ease?: EasingName | EasingFunction;
    delay?: number;
}): void;
export declare function scrollReveal(target: any, options?: {
    stagger?: number;
    y?: number;
    duration?: number;
    ease?: EasingName | EasingFunction;
    start?: string;
    once?: boolean;
}): void;

import { EasingFunction, EasingName } from "./easings.js";
export interface TweenVars {
    duration?: number;
    delay?: number;
    ease?: EasingName | EasingFunction;
    onStart?: () => void;
    onUpdate?: () => void;
    onComplete?: () => void;
    [key: string]: any;
}
export declare class Tween {
    private target;
    private vars;
    private duration;
    private delay;
    private ease;
    private startTime;
    private started;
    private completed;
    private propTweens;
    constructor(target: any, vars: TweenVars);
    private initProperties;
    private parseValue;
    private getTransformState;
    private applyTransform;
    private update;
    kill(): void;
}

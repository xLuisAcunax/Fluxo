import { EasingFunction, EasingName } from "./easings.js";
export interface TweenVars {
    duration?: number;
    delay?: number;
    ease?: EasingName | EasingFunction;
    autoPlay?: boolean;
    onUpdate?: () => void;
    onComplete?: () => void;
    [key: string]: any;
}
export declare class Tween {
    target: any;
    vars: TweenVars;
    duration: number;
    delay: number;
    private ease;
    private fromVars?;
    private isFrom;
    private startTime;
    private started;
    private completed;
    private propTweens;
    constructor(target: any, vars: TweenVars, fromVars?: TweenVars, isFrom?: boolean);
    private initProperties;
    private parseValue;
    private getTransformState;
    private applyTransform;
    render(time: number): void;
    private update;
    kill(): void;
}

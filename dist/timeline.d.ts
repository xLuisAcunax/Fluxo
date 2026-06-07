import { TweenVars } from "./tween.js";
export interface TimelineVars {
    delay?: number;
    paused?: boolean;
    onStart?: () => void;
    onUpdate?: () => void;
    onComplete?: () => void;
}
export declare class Timeline {
    private children;
    private vars;
    private duration;
    private delay;
    private playhead;
    private reversed;
    private started;
    private completed;
    private isPlaying;
    constructor(vars?: TimelineVars);
    to(target: any, vars: TweenVars, position?: number | string): this;
    from(target: any, vars: TweenVars, position?: number | string): this;
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars, position?: number | string): this;
    play(): void;
    reverse(): void;
    pause(): void;
    kill(): void;
    private parsePosition;
    private addTween;
    render(time: number): void;
    private update;
}

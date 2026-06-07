import { TweenVars } from "./tween.js";
export interface TimelineVars {
    delay?: number;
    paused?: boolean;
    repeat?: number;
    yoyo?: boolean;
    onStart?: () => void;
    onUpdate?: () => void;
    onComplete?: () => void;
    onRepeat?: () => void;
}
export declare class Timeline {
    private children;
    private vars;
    duration: number;
    delay: number;
    private playhead;
    private reversed;
    private started;
    private completed;
    private isPlaying;
    private repeatCount;
    constructor(vars?: TimelineVars);
    /**
     * Adds .to() tweens to the timeline.
     */
    to(target: any, vars: TweenVars, position?: number | string): this;
    /**
     * Adds .from() tweens to the timeline.
     */
    from(target: any, vars: TweenVars, position?: number | string): this;
    /**
     * Adds .fromTo() tweens to the timeline.
     */
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

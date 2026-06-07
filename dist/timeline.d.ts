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
    private startTime;
    private started;
    private completed;
    private isPlaying;
    constructor(vars?: TimelineVars);
    /**
     * Adds .to() tweens to the timeline. Supports multiple targets and stagger.
     */
    to(target: any, vars: TweenVars, position?: number | string): this;
    /**
     * Adds .from() tweens to the timeline. Supports multiple targets and stagger.
     */
    from(target: any, vars: TweenVars, position?: number | string): this;
    /**
     * Adds .fromTo() tweens to the timeline. Supports multiple targets and stagger.
     */
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars, position?: number | string): this;
    play(): void;
    pause(): void;
    kill(): void;
    /**
     * Helper to parse relative and absolute positions.
     */
    private parsePosition;
    /**
     * Appends an individual Tween into the children list at a specific absolute start time.
     */
    private addTween;
    render(time: number): void;
    private update;
}

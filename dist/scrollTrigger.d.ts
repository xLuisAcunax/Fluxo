import { Tween } from "./tween.js";
import { Timeline } from "./timeline.js";
export interface ScrollTriggerVars {
    trigger: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean;
    once?: boolean;
}
export declare class ScrollTrigger {
    private static instances;
    private animation;
    private triggerEl;
    private vars;
    private startScroll;
    private endScroll;
    private hasTriggered;
    constructor(animation: Tween | Timeline, vars: ScrollTriggerVars);
    refresh(): void;
    private calculateScrollPos;
    private onScroll;
    kill(): void;
    static killAll(): void;
}

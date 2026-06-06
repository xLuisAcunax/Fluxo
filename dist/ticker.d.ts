type TickerCallback = (time: number, dt: number) => void;
declare class Ticker {
    private callbacks;
    private rafId;
    private lastTime;
    private time;
    constructor();
    add(cb: TickerCallback): void;
    remove(cb: TickerCallback): void;
    private start;
    private stop;
    private tick;
}
export declare const ticker: Ticker;
export {};

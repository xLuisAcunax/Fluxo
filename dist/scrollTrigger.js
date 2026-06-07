import { resolveTargets } from "./utils.js";
export class ScrollTrigger {
    animation;
    triggerEl;
    vars;
    startScroll = 0;
    endScroll = 0;
    hasTriggered = false;
    constructor(animation, vars) {
        this.animation = animation;
        this.vars = vars;
        const resolved = resolveTargets(vars.trigger);
        if (resolved.length === 0) {
            throw new Error(`ScrollTrigger: Target trigger element not found for "${vars.trigger}"`);
        }
        this.triggerEl = resolved[0];
        this.onScroll = this.onScroll.bind(this);
        this.refresh = this.refresh.bind(this);
        this.refresh();
        window.addEventListener("scroll", this.onScroll, { passive: true });
        window.addEventListener("resize", this.refresh, { passive: true });
        this.onScroll();
    }
    refresh() {
        const rect = this.triggerEl.getBoundingClientRect();
        const docScrollY = window.scrollY;
        const elTop = rect.top + docScrollY;
        const elHeight = rect.height;
        const startStr = this.vars.start || "top bottom";
        this.startScroll = this.calculateScrollPos(startStr, elTop, elHeight, "top", "bottom");
        const endStr = this.vars.end || "bottom top";
        this.endScroll = this.calculateScrollPos(endStr, elTop, elHeight, "bottom", "top");
        if (this.endScroll <= this.startScroll) {
            this.endScroll = this.startScroll + 1;
        }
    }
    calculateScrollPos(posStr, elTop, elHeight, defaultElPart, defaultVPart) {
        const parts = posStr.split(" ");
        const elPart = parts[0] || defaultElPart;
        const vPart = parts[1] || defaultVPart;
        let elOffset = 0;
        if (elPart === "top")
            elOffset = 0;
        else if (elPart === "center")
            elOffset = elHeight / 2;
        else if (elPart === "bottom")
            elOffset = elHeight;
        else if (elPart.endsWith("%")) {
            elOffset = (parseFloat(elPart) / 100) * elHeight;
        }
        else {
            elOffset = parseFloat(elPart) || 0;
        }
        let vOffset = 0;
        const vh = window.innerHeight;
        if (vPart === "top")
            vOffset = 0;
        else if (vPart === "center")
            vOffset = vh / 2;
        else if (vPart === "bottom")
            vOffset = vh;
        else if (vPart.endsWith("%")) {
            vOffset = (parseFloat(vPart) / 100) * vh;
        }
        else {
            vOffset = parseFloat(vPart) || 0;
        }
        return elTop + elOffset - vOffset;
    }
    onScroll() {
        const scrollY = window.scrollY;
        if (this.vars.scrub) {
            let progress = (scrollY - this.startScroll) / (this.endScroll - this.startScroll);
            progress = Math.max(0, Math.min(1, progress));
            const totalDuration = this.animation.duration + this.animation.delay;
            this.animation.render(progress * totalDuration);
        }
        else {
            if (scrollY >= this.startScroll) {
                if (!this.hasTriggered) {
                    this.hasTriggered = true;
                    this.animation.play();
                    if (this.vars.once) {
                        this.kill();
                    }
                }
            }
            else {
                if (!this.vars.once && this.hasTriggered) {
                    this.hasTriggered = false;
                    this.animation.pause();
                    this.animation.render(0);
                }
            }
        }
    }
    kill() {
        window.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.refresh);
    }
}
//# sourceMappingURL=scrollTrigger.js.map
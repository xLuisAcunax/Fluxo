import { Tween } from "./tween.js";
import { Timeline } from "./timeline.js";
import { ScrollTrigger } from "./scrollTrigger.js";
import { resolveTargets, splitText } from "./utils.js";
export function slidingMenu(containerSelector, linksSelector, pillSelector, options = {}) {
    const container = resolveTargets(containerSelector)[0];
    const pill = resolveTargets(pillSelector)[0];
    const links = container
        ? Array.from(container.querySelectorAll(linksSelector))
        : [];
    if (!container || !pill || links.length === 0)
        return;
    const duration = options.duration !== undefined ? options.duration : 0.35;
    const ease = options.ease || "veryFast.out";
    const movePill = (linkEl) => {
        const rect = linkEl.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        const targetLeft = rect.left - parentRect.left;
        const targetWidth = rect.width;
        const targetTop = rect.top - parentRect.top;
        const targetHeight = rect.height;
        new Tween(pill, {
            left: targetLeft,
            width: targetWidth,
            top: targetTop,
            height: targetHeight,
            opacity: 1,
            duration: duration,
            ease: ease,
            autoPlay: true,
        });
    };
    links.forEach((link) => {
        if (!(link instanceof HTMLElement))
            return;
        link.addEventListener("mouseenter", () => movePill(link), {
            passive: true,
        });
    });
    container.addEventListener("mouseleave", () => {
        new Tween(pill, {
            opacity: 0,
            duration: 0.3,
            ease: "medium.out",
            autoPlay: true,
        });
    }, { passive: true });
}
export function magnetic(target, options = {}) {
    const resolved = resolveTargets(target);
    const strength = options.strength !== undefined ? options.strength : 0.45;
    const proximity = options.proximity !== undefined ? options.proximity : 100;
    const duration = options.duration !== undefined ? options.duration : 0.3;
    const ease = options.ease || "veryFast.out";
    resolved.forEach((el) => {
        if (!(el instanceof HTMLElement))
            return;
        let isInside = false;
        const onMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance < proximity) {
                isInside = true;
                new Tween(el, {
                    x: deltaX * strength,
                    y: deltaY * strength,
                    duration: duration,
                    ease: ease,
                    autoPlay: true,
                });
            }
            else if (isInside) {
                isInside = false;
                new Tween(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "medium.out",
                    autoPlay: true,
                });
            }
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
    });
}
export function tilt(target, options = {}) {
    const resolved = resolveTargets(target);
    const maxTilt = options.maxTilt !== undefined ? options.maxTilt : 25;
    const perspective = options.perspective !== undefined ? options.perspective : 800;
    const duration = options.duration !== undefined ? options.duration : 0.2;
    const ease = options.ease || "veryFast.out";
    resolved.forEach((el) => {
        if (!(el instanceof HTMLElement))
            return;
        const onMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const pctX = (mouseX / rect.width) * 100;
            const pctY = (mouseY / rect.height) * 100;
            el.style.setProperty("--mouse-x", `${pctX}%`);
            el.style.setProperty("--mouse-y", `${pctY}%`);
            const tiltX = (mouseY / rect.height - 0.5) * -maxTilt;
            const tiltY = (mouseX / rect.width - 0.5) * maxTilt;
            new Tween(el, {
                transform: `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                duration: duration,
                ease: ease,
                autoPlay: true,
            });
        };
        const onMouseLeave = () => {
            new Tween(el, {
                transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
                duration: 0.6,
                ease: "medium.out",
                autoPlay: true,
            });
            el.style.setProperty("--mouse-x", "50%");
            el.style.setProperty("--mouse-y", "50%");
        };
        el.addEventListener("mousemove", onMouseMove, { passive: true });
        el.addEventListener("mouseleave", onMouseLeave, { passive: true });
    });
}
export function explodeOnScroll(target, options = {}) {
    const resolved = resolveTargets(target);
    const strength = options.strength !== undefined ? options.strength : 1.0;
    const start = options.start || "top 70%";
    const end = options.end || "top 20%";
    const ease = options.ease || "medium.out";
    resolved.forEach((el) => {
        const chars = splitText(el, { type: "chars" });
        const tl = new Timeline({ paused: true });
        chars.forEach((char) => {
            const targetX = (Math.random() - 0.5) * 600 * strength;
            const targetY = (Math.random() - 0.5) * 500 * strength;
            const targetRot = (Math.random() - 0.5) * 360;
            const targetScale = 0.1 + Math.random() * 2.2;
            const tween = new Tween(char, {
                x: targetX,
                y: targetY,
                rotation: targetRot,
                scale: targetScale,
                opacity: 0,
                duration: 1,
                ease: ease,
                autoPlay: false,
            });
            tl.add(tween, 0);
        });
        new ScrollTrigger(tl, {
            trigger: el,
            start: start,
            end: end,
            scrub: true,
        });
    });
}
export function implodeOnScroll(target, options = {}) {
    const resolved = resolveTargets(target);
    const strength = options.strength !== undefined ? options.strength : 1.0;
    const start = options.start || "top 95%";
    const end = options.end || "top 50%";
    const ease = options.ease || "medium.out";
    resolved.forEach((el) => {
        const chars = splitText(el, { type: "chars" });
        const tl = new Timeline({ paused: true });
        chars.forEach((char) => {
            const startX = (Math.random() - 0.5) * 700 * strength;
            const startY = (Math.random() - 0.5) * 600 * strength;
            const startRot = (Math.random() - 0.5) * 360;
            const startScale = 0.1 + Math.random() * 2.5;
            const tween = new Tween(char, {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: ease,
                autoPlay: false,
            }, {
                x: startX,
                y: startY,
                rotation: startRot,
                scale: startScale,
                opacity: 0,
            });
            tl.add(tween, 0);
        });
        new ScrollTrigger(tl, {
            trigger: el,
            start: start,
            end: end,
            scrub: true,
        });
    });
}
export function revealText(target, options = {}) {
    const type = options.type || "chars";
    const stagger = options.stagger !== undefined
        ? options.stagger
        : type === "chars"
            ? 0.03
            : 0.12;
    const duration = options.duration !== undefined ? options.duration : 0.8;
    const ease = options.ease || "veryFast.out";
    const delay = options.delay !== undefined ? options.delay : 0;
    const resolved = resolveTargets(target);
    resolved.forEach((el) => {
        const spans = splitText(el, { type });
        const tl = new Timeline({ delay, paused: true });
        spans.forEach((span, i) => {
            const tween = new Tween(span, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: duration,
                ease: ease,
                autoPlay: false,
            }, {
                opacity: 0,
                y: 40,
                scale: 0.5,
                rotation: 15,
            });
            tl.add(tween, i * stagger);
        });
        tl.play();
    });
}
export function scrollReveal(target, options = {}) {
    const resolved = resolveTargets(target);
    const stagger = options.stagger !== undefined ? options.stagger : 0.1;
    const y = options.y !== undefined ? options.y : 50;
    const duration = options.duration !== undefined ? options.duration : 0.8;
    const ease = options.ease || "medium.out";
    const start = options.start || "top 85%";
    const once = options.once !== false;
    if (resolved.length === 0)
        return;
    const tl = new Timeline({ paused: true });
    resolved.forEach((el, i) => {
        const tween = new Tween(el, {
            opacity: 1,
            y: 0,
            duration: duration,
            ease: ease,
            autoPlay: false,
        }, {
            opacity: 0,
            y: y,
        });
        tl.add(tween, i * stagger);
    });
    new ScrollTrigger(tl, {
        trigger: resolved[0],
        start: start,
        once: once,
    });
}
//# sourceMappingURL=effects.js.map
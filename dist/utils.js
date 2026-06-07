import { Tween } from "./tween.js";
/**
 * Resolves various target formats (CSS selector, single DOM element, array, NodeList)
 * into a standard array of targets.
 */
export function resolveTargets(target) {
    if (!target)
        return [];
    if (typeof target === "string") {
        if (typeof document !== "undefined") {
            return Array.from(document.querySelectorAll(target));
        }
        return [];
    }
    if (Array.isArray(target)) {
        return target;
    }
    if (typeof NodeList !== "undefined" && target instanceof NodeList) {
        return Array.from(target);
    }
    if (typeof HTMLCollection !== "undefined" &&
        target instanceof HTMLCollection) {
        return Array.from(target);
    }
    return [target];
}
/**
 * Splits the text of DOM elements into individual character or word spans,
 * making them ready for cascaded stagger animations.
 *
 * @param target CSS selector string or HTMLElement(s).
 * @param options Split configuration (type: 'chars' | 'words'). Defaults to 'chars'.
 */
export function splitText(target, options = {}) {
    const targets = resolveTargets(target);
    const type = options.type || "chars";
    const resultSpans = [];
    targets.forEach((el) => {
        if (!(el instanceof HTMLElement))
            return;
        const originalText = el.textContent || "";
        el.innerHTML = "";
        if (type === "chars") {
            const chars = originalText.split("");
            chars.forEach((char) => {
                if (char === " ") {
                    el.appendChild(document.createTextNode(" "));
                }
                else {
                    const span = document.createElement("span");
                    span.className = "fluxo-char";
                    span.style.display = "inline-block";
                    span.textContent = char;
                    el.appendChild(span);
                    resultSpans.push(span);
                }
            });
        }
        else {
            const words = originalText.split(" ");
            words.forEach((word, index) => {
                if (index > 0) {
                    el.appendChild(document.createTextNode(" "));
                }
                const span = document.createElement("span");
                span.className = "fluxo-word";
                span.style.display = "inline-block";
                span.textContent = word;
                el.appendChild(span);
                resultSpans.push(span);
            });
        }
    });
    return resultSpans;
}
/**
 * Animates the outline drawing of SVG paths by computing total length
 * and tweening its stroke dash offsets.
 *
 * @param target CSS selector string or SVGPathElement.
 * @param vars Tween configuration (duration, delay, ease, callbacks).
 */
export function drawSVG(target, vars) {
    const targets = resolveTargets(target);
    const path = targets.length > 0 ? targets[0] : null;
    if (!path || typeof path.getTotalLength !== "function") {
        throw new Error("drawSVG: Target must be a valid SVG element with getTotalLength (such as <path>)");
    }
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    return new Tween(path, {
        strokeDashoffset: 0,
        ...vars,
    });
}
//# sourceMappingURL=utils.js.map
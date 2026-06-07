import { Tween, TweenVars } from "./tween.js";
/**
 * Resolves various target formats (CSS selector, single DOM element, array, NodeList)
 * into a standard array of targets.
 */
export declare function resolveTargets(target: any): any[];
/**
 * Splits the text of DOM elements into individual character or word spans,
 * making them ready for cascaded stagger animations.
 *
 * @param target CSS selector string or HTMLElement(s).
 * @param options Split configuration (type: 'chars' | 'words'). Defaults to 'chars'.
 */
export declare function splitText(target: any, options?: {
    type?: "chars" | "words";
}): HTMLElement[];
/**
 * Animates the outline drawing of SVG paths by computing total length
 * and tweening its stroke dash offsets.
 *
 * @param target CSS selector string or SVGPathElement.
 * @param vars Tween configuration (duration, delay, ease, callbacks).
 */
export declare function drawSVG(target: any, vars: TweenVars): Tween;

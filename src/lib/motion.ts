/**
 * Single place where GSAP is configured.
 * Import { gsap, ScrollTrigger, EASE } from here — never register plugins
 * anywhere else, or ScrollTrigger will be initialised more than once.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Everything animates transform/opacity only; force3D keeps it on the GPU.
  gsap.defaults({ ease: 'power3.out', force3D: true });
}

/** Entrance / exit curve. Matches --ease-out-expo in index.css. */
export const EASE = 'power3.out';

/** Durations. Hover + press feedback stays well under the 300ms ceiling. */
export const DUR = {
  press: 0.12,
  hover: 0.18,
  pop: 0.22,
  panel: 0.28,
  reveal: 0.5
} as const;

export { gsap, ScrollTrigger };
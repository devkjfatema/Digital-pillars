import { useLayoutEffect, useRef } from 'react';
import { gsap, DUR, EASE } from '../lib/motion';
import { useEnvironment } from './useEnvironment';

export type RevealFrom = 'up' | 'left' | 'right' | 'fade';

type Options = {
  from?: RevealFrom;
  delay?: number;
  /** Animate direct children in sequence instead of the element itself. */
  stagger?: number;
  /** Perspective rise, used on section headers for depth. */
  perspective?: boolean;
};

/**
 * Scroll-triggered entrance. Transform + opacity only, runs once, and is
 * skipped entirely (content simply present) under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>({
  from = 'up',
  delay = 0,
  stagger,
  perspective = false
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const { reducedMotion, isMobile } = useEnvironment();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.classList.add('is-ready');
      return;
    }

    const ctx = gsap.context(() => {
      const targets = stagger !== undefined ? Array.from(el.children) : el;
      // Mobile keeps the same choreography at a shorter travel distance.
      const d = isMobile ? 18 : 34;

      gsap.set(el, { autoAlpha: 1 });
      gsap.from(targets, {
        autoAlpha: 0,
        y: from === 'up' ? d : 0,
        x: from === 'left' ? -d : from === 'right' ? d : 0,
        rotateX: perspective && !isMobile ? 7 : 0,
        transformPerspective: 900,
        duration: DUR.reveal,
        ease: EASE,
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
      el.classList.add('is-ready');
    }, ref);

    return () => ctx.revert();
  }, [from, delay, stagger, perspective, reducedMotion, isMobile]);

  return ref;
}
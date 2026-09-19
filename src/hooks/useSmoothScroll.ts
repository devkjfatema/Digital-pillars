import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/motion';

let lenisInstance: Lenis | null = null;

/** Exposed so nav links and the route-change handler can jump without fighting Lenis. */
export function scrollTo(target: string | number | HTMLElement, immediate = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { immediate, offset: typeof target === 'number' ? 0 : -72 });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'auto' });else
    document.querySelector(String(target))?.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Mounts Lenis once, driven by GSAP's ticker so smooth scroll and ScrollTrigger
 * share a single RAF loop (two loops is the usual cause of scroll jank).
 * Disabled entirely for reduced-motion users — native scrolling is kept.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 0.9,
      // Short, non-springy curve: smoothing should be felt, not waited for.
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.6
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}
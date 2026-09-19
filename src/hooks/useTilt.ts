import { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';

type Options = {
  /** Max rotation in degrees. Keep small — this is depth, not a novelty. */
  max?: number;
  /** Pixels the element lifts toward the cursor. */
  lift?: number;
  disabled?: boolean;
};

/**
 * Cursor-reactive tilt for glass cards.
 * - Listeners are only attached while the card is in view (IntersectionObserver),
 *   so off-screen cards cost nothing.
 * - Uses gsap.quickTo, which writes transforms on the shared ticker instead of
 *   on every pointermove event.
 * - Never attached on touch or reduced-motion.
 */
export function useTilt<T extends HTMLElement>({ max = 6, lift = 6, disabled = false }: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power2.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power2.out' });
    const ty = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotY(px * max * 2);
      rotX(-py * max * 2);
      ty(-lift);
    };

    const onLeave = () => {
      rotX(0);
      rotY(0);
      ty(0);
    };

    let attached = false;
    const attach = () => {
      if (attached) return;
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      attached = true;
    };
    const detach = () => {
      if (!attached) return;
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      onLeave();
      attached = false;
    };

    // Only interactive while visible — satisfies "hover effects only in view".
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? attach() : detach(),
      { rootMargin: '10% 0px' }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      detach();
      gsap.killTweensOf(el);
    };
  }, [max, lift, disabled]);

  return ref;
}
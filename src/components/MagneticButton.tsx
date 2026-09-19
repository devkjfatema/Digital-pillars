import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/motion';
import { useEnvironment } from '../hooks/useEnvironment';

type Props = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
};

/**
 * CTA with a magnetic pull toward the cursor.
 * The transform lives on the wrapper while the click target stays exactly where
 * the user aimed, so motion never intercepts or displaces a click.
 */
export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  className = '',
  type = 'button',
  ariaLabel
}: Props) {
  const wrap = useRef<HTMLSpanElement>(null);
  const { isTouch, reducedMotion } = useEnvironment();

  useEffect(() => {
    const el = wrap.current;
    if (!el || isTouch || reducedMotion) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    let attached = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !attached) {
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        attached = true;
      } else if (!entry.isIntersecting && attached) {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        onLeave();
        attached = false;
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [isTouch, reducedMotion]);

  const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-medium tracking-wide transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98]';
  const styles =
  variant === 'solid' ?
  'bg-accent text-ink hover:bg-accent-soft' :
  'border border-white/[0.15] text-chalk hover:border-accent/70 hover:text-accent';

  const content = <span className={`${base} ${styles} ${className}`}>{children}</span>;

  return (
    <span ref={wrap} className="inline-block gpu">
      {to ?
      <Link to={to} aria-label={ariaLabel}>
          {content}
        </Link> :
      href ?
      <a href={href} aria-label={ariaLabel}>
          {content}
        </a> :

      <button type={type} onClick={onClick} aria-label={ariaLabel}>
          {content}
        </button>
      }
    </span>);

}
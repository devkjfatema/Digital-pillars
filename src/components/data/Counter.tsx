import React, { useEffect, useRef, useState } from 'react';
import { useEnvironment } from '../../hooks/useEnvironment';

type Props = {
  value: string;
  className?: string;
};

/**
 * Counts the numeric part of a value up when it first enters view, preserving
 * any prefix/suffix ("−37%", "£0.011", "4.8x"). Screen readers get the final
 * value immediately via aria-label, so the animation is purely visual.
 */
export function Counter({ value, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const { reducedMotion } = useEnvironment();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) {
      setDisplay(value);
      return;
    }

    const match = value.match(/-?\d+(\.\d+)?/);
    if (!match) return;
    const target = parseFloat(match[0]);
    const decimals = (match[0].split('.')[1] || '').length;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const duration = 900;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>);

}
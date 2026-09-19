import React, { useEffect, useRef, useState } from 'react';
import { useEnvironment } from '../../hooks/useEnvironment';

type Props = {
  series: number[];
  /** 'line' for trends, 'bars' for discrete periods. */
  variant?: 'line' | 'bars';
  className?: string;
  color?: string;
};

/**
 * Inline SVG sparkline / bar chart. No charting library: the whole widget is
 * a handful of path commands, which keeps the payload tiny and the paint cheap.
 * The draw-on animation runs once, when the chart first enters view.
 */
export function MiniChart({ series, variant = 'line', className = '', color = '#57D8FF' }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const { reducedMotion } = useEnvironment();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const w = 100;
  const h = 32;
  const pts = series.map((v, i) => [
  i / (series.length - 1) * w,
  h - Math.max(0, Math.min(100, v)) / 100 * (h - 4) - 2]
  );
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={`h-8 w-full ${className}`}
      aria-hidden="true"
      focusable="false">
      
      {variant === 'line' ?
      <>
          <path
          d={`${path} L${w},${h} L0,${h} Z`}
          fill={color}
          opacity={drawn ? 0.1 : 0}
          style={{ transition: 'opacity 260ms var(--ease-out-expo) 120ms' }} />
        
          <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: drawn ? 0 : 200,
            transition: 'stroke-dashoffset 700ms var(--ease-out-expo)'
          }} />
        
        </> :

      series.map((v, i) => {
        const bw = w / series.length - 2;
        const bh = Math.max(2, v) / 100 * (h - 2);
        return (
          <rect
            key={i}
            x={i * (w / series.length)}
            y={h - bh}
            width={bw}
            height={bh}
            rx="0.8"
            fill={color}
            opacity={i === series.length - 1 ? 0.95 : 0.4}
            style={{
              transformOrigin: 'bottom',
              transform: drawn ? 'scaleY(1)' : 'scaleY(0)',
              transition: `transform 280ms var(--ease-out-expo) ${i * 40}ms`
            }} />);


      })
      }
    </svg>);

}
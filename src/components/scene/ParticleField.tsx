import React, { useEffect, useRef } from 'react';
import { useEnvironment } from '../../hooks/useEnvironment';

type Props = {
  /** Particle count at desktop width; mobile uses a third of this. */
  density?: number;
  className?: string;
  color?: string;
};

/**
 * Ambient atmosphere for the hero scene — slow-drifting motes that make the
 * environment feel alive at rest.
 *
 * Performance notes (this is the only continuous RAF loop on the page):
 *  - device pixel ratio is capped at 1.5
 *  - the loop is suspended when the canvas leaves the viewport or the tab hides
 *  - particle count scales with viewport width
 *  - never runs on reduced-motion; the scene is simply still
 */
export function ParticleField({ density = 54, className = '', color = '87,216,255' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, isMobile } = useEnvironment();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const count = Math.round(isMobile ? density / 3 : density);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    type P = {x: number;y: number;r: number;vy: number;vx: number;a: number;phase: number;};
    let particles: P[] = [];

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.6 + Math.random() * 1.6,
        vy: -(0.00008 + Math.random() * 0.00022),
        vx: (Math.random() - 0.5) * 0.00008,
        a: 0.18 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        // Slow twinkle so the field reads as light, not as dots.
        const alpha = p.a * (0.55 + 0.45 * Math.sin(t * 0.0006 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    seed();
    start();

    const onResize = () => {
      resize();
    };
    const onVisibility = () => document.hidden || !visible ? stop() : start();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      onVisibility();
    });
    io.observe(canvas);

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, color, reducedMotion, isMobile]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />);


}
import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/motion';
import { useEnvironment } from '../../hooks/useEnvironment';

type Props = {
  /** Still frame. Always rendered first — it is what mobile and slow links get. */
  poster: string;
  /** Optional ambient plate, loaded only on hover-capable, wide, motion-OK devices. */
  video?: string;
  alt?: string;
  /** Parallax travel in pixels across the full scroll of the section. */
  depth?: number;
  className?: string;
  /** Scale the plate slightly so parallax never exposes an edge. */
  overscan?: number;
  /** Above-the-fold plate: decoded eagerly so it is the LCP element. */
  priority?: boolean;
};

/**
 * A depth layer of the scene: a rendered plate that moves at its own rate as
 * the page scrolls, so foreground UI and background environment separate.
 *
 * The video is never part of the critical path — the poster paints first and
 * the plate is attached afterwards, on capable devices only. On phones the
 * still image is the final state by design, not a degraded one.
 */
export function SceneMedia({
  poster,
  video,
  alt = '',
  depth = 60,
  className = '',
  overscan = 1.12,
  priority = false
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const { reducedMotion, isMobile, isTouch } = useEnvironment();
  const [playPlate, setPlayPlate] = useState(false);

  // Attach the ambient video only after first paint, and only where it pays off.
  useEffect(() => {
    if (!video || isMobile || isTouch || reducedMotion) return;
    const conn = (navigator as unknown as {connection?: {saveData?: boolean;effectiveType?: string;};}).
    connection;
    if (conn?.saveData || conn?.effectiveType && !/4g/.test(conn.effectiveType)) return;
    const id = window.setTimeout(() => setPlayPlate(true), 400);
    return () => window.clearTimeout(id);
  }, [video, isMobile, isTouch, reducedMotion]);

  // Parallax: one transform, driven by ScrollTrigger's scrub.
  useEffect(() => {
    const el = inner.current;
    if (!el || reducedMotion) return;
    const travel = isMobile ? depth * 0.4 : depth;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -travel / 20 },
        {
          yPercent: travel / 20,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, [depth, reducedMotion, isMobile]);

  useEffect(() => {
    // Layout of neighbouring pinned sections can shift once media decodes.
    if (playPlate) ScrollTrigger.refresh();
  }, [playPlate]);

  return (
    <div ref={wrap} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden={!alt}>
      <div ref={inner} className="gpu absolute inset-0" style={{ scale: overscan }}>
        <img
          src={poster}
          alt={alt}
          className="h-full w-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async" />
        
        {playPlate && video &&
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-0"
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          style={{ transition: 'opacity 500ms var(--ease-out-expo)' }} />

        }
      </div>
    </div>);

}
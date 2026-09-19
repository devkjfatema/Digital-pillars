import React from 'react';
import { useReveal, RevealFrom } from '../hooks/useReveal';

type Props = {
  children: React.ReactNode;
  from?: RevealFrom;
  delay?: number;
  stagger?: number;
  perspective?: boolean;
  className?: string;
  id?: string;
  /** Render as a semantic element other than div. */
  as?: 'div' | 'section' | 'ul' | 'li' | 'header' | 'article';
};

/**
 * Declarative wrapper around useReveal. `.reveal-pending` keeps the content
 * hidden for the single frame before GSAP takes over, and the CSS fallback
 * makes it visible again if JS or motion is unavailable.
 */
export function Reveal({
  children,
  from = 'up',
  delay,
  stagger,
  perspective,
  className = '',
  id,
  as: Tag = 'div'
}: Props) {
  const ref = useReveal<HTMLDivElement>({ from, delay, stagger, perspective });
  return (
    <Tag id={id} ref={ref as never} className={`reveal-pending ${className}`}>
      {children}
    </Tag>);

}
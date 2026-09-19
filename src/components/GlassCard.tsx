import React from 'react';
import { useTilt } from '../hooks/useTilt';
import { useEnvironment } from '../hooks/useEnvironment';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Disable the cursor tilt for cards that sit inside scrolling content. */
  tilt?: boolean;
  max?: number;
};

/**
 * The floating glass panel used throughout the scene.
 * Tilt is opt-in and automatically off for touch and reduced-motion users.
 */
export function GlassCard({ children, className = '', tilt = true, max = 5 }: Props) {
  const { isTouch, reducedMotion } = useEnvironment();
  const ref = useTilt<HTMLDivElement>({ max, disabled: !tilt || isTouch || reducedMotion });

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <div
        ref={ref}
        className="glass gpu h-full rounded-2xl"
        style={{ transformStyle: 'preserve-3d' }}>
        
        {children}
      </div>
    </div>);

}
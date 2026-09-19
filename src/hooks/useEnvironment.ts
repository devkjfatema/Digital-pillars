import { useEffect, useState } from 'react';

export type Environment = {
  /** User has asked the OS to reduce motion — all choreography is skipped. */
  reducedMotion: boolean;
  /** No hover-capable pointer: cursor tilt / magnetic effects are disabled. */
  isTouch: boolean;
  /** Narrow viewport: the simplified mobile composition is used. */
  isMobile: boolean;
};

const DEFAULTS: Environment = { reducedMotion: false, isTouch: false, isMobile: false };

function read(): Environment {
  if (typeof window === 'undefined' || !window.matchMedia) return DEFAULTS;
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isTouch: window.matchMedia('(hover: none)').matches,
    isMobile: window.matchMedia('(max-width: 767px)').matches
  };
}

/**
 * Reads the three environment signals that gate every motion decision on the
 * site. Evaluated synchronously on first render so nothing animates and then
 * snaps back for reduced-motion users.
 */
export function useEnvironment(): Environment {
  const [env, setEnv] = useState<Environment>(read);

  useEffect(() => {
    const queries = [
    '(prefers-reduced-motion: reduce)',
    '(hover: none)',
    '(max-width: 767px)'].
    map((q) => window.matchMedia(q));

    const update = () => setEnv(read());
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  return env;
}
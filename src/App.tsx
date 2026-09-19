import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetail } from './pages/ServiceDetail';
import { useEnvironment } from './hooks/useEnvironment';
import { scrollTo, useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollTrigger } from './lib/motion';

/**
 * Handles navigation side effects:
 *  - a hash (/#contact) scrolls to that section, including from another route
 *  - a plain route change starts at the top
 *  - ScrollTrigger positions are recalculated after the new page lays out
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (hash) scrollTo(hash);else
      scrollTo(0, true);
      ScrollTrigger.refresh();
    }, 40);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);

  return null;
}

type AppProps = {
  /** Hero treatment: the full cinematic plate, or the still render alone. */
  heroMedia?: 'cinematic' | 'still';
  /** Ambient atmosphere (drifting particles, idle card float) across the scene. */
  ambientMotion?: boolean;
};

export function App({ heroMedia = 'cinematic', ambientMotion = true }: AppProps) {
  const { reducedMotion } = useEnvironment();

  // Lenis is skipped entirely when the user prefers reduced motion.
  useSmoothScroll(!reducedMotion);

  return (
    <BrowserRouter>
      <ScrollManager />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-[13px] focus:text-ink">
        
        Skip to content
      </a>

      <div className="min-h-screen w-full bg-ink">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Home heroMedia={heroMedia} ambientMotion={ambientMotion} />} />
          
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route
            path="*"
            element={<Home heroMedia={heroMedia} ambientMotion={ambientMotion} />} />
          
        </Routes>
        <Footer />
        <AIAssistant />
      </div>
    </BrowserRouter>);

}
import React, { useEffect, useRef } from 'react';
import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { gsap, EASE } from '../../lib/motion';
import { useEnvironment } from '../../hooks/useEnvironment';
import { ParticleField } from '../scene/ParticleField';
import { SceneMedia } from '../scene/SceneMedia';
import { GlassCard } from '../GlassCard';
import { MiniChart } from '../data/MiniChart';
import { Counter } from '../data/Counter';
import { MagneticButton } from '../MagneticButton';
import { scrollTo } from '../../hooks/useSmoothScroll';

const HERO_POSTER = "/pillars-image.jpg";
const HERO_PLATE = "/hero-video.mp4";

/**
 * The hero scene.
 *
 * Depth order (back to front):
 *   1. Rendered environment plate (parallaxed)
 *   2. Atmospheric scrim + horizon light
 *   3. Drifting particle field
 *   4. Type and glass data cards, entering on a stagger
 *
 * The data cards sit inside the frame — anchored to the structure in the plate
 * and tilting with the cursor — rather than being pasted on top of it.
 */
type Props = {
  /** Attach the moving environment plate behind the still render. */
  plate?: boolean;
  /** Particle drift and the idle float on the data cards. */
  ambient?: boolean;
};

export function Hero({ plate = true, ambient = true }: Props) {
  const root = useRef<HTMLElement>(null);
  const { reducedMotion, isMobile } = useEnvironment();

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      tl.from('[data-hero="line"]', { scaleX: 0, transformOrigin: 'left', duration: 0.5 }, 0.05).
      from('[data-hero="eyebrow"]', { autoAlpha: 0, y: 12, duration: 0.45 }, 0.1).
      from(
        '[data-hero="word"]',
        { autoAlpha: 0, y: 28, rotateX: 22, transformPerspective: 800, duration: 0.6, stagger: 0.07 },
        0.18
      ).
      from('[data-hero="sub"]', { autoAlpha: 0, y: 16, duration: 0.5 }, 0.42).
      from('[data-hero="cta"]', { autoAlpha: 0, y: 14, duration: 0.45, stagger: 0.06 }, 0.5).
      from(
        '[data-hero="card"]',
        { autoAlpha: 0, y: 30, scale: 0.96, duration: 0.55, stagger: 0.1 },
        0.45
      ).
      from('[data-hero="cue"]', { autoAlpha: 0, duration: 0.4 }, 0.9);

      // Ambient: cards breathe very slightly so the scene is never fully static.
      if (!isMobile && ambient) {
        gsap.to('[data-hero="card"]', {
          y: '+=7',
          duration: 4.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.8, from: 'random' }
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, isMobile, ambient]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink pb-14 pt-28 sm:pb-20"
      aria-labelledby="hero-title">
      
      {/* 1 — environment plate */}
      <SceneMedia
        poster={HERO_POSTER}
        video={plate ? HERO_PLATE : undefined}
        alt="The Digital Pillars tower — three structural pillars rising above cloud level at dusk"
        depth={80}
        priority />
      

      {/* 2 — scrim: holds type contrast at AA over any frame of the plate */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
          'linear-gradient(180deg, rgba(6,7,10,0.86) 0%, rgba(6,7,10,0.35) 32%, rgba(6,7,10,0.72) 72%, #06070A 100%)'
        }} />
      

      {/* 3 — atmosphere */}
      {ambient && <ParticleField density={60} />}

      {/* 4 — content */}
      <div className="relative z-10 mx-auto w-full max-w-shell px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div
              data-hero="line"
              aria-hidden="true"
              className="mb-6 h-px w-24 origin-left bg-accent/70" />
            
            <p
              data-hero="eyebrow"
              className="mb-7 font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              
              The Foundation Framework
            </p>

            <h1
              id="hero-title"
              className="text-[13vw] font-extralight leading-[0.88] tracking-headline text-chalk sm:text-[9vw] lg:text-[6.6vw]">
              
              <span data-hero="word" className="block">
                Digital
              </span>
              <span data-hero="word" className="block">
                Pillars
              </span>
            </h1>

            <p
              data-hero="sub"
              className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted sm:text-lg">
              
              A London growth studio building the structure underneath modern brands — paid
              acquisition, positioning, digital experience and the audience that outlives the spend.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span data-hero="cta" className="inline-block">
                <MagneticButton to="/services">
                  Explore the framework <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </span>
              <span data-hero="cta" className="inline-block">
                <MagneticButton variant="ghost" onClick={() => scrollTo('#contact')}>
                  Start a project
                </MagneticButton>
              </span>
            </div>
          </div>

          {/* Live-feeling instrumentation, anchored into the right of the frame */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-cols-2 lg:gap-4">
            <GlassCard className="col-span-2 lg:col-span-2" max={4}>
              <div data-hero="card" className="p-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Blended ROAS · rolling 90d
                  </p>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    LIVE
                  </span>
                </div>
                <p className="mt-3 text-4xl font-light tracking-tight text-chalk">
                  <Counter value="4.8x" />
                </p>
                <div className="mt-4">
                  <MiniChart series={[22, 31, 28, 44, 51, 62, 71, 84]} />
                </div>
              </div>
            </GlassCard>

            <GlassCard max={4}>
              <div data-hero="card" className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Cost per acquisition
                </p>
                <p className="mt-3 text-2xl font-light text-chalk">
                  <Counter value="−37%" />
                </p>
                <div className="mt-4">
                  <MiniChart variant="bars" series={[86, 74, 68, 55, 47, 41, 33]} color="#E9A85C" />
                </div>
              </div>
            </GlassCard>

            <GlassCard max={4}>
              <div data-hero="card" className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Audience reached
                </p>
                <p className="mt-3 text-2xl font-light text-chalk">
                  <Counter value="2.4M" />
                </p>
                <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
                  Across 31 active client programmes
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        <button
          data-hero="cue"
          type="button"
          onClick={() => scrollTo('#framework')}
          className="group mt-14 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted transition-colors duration-200 hover:text-chalk">
          
          <ArrowDownIcon
            className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5"
            aria-hidden="true" />
          
          Scroll
        </button>
      </div>
    </section>);

}
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, QuoteIcon } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { Reveal } from '../Reveal';
import { GlassCard } from '../GlassCard';

/**
 * Reviews. One quote is featured at full weight at a time — a wall of equal
 * cards flattens the hierarchy and nobody reads the fifth one. Navigation is a
 * native horizontal scroller on touch and arrow-driven on desktop, so it works
 * without JS and is keyboard operable.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);
  const total = TESTIMONIALS.length;

  const go = useCallback(
    (next: number) => {
      const clamped = (next + total) % total;
      setIndex(clamped);
      const rail = railRef.current;
      const item = rail?.children[clamped] as HTMLElement | undefined;
      if (rail && item) rail.scrollTo({ left: item.offsetLeft - rail.offsetLeft, behavior: 'smooth' });
    },
    [total]
  );

  // Keep the counter honest when the user swipes the rail directly.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const children = Array.from(rail.children) as HTMLElement[];
        const nearest = children.reduce(
          (best, el, i) =>
          Math.abs(el.offsetLeft - rail.offsetLeft - rail.scrollLeft) < best.d ?
          { i, d: Math.abs(el.offsetLeft - rail.offsetLeft - rail.scrollLeft) } :
          best,
          { i: 0, d: Infinity }
        );
        setIndex(nearest.i);
      });
    };
    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      rail.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="testimonials" className="relative bg-ink py-24 sm:py-32" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6" perspective>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Chapter IV — The Record
            </p>
            <h2
              id="reviews-title"
              className="mt-5 max-w-2xl text-4xl font-extralight leading-[1.02] tracking-headline text-chalk sm:text-5xl">
              
              What clients say when
              <br />
              the quarter closes.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-3 font-mono text-[10px] tracking-[0.2em] text-muted">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-chalk transition-colors duration-200 hover:border-accent hover:text-accent">
              
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-chalk transition-colors duration-200 hover:border-accent hover:text-accent">
              
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>

      <ul
        ref={railRef}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        {TESTIMONIALS.map((t, i) =>
        <li
          key={t.id}
          className="w-[86vw] shrink-0 snap-start sm:w-[62vw] lg:w-[44vw] xl:w-[36vw]"
          aria-current={i === index ? 'true' : undefined}>
          
            <GlassCard max={3}>
              <figure className="flex h-full flex-col p-7 sm:p-9">
                <QuoteIcon className="h-5 w-5 text-accent/70" aria-hidden="true" />
                <blockquote className="mt-6 text-lg font-light leading-relaxed text-chalk sm:text-xl">
                  {t.quote}
                </blockquote>

                {/* Footers share a baseline via mt-auto, so cards align in the rail. */}
                <figcaption className="mt-auto pt-8">
                  <div className="hairline flex flex-wrap items-end justify-between gap-4 pt-5">
                    <div>
                      <p className="text-sm text-chalk">{t.name}</p>
                      <p className="mt-0.5 text-[13px] font-light text-muted">
                        {t.role}, {t.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {t.result.label}
                      </p>
                      <p className="mt-1 font-mono text-lg text-accent">{t.result.value}</p>
                    </div>
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {t.service}
                  </p>
                </figcaption>
              </figure>
            </GlassCard>
          </li>
        )}
      </ul>
    </section>);

}
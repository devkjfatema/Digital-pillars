import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { Reveal } from '../Reveal';
import { MiniChart } from '../data/MiniChart';

type Props = {
  /** Heading treatment differs between the home section and the /services page. */
  variant?: 'home' | 'page';
};

/**
 * Service index. Each row is a full-width clickable destination rather than a
 * hover card: the list form gives the six services real hierarchy (index,
 * pillar, name, positioning, live metric) and reads faster than a 3×2 grid of
 * identical tiles.
 */
export function ServicesIndex({ variant = 'home' }: Props) {
  return (
    <section id="services" className="relative bg-ink py-24 sm:py-32" aria-labelledby="services-title">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <Reveal className="max-w-3xl" perspective>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            {variant === 'home' ? 'Chapter II — The Framework' : 'Services'}
          </p>
          <h2
            id="services-title"
            className="mt-5 text-4xl font-extralight leading-[1.02] tracking-headline text-chalk sm:text-5xl lg:text-6xl">
            
            Six services.
            <br />
            One ecosystem.
          </h2>
          <p className="mt-7 text-base font-light leading-relaxed text-muted">
            Each one stands on its own and each one is documented in full. Open any service to see
            the deliverables, the method and what we hold ourselves to.
          </p>
        </Reveal>

        <ul className="mt-16">
          {SERVICES.map((service, i) =>
          <Reveal
            key={service.slug}
            as="li"
            from={i % 2 === 0 ? 'left' : 'right'}
            className="hairline block">
            
              <Link
              to={`/services/${service.slug}`}
              className="group grid grid-cols-1 gap-5 py-9 transition-colors duration-200 md:grid-cols-12 md:items-center md:gap-8">
              
                  <div className="flex items-center gap-4 md:col-span-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                      {service.index}
                    </span>
                    <h3 className="text-2xl font-light tracking-tight text-chalk transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:text-3xl">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-[15px] font-light leading-relaxed text-muted md:col-span-5">
                    {service.tagline}
                  </p>

                  <div className="flex items-center justify-between gap-6 md:col-span-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {service.metrics[0].label}
                      </p>
                      <p className="mt-1 font-mono text-base text-chalk">
                        {service.metrics[0].value}
                      </p>
                    </div>
                    {service.metrics[0].series &&
                <div className="hidden w-24 lg:block">
                        <MiniChart series={service.metrics[0].series} />
                      </div>
                }
                    <ArrowUpRightIcon
                  className="h-5 w-5 shrink-0 text-muted transition-[transform,color] duration-200 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true" />
                
                  </div>
              </Link>
            </Reveal>
          )}
        </ul>
      </div>
    </section>);

}
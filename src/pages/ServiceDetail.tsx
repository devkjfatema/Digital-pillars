import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
import { SERVICES, getService } from '../data/services';
import { Reveal } from '../components/Reveal';
import { GlassCard } from '../components/GlassCard';
import { MiniChart } from '../components/data/MiniChart';
import { Counter } from '../components/data/Counter';
import { MagneticButton } from '../components/MagneticButton';
import { ParticleField } from '../components/scene/ParticleField';
import { SceneMedia } from '../components/scene/SceneMedia';
import { Contact } from '../components/sections/Contact';

/**
 * Dedicated destination for one service: /services/:slug
 * Same scene language as the home page — plate, atmosphere, glass
 * instrumentation — so a service page never feels like a sub-page.
 */
export function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <Navigate to="/services" replace />;

  const position = SERVICES.findIndex((s) => s.slug === service.slug);
  const next = SERVICES[(position + 1) % SERVICES.length];

  return (
    <main id="main">
      {/* Scene header */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-ink pb-16 pt-32">
        <SceneMedia
          poster={service.media}
          alt={`${service.name} — Digital Pillars`}
          depth={70}
          overscan={1.16}
          priority />
        
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
            'linear-gradient(180deg, rgba(6,7,10,0.92) 0%, rgba(6,7,10,0.5) 35%, rgba(6,7,10,0.85) 78%, #06070A 100%)'
          }} />
        
        <ParticleField density={40} />

        <div className="relative mx-auto w-full max-w-shell px-6 lg:px-10">
          <Reveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-accent">
              
              <ArrowLeftIcon className="h-3 w-3" aria-hidden="true" /> All services
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7" perspective>
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                {service.index} — {service.pillar}
              </p>
              <h1 className="mt-5 text-4xl font-extralight leading-[1] tracking-headline text-chalk sm:text-6xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-muted">
                {service.tagline}
              </p>
            </Reveal>

            <Reveal className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1" from="right" stagger={0.09}>
              {service.metrics.map((m) =>
              <GlassCard key={m.label} max={4}>
                  <div className="flex items-end justify-between gap-5 p-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {m.label}
                      </p>
                      <p className="mt-2 text-2xl font-light text-chalk">
                        <Counter value={m.value} />
                      </p>
                    </div>
                    {m.series &&
                  <div className="w-20 shrink-0">
                        <MiniChart series={m.series} />
                      </div>
                  }
                  </div>
                </GlassCard>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-ink py-24 sm:py-28">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4" from="left">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                The position
              </p>
            </Reveal>
            <Reveal className="lg:col-span-7" from="right">
              <p className="text-2xl font-extralight leading-[1.35] tracking-tight text-chalk sm:text-3xl">
                {service.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Deliverables + approach */}
      <section className="bg-ink pb-24 sm:pb-28">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" from="left">
              <h2 className="text-3xl font-extralight tracking-headline text-chalk">
                What you receive
              </h2>
              <ul className="mt-8">
                {service.deliverables.map((d) =>
                <li key={d} className="hairline flex gap-4 py-4 first:border-t-0 first:pt-0">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-[15px] font-light leading-relaxed text-chalk/90">{d}</span>
                  </li>
                )}
              </ul>

              <dl className="mt-10 grid grid-cols-1 gap-px">
                {service.engagement.map((e) =>
                <div
                  key={e.label}
                  className="hairline flex items-center justify-between py-3.5 font-mono text-[11px] uppercase tracking-[0.18em]">
                  
                    <dt className="text-muted">{e.label}</dt>
                    <dd className="text-chalk">{e.value}</dd>
                  </div>
                )}
              </dl>
            </Reveal>

            <Reveal className="lg:col-span-6 lg:col-start-7" from="right" stagger={0.09}>
              <h2 className="text-3xl font-extralight tracking-headline text-chalk">The method</h2>
              {service.approach.map((step, i) =>
              <div key={step.title} className="mt-8 flex gap-6">
                  <span className="mt-2 font-mono text-[10px] tracking-[0.2em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-light tracking-tight text-chalk">{step.title}</h3>
                    <p className="mt-2 max-w-lg text-[15px] font-light leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-12">
                <MagneticButton to="/#contact">
                  Discuss this service <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next service */}
      <section className="border-t border-white/5 bg-ink">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Link
            to={`/services/${next.slug}`}
            className="group flex flex-wrap items-center justify-between gap-6 py-12">
            
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Next service — {next.index}
              </p>
              <p className="mt-3 text-3xl font-extralight tracking-headline text-chalk transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:text-4xl">
                {next.name}
              </p>
            </div>
            <ArrowRightIcon
              className="h-6 w-6 text-muted transition-[transform,color] duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden="true" />
            
          </Link>
        </div>
      </section>

      <Contact />
    </main>);

}
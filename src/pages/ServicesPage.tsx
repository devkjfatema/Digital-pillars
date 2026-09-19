import React from 'react';
import { PILLARS, SERVICES } from '../data/services';
import { ServicesIndex } from '../components/sections/ServicesIndex';
import { Contact } from '../components/sections/Contact';
import { Reveal } from '../components/Reveal';
import { ParticleField } from '../components/scene/ParticleField';
import { SceneMedia } from '../components/scene/SceneMedia';

const PLATE = "/pillars-image.jpg";

/** Index of every service, with the pillar grouping stated up front. */
export function ServicesPage() {
  return (
    <main id="main">
      <section className="relative flex min-h-[58svh] items-end overflow-hidden bg-ink pb-16 pt-32">
        <SceneMedia poster={PLATE} depth={60} overscan={1.15} priority />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
            'linear-gradient(180deg, rgba(6,7,10,0.9) 0%, rgba(6,7,10,0.55) 40%, #06070A 100%)'
          }} />
        
        <ParticleField density={34} />

        <div className="relative mx-auto w-full max-w-shell px-6 lg:px-10">
          <Reveal perspective>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              The Foundation Framework
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-extralight leading-[0.98] tracking-headline text-chalk sm:text-6xl lg:text-7xl">
              Services
            </h1>
            <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-muted">
              Three pillars, six services. Grouped by the job they do rather than by the department
              that usually owns them.
            </p>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-1 gap-px sm:grid-cols-3" stagger={0.08}>
            {PILLARS.map((p) =>
            <div key={p.name} className="hairline pr-6 pt-5 sm:border-t">
                <h2 className="text-lg font-light text-chalk">{p.name}</h2>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-muted">{p.blurb}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {SERVICES.filter((s) => s.pillar === p.name).length} services
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <ServicesIndex variant="page" />
      <Contact />
    </main>);

}
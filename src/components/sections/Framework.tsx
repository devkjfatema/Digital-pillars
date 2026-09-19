import React from 'react';
import { PILLARS, SERVICES } from '../../data/services';
import { Reveal } from '../Reveal';
import { SceneMedia } from '../scene/SceneMedia';

const PLATE = "/pillars-image_(1).jpg";
const PLATE_VIDEO = "/assembly-video.mp4";

/**
 * The framework chapter. The environment plate runs at a slower parallax rate
 * than the copy column, so the text reads as standing in front of the structure
 * rather than on top of a picture.
 */
export function Framework() {
  return (
    <section id="framework" className="relative overflow-hidden bg-ink" aria-labelledby="framework-title">
      <div className="relative min-h-[70svh]">
        <SceneMedia poster={PLATE} video={PLATE_VIDEO} depth={90} overscan={1.18} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
            'linear-gradient(180deg, #06070A 0%, rgba(6,7,10,0.55) 28%, rgba(6,7,10,0.8) 70%, #06070A 100%)'
          }} />
        

        <div className="relative mx-auto max-w-shell px-6 py-24 sm:py-32 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" from="left" perspective>
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                Chapter I — The Structure
              </p>
              <h2
                id="framework-title"
                className="mt-5 text-4xl font-extralight leading-[1.02] tracking-headline text-chalk sm:text-5xl lg:text-6xl">
                
                Three pillars.
                <br />
                One structure.
              </h2>
              <p className="mt-7 max-w-md text-base font-light leading-relaxed text-muted">
                Most agencies sell a list of services. We sell the order they go in. Demand is worth
                nothing without something solid for it to land on, and neither lasts without an
                audience that keeps returning once the budget pauses.
              </p>
            </Reveal>

            <Reveal className="space-y-px lg:col-span-7" from="right" stagger={0.09}>
              {PILLARS.map((pillar, i) =>
              <div key={pillar.name} className="hairline py-8 first:border-t-0 first:pt-0">
                  <div className="flex items-start gap-6">
                    <span className="mt-1.5 font-mono text-[10px] tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-light tracking-tight text-chalk sm:text-3xl">
                        {pillar.name}
                      </h3>
                      <p className="mt-2 max-w-md text-[15px] font-light leading-relaxed text-muted">
                        {pillar.blurb}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                        {SERVICES.filter((s) => s.pillar === pillar.name).map((s) =>
                      <li
                        key={s.slug}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/60">
                        
                            {s.name}
                          </li>
                      )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>);

}
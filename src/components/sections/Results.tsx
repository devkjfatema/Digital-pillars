import React from 'react';
import { Reveal } from '../Reveal';
import { GlassCard } from '../GlassCard';
import { Counter } from '../data/Counter';
import { MiniChart } from '../data/MiniChart';
import { SceneMedia } from '../scene/SceneMedia';

const PLATE = "/pillars-image.jpg";
const PLATE_VIDEO = "/desk-video.mp4";

/**
 * Results band. One primary panel carries the headline number at full scale;
 * the supporting metrics sit beside it at reduced weight, so the section has a
 * clear first read instead of four equal tiles.
 */
export function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="results-title">
      <SceneMedia poster={PLATE} video={PLATE_VIDEO} depth={70} overscan={1.2} />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
          'linear-gradient(180deg, #06070A 0%, rgba(6,7,10,0.88) 40%, rgba(6,7,10,0.92) 60%, #06070A 100%)'
        }} />
      

      <div className="relative mx-auto max-w-shell px-6 lg:px-10">
        <Reveal className="max-w-2xl" perspective>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            Chapter III — The Signal
          </p>
          <h2
            id="results-title"
            className="mt-5 text-4xl font-extralight leading-[1.02] tracking-headline text-chalk sm:text-5xl">
            
            Decisions, not dashboards.
          </h2>
          <p className="mt-7 text-base font-light leading-relaxed text-muted">
            Aggregate performance across active client programmes, rolling twelve months. Every
            figure here is one we report on weekly and would defend in a board meeting.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Primary panel — deliberately the largest thing in the section. */}
          <GlassCard className="lg:col-span-7" max={4}>
            <div className="flex h-full flex-col p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Client revenue influenced · 12 months
                </p>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  LIVE
                </span>
              </div>
              <p className="mt-6 text-6xl font-extralight tracking-tight text-chalk sm:text-7xl">
                £<Counter value="18.4" />m
              </p>
              <div className="mt-auto pt-10">
                <MiniChart series={[14, 22, 26, 35, 41, 49, 58, 64, 73, 81, 88, 96]} />
                <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span>Q1</span>
                  <span>Q4</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {[
            { label: 'Average blended ROAS', value: '4.8x', series: [30, 38, 44, 52, 61, 70, 84] },
            { label: 'Reduction in CPA', value: '−37%', series: [84, 72, 65, 54, 47, 40, 33] },
            { label: 'Client retention', value: '94%', series: [60, 66, 72, 78, 84, 90, 94] }].
            map((m) =>
            <GlassCard key={m.label} max={4}>
                <div className="flex h-full flex-col justify-between p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {m.label}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <p className="text-3xl font-light tracking-tight text-chalk">
                      <Counter value={m.value} />
                    </p>
                    <div className="w-20">
                      <MiniChart variant="bars" series={m.series} color="#E9A85C" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </section>);

}
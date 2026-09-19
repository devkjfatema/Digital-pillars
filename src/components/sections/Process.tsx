import React from 'react';
import { Reveal } from '../Reveal';

/**
 * Engagement sequence. Numbered because the order genuinely matters — each
 * step gates the next — and drawn as a vertical spine rather than cards so the
 * sequence itself is the visual.
 */
const STEPS = [
{
  title: 'Enquiry',
  day: 'Day 0',
  body: 'You send a short note. We reply within one working day with a call slot or an honest referral elsewhere.'
},
{
  title: 'Scoping call',
  day: 'Week 1',
  body: 'Thirty minutes on the commercial reality: the target, the constraint, the budget and the deadline. No deck.'
},
{
  title: 'Proposal',
  day: 'Week 1',
  body: 'A fixed scope, a fixed price and the single headline metric the engagement will be judged on.'
},
{
  title: 'Build',
  day: 'Weeks 2–10',
  body: 'Work ships on a published cadence with a weekly written update. You always know what changed and why.'
},
{
  title: 'Compound',
  day: 'Ongoing',
  body: 'Monthly review against the headline metric, with the roadmap re-sequenced from what we actually learned.'
}];


export function Process() {
  return (
    <section id="process" className="relative bg-ink py-24 sm:py-32" aria-labelledby="process-title">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" from="left" perspective>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Chapter V — The Method
            </p>
            <h2
              id="process-title"
              className="mt-5 text-4xl font-extralight leading-[1.02] tracking-headline text-chalk sm:text-5xl">
              
              How an engagement
              <br />
              actually runs.
            </h2>
            <p className="mt-7 max-w-sm text-base font-light leading-relaxed text-muted">
              Five steps, published up front. If we are going to be slow somewhere, you will know
              about it before you sign rather than after.
            </p>
          </Reveal>

          <Reveal className="relative lg:col-span-7 lg:col-start-6" stagger={0.08}>
            {STEPS.map((step, i) =>
            <div key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Spine */}
                <div className="flex flex-col items-center">
                  <span
                  aria-hidden="true"
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                  style={{ opacity: 1 - i * 0.13 }} />
                
                  {i < STEPS.length - 1 &&
                <span aria-hidden="true" className="mt-2 w-px flex-1 bg-white/10" />
                }
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-xl font-light tracking-tight text-chalk">{step.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {step.day}
                    </span>
                  </div>
                  <p className="mt-2 max-w-lg text-[15px] font-light leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>);

}
import React, { useState } from 'react';
import { CheckIcon, Loader2Icon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { GlassCard } from '../GlassCard';
import { MagneticButton } from '../MagneticButton';
import { SERVICES } from '../../data/services';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELDS = [
{ id: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
{ id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
{ id: 'company', label: 'Company', type: 'text', autoComplete: 'organization' }] as
const;

/**
 * Enquiry. Four fields only — anything else is a question better asked on the
 * call. All three submission states are handled visibly.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') || '');
    if (!email.includes('@')) {
      setStatus('error');
      setError('Please enter an email address we can reply to.');
      return;
    }
    setError(null);
    setStatus('sending');
    // Front-end only: swap this for your form endpoint when wiring the backend.
    window.setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <section id="contact" className="relative bg-ink py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-shell px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" from="left" perspective>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Client enquiry
            </p>
            <h2
              id="contact-title"
              className="mt-5 text-5xl font-extralight leading-[0.98] tracking-headline text-chalk sm:text-6xl">
              
              Build your
              <br />
              pillars.
            </h2>
            <p className="mt-7 max-w-sm text-base font-light leading-relaxed text-muted">
              Tell us what you are building and what is currently in the way. We reply within one
              working day, and we will say so plainly if we are not the right studio for it.
            </p>

            <dl className="mt-12 space-y-0">
              {[
              ['Reply within', '1 working day'],
              ['No obligation', 'Just a conversation'],
              ['Based in', 'London — working worldwide']].
              map(([k, v]) =>
              <div
                key={k}
                className="hairline flex items-center justify-between py-4 font-mono text-[11px] uppercase tracking-[0.18em]">
                
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-chalk">{v}</dd>
                </div>
              )}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" from="right">
            <GlassCard max={3}>
              <div className="p-7 sm:p-9">
                {status === 'sent' ?
                <div className="flex min-h-[22rem] flex-col items-start justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-6 text-2xl font-light text-chalk">Enquiry received.</p>
                    <p className="mt-3 max-w-sm text-[15px] font-light leading-relaxed text-muted">
                      You will hear from us within one working day, from a real person who has read
                      it properly.
                    </p>
                  </div> :

                <form onSubmit={onSubmit} noValidate>
                    <div className="space-y-5">
                      {FIELDS.map((f) =>
                    <div key={f.id}>
                          <label
                        htmlFor={f.id}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        
                            {f.label}
                          </label>
                          <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        required
                        className="mt-2 w-full border-b border-white/10 bg-transparent pb-2.5 text-[15px] font-light text-chalk outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-accent"
                        placeholder={f.id === 'email' ? 'you@company.com' : ''} />
                      
                        </div>
                    )}

                      <div>
                        <label
                        htmlFor="interest"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        
                          Interested in
                        </label>
                        <select
                        id="interest"
                        name="interest"
                        className="mt-2 w-full border-b border-white/10 bg-transparent pb-2.5 text-[15px] font-light text-chalk outline-none transition-colors duration-200 focus:border-accent"
                        defaultValue={SERVICES[0].name}>
                        
                          {SERVICES.map((s) =>
                        <option key={s.slug} value={s.name} className="bg-ink-raised">
                              {s.name}
                            </option>
                        )}
                          <option value="Not sure yet" className="bg-ink-raised">
                            Not sure yet
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                        htmlFor="brief"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        
                          What are you building?
                        </label>
                        <textarea
                        id="brief"
                        name="brief"
                        rows={3}
                        className="mt-2 w-full resize-none border-b border-white/10 bg-transparent pb-2.5 text-[15px] font-light text-chalk outline-none transition-colors duration-200 focus:border-accent" />
                      
                      </div>
                    </div>

                    {error &&
                  <p role="alert" className="mt-5 text-[13px] text-signal">
                        {error}
                      </p>
                  }

                    <div className="mt-8 flex items-center gap-4">
                      <MagneticButton type="submit">
                        {status === 'sending' ?
                      <>
                            <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending
                          </> :

                      'Build your pillars'
                      }
                      </MagneticButton>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        hello@thepillars.co
                      </p>
                    </div>
                  </form>
                }
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-shell px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[13px] font-light uppercase tracking-[0.3em] text-chalk">
              Digital Pillars
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted">
              Structure for brands that intend to still be here in ten years.
            </p>
          </div>

          <nav aria-label="Services">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) =>
              <li key={s.slug}>
                  <Link
                  to={`/services/${s.slug}`}
                  className="text-sm font-light text-chalk/80 transition-colors duration-200 hover:text-accent">
                  
                    {s.name}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <nav aria-label="Studio">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Studio</p>
            <ul className="mt-4 space-y-2.5">
              {[
              { label: 'Approach', to: '/#framework' },
              { label: 'Results', to: '/#results' },
              { label: 'Reviews', to: '/#testimonials' },
              { label: 'Start a project', to: '/#contact' }].
              map((l) =>
              <li key={l.label}>
                  <Link
                  to={l.to}
                  className="text-sm font-light text-chalk/80 transition-colors duration-200 hover:text-accent">
                  
                    {l.label}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm font-light text-chalk/80">
              <li>
                <a
                  href="mailto:hello@thepillars.co"
                  className="transition-colors duration-200 hover:text-accent">
                  
                  hello@thepillars.co
                </a>
              </li>
              <li>London — working worldwide</li>
              <li>Reply within 1 working day</li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col justify-between gap-3 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Digital Pillars</span>
          <span>Built in London</span>
        </div>
      </div>
    </footer>);

}
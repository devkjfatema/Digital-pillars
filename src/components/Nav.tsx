import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { SERVICES } from '../data/services';

const LINKS = [
{ label: 'Services', to: '/services' },
{ label: 'Approach', to: '/#framework' },
{ label: 'Results', to: '/#results' },
{ label: 'Reviews', to: '/#testimonials' }];


/**
 * Fixed navigation. Transparent over the hero, glass once the page moves —
 * a colour/opacity change only, so it never triggers layout.
 */
export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ease-[var(--ease-out-expo)] ${
      solid ? 'border-b border-white/5 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'}`
      }>
      
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-shell items-center justify-between px-6 py-4 lg:px-10">
        
        <Link
          to="/"
          className="flex items-baseline gap-2.5 text-chalk"
          aria-label="Digital Pillars — home">
          
          <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
            <span className="block h-2.5 w-[2px] bg-accent/70" />
            <span className="block h-4 w-[2px] bg-accent" />
            <span className="block h-2.5 w-[2px] bg-accent/70" />
          </span>
          <span className="text-[13px] font-light uppercase tracking-[0.3em]">Digital Pillars</span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) =>
          <Link
            key={l.label}
            to={l.to}
            className="text-[12px] font-light tracking-wide text-muted transition-colors duration-200 hover:text-chalk">
            
              {l.label}
            </Link>
          )}
          <Link
            to="/#contact"
            className="rounded-full border border-white/[0.15] px-5 py-2 text-[12px] tracking-wide text-chalk transition-colors duration-200 hover:border-accent hover:text-accent">
            
            Start a project
          </Link>
        </div>

        <button
          type="button"
          className="text-chalk md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}>
          
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile: a full sheet with the services listed flat — no nested menus. */}
      {open &&
      <div
        id="mobile-menu"
        ref={panelRef}
        className="border-t border-white/5 bg-ink/95 px-6 pb-8 pt-4 backdrop-blur-xl md:hidden">
        
          <button
          type="button"
          onClick={() => setOpen(false)}
          className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          
            <XIcon className="h-3.5 w-3.5" aria-hidden="true" /> Close
          </button>
          <ul className="space-y-1">
            {LINKS.map((l) =>
          <li key={l.label}>
                <Link to={l.to} className="block py-2.5 text-xl font-light text-chalk">
                  {l.label}
                </Link>
              </li>
          )}
          </ul>
          <p className="mb-2 mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Services
          </p>
          <ul className="space-y-0.5">
            {SERVICES.map((s) =>
          <li key={s.slug}>
                <Link
              to={`/services/${s.slug}`}
              className="flex items-baseline gap-3 py-2 text-[15px] font-light text-muted">
              
                  <span className="font-mono text-[10px] text-accent">{s.index}</span>
                  {s.name}
                </Link>
              </li>
          )}
          </ul>
          <Link
          to="/#contact"
          className="mt-6 block rounded-full bg-accent px-5 py-3 text-center text-[13px] font-medium text-ink">
          
            Start a project
          </Link>
        </div>
      }
    </header>);

}
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon, XIcon } from 'lucide-react';
import { FAQ, FaqEntry } from '../data/faq';
import { useEnvironment } from '../hooks/useEnvironment';

/**
 * Corner assistant.
 *
 * Intentionally not a chat bubble: there is no input field, because there is no
 * model behind it. The visitor picks from a closed set of questions and gets the
 * answer we would give on a call. Two states only — question list, single answer.
 */
export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<FaqEntry | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { reducedMotion } = useEnvironment();

  // Escape closes; focus returns to the trigger so keyboard users are not stranded.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('button, a')?.focus();else
    setActive(null);
  }, [open]);

  const transition = reducedMotion ?
  undefined :
  { transition: 'opacity 220ms var(--ease-out-expo), transform 220ms var(--ease-out-expo)' };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Digital Pillars assistant"
        aria-hidden={!open}
        className={`glass pointer-events-auto w-[min(21rem,calc(100vw-2.5rem))] origin-bottom-right rounded-2xl ${
        open ? 'opacity-100' : 'pointer-events-none translate-y-2 scale-95 opacity-0'}`
        }
        style={transition}>
        
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk">
              Pillar Assistant
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label="Close assistant"
            className="text-muted transition-colors duration-200 hover:text-chalk"
            tabIndex={open ? 0 : -1}>
            
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {!active ?
          <>
              <p className="px-1 pb-2 pt-1 text-[13px] font-light leading-relaxed text-muted">
                Pick a question — these are the ones we are asked most.
              </p>
              <ul className="space-y-1">
                {FAQ.map((entry) =>
              <li key={entry.id}>
                    <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setActive(entry)}
                  className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-light text-chalk transition-colors duration-200 hover:bg-white/[0.06]">
                  
                      {entry.question}
                      <ArrowRightIcon
                    className="h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true" />
                  
                    </button>
                  </li>
              )}
              </ul>
            </> :

          <div className="px-1">
              <p className="text-[13px] font-medium text-chalk">{active.question}</p>
              <p className="mt-2.5 text-[13px] font-light leading-relaxed text-muted">
                {active.answer}
              </p>
              {active.link &&
            <Link
              to={active.link.to}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-accent transition-colors duration-200 hover:text-accent-soft">
              
                  {active.link.label}
                  <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
            }
              <button
              type="button"
              onClick={() => setActive(null)}
              className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-chalk">
              
                <ArrowLeftIcon className="h-3 w-3" aria-hidden="true" /> All questions
              </button>
            </div>
          }
        </div>
      </div>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className="glass pointer-events-auto flex items-center gap-2.5 rounded-full py-3 pl-4 pr-5 text-[12px] font-light text-chalk transition-[transform,border-color] duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.97]">
        
        <SparklesIcon className="h-4 w-4 text-accent" aria-hidden="true" />
        Ask us anything
      </button>
    </div>);

}
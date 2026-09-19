export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  /** Optional follow-up link surfaced under the answer. */
  link?: {label: string;to: string;};
};

/**
 * Pre-loaded assistant script. Deliberately a closed set — the visitor picks a
 * question rather than typing, so every answer is one we would actually give.
 */
export const FAQ: FaqEntry[] = [
{
  id: 'services',
  question: 'What services do you offer?',
  answer:
  'Six, grouped into three pillars. Acquire: performance advertising and creator partnerships. Build: brand strategy and websites. Compound: social presence and growth consulting. Most clients start with one and add a second within a quarter.',
  link: { label: 'See all services', to: '/services' }
},
{
  id: 'start',
  question: 'How do I get started?',
  answer:
  'Send us a short note about what you are building. We reply within one working day with either a 30-minute call slot or an honest referral if we are not the right studio for it. No pitch deck, no discovery fee.',
  link: { label: 'Start a project', to: '/#contact' }
},
{
  id: 'turnaround',
  question: "What's your typical turnaround?",
  answer:
  'Paid media accounts are live within 10 working days of kickoff. Brand strategy runs 6–8 weeks. Site builds run 4–10 weeks depending on page count. Retainers report weekly from week one.'
},
{
  id: 'pricing',
  question: 'How does pricing work?',
  answer:
  'Projects are fixed-scope and fixed-price, quoted after a single scoping call. Retainers are monthly with a three-month minimum so there is time for the work to compound. No percentage-of-spend fees.'
},
{
  id: 'fit',
  question: 'Who do you work best with?',
  answer:
  'Founder-led brands between roughly £500k and £15m turnover with something genuinely good to sell and the appetite to test. We are a small senior studio, so we take a limited number of clients at a time.'
},
{
  id: 'reporting',
  question: 'How will I know it is working?',
  answer:
  'A live dashboard from day one plus a written weekly commentary explaining what changed, what we learned and what we are doing next. Every engagement has a single headline metric agreed before we start.',
  link: { label: 'See client results', to: '/#results' }
}];
/**
 * Service catalogue.
 *
 * Grouping rationale: six services were reading as a flat feature list, so they
 * are organised into three "pillars" that map to the brand metaphor and to how
 * a client actually buys — Acquire (demand), Build (the asset), Compound
 * (the ongoing return). Every service has its own route: /services/:slug
 */

export type ServiceMetric = {
  label: string;
  value: string;
  /** Optional sparkline series, 0–100 normalised, used by the mini charts. */
  series?: number[];
};

export type Service = {
  slug: string;
  index: string;
  name: string;
  pillar: 'Acquire' | 'Build' | 'Compound';
  tagline: string;
  /** One-paragraph positioning used on the index grid. */
  summary: string;
  /** Long-form opening on the dedicated page. */
  intro: string;
  deliverables: string[];
  approach: {title: string;body: string;}[];
  metrics: ServiceMetric[];
  media: string;
  engagement: {label: string;value: string;}[];
};

export const SERVICES: Service[] = [
{
  slug: 'performance-advertising',
  index: '01',
  name: 'Performance Advertising',
  pillar: 'Acquire',
  tagline: 'Paid social that is accountable to revenue, not impressions.',
  summary:
  'Meta and paid social campaigns built around contribution margin. We own creative, structure, testing and reporting end to end, and we report on the number that pays your invoices.',
  intro:
  'Most paid social accounts are not underperforming because of bidding. They are underperforming because the creative has nothing left to say and nobody is reading the data weekly. We rebuild the account around a clear testing thesis, ship creative on a fixed cadence, and hold every campaign to a contribution-margin target agreed with you before launch.',
  deliverables: [
  'Full account audit, restructure and tracking validation',
  'Monthly creative slate — static, motion and UGC-style concepts',
  'Structured testing roadmap with documented hypotheses',
  'Audience, offer and landing-page iteration cycles',
  'Live reporting dashboard with weekly written commentary'],

  approach: [
  {
    title: 'Diagnose',
    body: 'We map current spend against real margin, validate the tracking stack, and identify where budget is being absorbed without return.'
  },
  {
    title: 'Rebuild',
    body: 'Account structure is simplified to a testable shape: clean prospecting, disciplined retargeting, and a creative pipeline that always has the next test ready.'
  },
  {
    title: 'Compound',
    body: 'Winning angles are scaled deliberately and losing ones retired fast. Every decision is logged, so the account gets smarter month over month.'
  }],

  metrics: [
  { label: 'Blended ROAS', value: '4.8x', series: [22, 31, 28, 44, 51, 62, 71, 84] },
  { label: 'Cost per acquisition', value: '−37%', series: [86, 78, 74, 61, 55, 46, 41, 33] },
  { label: 'Creative tests / mo', value: '24' }],

  media: "/pillars-image.jpg",
  engagement: [
  { label: 'Engagement', value: 'Monthly retainer' },
  { label: 'Minimum term', value: '3 months' },
  { label: 'Onboarding', value: '10 working days' }]

},
{
  slug: 'influencer-partnerships',
  index: '02',
  name: 'Influencer & Creator Partnerships',
  pillar: 'Acquire',
  tagline: 'Creator programmes managed like a media channel.',
  summary:
  'Sourcing, negotiation, briefing and rights management for creator partnerships — measured with the same rigour as paid, and feeding your ad account with proven creative.',
  intro:
  'Creator marketing fails when it is treated as a favour exchange. We run it as a channel: a shortlist built from audience overlap rather than follower count, commercial terms written down, briefs that protect the creator voice while covering the message, and usage rights secured so the best performing content can be put behind paid spend.',
  deliverables: [
  'Creator shortlisting with audience and overlap analysis',
  'Rate benchmarking, negotiation and contracting',
  'Creative briefs written to protect authentic voice',
  'Whitelisting and paid usage rights secured up front',
  'Per-creator performance reporting against agreed KPIs'],

  approach: [
  {
    title: 'Shortlist',
    body: 'We build a tiered roster from real audience data — overlap, comment quality and historical conversion — not follower vanity.'
  },
  {
    title: 'Contract',
    body: 'Commercials, deliverables, exclusivity and paid usage are agreed in writing before a single brief goes out.'
  },
  {
    title: 'Recycle',
    body: 'Top-performing organic assets are moved into the paid account under whitelisting, where they usually outperform studio creative.'
  }],

  metrics: [
  { label: 'Creator retention', value: '81%', series: [40, 46, 52, 58, 63, 70, 76, 81] },
  { label: 'Cost per view', value: '£0.011' },
  { label: 'Assets licensed / qtr', value: '60+' }],

  media: "/pillars-image_(1).jpg",
  engagement: [
  { label: 'Engagement', value: 'Programme retainer' },
  { label: 'Minimum term', value: '1 campaign cycle' },
  { label: 'Onboarding', value: '2 weeks' }]

},
{
  slug: 'brand-strategy',
  index: '03',
  name: 'Brand Strategy',
  pillar: 'Build',
  tagline: 'Positioning that survives contact with a crowded feed.',
  summary:
  'Market and category analysis, positioning, messaging architecture and identity direction — the layer that makes every downstream campaign cheaper to run.',
  intro:
  'Acquisition costs are a brand problem before they are a media problem. We establish what you actually stand for against the alternatives a buyer is weighing, then write it down in a form your team, your creators and your media buyer can all execute against without re-interpreting it every quarter.',
  deliverables: [
  'Category, competitor and audience research',
  'Positioning statement and proof hierarchy',
  'Messaging architecture with tested proof points',
  'Tone of voice with written do / do-not examples',
  'Identity direction and applied brand guidelines'],

  approach: [
  {
    title: 'Interrogate',
    body: 'Stakeholder and customer interviews, category mapping, and an honest read on where the current story is losing attention.'
  },
  {
    title: 'Define',
    body: 'A single positioning line, the proof that backs it, and the messaging hierarchy that translates it to every surface.'
  },
  {
    title: 'Apply',
    body: 'Guidelines are delivered as working templates — ad frameworks, page structures, content pillars — not a PDF that goes unopened.'
  }],

  metrics: [
  { label: 'Message recall lift', value: '+42%', series: [18, 24, 33, 39, 48, 57, 66, 74] },
  { label: 'Research interviews', value: '18' },
  { label: 'Delivery', value: '6 weeks' }],

  media: "/svc-brand.jpg",
  engagement: [
  { label: 'Engagement', value: 'Fixed-scope project' },
  { label: 'Typical length', value: '6–8 weeks' },
  { label: 'Output', value: 'Applied brand system' }]

},
{
  slug: 'websites-and-experience',
  index: '04',
  name: 'Websites & Digital Experience',
  pillar: 'Build',
  tagline: 'Sites engineered for conversion and for the people who maintain them.',
  summary:
  'Design and build of marketing sites and landing systems — fast, accessible, measurable, and handed over with documentation your team can actually work from.',
  intro:
  'A site is the only asset in the funnel you fully own. We design and build marketing sites and landing-page systems that load quickly on ordinary connections, hold a visual standard under real content, and are instrumented from day one so the next iteration is informed rather than guessed.',
  deliverables: [
  'Information architecture and conversion-led wireframes',
  'Full visual design in your brand system',
  'Responsive, accessible front-end build (WCAG AA)',
  'Analytics, event tracking and conversion instrumentation',
  'Documented handover and maintenance guide'],

  approach: [
  {
    title: 'Architect',
    body: 'We settle what each page has to do and in what order, before a single pixel is drawn.'
  },
  {
    title: 'Build',
    body: 'Modular, commented front-end code with a performance budget enforced throughout — not retro-fitted at the end.'
  },
  {
    title: 'Hand over',
    body: 'You receive the system, the documentation and a working knowledge of it. No dependency on us to change a headline.'
  }],

  metrics: [
  { label: 'Lighthouse performance', value: '96', series: [52, 61, 68, 74, 81, 88, 92, 96] },
  { label: 'Largest contentful paint', value: '1.4s' },
  { label: 'Accessibility', value: 'WCAG AA' }],

  media: "/screencapture-file-C-Users-User-Downloads-digital-pillars-final-digital-pillars-final-index-html-2026-09-19-10_29_40.png",

  engagement: [
  { label: 'Engagement', value: 'Fixed-scope project' },
  { label: 'Typical length', value: '4–10 weeks' },
  { label: 'Handover', value: 'Code + documentation' }]

},
{
  slug: 'social-presence',
  index: '05',
  name: 'Social Presence',
  pillar: 'Compound',
  tagline: 'An owned audience that keeps paying after the spend stops.',
  summary:
  'Content strategy, production cadence and community management across the platforms that matter to your buyers — built to compound rather than to fill a calendar.',
  intro:
  'Organic social is the cheapest place to learn what your market responds to, and the most expensive place to be inconsistent. We set content pillars grounded in your positioning, run a production cadence you can sustain, and manage community response so the account behaves like a business rather than a broadcast feed.',
  deliverables: [
  'Channel strategy and content pillar definition',
  'Monthly content calendar with production schedule',
  'Short-form motion, static and carousel production',
  'Community management and response guidelines',
  'Monthly performance review with next-cycle direction'],

  approach: [
  {
    title: 'Frame',
    body: 'Content pillars are derived from positioning, so organic and paid finally tell the same story.'
  },
  {
    title: 'Produce',
    body: 'A repeatable cadence sized to your resources, with batching so quality does not collapse in week three.'
  },
  {
    title: 'Listen',
    body: 'Comment and DM patterns are treated as research and fed straight back into creative and messaging.'
  }],

  metrics: [
  { label: 'Engaged followers', value: '+2.4M', series: [12, 20, 27, 38, 47, 59, 68, 79] },
  { label: 'Avg. watch-through', value: '64%' },
  { label: 'Posts / month', value: '32' }],

  media: "/pillars-image.jpg",
  engagement: [
  { label: 'Engagement', value: 'Monthly retainer' },
  { label: 'Minimum term', value: '3 months' },
  { label: 'Onboarding', value: '2 weeks' }]

},
{
  slug: 'growth-consulting',
  index: '06',
  name: 'Growth Consulting',
  pillar: 'Compound',
  tagline: 'Senior direction for teams who want to own it in-house.',
  summary:
  'Strategic planning, channel and budget modelling, team structure and measurement frameworks — for founders building the capability internally rather than outsourcing it forever.',
  intro:
  'Some clients do not need an agency to run the work. They need someone senior in the room who has seen the failure modes before. Consulting engagements give you the strategy, the measurement framework and the hiring plan to build it internally, with a standing line to us while you do.',
  deliverables: [
  'Growth model with channel and budget allocation',
  'Measurement framework and reporting specification',
  'Team structure, hiring profiles and capability map',
  'Quarterly roadmap with sequenced priorities',
  'Fortnightly working sessions with your leadership'],

  approach: [
  {
    title: 'Audit',
    body: 'A full read of current channels, spend, tooling and team against the growth target you are actually accountable for.'
  },
  {
    title: 'Model',
    body: 'A plain-language growth model showing what has to be true at each channel for the target to be reachable.'
  },
  {
    title: 'Enable',
    body: 'Frameworks, templates and working sessions that leave the capability in your team rather than on our retainer.'
  }],

  metrics: [
  { label: 'Planning horizon', value: '4 qtrs', series: [30, 36, 44, 49, 58, 66, 72, 80] },
  { label: 'Session cadence', value: 'Fortnightly' },
  { label: 'Channels modelled', value: '7' }],

  media: "/pillars-image_(1).jpg",
  engagement: [
  { label: 'Engagement', value: 'Advisory retainer' },
  { label: 'Minimum term', value: '1 quarter' },
  { label: 'Format', value: 'Remote + on-site' }]

}];


export const PILLARS: {name: 'Acquire' | 'Build' | 'Compound';blurb: string;}[] = [
{ name: 'Acquire', blurb: 'Demand you can turn up, measure and defend.' },
{ name: 'Build', blurb: 'The assets the demand lands on, and the story they carry.' },
{ name: 'Compound', blurb: 'The return that keeps arriving after the spend stops.' }];


export function getService(slug?: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
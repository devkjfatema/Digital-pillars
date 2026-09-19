export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Headline result, shown as a small live-feeling data chip on the card. */
  result: {label: string;value: string;};
  service: string;
};

export const TESTIMONIALS: Testimonial[] = [
{
  id: 't1',
  quote:
  'They rebuilt the Meta account in three weeks and, for the first time, the reporting matched what we saw in Shopify. We stopped arguing about attribution and started making decisions.',
  name: 'Priya Raman',
  role: 'Founder',
  company: 'Northwell Supply',
  result: { label: 'Contribution margin', value: '+64%' },
  service: 'Performance Advertising'
},
{
  id: 't2',
  quote:
  'The positioning work was uncomfortable in the best way. Six weeks later our creators, our media buyer and our site were finally saying the same thing.',
  name: 'Daniel Okoye',
  role: 'Marketing Director',
  company: 'Havn Studio',
  result: { label: 'Cost per acquisition', value: '−41%' },
  service: 'Brand Strategy'
},
{
  id: 't3',
  quote:
  'The site launched on time, scored 96 on Lighthouse and I can edit it myself. I have never been able to say all three of those things about an agency build.',
  name: 'Marta Lindqvist',
  role: 'Head of Digital',
  company: 'Ferro Athletics',
  result: { label: 'Checkout conversion', value: '+2.9pt' },
  service: 'Websites & Digital Experience'
},
{
  id: 't4',
  quote:
  'Our creator programme went from ad-hoc gifting to a proper channel with contracts, usage rights and numbers we can take to the board.',
  name: 'Jonas Weber',
  role: 'Co-founder',
  company: 'Loam Collective',
  result: { label: 'Cost per view', value: '£0.009' },
  service: 'Influencer & Creator Partnerships'
},
{
  id: 't5',
  quote:
  'We wanted the capability in-house, and they built it with us instead of protecting a retainer. That honesty is why we still work together.',
  name: 'Amara Bright',
  role: 'CEO',
  company: 'Fieldnote',
  result: { label: 'In-house channels', value: '5 of 7' },
  service: 'Growth Consulting'
}];
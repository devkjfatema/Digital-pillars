import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Framework } from '../components/sections/Framework';
import { ServicesIndex } from '../components/sections/ServicesIndex';
import { Results } from '../components/sections/Results';
import { Testimonials } from '../components/sections/Testimonials';
import { Process } from '../components/sections/Process';
import { Contact } from '../components/sections/Contact';

type Props = {
  heroMedia?: 'cinematic' | 'still';
  ambientMotion?: boolean;
};

export function Home({ heroMedia = 'cinematic', ambientMotion = true }: Props) {
  return (
    <main id="main">
      <Hero plate={heroMedia === 'cinematic'} ambient={ambientMotion} />
      <Framework />
      <ServicesIndex />
      <Results />
      <Testimonials />
      <Process />
      <Contact />
    </main>);

}
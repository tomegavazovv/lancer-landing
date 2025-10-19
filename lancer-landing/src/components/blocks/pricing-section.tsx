'use client';

import { TwoTierPricing } from './two-tier-pricing';
import { Testimonials } from './testimonials';
import { FaqWrapper } from './faq-wrapper';

interface PricingSectionProps {
  onBookDemo: () => void;
}

export function PricingSection({ onBookDemo }: PricingSectionProps) {
  return (
    <section className='relative bg-gradient-to-b from-background via-muted/20 to-background'>
      <TwoTierPricing onBookDemo={onBookDemo} />
      <Testimonials />
      <FaqWrapper />
    </section>
  );
}


'use client';

import { FaqWrapper } from './faq-wrapper';
import { TwoTierPricing } from './two-tier-pricing';

interface PricingSectionProps {
  onBookDemo: (source?: string) => void;
}

export function PricingSection({ onBookDemo }: PricingSectionProps) {
  return (
    <section className='relative' style={{ backgroundColor: '#0A0A0A' }}>
      <TwoTierPricing onBookDemo={onBookDemo} />
      <FaqWrapper />
    </section>
  );
}

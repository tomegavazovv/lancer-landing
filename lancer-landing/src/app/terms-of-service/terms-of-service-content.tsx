'use client';

import { Navbar } from '@/layout/navbar';

export function TermsOfServiceContent() {
  const handleBookDemo = () => {
    window.open('https://calendly.com/tome-lancer/lancer-demo', '_blank');
  };

  const handleGetStarted = () => {
    window.open('https://1.lancer.app', '_blank');
  };

  return (
    <Navbar
      isOverDarkSection={true}
      onBookDemo={handleBookDemo}
      onGetStarted={handleGetStarted}
    />
  );
}

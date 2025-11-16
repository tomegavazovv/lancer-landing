'use client';

import { Navbar } from '@/layout/navbar';

interface TermsOfServiceContentProps {
  onBookDemo: () => void;
}

export function TermsOfServiceContent({
  onBookDemo,
}: TermsOfServiceContentProps) {
  const handleGetStarted = () => {
    window.open('https://1.lancer.app', '_blank');
  };

  return (
    <Navbar
      isOverDarkSection={true}
      onBookDemo={onBookDemo}
      onGetStarted={handleGetStarted}
    />
  );
}

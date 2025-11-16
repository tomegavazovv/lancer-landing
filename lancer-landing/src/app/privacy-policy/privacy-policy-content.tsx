'use client';

import { Navbar } from '@/layout/navbar';

interface PrivacyPolicyContentProps {
  onBookDemo: () => void;
}

export function PrivacyPolicyContent({
  onBookDemo,
}: PrivacyPolicyContentProps) {
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

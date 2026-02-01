'use client';

import { Navbar } from '@/layout/navbar';
import { Suspense } from 'react';

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
    <Suspense fallback={<div className="h-20" />}>
      <Navbar
        isOverDarkSection={true}
        onBookDemo={onBookDemo}
        onGetStarted={handleGetStarted}
      />
    </Suspense>
  );
}

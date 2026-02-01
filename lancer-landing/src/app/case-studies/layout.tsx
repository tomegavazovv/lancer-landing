'use client';

import { CalendlyModal } from '@/components/ui/calendly-modal';
import { Footer } from '@/layout/footer';
import { Navbar } from '@/layout/navbar';
import { Suspense, useState } from 'react';

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);

  const handleBookDemo = () => {
    setIsCalendlyModalOpen(true);
  };

  const handleGetStarted = () => {
    window.open('https://1.lancer.app', '_blank');
  };

  return (
    <div className='bg-[#0A0A0A] min-h-screen'>
      <Suspense fallback={<div className="h-20" />}>
        <Navbar
          isOverDarkSection={true}
          onBookDemo={handleBookDemo}
          onGetStarted={handleGetStarted}
        />
      </Suspense>
      {children}
      <Footer />
      <CalendlyModal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
      />
    </div>
  );
}

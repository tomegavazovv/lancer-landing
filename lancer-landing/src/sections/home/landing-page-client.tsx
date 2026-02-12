'use client';

import { CalendlyModal } from '@/components/ui/calendly-modal';
import { EmailModal } from '@/components/ui/email-modal';
import React from 'react';

interface LandingPageContextType {
  onBookDemo: () => void;
}

const LandingPageContext = React.createContext<LandingPageContextType | null>(
  null
);

export function useLandingPageActions() {
  const context = React.useContext(LandingPageContext);
  if (!context) {
    return {
      onBookDemo: () => {},
    };
  }
  return context;
}

interface LandingPageProviderProps {
  children: React.ReactNode;
}

export function LandingPageProvider({ children }: LandingPageProviderProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      onBookDemo: () => setIsCalendlyModalOpen(true),
    }),
    []
  );

  return (
    <LandingPageContext.Provider value={contextValue}>
      {children}
      <CalendlyModal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
      />
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </LandingPageContext.Provider>
  );
}

'use client';

import React from 'react';
import { Features } from './features';
import { Footer } from './footer';
import { Hero } from './hero';
import {
  LandingPageProvider,
  useLandingPageActions,
} from './landing-page-client';
import { Navbar } from './navbar';
import { PricingSection } from './pricing-section';
import SalesPitch1 from './sales-pitch-1';
import { StatisticsSection } from './statistics-section';
import { Testimonials } from './testimonials';
import TrustedUsers from './trusted-users';

function LandingPageContent() {
  const [isOverDarkSection] = React.useState(true);
  const { onVideoClick, onBookDemo } = useLandingPageActions();

  return (
    <>
      <Navbar
        isOverDarkSection={isOverDarkSection}
        onBookDemo={onBookDemo}
        onGetStarted={() => window.open('https://1.lancer.app', '_blank')}
      />
      <main className='overflow-hidden'>
        <div
          aria-hidden
          className='z-0 absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block'
        >
          <div className='w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
          <div className='h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
          <div className='h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' />
        </div>

        <Hero onVideoClick={onVideoClick} />
        <TrustedUsers />
        <div className='hidden md:block'></div>
        <Features />
        <SalesPitch1 />
        <Testimonials />
        <StatisticsSection />
        <PricingSection onBookDemo={onBookDemo} />
      </main>

      <Footer />
    </>
  );
}

export function LandingPage() {
  return (
    <LandingPageProvider>
      <LandingPageContent />
    </LandingPageProvider>
  );
}

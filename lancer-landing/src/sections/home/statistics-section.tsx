'use client';

import { CTAButton } from '@/components/ui/cta-button';
import { LinkPreview } from '@/components/ui/link-preview';
import { Particles } from '@/components/ui/particles';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export function StatisticsSection() {
  const handleGetStarted = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='relative' style={{ backgroundColor: '#0A0A0A' }}>
      <div className='relative py-36'>
        <Particles
          className='absolute inset-0'
          quantity={100}
          staticity={30}
          ease={50}
          color='white'
          refresh={false}
        />
        <div className='relative z-10 mx-auto max-w-7xl px-6 text-center'>
          <h2 className='text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent'>
            2,884
          </h2>
          <p className='mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-white/80'>
            Upwork client conversations started by Lancer users in the last 30
            days
          </p>
          <div className='mt-4 flex items-center justify-center gap-2 text-sm md:text-base font-medium text-white/70'>
            <LinkPreview
              isStatic={true}
              imageSrc='https://i.pinimg.com/736x/f2/38/54/f2385487f44aaef17b7674249bcfa39c.jpg'
              width={200}
              height={200}
              className='cursor-pointer hover:underline z-50'
            >
              <TextGenerateEffect
                words='💤 while they were sleeping 💤'
                className='text-sm md:text-base font-medium text-white/70 text-underline'
                duration={1}
              />
            </LinkPreview>
          </div>
          <div className='mt-8 flex flex-col items-center justify-center gap-2 md:flex-row'>
            <CTAButton onClick={handleGetStarted}>
              <span className='text-nowrap'>Get Started</span>
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

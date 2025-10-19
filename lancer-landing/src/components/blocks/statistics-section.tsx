'use client';

import { Button } from '@/components/ui/button';
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
    <section className='relative'>
      <div className='relative py-36'>
        <Particles
          className='absolute inset-0'
          quantity={100}
          staticity={30}
          ease={50}
          color='black'
          refresh={false}
        />
        <div className='relative z-10 mx-auto max-w-7xl px-6 text-center'>
          <div className='text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent'>
            2,884
          </div>
          <p className='mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Upwork client conversations started by Lancer users in the last 30
            days
          </p>
          <div className='mt-4 flex items-center justify-center gap-2 text-sm md:text-base font-medium text-muted-foreground/80'>
            <LinkPreview
              isStatic={true}
              imageSrc='https://i.pinimg.com/736x/f2/38/54/f2385487f44aaef17b7674249bcfa39c.jpg'
              width={200}
              height={200}
              className='cursor-pointer hover:underline z-50'
            >
              <TextGenerateEffect
                words='💤 while they were sleeping 💤'
                className='text-sm md:text-base font-medium text-muted-foreground/80 text-underline'
                duration={1}
              />
            </LinkPreview>
          </div>
          <div className='mt-8 flex flex-col items-center justify-center gap-2 md:flex-row'>
            <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
              <Button
                size='lg'
                className='rounded-xl px-5 text-base'
                style={{
                  backgroundColor: 'var(--accent-color)',
                  color: 'var(--accent-text-color)',
                }}
                onClick={handleGetStarted}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    'var(--accent-color-hover)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--accent-color)')
                }
              >
                <span className='text-nowrap'>Get Started For Free</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


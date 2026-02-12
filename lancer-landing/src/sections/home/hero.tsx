'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { BackgroundSnippets } from '@/components/ui/background-snippets';
import { HeroVideo } from '@/components/ui/hero-video';
import { SparklesText } from '@/components/ui/sparkles-text';
import Image from 'next/image';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function Hero() {
  return (
    <section style={{ backgroundColor: '#0A0A0A' }}>
      <div className='relative pt-2 md:pt-26'>
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  delayChildren: 1,
                },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  bounce: 0.3,
                  duration: 2,
                },
              },
            },
          }}
          className='absolute inset-0 -z-20'
        >
          <Image
            src='https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120'
            alt='Dark background with gradient overlay'
            className='absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block'
            width={3276}
            height={4095}
            priority
          />
        </AnimatedGroup>
        <div
          aria-hidden
          className='absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,#0A0A0A_75%)]'
        />
        <div className='mx-auto max-w-7xl px-6'>
          <div className='text-center sm:mx-auto lg:mr-auto mt-10 md:mt-20'>
            <AnimatedGroup variants={transitionVariants}>
              <span
                className='inline-block px-3 sm:px-4 py-1 mb-6 rounded-full text-xs sm:text-sm font-semibold tracking-wide'
                style={{
                  backgroundColor: 'rgba(109, 40, 217, 0.2)',
                  color: '#a78bfa',
                  border: '1px solid rgba(109, 40, 217, 0.35)',
                }}
              >
                The #1 Upwork AI Agent
              </span>
              <SparklesText
                as='h1'
                colors={{ first: '#9E7AFF', second: '#FE8BBB' }}
                sparklesCount={8}
                className='max-w-full md:max-w-6xl mx-auto text-balance text-5xl font-bold md:text-6xl md:font-semibold xl:text-[5.25rem] text-white'
              >
                Land Upwork jobs 24/7{' '}
                <span className='text-3xl md:text-6xl xl:text-[5.25rem]'>
                  Without The Grind.
                </span>
              </SparklesText>
              <p className='mx-auto mt-8 mb-8 max-w-[800px] text-balance text-lg sm:text-xl md:text-2xl font-normal text-white/100'>
                For{' '}
                <span
                  className='inline-block px-2 sm:px-3 md:px-4 py-[2px] mx-0.5 sm:mx-1 rounded-full font-semibold text-base sm:text-lg md:text-2xl'
                  style={{
                    backgroundColor: 'rgba(109, 40, 217, 0.25)',
                    color: '#a78bfa',
                    border: '1px solid rgba(109, 40, 217, 0.4)',
                  }}
                >
                  freelancers
                </span>{' '}
                and{' '}
                <span
                  className='inline-block px-2 sm:px-3 md:px-4 py-[2px] mx-0.5 sm:mx-1 rounded-full font-semibold text-base sm:text-lg md:text-2xl'
                  style={{
                    backgroundColor: 'rgba(194, 65, 12, 0.25)',
                    color: '#fb923c',
                    border: '1px solid rgba(194, 65, 12, 0.4)',
                  }}
                >
                  agencies
                </span>{' '}
                who want to automate their Upwork outreach and never miss an
                opportunity.
              </p>
            </AnimatedGroup>
          </div>
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div className='relative flex justify-center mt-4 px-2 sm:mr-0 sm:mt-8 md:mt-12 z-10 pb-16'>
            <BackgroundSnippets />
            <div className='relative w-full pt-8'>
              <div className='relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40'>
                <HeroVideo />
              </div>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}

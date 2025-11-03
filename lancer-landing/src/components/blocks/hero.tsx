'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BackgroundSnippets } from '@/components/ui/background-snippets';
import { SparklesText } from '@/components/ui/sparkles-text';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Info, Play } from 'lucide-react';
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

interface HeroProps {
  onVideoClick: () => void;
}

export function Hero({ onVideoClick }: HeroProps) {
  return (
    <section>
      <div className='relative pt-4 md:pt-16'>
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
          <img
            src='https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120'
            alt='background'
            className='absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block'
            width='3276'
            height='4095'
          />
        </AnimatedGroup>
        <div
          aria-hidden
          className='absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]'
        />
        <div className='mx-auto max-w-7xl px-6'>
          <div className='text-center sm:mx-auto lg:mr-auto lg:mt-0'>
            <AnimatedGroup variants={transitionVariants}>
              <div className='mt-8 lg:mt-16'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant='secondary'
                      className='mb-6 px-3 py-2 text-xs md:text-sm font-medium border-0 rounded-full cursor-help inline-flex items-center gap-1 max-w-full'
                      style={{
                        backgroundColor: '#d9f99d',
                        color: '#000000',
                      }}
                    >
                      <span className='truncate'>
                        55% open rate. 33% reply rate. 12.5% win rate
                      </span>
                      <Info className='w-3 h-3 md:w-4 md:h-4 align-middle -mt-0.5 flex-shrink-0' />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Average conversion numbers from users running Lancer.
                  </TooltipContent>
                </Tooltip>
              </div>
              <SparklesText
                text='Land high-paying Upwork jobs on autopilot.'
                colors={{ first: '#9E7AFF', second: '#FE8BBB' }}
                sparklesCount={12}
                className='max-w-full md:max-w-6xl mx-auto text-balance text-5xl font-bold md:text-6xl md:font-semibold xl:text-[5.25rem]'
              />
              <p className='mx-auto mt-4 mb-8 max-w-full md:max-w-6xl text-balance text-lg md:text-xl text-muted-foreground font-normal'>
                Lancer works 24/7, filters the crap, writes and sends winning
                proposals for the right jobs in your name.
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
          <div className='relative flex justify-center mt-4 px-2 sm:mr-0 sm:mt-8 md:mt-12 z-10 mb-16'>
            <BackgroundSnippets />
            <div className='relative pt-8'>
              <div className='relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border bg-white/80 dark:bg-muted/60 shadow-sm'>
                <div className='relative aspect-15/8 rounded-2xl overflow-hidden'>
                  <Image
                    src='https://img.youtube.com/vi/2B_q2alwPFA/maxresdefault.jpg'
                    alt='Lancer Demo Video Thumbnail'
                    className='w-full h-full object-cover rounded-2xl'
                    width={2700}
                    height={1440}
                  />
                  {/* Video Overlay Button */}
                  <div
                    className='absolute inset-0 flex items-center justify-center z-20 bg-black/20 hover:bg-black/30 transition-colors cursor-pointer'
                    onClick={onVideoClick}
                  >
                    <Button
                      size='lg'
                      className='rounded-full w-20 h-20 shadow-2xl backdrop-blur-sm border-4 border-white hover:scale-110 transition-all duration-300 animate-pulse flex items-center justify-center'
                      style={{
                        backgroundColor: 'var(--accent-color)',
                        color: 'var(--accent-text-color)',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          'var(--accent-color-hover)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          'var(--accent-color)')
                      }
                    >
                      <Play className='w-20 h-20' fill='currentColor' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}


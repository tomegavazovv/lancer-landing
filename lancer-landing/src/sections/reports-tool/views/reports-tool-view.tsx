'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { CTAButton } from '@/components/ui/cta-button';
import { Particles } from '@/components/ui/particles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from '@/layout/footer';
import { Navbar } from '@/layout/navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CategoryCharts } from '../category-charts';
import { CountryCharts } from '../country-charts';
import { KeywordBreakdown } from '../keyword-breakdown';

export function ReportsToolView() {
  const [activeTab, setActiveTab] = useState('keyword');
  const router = useRouter();
  return (
    <>
      <Navbar
        isOverDarkSection={true}
        onBookDemo={() => {}}
        onGetStarted={() => {
          window.open('https://1.lancer.app', '_blank');
        }}
      />
      <main className='relative min-h-[calc(100vh-120px)] text-white bg-[#0A0A0A] pt-24 lg:pt-36 overflow-hidden'>
        <Particles
          className='absolute inset-0'
          quantity={50}
          staticity={30}
          ease={50}
          color='white'
          refresh={false}
        />
        <div className='relative container mx-auto px-6 pb-16'>
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1,
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
                    duration: 0.8,
                  },
                },
              },
            }}
            className='mb-12 text-center'
          >
            <h1 className='text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
              Analytics Dashboard
            </h1>
            <p className='text-lg text-white/70 max-w-2xl mx-auto'>
              Get the bigger picture of Upwork job markets and make data-driven
              decisions
            </p>
          </AnimatedGroup>

          {/* <SummaryStats />   */}

          <div className='max-w-5xl mx-auto'>
            <Tabs
              defaultValue='keyword'
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='grid w-full max-w-2xl mx-auto mb-8 grid-cols-3 bg-white/5 border-white/10'>
                <TabsTrigger
                  value='keyword'
                  className='data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70'
                >
                  By Query
                </TabsTrigger>
                <TabsTrigger
                  value='country'
                  className='data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70'
                >
                  By Country
                </TabsTrigger>
                <TabsTrigger
                  value='category'
                  className='data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70'
                >
                  By Category
                </TabsTrigger>
              </TabsList>

              {activeTab === 'keyword' && (
                <TabsContent value='keyword'>
                  <KeywordBreakdown />
                </TabsContent>
              )}

              {activeTab === 'country' && (
                <TabsContent value='country'>
                  <CountryCharts />
                </TabsContent>
              )}

              {activeTab === 'category' && (
                <TabsContent value='category'>
                  <CategoryCharts />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        {/* CTA Section */}
        <section className='relative py-12'>
          <Particles
            className='absolute inset-0'
            quantity={100}
            staticity={30}
            ease={50}
            color='white'
            refresh={false}
          />
          <div className='relative z-10 mx-auto max-w-4xl px-6'>
            <div className='border border-white/10 rounded-3xl px-8 py-12 text-center'>
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
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
                        duration: 0.8,
                      },
                    },
                  },
                }}
              >
                <h2 className='text-4xl md:text-5xl lg:text-6xl  font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
                  Ready to Start <br /> Landing More Jobs?
                </h2>
                <p className='text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-white/70 mb-8'>
                  Join hundreds of freelancers and agencies using Lancer to
                  automate their Upwork outreach and never miss an opportunity.
                </p>
                <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
                  <CTAButton onClick={() => router.push('/#pricing')} size='lg'>
                    <span className='text-nowrap'>Get Started</span>
                  </CTAButton>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

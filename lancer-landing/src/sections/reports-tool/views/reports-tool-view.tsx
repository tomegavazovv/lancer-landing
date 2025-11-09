'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Badge } from '@/components/ui/badge';
import { Particles } from '@/components/ui/particles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from '@/layout/footer';
import { Navbar } from '@/layout/navbar';
import { Globe } from 'lucide-react';
import { CategoryCharts } from '../category-charts';
import { CountryCharts } from '../country-charts';
import { KeywordBreakdown } from '../keyword-breakdown';

export function ReportsToolView() {
  return (
    <>
      <Navbar
        isOverDarkSection={true}
        onBookDemo={() => {}}
        onGetStarted={() => {}}
      />
      <main className='relative min-h-[calc(100vh-120px)] text-white bg-[#0A0A0A] pt-24 lg:pt-32 overflow-hidden'>
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
            <Badge
              variant='outline'
              className='mb-4 px-4 py-2 text-sm font-medium rounded-full border-white/20 text-white bg-white/5'
            >
              <Globe className='w-3 h-3 mr-1.5' />
              Analytics Dashboard
            </Badge>
            <h1 className='text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
              Reports Tool
            </h1>
            <p className='text-lg text-white/70 max-w-2xl mx-auto'>
              Analyze your job posting statistics by client country and make
              data-driven decisions
            </p>
          </AnimatedGroup>

          {/* <SummaryStats />   */}

          <div className='max-w-5xl mx-auto'>
            <Tabs defaultValue='keyword' className='w-full'>
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

              <TabsContent value='keyword'>
                <KeywordBreakdown />
              </TabsContent>

              <TabsContent value='country'>
                <CountryCharts />
              </TabsContent>

              <TabsContent value='category'>
                <CategoryCharts />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { CalendlyModal } from '@/components/ui/calendly-modal';
import { CTAButton } from '@/components/ui/cta-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Particles } from '@/components/ui/particles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from '@/layout/footer';
import { Navbar } from '@/layout/navbar';
import { JobFilters } from 'lancer-shared';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CategoryCharts } from '../category-charts';
import { CountryCharts } from '../country-charts';
import FeedFilters from '../feed-filters';
import { KeywordBreakdown } from '../keyword-breakdown';

const defaultFilters: JobFilters = {
  searchQuery: '',
  keywords: null,
  isFeatured: null,
  regions: ['Worldwide', 'USOnly'],
  categories: {
    includes: [],
    excludes: [],
  },
  experienceLevel: [],
  engagementType: null,
  vendorQualifications: null,
  clientInfo: {
    clientLocationIncludes: [],
    clientLocationExcludes: [],
    minTotalSpent: null,
    maxTotalSpent: null,
    minAvgHourlyRate: null,
    maxAvgHourlyRate: null,
    minHireRate: null,
    maxHireRate: null,
    minNumReviews: null,
    minReviewScore: null,
    maxReviewScore: null,
    companySize: [],
    clientIndustry: [],
    minJobsPosted: null,
    isPaymentVerified: 'all',
    isPhoneVerified: 'all',
    enterpriseClient: 'all',
    memberSinceFrom: null,
    memberSinceTo: null,
  },
  payment: {
    paymentType: [],
    minHourlyRate: null,
    maxHourlyRate: null,
    minFixedPrice: null,
    maxFixedPrice: null,
  },
  projectDuration: [],
  questions: {
    hasQuestions: [],
  },
  totalSpentIncludeClientsWithLessThanXPostedJobs: null,
  averageHourlyRateIncludeClientsWithLessThanXPostedJobs: null,
  includeClientsWithLessThanXPostedJobs: null,
  includeClientsWithZeroReviews: null,
};

export function ReportsToolView() {
  const [activeTab, setActiveTab] = useState('keyword');
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const router = useRouter();

  // Applied filters - these trigger API calls
  const [appliedFilters, setAppliedFilters] = useState<JobFilters>(defaultFilters);

  // Draft filters - these are what the user edits in the dialog
  const { control, watch, setValue, reset } = useForm<JobFilters>({
    defaultValues: defaultFilters,
  });

  // Sync draft filters with applied filters when dialog opens
  useEffect(() => {
    if (isFiltersOpen) {
      reset(appliedFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiltersOpen]);

  const handleApplyFilters = () => {
    const draftFilters = watch();
    setAppliedFilters(draftFilters);
    setIsFiltersOpen(false);
  };

  const handleCancelFilters = () => {
    // Reset draft filters to applied filters
    reset(appliedFilters);
    setIsFiltersOpen(false);
  };

  const handleFiltersChange = (newFilters: JobFilters) => {
    Object.keys(newFilters).forEach((key) => {
      setValue(key as keyof JobFilters, newFilters[key as keyof JobFilters]);
    });
  };

  // Calculate forecast values (placeholder - would need API integration)
  const lastMonthTotal = useMemo(() => {
    // This would come from an API call with applied filters
    return 0;
  }, [appliedFilters]);

  const lastMonthTotalWithEmptyFilters = useMemo(() => {
    // This would come from an API call without filters
    return 0;
  }, []);
  return (
    <>
      <Navbar
        isOverDarkSection={true}
        onBookDemo={() => setIsCalendlyModalOpen(true)}
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
              Upwork Insights Dashboard
            </h1>
            <p className='text-lg text-white/70 max-w-2xl mx-auto'>
              Get the bigger picture of Upwork and make data-driven
              decisions
            </p>
          </AnimatedGroup>

          {/* <SummaryStats />   */}

          <div className='max-w-5xl mx-auto'>
            {/* Main Content */}
            <div>
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
                    <KeywordBreakdown
                      filters={appliedFilters}
                      onFiltersChange={handleFiltersChange}
                      onOpenFilters={() => setIsFiltersOpen(true)}
                    />
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
      <CalendlyModal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
      />
      <Dialog
        open={isFiltersOpen}
        onOpenChange={(open) => {
          setIsFiltersOpen(open);
          if (!open) {
            // Reset draft filters to applied filters when dialog closes without applying
            reset(appliedFilters);
          }
        }}
      >
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-[#0A0A0A] border-white/20 p-0'>
          <DialogHeader className='px-6 pt-6 pb-4 border-b border-white/20 flex-shrink-0'>
            <DialogTitle className='text-white text-xl font-bold'>
              Search and filters
            </DialogTitle>
            <DialogDescription className='text-white/70 text-sm mt-1'>
              Play around with your filters and see how they shape your monthly job forecast in
              real time.
            </DialogDescription>
          </DialogHeader>
          <div className='overflow-y-auto flex-1 px-6 py-4'>
            <FeedFilters
              isLoadingFeed={false}
              lastMonthTotal={lastMonthTotal}
              lastMonthTotalWithEmptyFilters={lastMonthTotalWithEmptyFilters}
              totalJobs={0}
              total={0}
              control={control}
              disabled={false}
              counts={undefined}
            />
          </div>
          <DialogFooter className='flex flex-row justify-between sm:justify-between flex-shrink-0 border-t border-white/20 bg-[#0A0A0A] pt-4 px-6 pb-6 mt-0'>
            <Button
              variant='ghost'
              onClick={handleCancelFilters}
              className='px-3 text-white/70 hover:text-white hover:bg-white/10'
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyFilters}
              className='bg-[#D94C58] text-white hover:bg-[#c43d48]'
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

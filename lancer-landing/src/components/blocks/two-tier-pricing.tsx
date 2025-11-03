'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { 
  Check, 
  CreditCard, 
  Rocket, 
  Phone, 
  Link, 
  Search, 
  TrendingUp, 
  Sparkles, 
  FileText, 
  Bell, 
  Bot,
  Infinity,
  Users,
  MessageSquare,
  Award,
  Info,
  Slack
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface TwoTierPricingProps {
  onBookDemo: () => void;
}

export function TwoTierPricing({ onBookDemo }: TwoTierPricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');

  // Calculate Unlimited pricing based on billing cycle
  const getUnlimitedPrice = () => {
    switch (billingCycle) {
      case 'monthly':
        return { price: 499, label: 'per month' };
      case 'quarterly':
        return { price: 399, label: 'per month', savings: '20% off' };
      case 'yearly':
        return { price: 299, label: 'per month', savings: '40% off' };
    }
  };

  const unlimitedPrice = getUnlimitedPrice();

  // Features for each tier with icons and tooltips
  const payAsYouGoFeatures = [
    { text: '30 Proposals each month', icon: MessageSquare, tooltip: 'Send up to 30 AI-generated proposals per month, then pay per additional proposal.' },
    { text: 'Connect Upwork Account', icon: Link, tooltip: 'Securely connect an Upwork account to automate job applications.' },
    { text: 'Advanced Search & Filters', icon: Search, tooltip: 'Use powerful filters to find jobs that match your skills and preferences.' },
    { text: 'Unlimited Outreach Campaigns', icon: TrendingUp, tooltip: 'Create as many targeted job search campaigns as you need.' },
    { text: 'AI Contextual Job Filtering', icon: Sparkles, tooltip: 'AI analyzes each job posting to determine true compatibility with your profile.' },
    { text: 'AI Proposal Writer', icon: FileText, tooltip: 'Generate personalized, winning proposals automatically using your knowledge base.' },
    { text: 'Real-Time Notifications', icon: Bell, tooltip: 'Get instant alerts when new matching jobs are posted.' },
    { text: 'Slack Integration', icon: Slack, tooltip: 'Receive notifications directly in your Slack workspace.' },
    { text: 'Discord Integration', icon: MessageSquare, tooltip: 'Receive notifications directly in your Discord workspace.' },
    { text: 'Auto-bidding Agent', icon: Bot, tooltip: 'Lancer automatically submits proposals on your behalf 24/7.' },
  ];

  const unlimitedBaseFeatures = [
    { text: 'Unlimited Proposals', icon: Infinity, tooltip: 'Send as many proposals as you want without any limits or extra charges.' },
    { text: 'Priority Support Over Slack', icon: MessageSquare, tooltip: 'Get priority support and direct access to our team via Slack.' },
    { text: 'White-glove onboarding', icon: Award, tooltip: 'Personal 1-on-1 setup session to optimize your campaigns for success.', disabled: billingCycle === 'monthly' },
  ];

  const unlimitedFeatures = unlimitedBaseFeatures;

  return (
    <section className='py-24 relative overflow-hidden' id='pricing'>
      {/* Grid Pattern Background */}
      <div className='absolute inset-0 -z-10'>
        <div className='h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
      </div>
      
      <div className='container px-4 md:px-6 relative z-10 max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col items-center mb-12 text-center'>
          <div className='inline-flex items-center gap-1 px-3 py-1 mb-4 rounded-full border border-primary/20 shadow-sm'>
            <CreditCard className='mr-1 h-3.5 w-3.5 text-primary' />
            <span className='text-xs font-medium'>Simple Pricing</span>
          </div>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4'>
            The Best Offer On The Market
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
            Start for free, pay as you scale.
          </p>
        </div>

        {/* Billing Cycle Toggle - Above cards (Desktop only) */}
        <div className='hidden md:flex flex-col items-center justify-center mb-8'>
          <div className='relative'>
            <div className='rounded-full border border-gray-200 p-1 bg-gray-50 inline-flex items-center gap-1'>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-6 py-2.5 rounded-full font-medium transition-all text-base',
                billingCycle === 'monthly'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-gray-900'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={cn(
                'px-6 py-2.5 rounded-full font-medium transition-all inline-flex items-center gap-2 text-base',
                billingCycle === 'quarterly'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-gray-900'
              )}
            >
              Quarterly
              <span className={cn(
                'text-xs font-semibold',
                billingCycle === 'quarterly' ? 'opacity-80' : ''
              )} style={{ color: '#d94c58' }}>
                20% off
              </span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                'px-6 py-2.5 rounded-full font-medium transition-all inline-flex items-center gap-2 text-base',
                billingCycle === 'yearly'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-gray-900'
              )}
            >
              Yearly
              <span className={cn(
                'text-xs font-semibold',
                billingCycle === 'yearly' ? 'opacity-80' : ''
              )} style={{ color: '#d94c58' }}>
                40% off
              </span>
            </button>
            </div>
          </div>
          
          <p className='text-xs text-center text-muted-foreground mt-3'>Only applicable to the Unlimited tier</p>
        </div>

        {/* Two-Tier Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {/* Pay-As-You-Go Card */}
          <div className='rounded-2xl border-2 border-border p-8 bg-background flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary relative'>
            {/* Free Trial Badge */}
            <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
              <div className='px-4 py-1 rounded-full text-sm font-semibold shadow-md' style={{ backgroundColor: '#16a34a', color: '#ffffff' }}>
                14-Day Free Trial
              </div>
            </div>

            <div className='flex-1'>
              {/* Header Section - Fixed height on desktop */}
              <div className='md:min-h-[160px]'>
                {/* Title and Price on same row */}
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-2xl font-bold'>🚀 Pay-As-You-Go</h3>
                  <div className='text-right'>
                    <div className='text-xl font-bold text-primary whitespace-nowrap'>$79/mo</div>
                  </div>
                </div>

                {/* Free Trial Highlight */}
                <div className='mb-4 p-3 rounded-lg' style={{ backgroundColor: '#dcfce7', border: '1px solid #16a34a' }}>
                  <p className='text-sm font-medium text-foreground'>
                    ✨ Start free for up to 14 days or 30 proposals
                  </p>
                  <p className='text-xs mt-1 text-muted-foreground'>
                    Billed after either condition is met • Cancel anytime
                  </p>
                </div>

                <p className='text-sm text-muted-foreground mb-6'>
                  Built for the top 10% freelancers looking to automate their Upwork outreach and win more deals on auto-pilot.
                </p>
              </div>

              <hr className='my-6' />

              <p className='text-sm font-medium mb-3'>Includes:</p>

              <ul className='space-y-3 mb-8'>
                {payAsYouGoFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <li key={idx} className='flex items-start gap-3'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className='h-4 w-4 text-muted-foreground flex-shrink-0 cursor-help mt-0.5' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='max-w-xs'>{feature.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className='text-sm flex-1'>{feature.text}</span>
                      <div className='ml-auto'>
                        <Icon className='h-5 w-5 text-muted-foreground flex-shrink-0' />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className='rounded-[14px] p-0.5' style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)', border: '1px solid #16a34a' }}>
              <Button
                size='lg'
                className='rounded-xl px-5 text-base w-full'
                style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
                onClick={() => window.open('https://1.lancer.app', '_blank')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
              >
                <Rocket className='mr-2 h-6 w-4' />
                Start Now Free
              </Button>
            </div>
            <p className='text-xs text-center text-muted-foreground mt-3'>
              Then $79/mo • $1.49 per after 30 proposals
            </p>
          </div>

          {/* Unlimited Card */}
          <div className='rounded-2xl border-2 border-border p-8 bg-background flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary'>
            {/* Billing Cycle Toggle - Inside card (Mobile only) */}
            <div className='flex md:hidden items-center justify-center mb-6 relative'>
              <div className='rounded-full border border-gray-200 p-1 bg-gray-50 inline-flex items-center gap-1 text-sm w-full max-w-xs'>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={cn(
                    'px-2 py-2 rounded-full font-medium transition-all text-xs flex-1',
                    billingCycle === 'monthly'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('quarterly')}
                  className={cn(
                    'px-2 py-2 rounded-full font-medium transition-all inline-flex items-center gap-1 text-xs flex-1',
                    billingCycle === 'quarterly'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  )}
                >
                  Quarterly
                  <span className={cn(
                    'text-xs font-semibold',
                    billingCycle === 'quarterly' ? 'opacity-80' : ''
                  )} style={{ color: '#d94c58' }}>
                    20%
                  </span>
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={cn(
                    'px-2 py-2 rounded-full font-medium transition-all inline-flex items-center gap-1 text-xs flex-1',
                    billingCycle === 'yearly'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  )}
                >
                  Yearly
                  <span className={cn(
                    'text-xs font-semibold',
                    billingCycle === 'yearly' ? 'opacity-80' : ''
                  )} style={{ color: '#d94c58' }}>
                    40%
                  </span>
                </button>
              </div>
            </div>

            {/* Divider (Mobile only) */}
            <hr className='md:hidden mb-6' />

            <div className='flex-1'>
                {/* Header Section - Fixed height on desktop */}
                <div className='md:min-h-[167px]'>
                  {/* Title and Price on same row */}
                  <div className='flex items-start justify-between mb-4'>
                    <h3 className='text-2xl font-bold'>♾️ Unlimited</h3>
                    <div className='text-right'>
                      {unlimitedPrice.savings ? (
                        <div className='flex items-center gap-2'>
                          <span className='text-lg text-muted-foreground line-through'>
                            $499/mo
                          </span>
                          <span className='text-xl font-bold whitespace-nowrap' style={{ color: 'var(--accent-color-dark)' }}>
                            ${unlimitedPrice.price}/mo
                          </span>
                        </div>
                      ) : (
                        <span className='text-xl font-bold text-primary whitespace-nowrap'>
                          ${unlimitedPrice.price}/mo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Savings Message */}
                  {unlimitedPrice.savings && (
                    <div className='mb-4'>
                      <p className='text-sm font-semibold text-foreground'>
                        💰 Save <span style={{ color: '#16a34a' }}>{billingCycle === 'quarterly' ? '$300' : '$2,400'}</span> with {billingCycle} billing
                      </p>
                    </div>
                  )}

                  <p className='text-sm text-muted-foreground mb-6'>
                    Created for the top 1% freelancer and agencies earning over $100,000/yr. looking to run campaigns with no limits.
                  </p>
                </div>

                <hr className='my-6' />

                <p className='text-sm font-medium mb-3'>Everything in Pay-As-You-Go plus:</p>

                <ul className='space-y-3 mb-8'>
                  {unlimitedFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    const isDisabled = feature.disabled;
                    return (
                      <li key={idx} className={cn('flex items-start gap-3', isDisabled && 'opacity-40')}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className='h-4 w-4 text-muted-foreground flex-shrink-0 cursor-help mt-0.5' />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className='max-w-xs'>{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                        <span className='text-sm flex-1'>{feature.text}</span>
                        <div className='ml-auto'>
                          <Icon className='h-5 w-5 text-muted-foreground flex-shrink-0' />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
                <Button
                  size='lg'
                  variant='default'
                  className='rounded-xl px-5 text-base w-full'
                  onClick={onBookDemo}
                >
                  <Phone className='mr-2 h-6 w-4' />
                  Book 1:1 Demo
                </Button>
              </div>
              <p className='text-xs text-center text-muted-foreground mt-3'>
                  Unlimited Usage • Fixed Predictable Pricing
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}


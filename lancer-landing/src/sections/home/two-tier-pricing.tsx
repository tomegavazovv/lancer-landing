'use client';

import { CTAButton } from '@/components/ui/cta-button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  Award,
  Bell,
  Bot,
  Building2,
  CreditCard,
  FileText,
  Infinity,
  Info,
  Link,
  MessageSquare,
  Phone,
  Rocket,
  Search,
  Slack,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

interface TwoTierPricingProps {
  onBookDemo: () => void;
}

export function TwoTierPricing({ onBookDemo }: TwoTierPricingProps) {
  const [billingCycle, setBillingCycle] = useState<
    'monthly' | 'quarterly' | 'yearly'
  >('yearly');

  // Calculate Light pricing based on billing cycle
  const getLightPrice = () => {
    switch (billingCycle) {
      case 'monthly':
        return { price: 299, label: 'per month' };
      case 'quarterly':
        return { price: 254, label: 'per month', savings: '15% off' };
      case 'yearly':
        return { price: 209, label: 'per month', savings: '30% off' };
    }
  };

  // Calculate Unlimited pricing based on billing cycle
  const getUnlimitedPrice = () => {
    switch (billingCycle) {
      case 'monthly':
        return { price: 499, label: 'per month' };
      case 'quarterly':
        return { price: 424, label: 'per month', savings: '15% off' };
      case 'yearly':
        return { price: 349, label: 'per month', savings: '30% off' };
    }
  };

  const lightPrice = getLightPrice();
  const unlimitedPrice = getUnlimitedPrice();

  // Features for each tier with icons and tooltips
  const payAsYouGoFeatures = [
    {
      text: '30 Proposals each month',
      icon: MessageSquare,
      tooltip:
        'Send up to 30 AI-generated proposals per month, then pay per additional proposal.',
    },
    {
      text: 'Connect Upwork Account',
      icon: Link,
      tooltip:
        'Securely connect an Upwork account to automate job applications.',
    },
    {
      text: 'Advanced Search & Filters',
      icon: Search,
      tooltip:
        'Use powerful filters to find jobs that match your skills and preferences.',
    },
    {
      text: 'Unlimited Outreach Campaigns',
      icon: TrendingUp,
      tooltip: 'Create as many targeted job search campaigns as you need.',
    },
    {
      text: 'AI Contextual Job Filtering',
      icon: Sparkles,
      tooltip:
        'AI analyzes each job posting to determine true compatibility with your profile.',
    },
    {
      text: 'AI Proposal Writer',
      icon: FileText,
      tooltip:
        'Generate personalized, winning proposals automatically using your knowledge base.',
    },
    {
      text: 'Real-Time Notifications',
      icon: Bell,
      tooltip: 'Get instant alerts when new matching jobs are posted.',
    },
    {
      text: 'Slack Integration',
      icon: Slack,
      tooltip: 'Receive notifications directly in your Slack workspace.',
    },
    {
      text: 'Discord Integration',
      icon: MessageSquare,
      tooltip: 'Receive notifications directly in your Discord workspace.',
    },
    {
      text: 'Auto-bidding Agent',
      icon: Bot,
      tooltip: 'Lancer automatically submits proposals on your behalf 24/7.',
    },
  ];

  const lightFeatures = [
    {
      text: '250 Proposals each month',
      icon: MessageSquare,
      tooltip:
        'Send up to 250 AI-generated proposals per month, then pay per additional proposal.',
    },
    {
      text: '2 Connected Accounts',
      icon: Users,
      tooltip: 'Connect and manage up to 2 Upwork accounts simultaneously.',
    },
    {
      text: 'Priority Support Over Slack',
      icon: Slack,
      tooltip: 'Get priority support and direct access to our team via Slack.',
    },
  ];

  const unlimitedBaseFeatures = [
    {
      text: 'Unlimited Proposals',
      icon: Infinity,
      tooltip:
        'Send as many proposals as you want without any limits or extra charges.',
    },
    {
      text: 'Unlimited Connected Accounts',
      icon: Users,
      tooltip:
        'Connect and manage unlimited Upwork accounts from a single dashboard.',
    },
    {
      text: 'Unlimited Agency Profiles',
      icon: Building2,
      tooltip:
        'Create and manage unlimited agency profiles to scale your operations.',
    },
    {
      text: 'Priority Support Over Slack',
      icon: MessageSquare,
      tooltip: 'Get priority support and direct access to our team via Slack.',
    },
    {
      text: 'White-glove onboarding',
      icon: Award,
      tooltip:
        'Personal 1-on-1 setup session to optimize your campaigns for success.',
    },
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
          <div className='inline-flex items-center gap-1 px-3 py-1 mb-4 rounded-full border border-white/20 shadow-sm bg-white/5'>
            <CreditCard className='mr-1 h-3.5 w-3.5 text-white' />
            <span className='text-xs font-medium text-white'>
              Transparent Pricing
            </span>
          </div>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white'>
            The Best Offer On The Market
          </h2>
          <p className='max-w-[700px] md:text-xl/relaxed text-white/80'>
            Pay as you scale - no hidden fees.
          </p>
        </div>

        {/* Billing Cycle Toggle - Above cards (Desktop only) */}
        <div className='hidden md:flex flex-col items-center justify-center mb-8'>
          <div className='relative'>
            <div className='rounded-full border border-white/20 p-1 bg-white/5 inline-flex items-center gap-1'>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  'px-6 py-2.5 rounded-full font-medium transition-all text-base',
                  billingCycle === 'monthly'
                    ? 'bg-white text-black'
                    : 'text-white/70 hover:text-white'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={cn(
                  'px-6 py-2.5 rounded-full font-medium transition-all inline-flex items-center gap-2 text-base',
                  billingCycle === 'quarterly'
                    ? 'bg-white text-black'
                    : 'text-white/70 hover:text-white'
                )}
              >
                Quarterly
                <span
                  className={cn(
                    'text-xs font-semibold',
                    billingCycle === 'quarterly' ? 'opacity-80' : ''
                  )}
                  style={{ color: '#d94c58' }}
                >
                  15% off
                </span>
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={cn(
                  'px-6 py-2.5 rounded-full font-medium transition-all inline-flex items-center gap-2 text-base',
                  billingCycle === 'yearly'
                    ? 'bg-white text-black'
                    : 'text-white/70 hover:text-white'
                )}
              >
                Yearly
                <span
                  className={cn(
                    'text-xs font-semibold',
                    billingCycle === 'yearly' ? 'opacity-80' : ''
                  )}
                  style={{ color: '#d94c58' }}
                >
                  30% off
                </span>
              </button>
            </div>
          </div>

          <p className='text-xs text-center mt-3 text-white/60'>
            Applicable to Light and Unlimited tiers
          </p>
        </div>

        {/* Three-Tier Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {/* Pay-As-You-Go Card */}
          <div className='rounded-2xl border-2 border-white/10 p-8 bg-white/5 backdrop-blur-sm flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-white/30 relative'>
            <div className='flex-1'>
              {/* Title and Price on same row */}
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-2xl font-bold text-white'>
                  🚀 Pay-As-You-Go
                </h3>
                <div className='text-right'>
                  <div className='text-xl font-bold whitespace-nowrap text-white'>
                    $79/mo
                  </div>
                </div>
              </div>

              <p className='text-sm mb-6 text-white/80'>
                Perfect for those with lower proposal volume or wanting to test
                out Lancer before scaling up their outreach.
              </p>

              <div className='mb-6 p-2 rounded-lg bg-green-500/10 border border-green-500/20'>
                <p className='text-xs font-medium text-green-400 text-center'>
                  Extra proposals: $1.99 each
                </p>
              </div>

              <hr className='my-6 border-white/10' />

              <p className='text-sm font-medium mb-3 text-white'>Includes:</p>

              <ul className='space-y-3 mb-8'>
                {payAsYouGoFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <li key={idx} className='flex items-start gap-3'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className='h-4 w-4 text-white/60 flex-shrink-0 cursor-help mt-0.5' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='max-w-xs'>{feature.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className='text-sm flex-1 text-white/90'>
                        {feature.text}
                      </span>
                      <div className='ml-auto'>
                        <Icon className='h-5 w-5 text-white/60 flex-shrink-0' />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <CTAButton
              size='lg'
              variant='primary'
              className='w-full'
              onClick={() => window.open('https://1.lancer.app', '_blank')}
            >
              <Rocket className='h-5 w-5' />
              Start Now
            </CTAButton>
            <p className='text-xs text-center mt-3 text-white/60'>
              $79/mo • $1.99 per after 30 proposals
            </p>
          </div>

          {/* Light Card */}
          <div className='rounded-2xl border-2 border-white/10 p-8 bg-white/5 backdrop-blur-sm flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-white/30 relative'>
            <div className='flex-1'>
              {/* Title and Price on same row */}
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-2xl font-bold text-white'>💡 Light</h3>
                <div className='text-right'>
                  {lightPrice.savings ? (
                    <div className='flex items-center gap-2'>
                      <span className='text-lg text-white/60 line-through'>
                        $299/mo
                      </span>
                      <span
                        className='text-xl font-bold whitespace-nowrap'
                        style={{ color: '#16a34a' }}
                      >
                        ${lightPrice.price}/mo
                      </span>
                    </div>
                  ) : (
                    <span className='text-xl font-bold text-white whitespace-nowrap'>
                      ${lightPrice.price}/mo
                    </span>
                  )}
                </div>
              </div>

              {/* Savings Message */}
              {lightPrice.savings && (
                <div className='mb-4'>
                  <p className='text-sm font-semibold text-white'>
                    💰 Save{' '}
                    <span style={{ color: '#16a34a' }}>
                      {billingCycle === 'quarterly' ? '$135' : '$1,080'}
                    </span>{' '}
                    with {billingCycle} billing
                  </p>
                </div>
              )}

              <p className='text-sm text-white/80 mb-6'>
                Perfect for freelancers or smaller agencies who are gaining
                momentum and looking to scale their outreach.
              </p>

              <div className='mb-6 p-2 rounded-lg bg-green-500/10 border border-green-500/20'>
                <p className='text-xs font-medium text-green-400 text-center'>
                  Extra proposals: $1.49 each
                </p>
              </div>

              <hr className='my-6 border-white/10' />

              <p className='text-sm font-medium mb-3 text-white'>
                Everything in Pay-As-You-Go plus:
              </p>

              <ul className='space-y-3 mb-8'>
                {lightFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <li key={idx} className='flex items-start gap-3'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className='h-4 w-4 text-white/60 flex-shrink-0 cursor-help mt-0.5' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='max-w-xs'>{feature.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className='text-sm flex-1 text-white/90'>
                        {feature.text}
                      </span>
                      <div className='ml-auto'>
                        <Icon className='h-5 w-5 text-white/60 flex-shrink-0' />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <CTAButton
              size='lg'
              variant='primary'
              className='w-full'
              onClick={() => window.open('https://1.lancer.app', '_blank')}
            >
              <Rocket className='h-5 w-5' />
              Start Now
            </CTAButton>
            <p className='text-xs text-center mt-3 text-white/60'>
              {lightPrice.savings
                ? `$${lightPrice.price}/mo • $1.49 per after 250 proposals`
                : `$299/mo • $1.49 per after 250 proposals`}
            </p>
          </div>

          {/* Unlimited Card */}
          <div className='rounded-2xl border-2 border-white/10 p-8 bg-white/5 backdrop-blur-sm flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-white/30'>
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
                  <span
                    className={cn(
                      'text-xs font-semibold',
                      billingCycle === 'quarterly' ? 'opacity-80' : ''
                    )}
                    style={{ color: '#d94c58' }}
                  >
                    15%
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
                  <span
                    className={cn(
                      'text-xs font-semibold',
                      billingCycle === 'yearly' ? 'opacity-80' : ''
                    )}
                    style={{ color: '#d94c58' }}
                  >
                    30%
                  </span>
                </button>
              </div>
            </div>

            {/* Divider (Mobile only) */}
            <hr className='md:hidden mb-6' />

            <div className='flex-1'>
              {/* Title and Price on same row */}
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-2xl font-bold text-white'>♾️ Unlimited</h3>
                <div className='text-right'>
                  {unlimitedPrice.savings ? (
                    <div className='flex items-center gap-2'>
                      <span className='text-lg text-white/60 line-through'>
                        $499/mo
                      </span>
                      <span
                        className='text-xl font-bold whitespace-nowrap'
                        style={{ color: '#16a34a' }}
                      >
                        ${unlimitedPrice.price}/mo
                      </span>
                    </div>
                  ) : (
                    <span className='text-xl font-bold text-white whitespace-nowrap'>
                      ${unlimitedPrice.price}/mo
                    </span>
                  )}
                </div>
              </div>

              {/* Savings Message */}
              {unlimitedPrice.savings && (
                <div className='mb-4'>
                  <p className='text-sm font-semibold text-white'>
                    💰 Save{' '}
                    <span style={{ color: '#16a34a' }}>
                      {billingCycle === 'quarterly' ? '$225' : '$1,800'}
                    </span>{' '}
                    with {billingCycle} billing
                  </p>
                </div>
              )}

              <p className='text-sm text-white/80 mb-6'>
                Created for the top 10% freelancers and agencies earning over
                $100,000/yr looking to run campaigns with no limits.
              </p>

              <hr className='my-6 border-white/10' />

              <p className='text-sm font-medium mb-3 text-white'>
                Everything in Pay-As-You-Go plus:
              </p>

              <ul className='space-y-3 mb-8'>
                {unlimitedFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <li key={idx} className='flex items-start gap-3'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className='h-4 w-4 text-white/60 flex-shrink-0 cursor-help mt-0.5' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='max-w-xs'>{feature.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className='text-sm flex-1 text-white/90'>
                        {feature.text}
                      </span>
                      <div className='ml-auto'>
                        <Icon className='h-5 w-5 text-white/60 flex-shrink-0' />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <CTAButton
              size='lg'
              variant='primary'
              className='w-full'
              onClick={onBookDemo}
            >
              <Phone className='h-5 w-5' />
              Book 1:1 Demo
            </CTAButton>
            <p className='text-xs text-center text-white/60 mt-3'>
              Unlimited Usage • Fixed Predictable Pricing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

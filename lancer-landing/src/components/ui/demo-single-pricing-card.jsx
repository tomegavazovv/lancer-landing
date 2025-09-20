'use client';

import { Highlight } from '@/components/ui/hero-highlight';
import { SinglePricingCard } from '@/components/ui/single-pricing-card';
import {
  Check,
  ChevronRight,
  CreditCard,
  Phone,
  Rocket,
  RocketIcon,
  Stars,
} from 'lucide-react';

export function PricingSectionBasic({ onBookDemo }) {
  const features = [
    'Unlimited Suitability Analysis',
    'Unlimited Automated Proposals Sent',
    'Advanced Query Builder & Filtering',
    'Advanced Analytics & Insights',
    'Personalized Cover Letters',
    'Personalized Knowledge Base',
    'Suitable Jobs Queue',
    'Discord Notifications',
    'Slack Notifications',
    '24/7 Customer Support',
  ].map((text) => ({ text }));

  // Custom check icon with the specified color
  const CustomCheckIcon = ({ className, ...props }) => (
    <Check className={className} style={{ color: '#d94c58' }} {...props} />
  );

  const testimonials = [
    {
      id: 1,
      name: 'Martin Peshevski',
      role: 'Owner',
      company: 'Wolfware Labs',
      content:
        "We closed a $12,000 MVP client within our first week using Lancer. It's a no-brainer.",
      rating: 5,
      avatar: '/martin-headshot.jpg',
    },
    {
      id: 2,
      name: 'Nikola Arsovski',
      role: 'Designer',
      company: 'Flowscape',
      content:
        "2 weeks - 3 clients. All on autopilot. I couldn't recommend Lancer enough",
      rating: 5,
      avatar: '/nikola-headshot.jpeg',
    },
    {
      id: 3,
      name: 'Zhive Ristovski',
      role: 'Founder',
      company: 'Cable.so',
      content:
        'We got 27 replies in 3 weeks. Lancer essentially converted Upwork into our best source of leads.',
      rating: 5,
      avatar: 'zhive-headshot.jpeg',
    },
    {
      id: 4,
      name: 'Ivo Damjanovski',
      role: 'Freelancer',
      company: 'Upwork',
      content:
        'I was quite overwhelmed by Upwork - but Lancer made it so simple. Got my first client in 2 weeks.',
      rating: 5,
      avatar: 'ivo-headshot.jpeg',
    },
  ];

  return (
    <section
      className='py-24 relative overflow-hidden flex justify-center'
      id='pricing'
    >
      <div className='container px-4 md:px-6 relative z-10'>
        <div className='flex flex-col items-center mb-12 text-center'>
          <div className='inline-flex items-center gap-1 px-3 py-1 mb-4 rounded-full border border-primary/20 shadow-sm'>
            <CreditCard className='mr-1 h-3.5 w-3.5 text-primary' />
            <span className='text-xs font-medium'>Simple Pricing</span>
          </div>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4'>
            Our 🚀 Launch Offer. We Made It Very Simple.
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
            The best offer on the market{' '}
            <span className='relative inline-block animate-pulse font-bold text-primary'>
              by far
            </span>
            . Everything you need to win Upwork clients on autopilot - no
            limits. For{' '}
            <Highlight variant='green'>
              only $299/month for the first 100 users.
            </Highlight>
          </p>
        </div>
        <SinglePricingCard
          badge={{
            icon: RocketIcon,
            text: 'Launch Offer',
          }}
          title='Lancer Unlimited'
          subtitle='The full power of AI-driven outreach - with no limits.'
          price={{
            current: '$299/month',
            original: '$1250',
            discount: '70% Off',
          }}
          benefits={[]}
          features={features}
          featuresIcon={CustomCheckIcon}
          featuresBadge={{
            icon: Stars,
            text: 'All Features',
          }}
          primaryButton={{
            text: 'Get Started',
            icon: Rocket,
            chevronIcon: ChevronRight,
          }}
          secondaryButton={{
            text: 'Demo With Founder',
            icon: Phone,
            onClick: onBookDemo,
          }}
          testimonials={testimonials}
          testimonialRotationSpeed={5000}
        />
      </div>
    </section>
  );
}

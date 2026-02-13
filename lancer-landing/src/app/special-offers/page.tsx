'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface SpecialOffer {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  href?: string;
  onButtonClick?: () => void;
  discount?: string;
  originalBreakdown?: { item: string; price: string }[];
}

const specialOffers: (SpecialOffer & { offerSlug: string })[] = [
  {
    name: '"Dominate Upwork" Playbook',
    price: '$299',
    originalPrice: '$499',
    discount: '$200 off',
    description:
      'The only playbook you will ever need to turn Upwork into a predictable acquisition channel.',
    features: [
      'Rank #1 in your niche',
      'Receive 10+ invites a week',
      'Achieve over 15% reply rate at scale',
    ],
    buttonText: 'Get the Playbook',
    href: 'https://buy.stripe.com/dRmcN53n1bkD92K65x8k80c',
    offerSlug: 'playbook',
  },
  {
    name: '3 Months of Lancer Unlimited + "The Dominate Upwork Playbook"',
    price: '$1,000',
    originalPrice: '$1,399',
    discount: '$399 off',
    originalBreakdown: [
      { item: 'Playbook', price: '$499' },
      { item: '3 months Lancer', price: '$900' },
    ],
    description: '"Dominate Upwork" Playbook included for free',
    features: [
      '"Dominate Upwork" Playbook included for free',
      '3 Months of Lancer Unlimited',
    ],
    isPopular: true,
    buttonText: 'Get This Deal',
    href: 'https://buy.stripe.com/4gMfZhe1FgEXa6O0Ld8k80d',
    offerSlug: 'bundle',
  },
  {
    name: 'Upwork Launch',
    price: '$2,999',
    originalPrice: '$4,399',
    discount: '$1,400 off',
    originalBreakdown: [
      { item: 'Playbook', price: '$499' },
      { item: '3 months Lancer', price: '$900' },
      { item: '3 month white-glove service', price: '$3,000' },
    ],
    description: 'The turn-key solution that sets you up to dominate Upwork',
    features: [
      'The "Dominate Upwork" Playbook included',
      '3 Months of Lancer Unlimited',
      'Done-for-you Upwork Profile Optimization that gets you ranked at the top of Upwork SEO in your niche',
      'Personalized Bidding Strategy',
      'Copywriting your Cover Letter',
    ],
    buttonText: 'Launch Your Success',
    href: 'https://buy.stripe.com/4gMfZhe1FgEXa6O0Ld8k80d',
    offerSlug: 'launch',
  },
];

export default function SpecialOffersPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Header Section with Particles */}
      <section className='relative py-40'>
        <Particles
          className='absolute inset-0'
          quantity={100}
          staticity={30}
          ease={50}
          color='black'
          refresh={false}
        />
        <div className='relative z-10 mx-auto max-w-7xl px-6 text-center'>
          <AnimatedGroup preset='blur-slide' threshold={0.1}>
            <h1 className='text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent'>
              Special Offers
            </h1>
            <p className='mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              Exclusive digital products and packages designed to accelerate
              your Upwork success
            </p>
          </AnimatedGroup>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className='relative bg-gradient-to-b from-background via-muted/20 to-background'>
        <div className='absolute inset-0 -z-10'>
          <div className='h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
        </div>

        <div className='mx-auto max-w-7xl px-6 py-20'>
          <AnimatedGroup preset='blur-slide' threshold={0.1}>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {specialOffers.map((offer, index) => (
                <div
                  key={index}
                  className={`
                    relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-background 
                    ${
                      offer.isPopular
                        ? 'border-primary border-2 shadow-lg scale-105'
                        : 'hover:border-primary/50 transition-all duration-300'
                    }
                    hover:shadow-xl transition-all duration-300 flex flex-col h-full
                  `}
                >
                  <div className='p-8 flex-1 flex flex-col'>
                    {/* Title */}
                    <h3 className='text-2xl font-bold leading-tight text-center mb-6'>
                      {offer.name}
                    </h3>

                    {/* Pricing */}
                    <div className='space-y-2 text-center mb-6'>
                      {offer.originalPrice && (
                        <p className='text-lg text-muted-foreground line-through'>
                          {offer.originalPrice}
                        </p>
                      )}
                      <p className='text-4xl font-bold text-primary'>
                        {offer.price}
                      </p>
                      {offer.discount && (
                        <p className='text-lg text-green-500 font-semibold'>
                          {offer.discount}
                        </p>
                      )}
                    </div>

                    {/* Original Price Breakdown */}
                    {offer.originalBreakdown && (
                      <div className='text-center mb-6'>
                        <p className='text-sm text-muted-foreground mb-2'>
                          Original prices:
                        </p>
                        <div className='space-y-1'>
                          {offer.originalBreakdown.map((item, idx) => (
                            <p
                              key={idx}
                              className='text-sm text-muted-foreground'
                            >
                              {item.item}: {item.price}
                            </p>
                          ))}
                        </div>
                        <p className='text-sm text-muted-foreground mt-2'>
                          Total:{' '}
                          <span className='line-through'>
                            {offer.originalPrice}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Description */}
                    <p className='text-muted-foreground text-sm leading-relaxed text-center mb-6'>
                      {offer.description}
                    </p>

                    {/* Features */}
                    <div className='space-y-3 text-left mb-6 flex-1'>
                      <h4 className='font-semibold text-sm text-foreground'>
                        What you'll get:
                      </h4>
                      <ul className='space-y-2'>
                        {offer.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className='flex items-start gap-3'
                          >
                            <Check className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
                            <span className='text-sm text-foreground leading-relaxed'>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button - Positioned at bottom */}
                    <div className='mt-auto pt-4'>
                      <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
                        <Button
                          size='lg'
                          className='rounded-xl px-5 text-base w-full'
                          onClick={() => {
                            offer.onButtonClick?.();
                          }}
                          asChild={
                            !offer.onButtonClick && offer.href
                              ? true
                              : undefined
                          }
                        >
                          {!offer.onButtonClick && offer.href ? (
                            <Link
                              href={offer.href}
                            >
                              <span className='text-nowrap'>
                                {offer.buttonText}
                              </span>
                            </Link>
                          ) : (
                            <span className='text-nowrap'>
                              {offer.buttonText}
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  );
}

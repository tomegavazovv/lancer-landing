'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Info, Star } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface PricingPlan {
  name: string;
  price?: string;
  period: string;
  features: {
    title: string;
    description: string;
  }[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  includesFrom?: string; // e.g., "Everything in Starter plus:"
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = 'Simple, Transparent Pricing',
  description = 'Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.',
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const switchRef = useRef<HTMLButtonElement>(null);

  return (
    <div className='container py-20'>
      <div className='text-center space-y-4 mb-12'>
        <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
          {title}
        </h2>
        <p className='text-muted-foreground text-lg whitespace-pre-line'>
          {description}
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 sm:2 gap-4'>
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: 'spring',
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative min-h-[400px]`,
              plan.isPopular ? 'border-primary border-2' : 'border-border',
              'flex flex-col',
              !plan.isPopular && 'mt-5'
            )}
          >
            {plan.isPopular && (
              <div className='absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center'>
                <Star className='text-primary-foreground h-4 w-4 fill-current' />
                <span className='text-primary-foreground ml-1 font-sans font-semibold'>
                  Popular
                </span>
              </div>
            )}
            <div className='flex-1 flex flex-col'>
              <p className='text-xl font-semibold '>{plan.name}</p>
              {plan.price && (
                <p className='text-sm tracking-tight text-muted-foreground'>
                  {plan.price}$ / {plan.period}
                </p>
              )}
              {/* <div className='mt-6 flex items-center justify-center gap-x-2'>
                <span className='text-5xl font-bold tracking-tight text-foreground'>
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    // formatter={(value) => `$${value}`}
                    transformTiming={{
                      duration: 500,
                      easing: 'ease-out',
                    }}
                    willChange
                    className='font-variant-numeric: tabular-nums'
                  />
                </span>
                {plan.period !== 'Next 3 months' && (
                  <span className='text-sm font-semibold leading-6 tracking-wide text-muted-foreground'>
                    / {plan.period}
                  </span>
                )}
              </div> */}
              {/* <p className='text-xs leading-5 text-muted-foreground'>
                {isMonthly ? 'billed monthly' : 'billed annually'}
              </p> */}
              <p className='mt-8 text-xs leading-5 text-muted-foreground'>
                {plan.description}
              </p>{' '}
              <hr className='w-full my-6' />
              {plan.includesFrom && (
                <div className='mb-2'>
                  <p className='text-sm font-medium text-muted-foreground mb-3'>
                    {plan.includesFrom}
                  </p>
                </div>
              )}
              <ul className='mt-6 gap-3 flex flex-col flex-1'>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className='flex items-start gap-3 py-1'>
                    <span className='text-left flex-1'>{feature.title}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className='h-4 w-4 text-muted-foreground mt-1 flex-shrink-0 cursor-help' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className='text-sm max-w-xs'>
                          {feature.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
              <hr className='w-full my-6 mt-8' />
              <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
                <Button
                  asChild
                  size='lg'
                  className='rounded-xl px-5 text-base w-full'
                >
                  <Link href={plan.href}>
                    <span className='text-nowrap'>{plan.buttonText}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

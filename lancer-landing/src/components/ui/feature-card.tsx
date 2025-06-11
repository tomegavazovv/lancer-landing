import { CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Button } from './button';

interface FeatureCardProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonHref: string;
  checkmarkText: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  buttonText,
  buttonHref,
  checkmarkText,
  imageSrc,
  imageAlt,
  imageWidth = 500,
  imageHeight = 300,
  className,
}: FeatureCardProps) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor='#ffffff'
      tiltMaxAngleX={2}
      tiltMaxAngleY={2}
      perspective={1000}
      scale={1.02}
      className={className}
    >
      <div className='relative max-w-7xl border-1 border-gray-200 py-6 px-6 md:py-10 md:pl-10 md:pr-0 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0'>
          <div className='flex flex-col gap-6 md:gap-10 md:flex-[0.6]'>
            <h3 className='text-2xl md:text-3xl font-semibold'>{title}</h3>
            <p className='text-base md:text-lg leading-relaxed text-muted-foreground'>
              {description}
            </p>
            <div className='flex flex-col sm:flex-row items-center sm:items-center gap-4 md:items-start'>
              {/* Mobile: Simple button without card wrapper */}
              <div className='block md:hidden w-full'>
                <Button
                  asChild
                  size='default'
                  className='rounded-xl px-4 text-sm w-full'
                >
                  <Link href={buttonHref}>
                    <span className='text-nowrap'>{buttonText}</span>
                  </Link>
                </Button>
              </div>
              {/* Desktop: Button with card wrapper */}
              <div className='hidden md:block bg-foreground/10 rounded-[14px] border p-0.5'>
                <Button asChild size='lg' className='rounded-xl px-5 text-base'>
                  <Link href={buttonHref}>
                    <span className='text-nowrap'>{buttonText}</span>
                  </Link>
                </Button>
              </div>
              <div className='flex items-center justify-center md:justify-start gap-2'>
                <CreditCard className='text-gray-400 h-5 w-5' />
                <span className='text-sm text-gray-700'>{checkmarkText}</span>
              </div>
            </div>
          </div>
          <div className='md:flex-[0.4] flex justify-center'>
            <div className='relative rounded-lg overflow-hidden w-full max-w-sm md:max-w-none'>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className='object-cover rounded-lg w-full h-auto'
              />
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

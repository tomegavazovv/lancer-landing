import { CreditCard, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';

interface FeatureCardProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonHref: string;
  checkmarkText?: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  isVideo?: boolean;
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
  isVideo = false,
}: FeatureCardProps) {
  // Check if the image is a GIF
  const isGif = imageSrc.toLowerCase().endsWith('.gif');

  return (
    <div className={className}>
      <div className='relative max-w-7xl border-1 border-gray-200 py-6 px-6 md:py-10 md:px-10 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0'>
          {/* Video/Image - Shows first on mobile, second on desktop */}
          <div className='order-1 md:order-2 md:flex-[0.4] flex justify-center w-full'>
            <div className='relative rounded-xl overflow-hidden w-full md:max-w-none border border-gray-300'>
              {isVideo ? (
                <video
                  src={imageSrc}
                  className='object-cover rounded-xl w-full h-auto'
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload='metadata'
                  aria-label={imageAlt}
                />
              ) : (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  className='object-cover rounded-xl w-full h-auto'
                  unoptimized={isGif}
                  loading='lazy'
                />
              )}
            </div>
          </div>
          
          {/* Text Content - Shows second on mobile, first on desktop */}
          <div className='order-2 md:order-1 flex flex-col gap-6 md:gap-10 md:flex-[0.6]'>
            <h3 className='text-2xl md:text-3xl font-semibold'>{title}</h3>
            <p className='text-base md:text-lg leading-relaxed text-muted-foreground'>
              {description}
            </p>
            <div className='flex flex-col sm:flex-row items-center sm:items-center gap-4 md:items-center'>
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
              <div className='hidden md:block bg-foreground/10 rounded-xl border p-0.5'>
                <Button asChild size='lg' className='rounded-xl px-5 text-base'>
                  <Link href={buttonHref}>
                    <span className='text-nowrap'>{buttonText}</span>
                  </Link>
                </Button>
              </div>
              {checkmarkText && (
                <div className='flex items-center justify-center md:justify-start gap-2'>
                  <Shield className='text-gray-400 h-5 w-5' />
                  <span className='text-sm text-gray-700'>{checkmarkText}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

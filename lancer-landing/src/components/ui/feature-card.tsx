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
      <div className='relative max-w-7xl border-1 border-gray-200 py-10 pl-10 pr-0 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-10 flex-[0.6]'>
            <h3 className='text-3xl font-semibold'>{title}</h3>
            <p className='text-lg leading-relaxed text-muted-foreground'>
              {description}
            </p>
            <div className='flex items-center gap-4'>
              <div className='bg-foreground/10 rounded-[14px] border p-0.5'>
                <Button asChild size='lg' className='rounded-xl px-5 text-base'>
                  <Link href={buttonHref}>
                    <span className='text-nowrap'>{buttonText}</span>
                  </Link>
                </Button>
              </div>
              <div className='flex items-center gap-2'>
                <CreditCard className='text-gray-400 h-5 w-5' />
                <span className='text-sm text-gray-700'>{checkmarkText}</span>
              </div>
            </div>
          </div>
          <div className='flex-[0.4] flex justify-center'>
            <div className='relative rounded-lg overflow-hidden'>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className='object-cover rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

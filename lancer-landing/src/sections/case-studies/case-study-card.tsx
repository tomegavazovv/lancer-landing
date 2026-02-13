'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CaseStudyCardProps {
  title: string;
  description: string;
  image: string;
  readMoreUrl?: string;
  slug?: string;
}

export function CaseStudyCard({
  title,
  description,
  image,
  readMoreUrl = '#',
  slug,
}: CaseStudyCardProps) {
  const isExternalImage =
    image.startsWith('http://') || image.startsWith('https://');
  const imageSrc = isExternalImage ? image : `/${image}`;

  return (
    <div
      className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D94C58]/10'
    >
      {/* Main Image */}
      <div className='relative aspect-[16/9] overflow-hidden'>
        <Image
          src={imageSrc}
          alt={title}
          fill
          unoptimized={isExternalImage}
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
      </div>

      {/* Content */}
      <div className='p-6 space-y-6'>
        {/* Title and Description */}
        <div className='space-y-3'>
          <h3 className='text-2xl md:text-3xl font-bold text-white leading-tight hover:underline'>
            <Link href={readMoreUrl}>{title}</Link>
          </h3>
          <p className='text-white/70 text-base leading-relaxed'>
            {description}
          </p>
        </div>

        {/* Read More Button */}
        <div className='pt-2'>
          <Link
            href={readMoreUrl}
            className='inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group/link'
          >
            <span className='text-lg font-medium'>Read more</span>
            <ArrowUpRight className='w-5 h-5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
          </Link>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className='absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#D94C58]/30 transition-colors duration-300 pointer-events-none' />
    </div>
  );
}

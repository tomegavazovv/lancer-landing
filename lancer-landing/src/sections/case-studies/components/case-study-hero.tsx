import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CaseStudyHeroProps {
  title: string;
  description: string[];
  tags?: string[];
  publishedDate?: string;
}

export function CaseStudyHero({
  title,
  description,
  tags,
  publishedDate,
}: CaseStudyHeroProps) {
  return (
    <section className='relative pt-20 pb-12 lg:pt-32'>
      <div className='mx-auto max-w-4xl px-6'>
        <div className='space-y-6'>
          <Link
            href='/case-studies'
            className='inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group mb-4'
          >
            <ArrowLeft className='w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1' />
            <span className='text-sm font-medium'>Go Back</span>
          </Link>
          {publishedDate && (
            <div className='text-sm text-center text-white/60'>
              Published on {publishedDate}
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='px-3 py-1 text-sm bg-white/10 rounded-full text-white/70 border border-white/20'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight'>
            {title}
          </h1>
          {description.map((paragraph, index) => (
            <p key={index} className='text-xl text-white/70 leading-relaxed'>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

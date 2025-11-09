'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Medal } from 'lucide-react';
import React from 'react';

const testimonialsData = [
  {
    quote:
      "Lancer was so effective for us. We were able to close down on three high quality deals in just under two weeks. I had to pause the campaign because we couldn't take on any more work - honestly, that's the best problem I had in years.",
    name: 'Nikola Arsovski',
    designation: 'Top Rated Upworker',
    videoSrc: 'https://fast.wistia.net/embed/iframe/m2ek96zapa',
    thumbnailUrl:
      'https://embed-ssl.wistia.com/deliveries/958d797d3efe0bfd1fa051d39510d56a958adaae.jpg?image_crop_resized=1920x1080',
    socialLink: 'https://www.linkedin.com/in/nikolaarsovskiii/',
  },
  {
    quote:
      'We started using Lancer maybe a month ago, and it has been incredible so far. We were able to get one new client in the first two weeks, which is amazing. The approach feels really genuine.',
    name: 'Martin Peshevski',
    designation: 'Agency Looking to Scale',
    videoSrc: 'https://fast.wistia.net/embed/iframe/n9l2zza1d6',
    thumbnailUrl:
      'https://embed-ssl.wistia.com/deliveries/e3b24a38621b4a6edf0f47ad7e066529d6e93c5f.jpg?image_crop_resized=1920x1080',
    socialLink: 'https://www.linkedin.com/in/martinpesevski/',
  },
  {
    quote:
      "With Lancer, we've been able to send very high quality proposals that simply work. In just two weeks, we landed our first project. It was very easy to set up, and I intend to continue using it.",
    name: 'Ivo Damjanovski',
    designation: 'Just started on Upwork',
    videoSrc: 'https://fast.wistia.net/embed/iframe/rtyzue1dr4',
    thumbnailUrl:
      'https://embed-ssl.wistia.com/deliveries/76704df37df81e28e5c12dd9f762491168d6a0bd.jpg?image_crop_resized=1920x1080',
    socialLink: 'https://www.linkedin.com/in/ivo-damjanovski/',
  },
];

export function VideoTestimonials() {
  const testimonialsRef = React.useRef<HTMLElement>(null);

  return (
    <section
      id='testimonials'
      ref={testimonialsRef}
      className='relative z-20 bg-white/80 dark:bg-muted/60 pb-32 pt-16 md:pb-40 px-5'
    >
      <AnimatedGroup
        preset='blur-slide'
        className='space-y-6'
        threshold={0.2}
        rootMargin='-50px'
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          },
          item: {
            hidden: { opacity: 0, filter: 'blur(4px)', y: 20 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: {
                duration: 0.4,
                ease: 'easeOut',
              },
            },
          },
        }}
      >
        <h3 className='text-black text-center text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-2 flex-wrap'>
          <Medal className=' sm:block w-6 h-6 sm:w-10 sm:h-10  flex-shrink-0' />
          <span className='whitespace-nowrap'>Trusted by Upwork</span>
          <span className='whitespace-nowrap'>Professionals</span>
        </h3>
        <p className='text-gray-600 text-center text-lg  sm:max-w-[330px] md:max-w-xl mx-auto'>
          Freelancers and agencies winning more deals on Upwork
        </p>
        <div className='mt-10 max-w-4xl mx-auto relative border-2 border-gray-200 rounded-3xl mx-5 bg-white'>
          <BorderBeam
            size={150}
            duration={12}
            colorFrom='#ffaa40'
            colorTo='#9c40ff'
            delay={0}
            className='p-5'
          />
          <AnimatedTestimonials autoplay={true} testimonials={testimonialsData} />
        </div>
      </AnimatedGroup>
    </section>
  );
}


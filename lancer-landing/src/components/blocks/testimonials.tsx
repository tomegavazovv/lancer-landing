'use client';

import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Badge } from '@/components/ui/badge';
import { LazySection } from '@/components/ui/lazy-section';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    company: 'cold.email',
    logo: '/testimonials/coldemail/agency-logo.png',
    stars: 5,
    testimonial: (
      <>
        In 2025 alone we have earned over $700,000 through Upwork.<br/><br/> A big part of it the fact that we send hundreds of proposals every week. <br/><br/> <span style={{ color: '#d94c58' }}>Lancer allows us to do that on autopilot at 17.8% reply rate.</span> <br/><br/> It's a no-brainer.
      </>
    ),
    author: {
      name: 'John Tanner Worthington',
      title: 'Owner cold.email',
      image: '/testimonials/coldemail/john-pp.png',
    },
  },
  {
    id: 2,
    company: 'Flowscape',
    logo: '/testimonials/flowscape/flowscape-logo.png',
    stars: 5,
    testimonial: (
      <>
        If you forced me to stop using all of our outreach tools (Instantly AI for emails, LinkedIn automation tools, engagement tools, scrapers...) and let me keep only one…<br /><br />

        It would be <span style={{ color: '#d94c58' }}>Lancer - The Upwork AI Agent</span>. Hands down.
      </>
    ),
    author: {
      name: 'Nikola Arsovski',
      title: 'Co-Founder - Flowscape',
      image: '/testimonials/flowscape/nikola-pp.jpeg',
    },
  },
  {
    id: 3,
    company: 'Digital Will Ads',
    logo: '/testimonials/digitalwill/dw-logo.jpeg',
    stars: 5,
    testimonial: (
      <>
        "Probably <span style={{ color: '#d94c58' }}>the best built software I've ever used or experienced</span>.<br /><br /> The Lancer guys are f***ing dope."
      </>
    ),
    author: {
      name: 'Tristan Meyer',
      title: 'Head Of Business Dev. - Digital Will Ads',
      image: '/testimonials/digitalwill/tristan-pp.jpeg',
    },
  },
  {
    id: 4,
    company: 'GrafixGrove',
    logo: '/testimonials/grafixgrove/grafixGrove-logo.png', // TODO: Replace with actual logo
    stars: 5,
    testimonial: (
      <>
        We get between <span style={{ color: '#d94c58' }}>1-2 clients a month with Lancer on autopilot</span>.<br /><br />

        We spend 0 hours on Upwork Outreach down from 10 hours a week before we started using Lancer
      </>
    ),
    author: {
      name: 'Angela Stojanoska',
      title: 'CEO - GrafixGrove',
      image: '/testimonials/grafixgrove/angela-pp.jpeg',
    },
  },
  {
    id: 5,
    company: 'Upwork Expert',
    logo: '/testimonials/nikola/upwork-logo.png', // TODO: Replace with actual logo
    stars: 5,
    testimonial: (
      <>
        Over the past 5 years I've tested and explored every possible option when it comes to sending proposals for my clients.<br /><br />

        Manual bidding, outsourcing to VAs, various automation tools. <br/><br/>Based on thousands of proposals sent across hundreds of clients - I can guarantee that <span style={{ color: '#d94c58' }}>Lancer is the best option for bidding on Upwork Jobs</span>.
      </>
    ),
    author: {
      name: 'Nikola Kocheski',
      title: 'Upwork Expert - Ranked #1 on Upwork',
      image: '/testimonials/nikola/nikola-pp.jpeg',
    },
  },
  {
    id: 6,
    company: 'Wolfware Labs',
    logo: '/testimonials/wolfware/wolfware-logo.png',
    stars: 5,
    testimonial: (
      <>
        We <span style={{ color: '#d94c58' }}>closed our first client within 2 weeks of using Lancer</span>. It was a $12,000 MVP project that has since then transitioned into a long-term retainer.<br /><br />

        Since then it has been smooth sailing, we are averaging 1-2 clients per month thanks to Lancer.
      </>
    ),
    author: {
      name: 'Darko Stojanov',
      title: 'Head Of Sales - Wolfware Labs',
      image: '/testimonials/wolfware/darko-pp.png',
    },
  },
  {
    id: 7,
    company: 'Core Devs',
    logo: '/testimonials/core-devs/core-devs-logo.png',
    stars: 5,
    testimonial: (
      <>
        We used to use a different Upwork automation tool before Lancer, we used to average around 800 proposals/month at a 6.3% reply rate.<br /><br />

        Since moving to Lancer we are now doing <span style={{ color: '#d94c58' }}>500 proposals/month at 17.6% reply rate</span>.<br /><br />

        The results speak for themselves, Lancer is the best Upwork Outreach tool on the market.
      </>
    ),
    author: {
      name: 'Mahbub Shuvo',
      title: 'Founder - Core Devs',
      image: '/testimonials/core-devs/mahbub-pp.jpeg',
    },
  },
  {
    id: 8,
    company: 'Harper Russo',
    logo: '/testimonials/harper-russo/hr-logo.png',
    stars: 5,
    testimonial: (
      <>
        We do recruiting, this is a niche that has a lower volume of jobs on Upwork compared to others.<br /><br />

        That is why it was really important to us to never miss a recruitment job when it goes up on Upwork, after exploring several options including manual VAs for bidding - Lancer came out on top.<br /><br />

        <span style={{ color: '#d94c58' }}>The 24/7 coverage with instant bidding was a no brainer.</span><br /><br />

        We've won at least 1 client every month using Lancer, incredible ROI!
      </>
    ),
    author: {
      name: 'Jordan Ferrier',
      title: 'Partner - Harper Russo',
      image: '/testimonials/harper-russo/jordan-ferrier.jpeg',
    },
  },
  {
    id: 9,
    company: 'Fuelerate',
    logo: '/testimonials/fuelerate/fuelerate-logo.jpeg',
    stars: 5,
    testimonial: (
      <>
        We used to use a frankenstein solution of an n8n workflow to find jobs and create cover letters, google sheet to track performance and a manual VA to send the proposals and double-check everything.<br /><br />

        <span style={{ color: '#d94c58' }}>This solution performed worse, was harder to manage and was more expensive to run compared to Lancer.</span><br /><br />

        Transitioning was a no-brainer. Lancer enables us to send over 600 proposals each month and stay on top of everything all within one tool.
      </>
    ),
    author: {
      name: 'Marti Caballero',
      title: 'CEO & Founder - Fuelerate',
      image: '/testimonials/fuelerate/marti-pp.jpeg',
    },
  },
  {
    id: 10,
    company: 'Inboxist',
    logo: '/testimonials/inboxist/inboxist-logo.jpeg',
    stars: 5,
    testimonial: (
      <>
        When we were approached by Ivan, we were subscribed to a competitor platform.<br /><br />

        We were offered a free trial, and since we weren't particularly satisfied with the competitor we took him up on his offer.<br /><br />

        <span style={{ color: '#d94c58' }}>Within 2 weeks we closed 2 clients and by the end of the month we had 6 won deals through Lancer.</span><br /><br />

        After the trial we became a Lancer user, even though we still had 2 months left on the other subscription.
      </>
    ),
    author: {
      name: 'Arul Raj',
      title: 'Founder - Inboxist',
      image: '/testimonials/inboxist/arul-pp.jpeg',
    },
  },
  {
    id: 11,
    company: 'Data Family',
    logo: '/testimonials/data-family/data-family-logo.png',
    stars: 5,
    testimonial: (
      <>
        I was originally using a competitor, however simply put, <span style={{ color: '#d94c58' }}>Lancer provided better value at a much better price point</span>.<br /><br />

        The team also put in a ton of effort to help out and optimize my campaigns - you can tell they care.
      </>
    ),
    author: {
      name: 'Nimit Bhardwaj',
      title: 'Founder - Data Family',
      image: '/testimonials/data-family/nimit-pp.jpeg',
    },
  },
  {
    id: 12,
    company: 'Code2b',
    logo: '/testimonials/code2b/code_2b_logo.jpeg', // TODO: Update with actual logo
    stars: 5,
    testimonial: (
      <>
        <span style={{ color: '#d94c58' }}>Lancer is amazing.</span> I f**king love these guys.
      </>
    ),
    author: {
      name: 'Aleksandar Janca',
      title: 'Founder - Code2b',
      image: '/testimonials/code2b/aleksandar-pp.jpeg',
    },
  },
];

export function Testimonials() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderTestimonialCard = (testimonial: any, key: string) => (
    <div
      key={key}
      className={`flex-none rounded-2xl border-2 border-border p-6 bg-background/50 backdrop-blur-sm flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary hover:-translate-y-1 ${
        isMobile ? 'w-full max-w-sm mx-auto' : 'w-[400px]'
      }`}
    >
      {/* Company Logo and Name */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          {testimonial.logo && (
            <Image
              src={testimonial.logo}
              alt={`${testimonial.company} logo`}
              width={32}
              height={32}
              className='rounded'
            />
          )}
          <h3 className='text-lg font-bold'>{testimonial.company}</h3>
        </div>
      </div>

      {/* Star Rating */}
      <div className='flex gap-1 mb-4'>
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star
            key={i}
            className='w-5 h-5 fill-yellow-400 text-yellow-400'
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <div className='flex-1 mb-6'>
        <p className='text-base leading-relaxed text-foreground'>
          {testimonial.testimonial}
        </p>
      </div>

      {/* Author */}
      <div className='flex items-center gap-3 pt-4 border-t border-border'>
        <Image
          src={testimonial.author.image}
          alt={testimonial.author.name}
          width={48}
          height={48}
          className='rounded-full'
        />
        <div>
          <p className='font-semibold text-sm'>
            {testimonial.author.name}
          </p>
          <p className='text-sm text-muted-foreground'>
            {testimonial.author.title}
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <section className='py-24 bg-background relative overflow-hidden'>
      <div className='w-full px-4'>
        {/* Header */}
        <AnimatedGroup
          preset='blur-slide'
          className='text-center mb-12'
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            },
          }}
        >
          <Badge
            variant='outline'
            className='mb-4 px-4 py-2 text-sm font-medium rounded-full'
          >
            ⭐ Testimonials
          </Badge>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4'>
            Trusted by Top Freelancers & Agencies
          </h2>
          <p className='max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed'>
            See what our users have to say about Lancer
          </p>
        </AnimatedGroup>

        {/* Testimonials Content */}
        <LazySection>
          <div className='relative w-full'>
            {isMobile ? (
              /* Mobile Slider */
              <div className='relative'>
                {/* Single Testimonial Card */}
                <div className='w-full px-4'>
                  {renderTestimonialCard(testimonials[currentIndex], `mobile-${currentIndex}`)}
                </div>

                {/* Navigation Controls */}
                <div className='flex items-center justify-center gap-4 mt-8'>
                  <button
                    onClick={prevTestimonial}
                    className='p-2 rounded-full border border-border hover:bg-accent transition-colors'
                    aria-label='Previous testimonial'
                  >
                    <ChevronLeft className='w-5 h-5' />
                  </button>

                  {/* Dots Indicator */}
                  <div className='flex gap-2'>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex 
                            ? 'bg-primary' 
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className='p-2 rounded-full border border-border hover:bg-accent transition-colors'
                    aria-label='Next testimonial'
                  >
                    <ChevronRight className='w-5 h-5' />
                  </button>
                </div>

                {/* Auto-play indicator */}
                <div className='text-center mt-4'>
                  <p className='text-xs text-muted-foreground'>
                    Auto-advancing every 5 seconds
                  </p>
                </div>
              </div>
            ) : (
              /* Desktop Scrolling */
              <div className='overflow-hidden w-full pt-2'>
                <div className='flex gap-6 animate-scroll' style={{
                  width: '200%'
                }}>
                  {/* First set of testimonials */}
                  {testimonials.map((testimonial) => 
                    renderTestimonialCard(testimonial, `desktop-${testimonial.id}`)
                  )}

                  {/* Second set of testimonials for infinite scroll */}
                  {testimonials.map((testimonial) => 
                    renderTestimonialCard(testimonial, `desktop-duplicate-${testimonial.id}`)
                  )}
                </div>
              </div>
            )}
          </div>
        </LazySection>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Desktop - faster speed (25% increase) */
        @media (min-width: 769px) {
          .animate-scroll {
            animation: scroll 34s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}


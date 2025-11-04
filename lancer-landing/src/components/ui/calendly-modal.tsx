'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CalendlyEmbed from './calendly-embed';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Testimonials data
const testimonials = [
  {
    quote:
      "Lancer was so effective for us. We were able to close down on three high quality deals in just under two weeks. I had to pause the campaign because we couldn't take on any more work - honestly, that's the best problem I had in years.",
    name: 'Nikola Arsovski',
    designation: 'Top Rated Upworker',
    avatar: '/nikola-headshot.jpeg',
  },
  {
    quote:
      'We started using Lancer maybe a month ago, and it has been incredible so far. We were able to get one new client in the first two weeks, which is amazing. The approach feels really genuine.',
    name: 'Martin Peshevski',
    designation: 'Agency Looking to Scale',
    avatar: '/martin-headshot.jpg',
  },
  {
    quote:
      "With Lancer, we've been able to send very high quality proposals that simply work. In just two weeks, we landed our first project. It was very easy to set up, and I intend to continue using it.",
    name: 'Ivo Damjanovski',
    designation: 'Just started on Upwork',
    avatar: '/ivo-headshot.jpeg',
  },
];

// Video testimonials data
const videoTestimonials = [
  {
    name: 'Nikola Arsovski',
    designation: 'Top Rated Upworker',
    videoSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fnikola-final.mp4?alt=media&token=89ceb1b0-63c6-4d01-8984-28501380a767',
  },
  {
    name: 'Martin Peshevski',
    designation: 'Agency Looking to Scale',
    videoSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fmartin-final.mp4?alt=media&token=2d071845-ba39-4ba0-9e5d-bf73c24382e9',
  },
  {
    name: 'Ivo Damjanovski',
    designation: 'Just started on Upwork',
    videoSrc:
      'https://firebasestorage.googleapis.com/v0/b/lancer-prod.firebasestorage.app/o/gifs%2Fivo-final.mp4?alt=media&token=81509906-6e36-45bf-b6e9-931a1554704a',
  },
];

// Testimonial Skeleton Loader Component
function TestimonialSkeleton() {
  return (
    <div className='hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-50 to-indigo-100 lg:p-8 flex-col justify-center lg:min-h-[600px]'>
      <div className='pb-3 lg:pb-6'>
        <div className='h-6 lg:h-8 bg-gray-200 rounded-md mb-2 animate-pulse'></div>
        <div className='h-4 lg:h-5 bg-gray-200 rounded-md w-3/4 animate-pulse'></div>
      </div>

      <div className='flex-1 flex flex-col justify-center'>
        <div className='space-y-4'>
          {/* Video Skeleton */}
          <div className='mb-4'>
            <div className='relative rounded-lg overflow-hidden bg-gray-200 animate-pulse'>
              <div className='w-full h-48 lg:h-56 bg-gray-300'></div>
              <div className='absolute bottom-3 right-3 w-10 h-10 bg-gray-400 rounded-full'></div>
            </div>
          </div>

          {/* Quote Skeleton */}
          <div className='space-y-2'>
            <div className='h-4 lg:h-5 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-4 lg:h-5 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-4 lg:h-5 bg-gray-200 rounded w-3/4 animate-pulse'></div>
          </div>

          {/* Author Skeleton */}
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse'></div>
            <div className='space-y-1'>
              <div className='h-4 bg-gray-200 rounded w-24 animate-pulse'></div>
              <div className='h-3 bg-gray-200 rounded w-20 animate-pulse'></div>
            </div>
          </div>

          {/* Navigation Skeleton */}
          <div className='flex justify-center items-center gap-6 mt-6'>
            <div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse'></div>
            <div className='flex gap-2'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='w-2 h-2 bg-gray-200 rounded-full animate-pulse'
                ></div>
              ))}
            </div>
            <div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset video to muted when video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsVideoMuted(true);
    }
  }, [currentVideoIndex]);

  // Listen for Calendly loading events
  useEffect(() => {
    if (!isOpen) {
      setIsCalendlyLoaded(false);
      return;
    }

    const handleCalendlyEvent = (event: MessageEvent) => {
      if (event.data.type && event.data.type.indexOf('calendly') === 0) {
        if (
          event.data.type === 'calendly.height' ||
          event.data.type === 'calendly.profile_page_viewed' ||
          event.data.type === 'calendly.date_and_time_selected'
        ) {
          setIsCalendlyLoaded(true);
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    // Fallback timeout in case events don't fire
    const timeout = setTimeout(() => {
      setIsCalendlyLoaded(true);
    }, 3000);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  const currentTestimonial = testimonials[currentTestimonialIndex];
  const currentVideo = videoTestimonials[currentVideoIndex];

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isVideoMuted;
      setIsVideoMuted(newMutedState);
      videoRef.current.muted = newMutedState;
    }
  };

  const goToPrevious = () => {
    const prevIndex =
      currentTestimonialIndex === 0
        ? testimonials.length - 1
        : currentTestimonialIndex - 1;
    setCurrentTestimonialIndex(prevIndex);
    setCurrentVideoIndex(prevIndex);
    setIsVideoMuted(true);
  };

  const goToNext = () => {
    const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
    setCurrentTestimonialIndex(nextIndex);
    setCurrentVideoIndex(nextIndex);
    setIsVideoMuted(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[1000px] max-h-[90vh] overflow-hidden p-0'>
        <div className='flex flex-col lg:flex-row lg:min-h-[600px] h-full overflow-y-auto'>
          {/* Left Side - Testimonials or Skeleton - Hidden on mobile */}
          {!isCalendlyLoaded ? (
            <TestimonialSkeleton />
          ) : (
            <div className='hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-50 to-indigo-100 lg:p-8 flex-col justify-center lg:min-h-[600px]'>
              <DialogHeader className='pb-3 lg:pb-6'>
                <DialogTitle className='text-lg lg:text-2xl font-semibold text-gray-900'>
                  High-Quality Deals. Zero Fluff.
                </DialogTitle>
                <p className='text-gray-600 text-sm lg:text-base'>
                  Freelancers are closing work in just days.
                </p>
              </DialogHeader>

              {/* Testimonial Content */}
              <div className='flex-1 flex flex-col justify-center'>
                <div className='space-y-4'>
                  {/* Video Player */}
                  <div className='mb-4'>
                    <div className='relative rounded-lg overflow-hidden bg-gray-100'>
                      <video
                        ref={videoRef}
                        key={currentVideo.videoSrc}
                        src={currentVideo.videoSrc}
                        className='w-full h-48 lg:h-56 object-cover'
                        autoPlay
                        muted={isVideoMuted}
                        loop
                        playsInline
                        onClick={toggleMute}
                      />
                      <button
                        onClick={toggleMute}
                        className='absolute bottom-3 right-3 bg-black/70 hover:bg-black/80 rounded-full p-2 transition-colors'
                      >
                        {isVideoMuted ? (
                          <svg
                            className='w-5 h-5 text-white'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
                          </svg>
                        ) : (
                          <svg
                            className='w-5 h-5 text-white'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className='text-gray-800 text-base lg:text-lg leading-relaxed'>
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className='flex items-center gap-3'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                      />
                      <AvatarFallback>
                        {currentTestimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='font-semibold text-gray-900'>
                        {currentTestimonial.name}
                      </div>
                      <div className='text-gray-600 text-sm'>
                        {currentTestimonial.designation}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Combined Navigation */}
                <div className='flex justify-center items-center gap-6 mt-6'>
                  <button
                    onClick={goToPrevious}
                    className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                    aria-label='Previous testimonial'
                  >
                    <ChevronLeft className='w-4 h-4 text-gray-600' />
                  </button>

                  <div className='flex gap-2'>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentTestimonialIndex(index);
                          setCurrentVideoIndex(index);
                          setIsVideoMuted(true);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentTestimonialIndex
                            ? 'bg-blue-600 w-6'
                            : 'bg-blue-200 hover:bg-blue-300'
                        }`}
                        aria-label={`View testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goToNext}
                    className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                    aria-label='Next testimonial'
                  >
                    <ChevronRight className='w-4 h-4 text-gray-600' />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Side - Calendly */}
          <div className='w-full lg:w-3/5 bg-white touch-auto'>
            <div className='p-4 lg:p-6 border-b border-gray-200'>
              <div className='flex items-center gap-4'>
                <Avatar className='w-16 h-16'>
                  <AvatarImage src='/ivan-headshot.png' alt='Ivan' />
                  <AvatarFallback>I</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='text-xl lg:text-2xl font-bold text-gray-900'>
                    Book Demo with Ivan
                  </h3>
                  <div className='text-gray-600 text-sm'>Founder & CEO</div>
                  <div className='text-gray-500 text-xs mt-1'>
                    I'll personally walk you through how Lancer can transform
                    your Upwork success
                  </div>
                </div>
              </div>

              {/* Social Media Row */}
              <div className='mt-3'>
                <div className='flex items-center gap-3'>
                  <span className='text-gray-500 text-xs'>Find him on:</span>
                  <div className='flex gap-3'>
                    <a
                      href='https://www.linkedin.com/in/ivan-nedlekovski/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-blue-600 transition-colors'
                    >
                      <Linkedin className='w-5 h-5' />
                    </a>
                    <a
                      href='https://www.instagram.com/nedelkov.ski/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-pink-600 transition-colors'
                    >
                      <Instagram className='w-5 h-5' />
                    </a>
                    <a
                      href='https://www.youtube.com/@ivan.nedelkovski'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-red-600 transition-colors'
                    >
                      <Youtube className='w-5 h-5' />
                    </a>
                    <a
                      href='https://www.nedelkov.ski/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-gray-700 transition-colors'
                    >
                      <Globe className='w-5 h-5' />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-0 min-h-[520px] lg:min-h-[520px] relative z-10 touch-auto'>
              <CalendlyEmbed
                url='https://calendly.com/ivan-mvp/lancer-1-1-demo-call'
                minimal={true}
                height={520}
                backgroundColor='ffffff'
                primaryColor='3b82f6'
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

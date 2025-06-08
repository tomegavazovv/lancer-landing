'use client';

import { cn } from '@/lib/utils';
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlayerPlay,
  IconX,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  videoSrc: string;
  thumbnailUrl: string;
  socialLink: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  const [randomRotations, setRandomRotations] = useState<number[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>('');

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const openVideoModal = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo('');
  };

  useEffect(() => {
    // Generate random rotations only on client side to avoid hydration mismatch
    setRandomRotations(
      testimonials.map(() => Math.floor(Math.random() * 21) - 10)
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  useEffect(() => {
    // Handle escape key to close modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  const getRandomRotation = (index: number) => {
    return randomRotations[index] || 0;
  };

  return (
    <>
      <div
        className={cn(
          'max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20',
          className
        )}
      >
        <div className='relative grid grid-cols-1 md:grid-cols-2 gap-20 '>
          <div>
            <div className='relative h-[28rem] w-full'>
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: getRandomRotation(index),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : getRandomRotation(index),
                      zIndex: isActive(index)
                        ? 15
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: getRandomRotation(index),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeInOut',
                    }}
                    className='absolute inset-0 origin-bottom cursor-pointer group'
                    onClick={() => openVideoModal(testimonial.videoSrc)}
                  >
                    <div className='relative h-full w-full rounded-3xl overflow-hidden'>
                      <img
                        src={testimonial.thumbnailUrl}
                        alt={`${testimonial.name} testimonial`}
                        className='h-full w-full object-cover object-center'
                      />
                      <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-colors duration-200'>
                          <IconPlayerPlay className='h-8 w-8 text-white fill-white' />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className='flex justify-between flex-col py-4'>
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
            >
              <h3 className='text-2xl font-bold text-white'>
                <Link href={testimonials[active].socialLink}>
                  {testimonials[active].name}
                </Link>
              </h3>

              <p className='text-sm font-medium text-gray-300 mt-1'>
                {testimonials[active].socialLink ? (
                  <a
                    href={testimonials[active].socialLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-white transition-colors duration-200'
                  >
                    {testimonials[active].designation}
                  </a>
                ) : (
                  testimonials[active].designation
                )}
              </p>
              <div
                className='flex items-center gap-1 mt-3'
                role='img'
                aria-label='5 out of 5 stars'
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm'
                    aria-hidden='true'
                  />
                ))}
              </div>
              <motion.p className='text-lg text-gray-300 mt-8'>
                {testimonials[active].quote.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: 'blur(10px)',
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: 'blur(0px)',
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeInOut',
                      delay: 0.02 * index,
                    }}
                    className='inline-block'
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
            <div className='flex gap-4 pt-12 md:pt-0'>
              <button
                onClick={handlePrev}
                className='h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center group/button backdrop-blur-sm border border-white/20'
              >
                <IconArrowLeft className='h-5 w-5 text-white group-hover/button:rotate-12 transition-transform duration-300' />
              </button>
              <button
                onClick={handleNext}
                className='h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center group/button backdrop-blur-sm border border-white/20'
              >
                <IconArrowRight className='h-5 w-5 text-white group-hover/button:-rotate-12 transition-transform duration-300' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-20 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className='relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className='absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors'
              >
                <IconX className='h-6 w-6 text-white' />
              </button>
              <iframe
                src={selectedVideo}
                className='w-full h-full'
                allow='autoplay; fullscreen'
                allowFullScreen
                frameBorder='0'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

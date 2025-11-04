import { useInView } from '@/hooks/use-in-view';
import { Play, Shield } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { VideoModal } from './video-modal';

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
  videoUrl?: string;
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
  videoUrl,
}: FeatureCardProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use the intersection observer hook with 300px offset
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0,
    rootMargin: '-300px 0px -300px 0px', // Element must be 300px into viewport to trigger
    triggerOnce: false, // Keep observing so video pauses when out of view
  });

  // Check if the image is a GIF
  const isGif = imageSrc.toLowerCase().endsWith('.gif');

  // Handle video button click
  const handleVideoClick = () => {
    if (isVideo) {
      setIsVideoModalOpen(true);
    } else {
      // Fallback to original behavior for non-video buttons
      window.location.href = buttonHref;
    }
  };

  // Auto-play/pause video based on visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      videoRef.current.playbackRate = 1.25; // Speed up by 1.25x
      videoRef.current.play().catch(() => {
        // Handle autoplay failure silently
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to start
    }
  }, [isInView]);

  return (
    <div className={className} ref={containerRef}>
      <div className='relative max-w-7xl border-[3px] border-white/20 py-6 px-6 md:py-10 md:px-10 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0'>
          {/* Video/Image - Shows first on mobile, second on desktop */}
          <div className='order-1 md:order-2 md:flex-[0.4] flex justify-center w-full'>
            <div className='relative rounded-xl overflow-hidden w-full md:max-w-none border border-white/20'>
              {isVideo ? (
                <video
                  ref={videoRef}
                  src={imageSrc}
                  className='object-cover rounded-xl w-full h-auto'
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
            <h3 className='text-2xl md:text-3xl font-semibold text-white'>
              {title}
            </h3>
            <p className='text-base md:text-lg leading-relaxed text-white/80'>
              {description}
            </p>
            <div className='flex flex-col sm:flex-row items-center sm:items-center gap-4 md:items-center'>
              {/* Mobile: Simple button without card wrapper */}
              <div className='block md:hidden w-full'>
                <Button
                  onClick={handleVideoClick}
                  size='default'
                  className='rounded-xl px-4 text-sm w-full'
                >
                  {isVideo && <Play className='w-4 h-4 mr-2' />}
                  <span className='text-nowrap'>{buttonText}</span>
                </Button>
              </div>
              {/* Desktop: Button with card wrapper */}
              <div className='hidden md:block bg-white/10 rounded-xl border border-white/20 p-0.5'>
                <Button
                  onClick={handleVideoClick}
                  size='lg'
                  className='rounded-xl px-5 text-base'
                >
                  {isVideo && <Play className='w-4 h-4 mr-2' />}
                  <span className='text-nowrap'>{buttonText}</span>
                </Button>
              </div>
              {checkmarkText && (
                <div className='flex items-center justify-center md:justify-start gap-2'>
                  <Shield className='text-white/60 h-5 w-5' />
                  <span className='text-sm text-white/80'>{checkmarkText}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
        title={typeof title === 'string' ? title : 'Feature Demo'}
      />
    </div>
  );
}

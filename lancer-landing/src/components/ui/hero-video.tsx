'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const VIDEO_ID = 'dDkAaZsMc_w';
const EMBED_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&enablejsapi=1`;

export function HeroVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Render iframe only on the client — browsers are stricter about
  // autoplay for iframes that exist in the initial SSR HTML.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-hide the unmute hint
  useEffect(() => {
    if (showHint && isLoaded) {
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showHint, isLoaded]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    // Fallback: send playVideo command via postMessage in case
    // the URL autoplay param alone didn't trigger playback.
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo' }),
        'https://www.youtube.com'
      );
    }, 500);
  };

  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    const func = isMuted ? 'unMute' : 'mute';
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func }),
      'https://www.youtube.com'
    );
    setIsMuted(!isMuted);
    setShowHint(false);
  };

  return (
    <div className='relative aspect-video rounded-2xl overflow-hidden bg-black'>
      {/* Loading poster — shows thumbnail until iframe loads */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='absolute inset-0 z-[5]'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
              alt=''
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black/20' />
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube embed — mounted client-side only for reliable autoplay */}
      {mounted && (
        <iframe
          ref={iframeRef}
          src={EMBED_SRC}
          className='absolute inset-0 w-full h-full border-0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
          onLoad={handleIframeLoad}
        />
      )}

      {/* Invisible shield to block YouTube's click-to-pause */}
      <div className='absolute inset-0 z-10' />

      {/* Sound toggle */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 flex items-center gap-2.5'
          >
            {/* "Click to unmute" hint */}
            <AnimatePresence>
              {showHint && isMuted && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.3 }}
                  className='text-[11px] sm:text-xs text-white/50 font-medium tracking-wide select-none hidden sm:block'
                >
                  Click to unmute
                </motion.span>
              )}
            </AnimatePresence>

            <button
              onClick={toggleMute}
              className='group flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-black/50 hover:border-white/20 transition-all duration-300 cursor-pointer'
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-white/90 transition-colors' />
              ) : (
                <Volume2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-white/90 transition-colors' />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle inner ring for depth */}
      <div className='absolute inset-0 pointer-events-none z-[15] rounded-2xl ring-1 ring-inset ring-white/[0.06]' />
    </div>
  );
}

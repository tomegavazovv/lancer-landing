'use client';

import { useEffect, useState } from 'react';

interface CalendlyEmbedProps {
  url: string;
  height?: number;
  minimal?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

const CalendlyEmbed = ({
  url,
  height = 900,
  minimal = false,
  backgroundColor = 'ffffff',
  textColor = '4d5055',
  primaryColor = '00a2ff',
}: CalendlyEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (existingScript) {
      setScriptLoaded(true);
      // Give Calendly some time to initialize after script is loaded
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Create and load the Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
      // Give Calendly some time to initialize after script loads
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    };

    document.head.appendChild(script);

    // Listen for Calendly events to detect when it's fully loaded
    const handleCalendlyLoad = (event: MessageEvent) => {
      if (event.data.type && event.data.type.indexOf('calendly') === 0) {
        // Calendly has sent a message, likely indicating it's loaded
        if (
          event.data.type === 'calendly.height' ||
          event.data.type === 'calendly.profile_page_viewed'
        ) {
          setIsLoading(false);
        }
      }
    };

    window.addEventListener('message', handleCalendlyLoad);

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleCalendlyLoad);
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Build the URL with parameters for minimal view
  const buildCalendlyUrl = () => {
    const baseUrl = url;
    const params = new URLSearchParams();

    if (minimal) {
      params.append('hide_event_type_details', '1');
      params.append('hide_gdpr_banner', '1');
    }

    params.append('background_color', backgroundColor);
    params.append('text_color', textColor);
    params.append('primary_color', primaryColor);

    return `${baseUrl}?${params.toString()}`;
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div
      className='animate-pulse bg-muted rounded-lg border border-border/20 p-6 space-y-4'
      style={{ height: `${height}px` }}
    >
      {/* Header skeleton */}
      <div className='space-y-3'>
        <div className='h-6 bg-muted-foreground/20 rounded-md w-3/4'></div>
        <div className='h-4 bg-muted-foreground/10 rounded-md w-1/2'></div>
      </div>

      {/* Calendar grid skeleton */}
      <div className='grid grid-cols-7 gap-2 mt-6'>
        {/* Days of week */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className='h-8 bg-muted-foreground/10 rounded'></div>
        ))}

        {/* Calendar dates */}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className='h-8 bg-muted-foreground/5 rounded hover:bg-muted-foreground/10 transition-colors'
          ></div>
        ))}
      </div>

      {/* Loading text */}
      <div className='flex items-center justify-center pt-8 space-x-2'>
        <div className='w-2 h-2 bg-primary rounded-full animate-bounce'></div>
        <div
          className='w-2 h-2 bg-primary rounded-full animate-bounce'
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className='w-2 h-2 bg-primary rounded-full animate-bounce'
          style={{ animationDelay: '0.2s' }}
        ></div>
        <span className='ml-2 text-sm text-muted-foreground'>
          Loading calendar...
        </span>
      </div>
    </div>
  );

  return (
    <div className='relative'>
      {isLoading && <LoadingSkeleton />}
      <div
        className={`calendly-inline-widget transition-opacity duration-500 ${
          isLoading ? 'opacity-0 absolute inset-0' : 'opacity-100'
        }`}
        data-url={buildCalendlyUrl()}
        style={{
          height: `${height}px`,
          width: '100%',
          border: 'none',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default CalendlyEmbed;

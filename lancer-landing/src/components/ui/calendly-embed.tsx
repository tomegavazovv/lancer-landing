'use client';

import { useEffect } from 'react';

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
  useEffect(() => {
    // Check if the script is already loaded
    if (
      document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      )
    ) {
      return;
    }

    // Create and load the Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
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

  return (
    <div
      className='calendly-inline-widget'
      data-url={buildCalendlyUrl()}
      style={{
        height: `${height}px`,
        width: '100%',
        border: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default CalendlyEmbed;

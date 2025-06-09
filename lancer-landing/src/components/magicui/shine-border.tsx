'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 20
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
  /**
   * Initial position of the shine effect (percentage)
   * @default "0% 0%"
   */
  initialPosition?: string;
  /**
   * Animation delay in seconds
   * @default 0
   */
  animationDelay?: number;
  /**
   * Direction of the shine animation
   * @default "diagonal" - moves from top-left to bottom-right
   * "reverse-diagonal" - moves from bottom-right to top-left
   * "horizontal" - moves left to right
   * "vertical" - moves top to bottom
   */
  direction?: 'diagonal' | 'reverse-diagonal' | 'horizontal' | 'vertical';
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 20,
  shineColor = '#000000',
  initialPosition = '0% 0%',
  animationDelay = 0,
  direction = 'diagonal',
  className,
  style,
  ...props
}: ShineBorderProps) {
  // Define animation keyframes based on direction
  const getAnimationKeyframes = () => {
    switch (direction) {
      case 'reverse-diagonal':
        return {
          from: '100% 100%',
          mid: '0% 0%',
          to: '100% 100%',
        };
      case 'horizontal':
        return {
          from: '0% 50%',
          mid: '100% 50%',
          to: '0% 50%',
        };
      case 'vertical':
        return {
          from: '50% 0%',
          mid: '50% 100%',
          to: '50% 0%',
        };
      default: // diagonal
        return {
          from: '0% 0%',
          mid: '100% 100%',
          to: '0% 0%',
        };
    }
  };

  const keyframes = getAnimationKeyframes();
  const uniqueId = React.useId();

  return (
    <>
      <style>
        {`
          @keyframes shine-${uniqueId} {
            0% { background-position: ${keyframes.from}; }
            50% { background-position: ${keyframes.mid}; }
            100% { background-position: ${keyframes.to}; }
          }
        `}
      </style>
      <div
        style={
          {
            '--border-width': `${borderWidth}px`,
            '--duration': `${duration}s`,
            '--animation-delay': `${animationDelay}s`,
            backgroundImage: `radial-gradient(transparent,transparent, ${
              Array.isArray(shineColor) ? shineColor.join(',') : shineColor
            },transparent,transparent)`,
            backgroundSize: '300% 300%',
            backgroundPosition: initialPosition,
            animation: `shine-${uniqueId} var(--duration) infinite linear var(--animation-delay)`,
            mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: 'var(--border-width)',
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]',
          className
        )}
        {...props}
      />
    </>
  );
}

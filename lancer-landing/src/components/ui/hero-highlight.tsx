'use client';
import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import React from 'react';

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  // SVG patterns for different states and themes
  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        'group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-black',
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className='pointer-events-none absolute inset-0 dark:hidden'
        style={{
          backgroundImage: dotPatterns.light.default,
        }}
      />
      <div
        className='pointer-events-none absolute inset-0 hidden dark:block'
        style={{
          backgroundImage: dotPatterns.dark.default,
        }}
      />
      <motion.div
        className='pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden'
        style={{
          backgroundImage: dotPatterns.light.hover,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <motion.div
        className='pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block'
        style={{
          backgroundImage: dotPatterns.dark.hover,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?:
    | 'default'
    | 'blue'
    | 'green'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'yellow'
    | 'teal';
}) => {
  const colorVariants = {
    default:
      'from-indigo-700 to-purple-700 dark:from-indigo-600 dark:to-purple-600',
    blue: 'from-blue-700 to-cyan-700 dark:from-blue-600 dark:to-cyan-600',
    green:
      'from-green-700 to-emerald-700 dark:from-green-600 dark:to-emerald-600',
    orange:
      'from-orange-700 to-amber-700 dark:from-orange-600 dark:to-amber-600',
    pink: 'from-pink-700 to-rose-700 dark:from-pink-600 dark:to-rose-600',
    purple:
      'from-purple-700 to-violet-700 dark:from-purple-600 dark:to-violet-600',
    red: 'from-red-700 to-rose-700 dark:from-red-600 dark:to-rose-600',
    yellow:
      'from-yellow-700 to-amber-700 dark:from-yellow-600 dark:to-amber-600',
    teal: 'from-teal-700 to-cyan-700 dark:from-teal-600 dark:to-cyan-600',
  };

  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      whileInView={{
        backgroundSize: '100% 100%',
      }}
      viewport={{
        once: true,
        amount: 0.8,
        margin: '0px 0px -50px 0px',
      }}
      transition={{
        duration: 1.5,
        ease: 'linear',
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r px-1 pb-1`,
        colorVariants[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
};

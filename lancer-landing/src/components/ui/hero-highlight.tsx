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
  variant?: 'default' | 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow' | 'teal';
}) => {
  const colorVariants = {
    default:
      'from-indigo-200 to-purple-200 dark:from-indigo-300 dark:to-purple-300',
    blue:
      'from-blue-200 to-cyan-200 dark:from-blue-300 dark:to-cyan-300',
    green:
      'from-green-200 to-emerald-200 dark:from-green-300 dark:to-emerald-300',
    orange:
      'from-orange-200 to-amber-200 dark:from-orange-300 dark:to-amber-300',
    pink:
      'from-pink-200 to-rose-200 dark:from-pink-300 dark:to-rose-300',
    purple:
      'from-purple-200 to-violet-200 dark:from-purple-300 dark:to-violet-300',
    red:
      'from-red-200 to-rose-200 dark:from-red-300 dark:to-rose-300',
    yellow:
      'from-yellow-200 to-amber-100 dark:from-yellow-300 dark:to-amber-200',
    teal:
      'from-teal-200 to-cyan-100 dark:from-teal-300 dark:to-cyan-200',
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

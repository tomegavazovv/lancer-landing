'use client';

import { cn } from '@/lib/utils';
import { motion, TargetAndTransition, Variants } from 'framer-motion';
import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const fadeInItemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(12px)',
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 1.5,
    },
  },
};

export function LazySection({
  children,
  className,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '50px',
  delay = 0,
}: LazySectionProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        ...fadeInVariants,
        visible: {
          ...fadeInVariants.visible,
          transition: {
            ...(fadeInVariants.visible as TargetAndTransition).transition,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={fadeInItemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

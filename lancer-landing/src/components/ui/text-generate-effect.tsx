'use client';
import { cn } from '@/lib/utils';
import { motion, stagger, useAnimate } from 'motion/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  let wordsArray = words.split(' ');

  useEffect(() => {
    if (inView && scope.current) {
      animate(
        'span',
        {
          opacity: 1,
          filter: filter ? 'blur(0px)' : 'none',
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );
    }
  }, [inView, scope.current, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className='dark:text-white text-black opacity-0'
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div ref={ref} className={cn('font-bold', className)}>
      <div className='mt-4'>
        <div className=' dark:text-white text-black text-sm leading-snug tracking-wide'>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

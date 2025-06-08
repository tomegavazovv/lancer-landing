import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const glowVariants = cva('absolute w-full', {
  variants: {
    variant: {
      top: 'top-0',
      above: '-top-[128px]',
      bottom: 'bottom-0',
      below: '-bottom-[128px]',
      center: 'top-[50%]',
    },
    intensity: {
      light: 'opacity-30',
      normal: 'opacity-50',
      strong: 'opacity-70',
      intense: 'opacity-100',
    },
  },
  defaultVariants: {
    variant: 'top',
    intensity: 'normal',
  },
});

const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glowVariants>
>(({ className, variant, intensity, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant, intensity }), className)}
    {...props}
  >
    <div
      className={cn(
        'absolute left-1/2 w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(240_100%_80%_/_0.4)_10%,_hsl(240_100%_80%_/_0)_60%)]',
        variant === 'top' ? 'h-[128px] sm:h-[256px]' : 'h-[256px] sm:h-[512px]',
        variant === 'center' && '-translate-y-1/2'
      )}
    />
    <div
      className={cn(
        'absolute left-1/2 w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(250_100%_85%_/_0.25)_10%,_hsl(250_100%_85%_/_0)_60%)]',
        variant === 'top' ? 'h-[64px] sm:h-[128px]' : 'h-[128px] sm:h-[256px]',
        variant === 'center' && '-translate-y-1/2'
      )}
    />
  </div>
));
Glow.displayName = 'Glow';

export { Glow };

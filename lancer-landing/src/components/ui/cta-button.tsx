import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface CTAButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    { className, size = 'md', variant = 'primary', children, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-6 py-3.5 text-lg',
    };

    const variantStyles = {
      primary:
        'bg-[#D94C58] text-white hover:bg-[#c23d48] hover:shadow-lg hover:shadow-[#D94C58]/20 hover:scale-105 active:scale-100',
      outline:
        'bg-transparent border-2 border-[#D94C58] text-[#D94C58] hover:bg-[#D94C58] hover:text-white hover:shadow-lg hover:shadow-[#D94C58]/20 hover:scale-105 active:scale-100',
      ghost:
        'bg-transparent text-[#D94C58] hover:bg-[#D94C58]/10 hover:scale-105 active:scale-100',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Shine effect on hover */}
        <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent' />

        {/* Button content wrapper with proper flex layout */}
        <span className='relative z-10 inline-flex items-center justify-center gap-2'>
          {children}
        </span>
      </button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export { CTAButton };

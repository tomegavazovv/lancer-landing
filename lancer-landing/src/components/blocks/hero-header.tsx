'use client';

import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/ui/logo-icon';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/#pricing' },
];

export const HeroHeader = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav className='relative lg:fixed z-50 w-full px-2'>
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className='relative flex items-center justify-center lg:justify-between gap-6 py-3 lg:py-4'>
            {/* Mobile: Centered logo */}
            <div className='lg:hidden'>
              <Link
                href='/'
                aria-label='home'
                className='flex items-center space-x-2'
              >
                <LogoIcon />
              </Link>
            </div>

            {/* Desktop: Logo on left */}
            <div className='hidden lg:block'>
              <Link
                href='/'
                aria-label='home'
                className='flex items-center space-x-2'
              >
                <LogoIcon />
              </Link>
            </div>

            {/* Desktop: Navigation menu */}
            <div className='absolute inset-0 m-auto hidden size-fit lg:block'>
              <ul className='flex gap-8 text-sm'>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className='text-muted-foreground hover:text-accent-foreground block duration-150'
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop: Get Started button */}
            <div className='hidden lg:flex'>
              <Button
                asChild
                size='sm'
                className={cn(isScrolled && 'lg:hidden')}
              >
                <Link href='/get-started'>
                  <span>Get Started</span>
                </Link>
              </Button>
              <Button
                asChild
                size='sm'
                className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
              >
                <Link href='/get-started'>
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

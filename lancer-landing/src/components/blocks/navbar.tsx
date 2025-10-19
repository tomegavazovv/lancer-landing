'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { LogoIcon } from '../ui/logo-icon';

const menuItems = [
  { name: 'Calculate Wins', href: 'https://calculator.lancer.app' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
];

interface NavbarProps {
  isOverDarkSection?: boolean;
  onBookDemo: () => void;
  onGetStarted: () => void;
}

export function Navbar({
  isOverDarkSection = false,
  onBookDemo,
  onGetStarted,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
          <div className='relative flex items-center justify-between gap-6 py-3 lg:py-4'>
            {/* Logo */}
            <div>
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
              <ul
                className={cn('flex text-sm', isScrolled ? 'gap-4' : 'gap-8')}
              >
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-muted-foreground hover:text-accent-foreground block duration-150',
                        isOverDarkSection && 'text-white/80 hover:text-white'
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop: Navigation buttons */}
            <div className='hidden lg:flex gap-1'>
              <Button
                size='sm'
                variant='outline'
                className={cn(isScrolled && 'lg:hidden')}
                onClick={onGetStarted}
              >
                <span>Log In</span>
              </Button>
              <Button
                size='sm'
                variant='outline'
                className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                onClick={onGetStarted}
              >
                <span>Log In</span>
              </Button>
              <Button
                size='sm'
                className={cn(isScrolled && 'lg:hidden')}
                onClick={onBookDemo}
              >
                <span>Demo With Founder</span>
              </Button>
              <Button
                size='sm'
                className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                onClick={onBookDemo}
              >
                <span>Demo</span>
              </Button>
            </div>

            {/* Mobile: Hamburger menu button */}
            <div className='lg:hidden'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'text-muted-foreground hover:text-accent-foreground',
                  isOverDarkSection && 'text-white/80 hover:text-white'
                )}
              >
                {isMobileMenuOpen ? (
                  <X className='w-5 h-5' />
                ) : (
                  <Menu className='w-5 h-5' />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile: Navigation menu */}
          {isMobileMenuOpen && (
            <div className='lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border mt-2 rounded-b-2xl shadow-lg'>
              <div className='px-6 py-4 space-y-4'>
                {/* Mobile menu items */}
                <ul className='space-y-3'>
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-muted-foreground hover:text-accent-foreground block py-2 duration-150',
                          isOverDarkSection && 'text-white/80 hover:text-white'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile action buttons */}
                <div className='flex flex-col gap-2 pt-4 border-t border-border'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      onGetStarted();
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full'
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    size='sm'
                    onClick={() => {
                      onBookDemo();
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full'
                  >
                    <span>Demo With Founder</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}


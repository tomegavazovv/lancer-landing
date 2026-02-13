'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CTAButton } from '@/components/ui/cta-button';
import { LogoIcon } from '@/components/ui/logo-icon';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface MenuItem {
  name: string;
  href: string;
  showNewBadge?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Upwork Insights', href: '/upwork-insights' },
];

interface NavbarProps {
  isOverDarkSection?: boolean;
  onBookDemo: (source?: string) => void;
  onGetStarted: () => void;
}

export function Navbar({
  isOverDarkSection = false,
  onBookDemo,
  onGetStarted,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const searchParams = useSearchParams();

  // Build login URL with preserved ref parameter
  const getLoginUrl = () => {
    const baseUrl = 'https://1.lancer.app';
    const ref = searchParams.get('ref');

    if (ref) {
      return `${baseUrl}?ref=${encodeURIComponent(ref)}`;
    }

    return baseUrl;
  };

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
            'bg-black/95 rounded-2xl border border-white/10 backdrop-blur-lg', // Always apply background on mobile
            isScrolled &&
              'lg:bg-black/50 lg:max-w-4xl lg:rounded-2xl lg:border lg:border-white/10 lg:backdrop-blur-lg lg:px-5'
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
                      className='text-white/80 hover:text-white block duration-150 relative'
                    >
                      <span>{item.name}</span>
                      {item.showNewBadge && (
                        <Badge className='absolute -top-2 -right-8 text-[10px] px-1.5 py-0 h-4 bg-[#C23D48] text-white border-transparent'>
                          new
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop: Navigation buttons */}
            <div className='hidden lg:flex items-center gap-3'>
              <Button
                variant='outline'
                size='sm'
                asChild
                className='bg-transparent text-white/80 border-white/20 hover:text-white hover:border-white/40 hover:bg-white/5 rounded-lg transition-all duration-200 h-8'
              >
                <Link href={getLoginUrl()} target='_blank'>
                  Login
                </Link>
              </Button>
              <CTAButton size='sm' onClick={() => onBookDemo('navbar')} className='h-8'>
                <span className='text-nowrap'>Book Demo</span>
              </CTAButton>
            </div>

            {/* Mobile: Hamburger menu button */}
            <div className='lg:hidden'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-white/80 hover:text-white'
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
            <div className='lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 mt-2 rounded-b-2xl shadow-lg'>
              <div className='px-6 py-4 space-y-4'>
                {/* Mobile menu items */}
                <ul className='space-y-3'>
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className='text-white/80 hover:text-white block py-2 duration-150 relative'
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <span>{item.name}</span>
                        {item.showNewBadge && (
                          <Badge className='absolute -top-1.5 -right-1.5 text-[10px] px-1.5 py-0 h-4 leading-none bg-[#C23D48] text-white border-transparent rotate-12'>
                            new
                          </Badge>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile action buttons */}
                <div className='flex flex-col gap-3 pt-4 border-t border-white/10'>
                  <Button
                    variant='outline'
                    size='sm'
                    asChild
                    className='bg-transparent text-white/80 border-white/20 hover:text-white hover:border-white/40 hover:bg-white/5 rounded-lg transition-all duration-200 justify-start h-8'
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Link href={getLoginUrl()} target='_blank'>
                      Login
                    </Link>
                  </Button>
                  <CTAButton size='sm' onClick={() => onBookDemo('navbar_mobile')} className='h-8'>
                    <span className='text-nowrap'>Book Demo</span>
                  </CTAButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

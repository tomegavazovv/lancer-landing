import Link from 'next/link';
import { LogoIcon } from '../ui/logo-icon';

export function Footer() {
  return (
    <footer className='border-t border-gray-200 bg-background dark:border-gray-700'>
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='flex flex-col items-center justify-center space-y-8'>
          {/* Logo */}
          <div className='flex justify-center'>
            <LogoIcon size={60} />
          </div>

          {/* Copyright and Links Container */}
          <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8'>
            {/* Copyright */}
            <p className='text-sm text-muted-foreground'>
              Copyrights © 2025 Lancer
            </p>

            {/* Links */}
            <div className='flex items-center space-x-6'>
              <Link
                href='/terms'
                className='text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors duration-150'
              >
                Terms
              </Link>
              <Link
                href='/privacy'
                className='text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors duration-150'
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

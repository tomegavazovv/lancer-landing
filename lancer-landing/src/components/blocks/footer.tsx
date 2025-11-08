import Link from 'next/link';
import { LogoIcon } from '../ui/logo-icon';

export function Footer() {
  return (
    <footer
      className='border-t border-white/10'
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='flex flex-col items-center justify-center space-y-8'>
          {/* Logo */}
          <div className='flex justify-center'>
            <Link href='/'>
              <LogoIcon size={60} />
            </Link>
          </div>

          {/* Copyright and Links Container */}
          <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8'>
            {/* Copyright */}
            <p className='text-sm text-white/70'>Copyrights © 2025 Lancer</p>

            {/* Links */}
            <div className='flex items-center space-x-6'>
              <Link
                href='/terms-of-service'
                className='text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors duration-150'
              >
                Terms
              </Link>
              <Link
                href='/privacy-policy'
                className='text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors duration-150'
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

'use client';

import Image from 'next/image';

interface LoadingGifProps {
  className?: string;
  message?: string;
}

export function LoadingGif({ className = '', message }: LoadingGifProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 ${className}`}
    >
      <Image
        src='/loading-gif.gif'
        alt='Loading...'
        width={200}
        height={200}
        unoptimized
        className='w-[200px] h-[200px]'
      />
      {message && (
        <p className='mt-4 text-center text-white/70 text-sm'>{message}</p>
      )}
    </div>
  );
}

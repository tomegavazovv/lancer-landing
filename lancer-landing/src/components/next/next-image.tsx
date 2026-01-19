'use client';

import Image from 'next/image';
import { ComponentProps } from 'react';

interface NextImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
  src: string;
  alt: string;
}

export default function NextImage({ src, alt, width, height, ...props }: NextImageProps) {
  // Handle public folder assets
  const imageSrc = src.startsWith('/') ? src : `/${src}`;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}


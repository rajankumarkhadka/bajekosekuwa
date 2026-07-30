'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cleanImageUrl } from '@/utils/image';

export interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/images/icon.jpg',
  unoptimized,
  onError,
  ...props
}: SafeImageProps) {
  const cleanedSrc = cleanImageUrl(src, fallbackSrc);
  const [imgSrc, setImgSrc] = useState<string>(cleanedSrc);

  const isRemoteUrl =
    typeof imgSrc === 'string' &&
    (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'));

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Image'}
      unoptimized={unoptimized ?? isRemoteUrl}
      onError={(e) => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
        if (onError) {
          onError(e);
        }
      }}
    />
  );
}

'use client';

import { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

// Swaps broken remote photos for the brand placeholder, mirroring
// _legacy/js/main.js's img[data-fallback] error handler.
export default function Img({ src, alt, fallback = '/assets/logo-icon.png', style, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? fallback : src}
      alt={alt}
      onError={() => setFailed(true)}
      style={failed ? { ...style, objectFit: 'contain', padding: '18%', background: '#EFE5D6' } : style}
      {...rest}
    />
  );
}

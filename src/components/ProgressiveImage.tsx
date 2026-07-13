import { useState } from 'react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProgressiveImage({ src, alt, className = '' }: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full bg-gray-200 rounded-xl overflow-hidden">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-bilibili-pink border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto rounded-xl transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''} ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-gray-400 text-sm">图片加载失败</p>
        </div>
      )}
    </div>
  );
}
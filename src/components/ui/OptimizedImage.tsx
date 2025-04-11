import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { trackImageLoad } from '@/utils/imageAnalytics'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  enableZoom?: boolean
}

interface ImageVariant {
  src: string
  width: number
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  priority = false,
  enableZoom = false
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [blurDataUrl, setBlurDataUrl] = useState<string>('')
  const loadStartTime = useRef<number>(0)

  // Generate paths for different variants
  const getImageVariants = (basePath: string): ImageVariant[] => {
    const fileName = basePath.split('/').pop()?.split('.')[0];
    return [
      { src: `/images/optimized/${fileName}-xl.webp`, width: 1920 },
      { src: `/images/optimized/${fileName}-lg.webp`, width: 1200 },
      { src: `/images/optimized/${fileName}-md.webp`, width: 800 },
      { src: `/images/optimized/${fileName}-sm.webp`, width: 400 },
    ];
  };

  // Load blur placeholder
  useEffect(() => {
    const loadBlurPlaceholder = async () => {
      const fileName = src.split('/').pop()?.split('.')[0];
      const placeholderPath = `/images/optimized/${fileName}-placeholder.webp`;
      try {
        const response = await fetch(placeholderPath);
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setBlurDataUrl(dataUrl);
      } catch (error) {
        console.error('Error loading blur placeholder:', error);
      }
    };

    if (!priority) {
      loadBlurPlaceholder();
    }
  }, [src, priority]);

  // Set load start time when component mounts
  useEffect(() => {
    loadStartTime.current = performance.now();
  }, []);

  const variants = getImageVariants(src);
  const srcSet = variants
    .map(variant => `${variant.src} ${variant.width}w`)
    .join(', ');

  // Generate thumbnail path
  const thumbnailSrc = src.replace(/\.(webp|jpg|jpeg|png)$/, '-thumb.webp')

  const handleLoad = useCallback((event: any) => {
    setIsLoading(false)
    
    // Track loading performance
    const loadTime = performance.now() - loadStartTime.current;
    const imageElement = event?.target as HTMLImageElement;
    
    if (imageElement) {
      trackImageLoad({
        src,
        loadTime,
        size: imageElement.naturalWidth * imageElement.naturalHeight,
        timestamp: Date.now(),
      });
    }
  }, [src])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setIsError(true)
    
    // Track loading error
    trackImageLoad({
      src,
      loadTime: performance.now() - loadStartTime.current,
      size: 0,
      timestamp: Date.now(),
      error: true,
    });
  }, [src])

  const toggleZoom = useCallback(() => {
    if (enableZoom) {
      setIsZoomed(!isZoomed)
    }
  }, [enableZoom, isZoomed])

  return (
    <>
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {isError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500">Failed to load image</p>
            </div>
          </div>
        ) : (
          <>
            {!priority && blurDataUrl && (
              <Image
                src={blurDataUrl}
                alt={alt}
                fill
                className={`
                  object-cover transition-opacity duration-300
                  ${isLoading ? 'opacity-100 blur-lg scale-110' : 'opacity-0'}
                  ${className}
                `}
                priority={true}
                unoptimized // Skip optimization for blur placeholder
              />
            )}
            <Image
              src={thumbnailSrc}
              alt={alt}
              fill
              className={`
                object-cover transition-opacity duration-300
                ${isLoading ? 'opacity-100 blur-sm scale-105' : 'opacity-0'}
                ${className}
              `}
              priority={priority}
              quality={60} // Lower quality for thumbnail
            />
            <Image
              src={variants[1].src} // Default to large size
              alt={alt}
              fill
              className={`
                object-cover transition-opacity duration-300
                ${isLoading ? 'opacity-0' : 'opacity-100'}
                ${enableZoom ? 'cursor-zoom-in' : ''}
                ${className}
              `}
              priority={priority}
              onLoadingComplete={handleLoad}
              onError={handleError}
              onClick={toggleZoom}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              srcSet={srcSet}
              quality={85} // Optimal quality for main image
            />
          </>
        )}
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={toggleZoom}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
            >
              <Image
                src={variants[0].src} // Use highest quality for zoom view
                alt={alt}
                fill
                className="object-contain cursor-zoom-out"
                quality={100}
                priority
                onLoadingComplete={(e) => {
                  trackImageLoad({
                    src: variants[0].src,
                    loadTime: performance.now() - loadStartTime.current,
                    size: e.naturalWidth * e.naturalHeight,
                    timestamp: Date.now(),
                    isZoomed: true,
                  });
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OptimizedImage
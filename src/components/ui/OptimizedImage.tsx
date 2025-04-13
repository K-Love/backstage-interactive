import { useState, useCallback, useRef, useEffect } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { trackImageLoad } from '@/utils/imageAnalytics'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  enableZoom?: boolean
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

  // Set load start time when component mounts
  useEffect(() => {
    loadStartTime.current = performance.now();
  }, []);

  const handleLoad = useCallback(({ naturalWidth, naturalHeight }: {
    naturalWidth: number
    naturalHeight: number
  }) => {
    trackImageLoad({
      src,
      size: naturalWidth * naturalHeight,
      timestamp: Date.now()
    });
  }, [src]);

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
        src={src}
        alt={alt}
        fill
        className={`
          object-cover transition-opacity duration-300
          ${enableZoom ? 'cursor-zoom-in' : ''}
          ${className}
        `}
        priority={priority}
        onLoad={handleLoad}
        onError={() => setIsError(true)}
        onClick={toggleZoom}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,...`} // Simple SVG placeholder
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
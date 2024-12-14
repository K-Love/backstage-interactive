// src/components/ui/OptimizedImage.tsx
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Generate thumbnail path
  const thumbnailSrc = src.replace(/\.(webp|jpg|jpeg|png)$/, '-thumb.webp')

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setIsError(true)
  }, [])

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
            />
            <Image
              src={src}
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
                src={src}
                alt={alt}
                fill
                className="object-contain cursor-zoom-out"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OptimizedImage
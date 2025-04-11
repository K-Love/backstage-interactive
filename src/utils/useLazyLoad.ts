// src/utils/useLazyLoad.ts
import { useEffect, useRef, useState } from 'react'

export function useLazyLoad<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { elementRef, isVisible }
}
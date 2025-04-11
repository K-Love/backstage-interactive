// src/utils/imageAnalytics.ts
interface ImageLoadMetrics {
    src: string;
    loadTime: number;
    size: number;
    timestamp: number;
  }
  
  const METRICS_ENDPOINT = '/api/metrics/images';
  
  export async function trackImageLoad(metrics: ImageLoadMetrics) {
    if (process.env.NODE_ENV === 'production') {
      try {
        await fetch(METRICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metrics),
        });
      } catch (error) {
        console.error('Failed to track image metrics:', error);
      }
    }
  }
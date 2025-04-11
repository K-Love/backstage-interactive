import { useState } from 'react';

interface UsageMetadata {
  [key: string]: any;
}

export const useToolUsage = () => {
  const [currentUsage, setCurrentUsage] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startUsage = async (toolId: string, metadata?: UsageMetadata) => {
    setIsTracking(true);
    setError(null);

    try {
      const response = await fetch('/api/tools/usage/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, metadata }),
      });

      if (!response.ok) {
        throw new Error('Failed to start usage tracking');
      }

      const data = await response.json();
      setCurrentUsage(data.id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start usage tracking');
      return null;
    } finally {
      setIsTracking(false);
    }
  };

  const endUsage = async (metadata?: UsageMetadata) => {
    if (!currentUsage) return;

    setIsTracking(true);
    setError(null);

    try {
      const response = await fetch('/api/tools/usage/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usageId: currentUsage, metadata }),
      });

      if (!response.ok) {
        throw new Error('Failed to end usage tracking');
      }

      const data = await response.json();
      setCurrentUsage(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end usage tracking');
      return null;
    } finally {
      setIsTracking(false);
    }
  };

  return {
    startUsage,
    endUsage,
    isTracking,
    error,
    currentUsage,
  };
};
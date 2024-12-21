import { useState, useEffect } from 'react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  type: 'free' | 'premium';
  subscribed: boolean;
  subscription?: {
    id: string;
    status: string;
    plan: string;
    startDate: string;
    endDate?: string;
  };
}

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools');
      if (!response.ok) {
        throw new Error('Failed to fetch tools');
      }
      const data = await response.json();
      setTools(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const subscribeTool = async (toolId: string, plan: string) => {
    try {
      const response = await fetch('/api/tools/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, plan }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe to tool');
      }

      await fetchTools(); // Refresh tools list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
      return false;
    }
  };

  return {
    tools,
    isLoading,
    error,
    subscribeTool,
    refreshTools: fetchTools,
  };
};
import { useState, useEffect } from 'react';

export interface Subscription {
  id: string;
  toolId: string;
  status: string;
  plan: string;
  startDate: string;
  endDate?: string;
  tool?: {
    name: string;
    description: string;
  };
}

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions');
      if (!response.ok) throw new Error('Failed to fetch subscriptions');
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const manageSubscription = async (subscriptionId: string, action: 'cancel' | 'upgrade') => {
    try {
      const response = await fetch(`/api/subscriptions/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} subscription`);
      
      await fetchSubscriptions(); // Refresh subscriptions list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action} subscription`);
      return false;
    }
  };

  return {
    subscriptions,
    isLoading,
    error,
    refreshSubscriptions: fetchSubscriptions,
    cancelSubscription: (id: string) => manageSubscription(id, 'cancel'),
    upgradeSubscription: (id: string) => manageSubscription(id, 'upgrade'),
  };
};
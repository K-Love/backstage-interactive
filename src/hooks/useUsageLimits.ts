import { useState, useEffect } from 'react';
import { LIMIT_THRESHOLDS } from '@/config/planLimits';

interface UsageLimitsResponse {
  canUse: boolean;
  currentUsage: number;
  limit: number;
  remainingUses: number;
  activeUsage: number;
  concurrentLimit: number;
  plan: string;
}

export const useUsageLimits = (toolId: string) => {
  const [limits, setLimits] = useState<UsageLimitsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkLimits = async () => {
    try {
      const response = await fetch(`/api/tools/limits?toolId=${toolId}`);
      if (!response.ok) throw new Error('Failed to fetch usage limits');
      const data = await response.json();
      setLimits(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check limits');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLimits();
  }, [toolId]);

  const getUsageStatus = () => {
    if (!limits) return null;

    const usagePercentage = limits.currentUsage / limits.limit;
    if (usagePercentage >= LIMIT_THRESHOLDS.criticalThreshold) {
      return 'critical';
    }
    if (usagePercentage >= LIMIT_THRESHOLDS.warningThreshold) {
      return 'warning';
    }
    return 'normal';
  };

  return {
    limits,
    loading,
    error,
    checkLimits,
    getUsageStatus,
    usagePercentage: limits ? (limits.currentUsage / limits.limit) * 100 : 0,
  };
};
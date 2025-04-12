import { useUsageLimits } from '@/hooks/useUsageLimits';

interface UsageLimitsIndicatorProps {
  toolId: string;
  onLimitReached?: () => void;
}

export default function UsageLimitsIndicator({ toolId, onLimitReached }: UsageLimitsIndicatorProps) {
  const { limits, loading, error, usagePercentage, getUsageStatus } = useUsageLimits(toolId);

  if (loading) return <div>Loading usage limits...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!limits) return null;

  const status = getUsageStatus() || 'normal';
  const statusColors: Record<string, string> = {
    normal: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          Daily Usage: {limits.currentUsage} / {limits.limit}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
          {limits.plan.toUpperCase()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${
            status === 'critical' ? 'bg-red-600' : 
            status === 'warning' ? 'bg-yellow-400' : 'bg-green-600'
          }`}
          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
        ></div>
      </div>
      {status === 'critical' && (
        <div className="mt-2 text-sm text-red-600">
          You're approaching your daily limit. 
          <button
            onClick={onLimitReached}
            className="ml-2 text-blue-600 hover:underline"
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}
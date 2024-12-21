import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UsageData {
  date: string;
  count: number;
  duration: number;
}

export default function UsageStats({ toolId }: { toolId?: string }) {
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsageStats = async () => {
      try {
        const query = toolId ? `?toolId=${toolId}` : '';
        const response = await fetch(`/api/tools/usage/stats${query}`);
        if (!response.ok) throw new Error('Failed to fetch usage statistics');
        const data = await response.json();
        setUsageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsageStats();
  }, [toolId]);

  if (isLoading) return <div>Loading usage statistics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Statistics</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" name="Usage Count" />
            <Bar dataKey="duration" fill="#82ca9d" name="Duration (min)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
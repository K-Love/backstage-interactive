import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTools, Tool } from '@/hooks/useTools';
import { useToolUsage } from '@/hooks/useToolUsage';
import UsageStats from '@/components/dashboard/UsageStats';
import UsageLimitsIndicator from '@/components/tools/UsageLimitsIndicator';
import { useRouter } from 'next/router';

export default function ToolsManagement() {
  const router = useRouter();
  const { tools, isLoading, error, subscribeTool } = useTools();
  const { startUsage, endUsage, isTracking, currentUsage } = useToolUsage();

  const handleSubscribe = async (tool: Tool) => {
    if (await subscribeTool(tool.id, tool.type)) {
      alert('Successfully subscribed to ' + tool.name);
    }
  };

  const handleToolUse = async (toolId: string) => {
    if (currentUsage) {
      await endUsage();
    } else {
      await startUsage(toolId, { source: 'dashboard' });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Marketing Tools</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading ? (
          <>
            <div className="mb-8">
              <UsageStats />
            </div>
            <div className="text-center">Loading tools...</div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {tool.name}
                  </h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{tool.description}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                      {tool.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-900">
                      Price: {tool.price === 0 ? 'Free' : `${tool.price}/month`}
                    </span>
                  </div>
                  
                  {/* Add UsageLimitsIndicator here */}
                  {tool.subscribed && (
                    <UsageLimitsIndicator
                      toolId={tool.id}
                      onLimitReached={() => {
                        router.push('/dashboard/subscriptions');
                      }}
                    />
                  )}
                </div>
                <div className="px-4 py-4 sm:px-6">
                  {tool.subscribed ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active Subscription
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(tool)}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {tool.type === 'free' ? 'Get Started' : 'Subscribe'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
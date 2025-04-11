import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { useState } from 'react';

export default function SubscriptionsManagement() {
  const { 
    subscriptions, 
    isLoading, 
    error, 
    cancelSubscription, 
    upgradeSubscription 
  } = useSubscriptions();
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const handleAction = async (subscriptionId: string, action: 'cancel' | 'upgrade') => {
    setActionInProgress(subscriptionId);
    try {
      const success = action === 'cancel' 
        ? await cancelSubscription(subscriptionId)
        : await upgradeSubscription(subscriptionId);
      
      if (success) {
        alert(`Successfully ${action}ed subscription`);
      }
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Subscriptions</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center">Loading subscriptions...</div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center text-gray-500">
            No active subscriptions found. Visit the tools page to subscribe.
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {subscriptions.map((subscription) => (
                <li key={subscription.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-medium text-gray-900">
                          {subscription.tool?.name || subscription.toolId}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {subscription.tool?.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subscription.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscription.status}
                        </span>
                        <span className="mt-1 text-sm text-gray-500">
                          {subscription.plan} plan
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      {subscription.status === 'active' && subscription.plan === 'free' && (
                        <button
                          onClick={() => handleAction(subscription.id, 'upgrade')}
                          disabled={actionInProgress === subscription.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          {actionInProgress === subscription.id ? 'Processing...' : 'Upgrade to Premium'}
                        </button>
                      )}
                      {subscription.status === 'active' && (
                        <button
                          onClick={() => handleAction(subscription.id, 'cancel')}
                          disabled={actionInProgress === subscription.id}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          {actionInProgress === subscription.id ? 'Processing...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
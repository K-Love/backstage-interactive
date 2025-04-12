import React from 'react';

interface StripeCheckoutButtonProps {
  priceId: string;
}

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ priceId }) => {
  return (
    <button
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      onClick={() => {
        console.log(`Would checkout with price ID: ${priceId}`);
        // In a real implementation, this would redirect to Stripe checkout
      }}
    >
      Subscribe
    </button>
  );
};

export default StripeCheckoutButton;
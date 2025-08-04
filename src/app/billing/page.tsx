'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { createCheckoutSession } from '@/lib/stripe/checkout';
import { PLANS } from '@/lib/stripe/plans';

export default function BillingPage() {
  const { data: session, status } = useSession();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session?.user) return <div>Please sign in to view plans.</div>;

  const customerEmail = session.user.email;
  const userId = session.user.id;

  const handleSubscribe = async (priceId: string, planSlug: string) => {
    if (!customerEmail || !userId) {
      alert('User info missing. Please log in again.');
      return;
    }

    try {
      setLoadingPriceId(priceId);
      const url = await createCheckoutSession(priceId, customerEmail, userId, planSlug);
      window.location.href = url;
    } catch (err) {
      alert('Error redirecting to Stripe Checkout');
      console.error(err);
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Billing & Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
            <p className="text-gray-700 mb-4">{plan.priceText}</p>
            <ul className="mb-4 text-sm text-gray-600 space-y-1">
              {plan.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>
            {plan.priceId ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
                onClick={() => handleSubscribe(plan.priceId, plan.slug)}
                disabled={loadingPriceId === plan.priceId}
              >
                {loadingPriceId === plan.priceId ? 'Redirecting...' : 'Choose Plan'}
              </button>
            ) : (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded w-full cursor-not-allowed"
                disabled
              >
                Current Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

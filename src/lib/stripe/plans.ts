// lib/stripe/plans.ts

export type Plan = {
  slug: 'free' | 'pro' | 'enterprise'; // Type-safe identifiers
  name: string;
  priceId: string; // Empty string for Free plan (non-billable)
  priceText: string;
  features: string[];
};

export const PLANS: Omit<Plan, 'id'>[] = [
  {
    slug: 'free',
    name: 'Free',
    priceId: '', // No Stripe price ID needed for Free plan
    priceText: '$0/month',
    features: [
      'Basic features',
      'Community support',
      'Limited usage',
    ],
  },
  {
    slug: 'pro',
    name: 'Pro',
    priceId: 'price_1RqGdKQoAp4c8NIpEYcdun8Q', // Replace with your real Stripe price ID
    priceText: '$9.99/month',
    features: [
      'All Free features',
      'Priority email support',
      'Extended usage limits',
    ],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    priceId: 'price_1RqGeGQoAp4c8NIpoxKuOX9l', // Replace with your real Stripe price ID
    priceText: '$49.99/month',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'Unlimited usage',
    ],
  },
];

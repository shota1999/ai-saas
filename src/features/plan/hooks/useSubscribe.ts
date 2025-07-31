import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function redirectToCheckout(priceId: string, email: string) {
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId, customerEmail: email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  }
}

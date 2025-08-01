export const createCheckoutSession = async (priceId: string, customerEmail: string) => {
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, customerEmail }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Checkout session failed');
  }

  const { url } = await res.json();
  return url;
};

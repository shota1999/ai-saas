export async function createCheckoutSession(
  priceId: string,
  customerEmail: string,
  userId: string,
  planSlug: string
): Promise<string> {
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId, customerEmail, userId, planSlug }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!data.url) {
    throw new Error(data.error || 'Failed to create checkout session');
  }
  return data.url;
}

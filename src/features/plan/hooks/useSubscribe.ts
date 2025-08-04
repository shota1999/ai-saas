
export async function redirectToCheckout(priceId: string, email: string, userId: string, planSlug: string) {
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId, customerEmail: email, userId, planSlug }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  }
}

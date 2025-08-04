import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/shared/lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('❌ Missing signature or webhook secret');
    return new Response('Missing signature or secret', { status: 400 });
  }

  const rawBody = await buffer(req.body as ReadableStream<Uint8Array>);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Invalid webhook signature:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  console.log(`✅ Webhook received: ${event.type}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const planSlug = session.metadata?.planSlug; // changed from planId to planSlug

    if (!userId || !planSlug) {
      console.error("❌ Missing userId or planSlug in metadata.");
    } else {
      // Lookup plan by slug
      const plan = await prisma.plan.findUnique({ where: { slug: planSlug } });
      if (!plan) {
        console.error(`❌ Plan slug "${planSlug}" does not exist in DB`);
      } else {
        try {
          await prisma.user.update({
            where: { id: userId },
            data: { planId: plan.id },
          });
          console.log(`✅ Updated user ${userId} to plan "${planSlug}"`);
        } catch (err) {
          console.error("❌ Error updating user:", err);
        }
      }
    }
  }

  return new Response('ok', { status: 200 });
}

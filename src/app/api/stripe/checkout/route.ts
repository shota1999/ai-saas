/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, customerEmail, userId, planSlug } = body;

    // ✅ Validate inputs
    if (!priceId || !customerEmail || !userId || !planSlug) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // ✅ Validate env
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json(
        { error: 'Missing NEXT_PUBLIC_BASE_URL environment variable' },
        { status: 500 }
      );
    }

    // ✅ Create Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      metadata: {
        userId,
        planSlug,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[STRIPE CHECKOUT ERROR]', err);
    return NextResponse.json(
      { error: err.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

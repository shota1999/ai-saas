import Stripe from "stripe";
import { prisma } from "@/shared/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

// Reads raw stream body as Buffer (App Router compatible)
async function buffer(readable: ReadableStream<Uint8Array>): Promise<Buffer> {
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
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  if (!req.body) {
    return new Response("Request body is null", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const buf = await buffer(req.body);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("❌ Webhook signature verification failed.", err);
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  console.log(`✅ Webhook received: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;

      if (!userId || !planId) {
        console.error("❌ Missing userId or planId in session metadata.");
        break;
      }

      try {
        await prisma.user.update({
          where: { id: userId },
          data: { planId },
        });
        console.log(`✅ Updated user ${userId} to plan ${planId}`);
      } catch (error) {
        console.error("❌ Failed to update user:", error);
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response("Received", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

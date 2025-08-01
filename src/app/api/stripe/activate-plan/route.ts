// 📄 src/app/api/stripe/activate-plan/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    // 🔐 აქ შეიძლება დაამატო Stripe-ის ვალიდაცია (optional)
    // const session = await stripe.checkout.sessions.retrieve(sessionId);
    // const customerEmail = session.customer_email;

    // 🔄 ამ ეტაპზე უბრალოდ ვაბრუნებთ წარმატებულ პასუხს
    return NextResponse.json({ message: "Plan activated from Stripe session!" });
  } catch (error) {
    console.error("Stripe plan activation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const plans = [
  { id: "FREE", name: "Free", credits: 20 },
  { id: "PRO", name: "Pro", credits: 200 },
];

export default function PlanSelector() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePlanChange = async (planId: string) => {
    if (!session?.user?.id) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, planId }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-2">Change Plan</h2>
      <div className="space-x-2">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handlePlanChange(plan.id)}
            disabled={loading}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {plan.name}
          </button>
        ))}
      </div>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}

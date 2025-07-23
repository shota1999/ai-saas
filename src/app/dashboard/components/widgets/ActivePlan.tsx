"use client";

import { useSession } from "next-auth/react";
import { usePlan } from "@/features/plan/hooks/usePlan";

export default function ActivePlan() {
  const { data: session } = useSession();
  const { data: plan, loading, error } = usePlan(session?.user?.id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!plan) return <p>No active plan</p>;

  return (
    <div className="bg-yellow-50 p-4 rounded shadow">
      <p className="text-sm text-gray-500">Active Plan</p>
      <p className="text-xl font-bold">{plan.name}</p>
      <p className="text-gray-600 text-sm">{plan.credits} daily credits</p>
    </div>
  );
}

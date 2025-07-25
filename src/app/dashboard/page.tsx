"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import UsageStats from "./components/widgets/UsageStats";
import ApiRequestsCounter from "./components/widgets/ApiRequestsCounter";
import { useUserUsageStats } from "@/features/generations/hooks/useUserUsageStats";
import PlanSelector from "./components/widgets/PlanSelector";
import ActivePlan from "./components/widgets/ActivePlan";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { usage, loading } = useUserUsageStats();

  if (status === "loading" || loading) return <p>Loading dashboard...</p>;


  return (
<ProtectedLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {session?.user && (
        <div className="bg-white shadow p-4 rounded mb-6 flex items-center space-x-4">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="User avatar"
              width={56}
              height={56}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-gray-600 text-sm">{session.user.email}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500">API Requests</p>
          <ApiRequestsCounter />
        </div>
        <div>
          <ActivePlan />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded shadow mt-4">
        <p className="text-sm text-gray-500">Daily Credits Used</p>
        <UsageStats />
        {usage && (
          <div className="mt-2 text-gray-700 text-sm">
            {usage.usedCredits} / {usage.dailyLimit} used
            <br />
            Remaining: <span className="font-bold">{usage.remaining}</span>
          </div>
        )}
      </div>

      <PlanSelector />
    </div>
      </ProtectedLayout>
  );
}

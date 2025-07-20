"use client";
import { useSession } from "next-auth/react";
import { useUsage } from "@/features/usage/hooks/useUsage";

export default function UsageStats() {
  const { data: session } = useSession();
  const { data: usageStats, loading } = useUsage(session?.user?.id);

  if (!session) return <p>Please log in to see usage stats.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {usageStats.length === 0 ? (
        <p>No usage stats yet.</p>
      ) : (
        usageStats.map((stat) => (
          <p key={stat.id}>
            {new Date(stat.date).toLocaleDateString()}: {stat.creditsUsed} credits
          </p>
        ))
      )}
    </div>
  );
}

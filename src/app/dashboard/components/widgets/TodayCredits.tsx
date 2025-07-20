

import { useSession } from "next-auth/react";
import { useUsage } from "@/features/usage/hooks/useUsage";

export default function TodayCredits() {
  const { data: session } = useSession();
  const { data: usageStats, loading } = useUsage(session?.user?.id);

  if (loading) return <p>Loading...</p>;
  if (!usageStats || usageStats.length === 0) return <p>0</p>;

  
  const today = new Date().toLocaleDateString();
  const todayStat = usageStats.find(
    (stat) => new Date(stat.date).toLocaleDateString() === today
  );

  return <p className="text-xl font-bold">{todayStat?.creditsUsed || 0}</p>;
}

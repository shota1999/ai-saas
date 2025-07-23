import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type UsageData = {
  usedCredits: number;
  dailyLimit: number;
  remaining: number;
  plan: string;
};

export function useUserUsage() {
  const { data: session } = useSession();
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchUsage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/usage?userId=${session.user.id}`);
        const data = await res.json();
        setUsage(data);
      } catch (error) {
        console.error("Error fetching usage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [session?.user?.id]);

  return { usage, loading };
}

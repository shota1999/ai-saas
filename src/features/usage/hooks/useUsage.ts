import { useEffect, useState } from "react";




export interface UsageStat {
  id: string;
  creditsUsed: number;
  date: string;
}





export function useUsage(userId?: string) {
  const [data, setData] = useState<UsageStat[]>([]); // ✅ explicitly typed
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    fetch(`/api/usage?userId=${userId}`)
      .then((res) => res.json())
      .then((stats: UsageStat[]) => setData(stats)) // ✅ typed response
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading };
}

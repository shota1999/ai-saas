import { useEffect, useState } from "react";

export interface UserPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
}

export function usePlan(userId?: string) {
  const [data, setData] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    fetch(`/api/plan?userId=${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch plan: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: { plan: UserPlan }) => setData(data.plan))
      .catch((err) => {
        console.error("❌ usePlan error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error }; // ✅ ვაბრუნებთ error-საც
}

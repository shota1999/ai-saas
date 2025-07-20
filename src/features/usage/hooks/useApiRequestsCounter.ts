import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function useApiRequestsCounter() {
  const { data: session } = useSession();
  const [apiRequests, setApiRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    setLoading(true);
    fetch(`/api/api-requests?userId=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => setApiRequests(data.count)) 
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [session?.user?.id]);

  return { apiRequests, loading };
}

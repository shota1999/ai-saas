"use client";

import { useApiRequestsCounter } from "@/features/usage/hooks/useApiRequestsCounter";

export default function ApiRequestsCounter() {
  const { apiRequests, loading } = useApiRequestsCounter();

  if (loading) return <p>Loading...</p>;

  return <p className="text-xl font-bold">{apiRequests}</p>;
}

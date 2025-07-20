"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface HistoryItem {
  id: string;
  prompt: string;
  result: string;
  createdAt: string;
}

export default function HistoryPage() {
  const { data: session } = useSession();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  console.log(session,"gela")
  useEffect(() => {
    if (!session?.user?.id) return;
    
    fetch(`/api/history?userId=${session.user.id}`)
    .then((res) => res.json())
    .then((data) => setHistory(data));
  }, [session?.user?.id]);
    
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Generation History</h1>
      {history.map((item) => (
        <div key={item.id} className="border p-2 mb-2 rounded">
          <p className="font-semibold">Prompt: {item.prompt}</p>
          <p className="text-gray-600">Result: {item.result}</p>
          <p className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

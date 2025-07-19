"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading dashboard...</p>;
  console.log(session,"gela")

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {session?.user ? (
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
      ) : (
        <p className="text-red-500">No session found. Please log in.</p>
      )}

      {/* ✅ Mock Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500">API Requests</p>
          <p className="text-xl font-bold">1,234</p>
        </div>
        <div className="bg-green-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Credits Used</p>
          <p className="text-xl font-bold">42</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Active Plan</p>
          <p className="text-xl font-bold">Free Tier</p>
        </div>
      </div>
    </div>
  );
}

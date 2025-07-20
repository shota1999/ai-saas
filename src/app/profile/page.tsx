"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{session?.user?.name}</p>
          <p className="text-gray-600 text-sm">{session?.user?.email}</p>
        </div>
      </div>

      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Edit Profile (Coming Soon)
      </button>
    </div>
  );
}

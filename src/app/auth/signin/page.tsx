"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";


  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Checking session...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}

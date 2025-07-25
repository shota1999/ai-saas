"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();
  
  return (
    <nav className="h-14 flex items-center justify-between bg-white shadow px-4">
      <h1 className="text-lg font-bold">AI SaaS</h1>
      {session ? (
        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      ) : (
        <button onClick={() => signIn("google")}>Login</button>
      )}
    </nav>
  );
}

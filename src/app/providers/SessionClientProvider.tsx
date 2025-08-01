"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function SessionClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>
    {children}
    <Toaster richColors position="top-center" />

  </SessionProvider>;
}

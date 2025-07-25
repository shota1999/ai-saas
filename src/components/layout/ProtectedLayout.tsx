"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/signin");
  }

  if (status === "authenticated" && !session) {
    router.refresh();
  }

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

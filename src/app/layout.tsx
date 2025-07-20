"use client";

import { Navbar } from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <SessionProvider>
      <html lang="en">
        <body className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main className="p-4">{children}</main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}

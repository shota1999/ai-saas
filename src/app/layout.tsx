"use client";

import { Navbar } from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import SessionClientProvider from "./providers/SessionClientProvider";
import "@/styles/globals.css";




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <SessionClientProvider>
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main className="p-4">{children}</main>
          </div>
        </SessionClientProvider>
      </body>
    </html>
  );
}

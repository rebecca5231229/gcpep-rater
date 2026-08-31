"use client";

import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import { PortfolioSessionProvider } from "@/lib/PortfolioSession";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname?.startsWith("/login");

  if (hideNav) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <PortfolioSessionProvider>
      {!hideNav && <TopNav />}
      <main className="flex-1">{children}</main>
    </PortfolioSessionProvider>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DIMENSION_TABS } from "@/lib/dimensions";

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="font-semibold text-slate-900 text-base">GC-PEP Rating Tool</span>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-slate-600"
          >
            Log out
          </button>
        </div>
        <nav className="flex flex-wrap justify-center gap-1 pb-2">
          {DIMENSION_TABS.map((tab) => {
            const href = `/${tab.slug}`;
            const isActive = pathname?.startsWith(href);
            if (!tab.available) {
              return (
                <span
                  key={tab.slug}
                  title="Not built yet"
                  className="px-3 py-2 text-sm font-medium text-slate-300 border-b-2 border-transparent cursor-not-allowed rounded-t-md"
                >
                  {tab.label}
                </span>
              );
            }
            const activeStyle =
              isActive && tab.colors
                ? { borderColor: tab.colors.primary, color: tab.colors.primary, backgroundColor: tab.colors.secondary }
                : {};
            const activeClassName =
              isActive && !tab.colors
                ? "border-slate-900 text-slate-900 bg-slate-50"
                : !isActive
                ? "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                : "";
            return (
              <Link
                key={tab.slug}
                href={href}
                style={activeStyle}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors rounded-t-md ${activeClassName}`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

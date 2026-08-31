import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "GC-PEP Rating Tool",
  description: "Rating support tool for the Global Competency Portfolio Evaluation Protocol",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col bg-slate-50 text-slate-900"
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";

export default function ReferencePanel({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-2 mb-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1"
      >
        <span className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}>▸</span>
        {title}
      </button>
      {open && <div className="mt-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">{children}</div>}
    </div>
  );
}

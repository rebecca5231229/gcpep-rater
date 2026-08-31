"use client";

import { useState } from "react";
import { getIndicatorByCode } from "@/lib/gca/indicators";
import { getLookForsByCode } from "@/lib/gca/lookfors";

export default function LookForsToggle({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  const indicator = getIndicatorByCode(code);
  const lf = getLookForsByCode(code);

  if (!lf) return null;

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1"
      >
        <span className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}>▸</span>
        Look-Fors: <span className="font-mono">{code}</span>
        {indicator && <span className="font-normal text-slate-400">-- {indicator.name}</span>}
      </button>
      {open && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="font-medium text-emerald-800 mb-1">&quot;Students will be able to...&quot;</p>
            <p className="text-sm text-emerald-900 whitespace-pre-line">{lf.lookFors}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-medium text-red-800 mb-1">Not aligned with this indicator</p>
            <p className="text-sm text-red-900 whitespace-pre-line">{lf.notAligned}</p>
          </div>
        </div>
      )}
    </div>
  );
}

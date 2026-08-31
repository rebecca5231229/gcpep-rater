"use client";

import { useMemo, useState } from "react";
import { INDICATORS, Indicator, Domain } from "@/lib/gca/indicators";

const DOMAIN_ORDER: Domain[] = [
  "Appreciation for Diversity",
  "Cultural Understanding",
  "Global Knowledge",
  "Global Engagement",
];

export default function IndicatorMultiSelect({
  selectedCodes,
  onChange,
}: {
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selected = INDICATORS.filter((i) => selectedCodes.includes(i.code));
  const available = INDICATORS.filter((i) => !selectedCodes.includes(i.code));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? available.filter((i) => i.code.toLowerCase().includes(q) || i.name.toLowerCase().includes(q))
      : available;
    const grouped: Record<string, Indicator[]> = {};
    for (const domain of DOMAIN_ORDER) {
      grouped[domain] = list.filter((i) => i.domain === domain);
    }
    return grouped;
  }, [query, available]);

  function addIndicator(code: string) {
    onChange([...selectedCodes, code]);
    setQuery("");
    setOpen(false);
  }

  function removeIndicator(code: string) {
    onChange(selectedCodes.filter((c) => c !== code));
  }

  return (
    <div className="space-y-2">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((ind) => (
            <span
              key={ind.code}
              className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full pl-3 pr-1.5 py-1 text-sm"
            >
              <span className="font-mono text-slate-500">{ind.code}</span>
              <button
                type="button"
                onClick={() => removeIndicator(ind.code)}
                aria-label={`Remove ${ind.code}`}
                className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-300 hover:text-slate-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code or keyword…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {open && (
          <div className="absolute z-20 mt-1 w-full max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
            {DOMAIN_ORDER.map((domain) => {
              const items = filtered[domain];
              if (!items || items.length === 0) return null;
              return (
                <div key={domain}>
                  <div className="sticky top-0 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {domain}
                  </div>
                  {items.map((ind) => (
                    <button
                      key={ind.code}
                      type="button"
                      onClick={() => addIndicator(ind.code)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex gap-2"
                    >
                      <span className="font-mono text-xs text-slate-400 shrink-0 pt-0.5">{ind.code}</span>
                      <span className="text-slate-700">{ind.name}</span>
                    </button>
                  ))}
                </div>
              );
            })}
            {Object.values(filtered).every((v) => v.length === 0) && (
              <div className="px-3 py-3 text-sm text-slate-400">No matching indicators.</div>
            )}
          </div>
        )}
        {open && (
          <button type="button" onClick={() => setOpen(false)} className="fixed inset-0 z-10 cursor-default" aria-label="Close" />
        )}
      </div>
    </div>
  );
}

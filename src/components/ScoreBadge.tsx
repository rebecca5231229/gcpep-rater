const COLORS: Record<number, string> = {
  1: "bg-red-100 text-red-700 border-red-300",
  2: "bg-amber-100 text-amber-700 border-amber-300",
  3: "bg-lime-100 text-lime-700 border-lime-300",
  4: "bg-emerald-100 text-emerald-700 border-emerald-300",
};

export default function ScoreBadge({ score, size = "md" }: { score: number; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "w-16 h-16 text-3xl" : "w-12 h-12 text-xl";
  return (
    <span className={`inline-flex items-center justify-center rounded-full border font-bold shrink-0 ${dims} ${COLORS[score] ?? "bg-slate-100 text-slate-700 border-slate-300"}`}>
      {score}
    </span>
  );
}

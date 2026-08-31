"use client";

export default function YesNoQuestion({
  number,
  question,
  value,
  onChange,
  colors,
  beforeButtons,
  children,
}: {
  number: number;
  question: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
  colors: { primary: string; secondary: string };
  beforeButtons?: React.ReactNode; // content shown between the question and the Yes/No buttons -- e.g. reference material the rater needs before answering
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
      <p className="text-base font-semibold text-slate-900">
        {number}. {question}
      </p>
      {beforeButtons}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          style={value === true ? { backgroundColor: colors.primary, borderColor: colors.primary, color: "white" } : {}}
          className={`px-5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
            value === true ? "" : "border-slate-300 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          style={value === false ? { backgroundColor: colors.primary, borderColor: colors.primary, color: "white" } : {}}
          className={`px-5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
            value === false ? "" : "border-slate-300 text-slate-600 hover:bg-slate-50"
          }`}
        >
          No
        </button>
      </div>
      {children}
    </section>
  );
}

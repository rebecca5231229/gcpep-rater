"use client";

import { useState } from "react";
import ReferencePanel from "@/components/ReferencePanel";
import ScoreBadge from "@/components/ScoreBadge";
import YesNoQuestion from "@/components/YesNoQuestion";
import { usePortfolioSession } from "@/lib/PortfolioSession";
import { downloadCsv, recordToCsv, PaRatingRecord } from "@/lib/csv";
import {
  PA_COLORS,
  PA_DESCRIPTION,
  PA_CONSTRUCTS,
  PA_PORTFOLIO_REVIEW_INTRO,
  PA_PORTFOLIO_REVIEW_ORDER,
  PA_Q1_GUIDANCE,
  PA_Q2_GUIDANCE,
  PA_SCORE_JUSTIFICATIONS,
} from "@/lib/pa/content";
import {
  PaAnswers,
  emptyPaAnswers,
  computePaScore,
  shouldShowQ2,
  shouldShowQ3,
  shouldShowMechanismConnected,
} from "@/lib/pa/scoring";

function YesNoPair({
  label,
  value,
  onChange,
  colors,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
  colors: { primary: string; secondary: string };
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-slate-100 rounded-lg p-3">
      <span className="text-sm text-slate-800">{label}</span>
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onChange(true)}
          style={value === true ? { backgroundColor: colors.primary, borderColor: colors.primary, color: "white" } : {}}
          className={`px-4 py-1 rounded-lg text-sm font-medium border transition-colors ${
            value === true ? "" : "border-slate-300 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          style={value === false ? { backgroundColor: colors.primary, borderColor: colors.primary, color: "white" } : {}}
          className={`px-4 py-1 rounded-lg text-sm font-medium border transition-colors ${
            value === false ? "" : "border-slate-300 text-slate-600 hover:bg-slate-50"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default function PaPage() {
  const { raterInitials, setRaterInitials, portfolioId, setPortfolioId } = usePortfolioSession();
  const [answers, setAnswers] = useState<PaAnswers>(emptyPaAnswers());
  const [rationaleNotes, setRationaleNotes] = useState("");

  const score = computePaScore(answers);
  const showQ2 = shouldShowQ2(answers);
  const showQ3 = shouldShowQ3(answers);
  const showMechanismConnected = shouldShowMechanismConnected(answers);

  function update<K extends keyof PaAnswers>(key: K, value: PaAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleRationaleDepthChange(v: boolean) {
    setAnswers((prev) => ({ ...emptyPaAnswers(), rationaleDepth: v, rationaleDetail: prev.rationaleDetail }));
  }
  function handleRationaleDetailChange(v: boolean) {
    setAnswers((prev) => ({ ...emptyPaAnswers(), rationaleDepth: prev.rationaleDepth, rationaleDetail: v }));
  }
  function handleEngagementDepthChange(v: boolean) {
    setAnswers((prev) => ({
      ...prev,
      engagementDepth: v,
      mechanismPresent: null,
      mechanismConnected: null,
    }));
  }
  function handleEngagementDetailChange(v: boolean) {
    setAnswers((prev) => ({
      ...prev,
      engagementDetail: v,
      mechanismPresent: null,
      mechanismConnected: null,
    }));
  }
  function handleMechanismPresentChange(v: boolean) {
    setAnswers((prev) => ({ ...prev, mechanismPresent: v, mechanismConnected: null }));
  }

  function resetAll() {
    setAnswers(emptyPaAnswers());
    setRationaleNotes("");
  }

  function handleDownload() {
    if (score === null) return;
    const record: PaRatingRecord = {
      ratedAt: new Date().toISOString(),
      raterInitials,
      teacherOrPortfolioId: portfolioId,
      rationaleDepth: answers.rationaleDepth === true,
      rationaleDetail: answers.rationaleDetail === true,
      engagementDepth: answers.engagementDepth === null ? "" : String(answers.engagementDepth),
      engagementDetail: answers.engagementDetail === null ? "" : String(answers.engagementDetail),
      mechanismPresent: answers.mechanismPresent === null ? "" : String(answers.mechanismPresent),
      mechanismConnected: answers.mechanismConnected === null ? "" : String(answers.mechanismConnected),
      finalScore: score,
      scoreJustification: PA_SCORE_JUSTIFICATIONS[score],
      rationale: rationaleNotes,
    };
    const filename = `pa-rating-${portfolioId || "portfolio"}-${Date.now()}.csv`;
    downloadCsv(filename, recordToCsv(record));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Rater initials</label>
          <input
            value={raterInitials}
            onChange={(e) => setRaterInitials(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="e.g. RC"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Portfolio / teacher ID</label>
          <input
            value={portfolioId}
            onChange={(e) => setPortfolioId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="de-identified ID"
          />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Pedagogical Analysis</h1>
        <p className="text-base text-slate-500 mt-1">{PA_DESCRIPTION}</p>
      </div>

      <ReferencePanel title="Constructs">
        <ul className="list-disc pl-5 space-y-1">
          {PA_CONSTRUCTS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </ReferencePanel>

      <ReferencePanel title="How to review portfolio components">
        <p>{PA_PORTFOLIO_REVIEW_INTRO}</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          {PA_PORTFOLIO_REVIEW_ORDER.map((item, i) => (
            <li key={i}>
              <strong>{item.heading}:</strong> {item.detail}
            </li>
          ))}
        </ul>
      </ReferencePanel>

      {/* Question 1: Rationale depth + detail */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <p className="text-base font-semibold text-slate-900">1. Depth and detail of rationale</p>
        <ReferencePanel title={PA_Q1_GUIDANCE.title}>
          <p>{PA_Q1_GUIDANCE.body}</p>
        </ReferencePanel>
        <YesNoPair
          label="Depth: Does the reflection describe why the specific global competency is important for their students?"
          value={answers.rationaleDepth}
          onChange={handleRationaleDepthChange}
          colors={PA_COLORS}
        />
        <YesNoPair
          label="Detail: Does the reflection name specific elements of the curriculum or specific student needs that would make this global competency a good fit for their class?"
          value={answers.rationaleDetail}
          onChange={handleRationaleDetailChange}
          colors={PA_COLORS}
        />
      </section>

      {score === 1 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: PA_COLORS.primary }}>
          <ScoreBadge score={1} />
          <p className="text-base text-slate-700">{PA_SCORE_JUSTIFICATIONS[1]}</p>
        </section>
      )}

      {/* Question 2: Engagement depth + detail */}
      {showQ2 && (
        <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <p className="text-base font-semibold text-slate-900">2. Depth and detail of description of student engagement</p>
          <ReferencePanel title={PA_Q2_GUIDANCE.title}>
            <ul className="list-disc pl-5 space-y-1">
              {PA_Q2_GUIDANCE.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <p className="font-medium text-slate-800 pt-2">{PA_Q2_GUIDANCE.generalVsSpecificTitle}</p>
            <p>
              <strong>{PA_Q2_GUIDANCE.general.label}</strong> {PA_Q2_GUIDANCE.general.body}
            </p>
            <p>
              <strong>{PA_Q2_GUIDANCE.specific.label}</strong> {PA_Q2_GUIDANCE.specific.body}
            </p>
          </ReferencePanel>
          <YesNoPair
            label="Depth: Does the reflection describe student engagement with the specific global competency?"
            value={answers.engagementDepth}
            onChange={handleEngagementDepthChange}
            colors={PA_COLORS}
          />
          <YesNoPair
            label="Detail: Does the reflection include specific examples (not just general themes) to support claims about student engagement?"
            value={answers.engagementDetail}
            onChange={handleEngagementDetailChange}
            colors={PA_COLORS}
          />
        </section>
      )}

      {score === 2 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: PA_COLORS.primary }}>
          <ScoreBadge score={2} />
          <p className="text-base text-slate-700">{PA_SCORE_JUSTIFICATIONS[2]}</p>
        </section>
      )}

      {/* Question 3: Coherence */}
      {showQ3 && (
        <YesNoQuestion
          number={3}
          question="Coherence: Does the reflection identify at least one clear mechanism for improving the lesson's efficacy?"
          value={answers.mechanismPresent}
          onChange={handleMechanismPresentChange}
          colors={PA_COLORS}
        >
          {showMechanismConnected && (
            <div className="pt-2 border-t border-slate-100">
              <YesNoPair
                label="Is this mechanism connected to something the teacher described earlier in the reflection related to lesson design, student engagement, or student performance?"
                value={answers.mechanismConnected}
                onChange={(v) => update("mechanismConnected", v)}
                colors={PA_COLORS}
              />
            </div>
          )}
        </YesNoQuestion>
      )}

      {score !== null && (score === 3 || score === 4) && (
        <section className="rounded-xl p-6 space-y-3" style={{ backgroundColor: PA_COLORS.primary }}>
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-3xl font-bold"
              style={{ color: PA_COLORS.primary }}
            >
              {score}
            </span>
            <div>
              <p className="text-base font-semibold text-slate-900">Final PA score</p>
              <p className="text-sm text-slate-800">{PA_SCORE_JUSTIFICATIONS[score]}</p>
            </div>
          </div>
          <RationaleAndActions rationale={rationaleNotes} setRationale={setRationaleNotes} onDownload={handleDownload} onReset={resetAll} />
        </section>
      )}

      {(score === 1 || score === 2) && (
        <section className="rounded-xl p-6 space-y-3" style={{ backgroundColor: PA_COLORS.primary }}>
          <RationaleAndActions rationale={rationaleNotes} setRationale={setRationaleNotes} onDownload={handleDownload} onReset={resetAll} />
        </section>
      )}
    </div>
  );
}

function RationaleAndActions({
  rationale,
  setRationale,
  onDownload,
  onReset,
}: {
  rationale: string;
  setRationale: (v: string) => void;
  onDownload: () => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">Rationale / notes (for feedback and QA)</label>
        <textarea
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          rows={3}
          className="w-full rounded-lg bg-white/70 border border-slate-800/20 px-3 py-2 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-800/40"
          placeholder="Optional: explain the score."
        />
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="rounded-lg bg-slate-900 text-white text-base font-medium px-4 py-2 hover:bg-slate-800"
        >
          Download this rating as CSV
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-900/40 text-slate-900 text-base font-medium px-4 py-2 hover:bg-white/40"
        >
          Start a new rating
        </button>
      </div>
    </div>
  );
}

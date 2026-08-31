"use client";

import { useState } from "react";
import ReferencePanel from "@/components/ReferencePanel";
import ScoreBadge from "@/components/ScoreBadge";
import YesNoQuestion from "@/components/YesNoQuestion";
import { usePortfolioSession } from "@/lib/PortfolioSession";
import { downloadCsv, recordToCsv, AspRatingRecord } from "@/lib/csv";
import {
  ASP_COLORS,
  ASP_DESCRIPTION,
  ASP_CONSTRUCTS,
  ASP_PORTFOLIO_REVIEW_INTRO,
  ASP_PORTFOLIO_REVIEW_ORDER,
  ASP_CONNECTION_TYPES,
  ASP_Q1_GUIDANCE,
  ASP_Q2_GUIDANCE,
  ASP_Q3_GUIDANCE,
  ASP_SCORE_JUSTIFICATIONS,
} from "@/lib/asp/content";
import { AspAnswers, emptyAspAnswers, computeAspScore, shouldShowQ2, shouldShowQ3 } from "@/lib/asp/scoring";

export default function AspPage() {
  const { raterInitials, setRaterInitials, portfolioId, setPortfolioId } = usePortfolioSession();
  const [answers, setAnswers] = useState<AspAnswers>(emptyAspAnswers());
  const [rationale, setRationale] = useState("");

  const score = computeAspScore(answers);
  const showQ2 = shouldShowQ2(answers);
  const showQ3 = shouldShowQ3(answers);

  function handleConnectionChange(value: boolean) {
    setAnswers({ ...emptyAspAnswers(), connection: value });
  }

  function handleNecessityChange(value: boolean) {
    setAnswers((prev) => ({ ...prev, instructionalNecessity: value, deep: null }));
  }

  function resetAll() {
    setAnswers(emptyAspAnswers());
    setRationale("");
  }

  function handleDownload() {
    if (score === null) return;
    const record: AspRatingRecord = {
      ratedAt: new Date().toISOString(),
      raterInitials,
      teacherOrPortfolioId: portfolioId,
      connection: answers.connection === true,
      instructionalNecessity: answers.instructionalNecessity === null ? "" : String(answers.instructionalNecessity),
      deep: answers.deep === null ? "" : String(answers.deep),
      finalScore: score,
      scoreJustification: ASP_SCORE_JUSTIFICATIONS[score],
      rationale,
    };
    const filename = `asp-rating-${portfolioId || "portfolio"}-${Date.now()}.csv`;
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
        <h1 className="text-2xl font-semibold text-slate-900">Attention to Students&rsquo; Perspectives</h1>
        <p className="text-base text-slate-500 mt-1">{ASP_DESCRIPTION}</p>
      </div>

      <ReferencePanel title="Constructs">
        <ul className="list-disc pl-5 space-y-1">
          {ASP_CONSTRUCTS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </ReferencePanel>

      <ReferencePanel title="How to review portfolio components">
        <p>{ASP_PORTFOLIO_REVIEW_INTRO}</p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          {ASP_PORTFOLIO_REVIEW_ORDER.map((item, i) => (
            <li key={i}>
              <strong>{item.heading}.</strong> {item.detail}
              {item.subItems.length > 0 && (
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  {item.subItems.map((sub, j) => (
                    <li key={j}>{sub}</li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </ReferencePanel>

      <YesNoQuestion
        number={1}
        question="Does the lesson explicitly make a connection (surface or deep) to one or more aspects of students' ideas and perspectives, cultural, linguistic, or academic backgrounds, or their lived experiences?"
        value={answers.connection}
        onChange={handleConnectionChange}
        colors={ASP_COLORS}
      >
        <ReferencePanel title={ASP_Q1_GUIDANCE.title}>
          <p>{ASP_Q1_GUIDANCE.intro}</p>
          <ul className="list-disc pl-5 space-y-2">
            {ASP_CONNECTION_TYPES.map((c, i) => (
              <li key={i}>
                <strong>{c.label}:</strong> {c.text}
                {c.note && <p className="mt-1 text-slate-600">{c.note}</p>}
              </li>
            ))}
          </ul>
        </ReferencePanel>
      </YesNoQuestion>

      {score === 1 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: ASP_COLORS.primary }}>
          <ScoreBadge score={1} />
          <p className="text-base text-slate-700">{ASP_SCORE_JUSTIFICATIONS[1]}</p>
        </section>
      )}

      {showQ2 && (
        <YesNoQuestion
          number={2}
          question="Are the students asked during activities to use those connections to demonstrate the lesson's learning objective(s)?"
          value={answers.instructionalNecessity}
          onChange={handleNecessityChange}
          colors={ASP_COLORS}
        >
          <ReferencePanel title={ASP_Q2_GUIDANCE.title}>
            <p>{ASP_Q2_GUIDANCE.body}</p>
          </ReferencePanel>
        </YesNoQuestion>
      )}

      {score === 2 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: ASP_COLORS.primary }}>
          <ScoreBadge score={2} />
          <p className="text-base text-slate-700">{ASP_SCORE_JUSTIFICATIONS[2]}</p>
        </section>
      )}

      {showQ3 && (
        <YesNoQuestion
          number={3}
          question="Is the connection deep, not just surface?"
          value={answers.deep}
          onChange={(v) => setAnswers((prev) => ({ ...prev, deep: v }))}
          colors={ASP_COLORS}
        >
          <ReferencePanel title={ASP_Q3_GUIDANCE.title}>
            <p>
              <strong>{ASP_Q3_GUIDANCE.surface.label}</strong> {ASP_Q3_GUIDANCE.surface.parenthetical} {ASP_Q3_GUIDANCE.surface.body}
            </p>
            <p className="text-slate-600">Example: {ASP_Q3_GUIDANCE.surface.example}</p>
            <p className="pt-2 border-t border-slate-200">
              <strong>{ASP_Q3_GUIDANCE.deep.label}</strong> {ASP_Q3_GUIDANCE.deep.parenthetical} {ASP_Q3_GUIDANCE.deep.body}
            </p>
            <p className="text-slate-600">{ASP_Q3_GUIDANCE.deep.personalValuesNote}</p>
            <p className="text-slate-600">Example: {ASP_Q3_GUIDANCE.deep.example}</p>
          </ReferencePanel>
        </YesNoQuestion>
      )}

      {score !== null && (score === 3 || score === 4) && (
        <section className="rounded-xl p-6 space-y-3 text-white" style={{ backgroundColor: ASP_COLORS.primary }}>
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-3xl font-bold"
              style={{ color: ASP_COLORS.primary }}
            >
              {score}
            </span>
            <div>
              <p className="text-base font-semibold">Final ASP score</p>
              <p className="text-sm opacity-90">{ASP_SCORE_JUSTIFICATIONS[score]}</p>
            </div>
          </div>
          <RationaleAndActions rationale={rationale} setRationale={setRationale} onDownload={handleDownload} onReset={resetAll} />
        </section>
      )}

      {(score === 1 || score === 2) && (
        <section className="rounded-xl p-6 space-y-3 text-white" style={{ backgroundColor: ASP_COLORS.primary }}>
          <RationaleAndActions rationale={rationale} setRationale={setRationale} onDownload={handleDownload} onReset={resetAll} />
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
        <label className="block text-sm font-medium text-white/80 mb-1">Rationale / notes (for feedback and QA)</label>
        <textarea
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          rows={3}
          className="w-full rounded-lg bg-black/20 border border-white/30 px-3 py-2 text-base text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Optional: explain the score."
        />
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="rounded-lg bg-white text-slate-900 text-base font-medium px-4 py-2 hover:bg-slate-100"
        >
          Download this rating as CSV
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-white/40 text-white text-base font-medium px-4 py-2 hover:bg-white/10"
        >
          Start a new rating
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import ReferencePanel from "@/components/ReferencePanel";
import ScoreBadge from "@/components/ScoreBadge";
import YesNoQuestion from "@/components/YesNoQuestion";
import IndicatorMultiSelect from "@/components/IndicatorMultiSelect";
import { usePortfolioSession } from "@/lib/PortfolioSession";
import { downloadCsv, recordToCsv, GcaRatingRecord } from "@/lib/csv";
import {
  GCA_COLORS,
  GCA_DESCRIPTION,
  GCA_CONSTRUCTS,
  GCA_PORTFOLIO_REVIEW_INTRO,
  GCA_PORTFOLIO_REVIEW_ORDER,
  GCA_Q1_GUIDANCE,
  GCA_Q2_GUIDANCE,
  GCA_Q3_GUIDANCE,
  GCA_SCORE_JUSTIFICATIONS,
} from "@/lib/gca/content";
import {
  GcaAnswers,
  emptyGcaAnswers,
  computeGcaScore,
  shouldShowQ2,
  shouldShowQ3,
} from "@/lib/gca/scoring";

export default function GcaPage() {
  const { raterInitials, setRaterInitials, portfolioId, setPortfolioId } = usePortfolioSession();
  const [answers, setAnswers] = useState<GcaAnswers>(emptyGcaAnswers());
  const [rationale, setRationale] = useState("");

  const score = computeGcaScore(answers);
  const showQ2 = shouldShowQ2(answers);
  const showQ3 = shouldShowQ3(answers);

  function update<K extends keyof GcaAnswers>(key: K, value: GcaAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handlePresenceChange(value: boolean) {
    setAnswers({ ...emptyGcaAnswers(), presence: value });
  }

  function handleOfficialIndicatorChange(value: boolean) {
    setAnswers((prev) => ({
      ...prev,
      isOfficialIndicator: value,
      selectedIndicatorCodes: [],
      customCompetencyText: "",
      adherence: null,
      scope: null,
    }));
  }

  function handleAdherenceChange(value: boolean) {
    setAnswers((prev) => ({ ...prev, adherence: value, scope: null }));
  }

  function resetAll() {
    setAnswers(emptyGcaAnswers());
    setRationale("");
  }

  function handleDownload() {
    if (score === null) return;
    const record: GcaRatingRecord = {
      ratedAt: new Date().toISOString(),
      raterInitials,
      teacherOrPortfolioId: portfolioId,
      presence: answers.presence === true,
      usedOfficialIndicator: answers.isOfficialIndicator === null ? "" : String(answers.isOfficialIndicator),
      selectedIndicatorCodes: answers.selectedIndicatorCodes.join("; "),
      customCompetencyText: answers.customCompetencyText,
      adherence: answers.adherence === null ? "" : String(answers.adherence),
      scope: answers.scope === null ? "" : String(answers.scope),
      finalScore: score,
      scoreJustification: GCA_SCORE_JUSTIFICATIONS[score],
      rationale,
    };
    const filename = `gca-rating-${portfolioId || "portfolio"}-${Date.now()}.csv`;
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
        <h1 className="text-2xl font-semibold text-slate-900">Global Competency Alignment</h1>
        <p className="text-base text-slate-500 mt-1">{GCA_DESCRIPTION}</p>
      </div>

      <ReferencePanel title="Constructs">
        <ul className="list-disc pl-5 space-y-1">
          {GCA_CONSTRUCTS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </ReferencePanel>

      <ReferencePanel title="How to review portfolio components">
        <p>{GCA_PORTFOLIO_REVIEW_INTRO}</p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          {GCA_PORTFOLIO_REVIEW_ORDER.map((item, i) => (
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
        question="Does the reflection document or lesson plan identify or describe a global competency being taught?"
        value={answers.presence}
        onChange={handlePresenceChange}
        colors={GCA_COLORS}
      >
        <ReferencePanel title={GCA_Q1_GUIDANCE.title}>
          <p>{GCA_Q1_GUIDANCE.body}</p>
          <ul className="list-disc pl-5 space-y-1">
            {GCA_Q1_GUIDANCE.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </ReferencePanel>

        {answers.presence === true && (
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <p className="text-sm font-medium text-slate-800">
              Is this global competency a Global Student Learning Outcome (i.e., indicator) from the Global Cities
              evaluation framework?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleOfficialIndicatorChange(true)}
                style={
                  answers.isOfficialIndicator === true
                    ? { backgroundColor: GCA_COLORS.primary, borderColor: GCA_COLORS.primary, color: "white" }
                    : {}
                }
                className={`px-5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  answers.isOfficialIndicator === true ? "" : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleOfficialIndicatorChange(false)}
                style={
                  answers.isOfficialIndicator === false
                    ? { backgroundColor: GCA_COLORS.primary, borderColor: GCA_COLORS.primary, color: "white" }
                    : {}
                }
                className={`px-5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  answers.isOfficialIndicator === false ? "" : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                No
              </button>
            </div>

            {answers.isOfficialIndicator === true && (
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Select all relevant indicators</label>
                <IndicatorMultiSelect
                  selectedCodes={answers.selectedIndicatorCodes}
                  onChange={(codes) => update("selectedIndicatorCodes", codes)}
                />
              </div>
            )}
            {answers.isOfficialIndicator === false && (
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">
                  Describe the global competency actually taught
                </label>
                <input
                  type="text"
                  value={answers.customCompetencyText}
                  onChange={(e) => update("customCompetencyText", e.target.value)}
                  placeholder="e.g., building students' capacity for cross-cultural empathy"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            )}
          </div>
        )}
      </YesNoQuestion>

      {score === 1 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: GCA_COLORS.primary }}>
          <ScoreBadge score={1} />
          <p className="text-base text-slate-700">{GCA_SCORE_JUSTIFICATIONS[1]}</p>
        </section>
      )}

      {showQ2 && (
        <YesNoQuestion
          number={2}
          question="Is the substance of the lesson related to and sufficient to teach the identified global competency?"
          value={answers.adherence}
          onChange={handleAdherenceChange}
          colors={GCA_COLORS}
        >
          <ReferencePanel title={GCA_Q2_GUIDANCE.title}>
            <p>{GCA_Q2_GUIDANCE.body}</p>
            <ul className="list-disc pl-5 space-y-1">
              {GCA_Q2_GUIDANCE.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
            <p>{GCA_Q2_GUIDANCE.afterExamples}</p>
            <ul className="list-disc pl-5 space-y-1">
              {GCA_Q2_GUIDANCE.bullets.map((b, i) => (
                <li key={i}>
                  <strong>{b.label}:</strong> {b.text}
                </li>
              ))}
            </ul>
          </ReferencePanel>
        </YesNoQuestion>
      )}

      {score === 2 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: GCA_COLORS.primary }}>
          <ScoreBadge score={2} />
          <p className="text-base text-slate-700">{GCA_SCORE_JUSTIFICATIONS[2]}</p>
        </section>
      )}

      {showQ3 && (
        <YesNoQuestion
          number={3}
          question="Is the teaching of the global competency integrated throughout the beginning, middle, and end of the lesson?"
          value={answers.scope}
          onChange={(v) => update("scope", v)}
          colors={GCA_COLORS}
        >
          <ReferencePanel title={GCA_Q3_GUIDANCE.title}>
            <p>{GCA_Q3_GUIDANCE.body}</p>
          </ReferencePanel>
        </YesNoQuestion>
      )}

      {score !== null && (score === 3 || score === 4) && (
        <section className="rounded-xl p-6 space-y-3 text-white" style={{ backgroundColor: GCA_COLORS.primary }}>
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-3xl font-bold"
              style={{ color: GCA_COLORS.primary }}
            >
              {score}
            </span>
            <div>
              <p className="text-base font-semibold">Final GCA score</p>
              <p className="text-sm opacity-90">{GCA_SCORE_JUSTIFICATIONS[score]}</p>
            </div>
          </div>
          <RationaleAndActions rationale={rationale} setRationale={setRationale} onDownload={handleDownload} onReset={resetAll} />
        </section>
      )}

      {(score === 1 || score === 2) && (
        <section className="rounded-xl p-6 space-y-3 text-white" style={{ backgroundColor: GCA_COLORS.primary }}>
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

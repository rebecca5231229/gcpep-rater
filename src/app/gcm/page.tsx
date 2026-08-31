"use client";

import { useState } from "react";
import ReferencePanel from "@/components/ReferencePanel";
import ScoreBadge from "@/components/ScoreBadge";
import YesNoQuestion from "@/components/YesNoQuestion";
import IndicatorMultiSelect from "@/components/IndicatorMultiSelect";
import { usePortfolioSession } from "@/lib/PortfolioSession";
import { downloadCsv, recordToCsv, GcmRatingRecord } from "@/lib/csv";
import { getIndicatorByCode } from "@/lib/gca/indicators";
import LookForsToggle from "@/components/LookForsToggle";
import {
  GCM_COLORS,
  GCM_DESCRIPTION,
  GCM_CONSTRUCTS,
  GCM_PORTFOLIO_REVIEW_INTRO,
  GCM_PORTFOLIO_REVIEW_ORDER,
  GCM_INDICATOR_STEP_GUIDANCE,
  GCM_Q2_GUIDANCE,
  GCM_Q3_GUIDANCE,
  GCM_Q5_GUIDANCE,
  GCM_SCORE_JUSTIFICATIONS,
} from "@/lib/gcm/content";
import {
  GcmAnswers,
  emptyGcmAnswers,
  computeGcmScore,
  shouldShowQ2a,
  shouldShowQ3,
  shouldShowQ4,
  shouldShowQ5,
} from "@/lib/gcm/scoring";

export default function GcmPage() {
  const { raterInitials, setRaterInitials, portfolioId, setPortfolioId } = usePortfolioSession();
  const [answers, setAnswers] = useState<GcmAnswers>(emptyGcmAnswers());
  const [rationale, setRationale] = useState("");

  const score = computeGcmScore(answers);
  const showQ2a = shouldShowQ2a(answers);
  const showQ3 = shouldShowQ3(answers);
  const showQ4 = shouldShowQ4(answers);
  const showQ5 = shouldShowQ5(answers);

  function update<K extends keyof GcmAnswers>(key: K, value: GcmAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handlePartialAlignmentChange(value: boolean) {
    setAnswers((prev) => ({
      ...emptyGcmAnswers(),
      prioritizedIndicatorCodes: prev.prioritizedIndicatorCodes,
      partialAlignment: value,
    }));
  }

  function handleFullAlignmentChange(value: boolean) {
    setAnswers((prev) => ({
      ...prev,
      fullAlignment: value,
      performanceLevelsPresent: null,
      sufficientDetail: null,
    }));
  }

  function handlePerformanceLevelsChange(value: boolean) {
    setAnswers((prev) => ({ ...prev, performanceLevelsPresent: value, sufficientDetail: null }));
  }

  function toggleAlignedIndicator(code: string) {
    setAnswers((prev) => {
      const already = prev.alignedIndicatorCodes.includes(code);
      const next = already
        ? prev.alignedIndicatorCodes.filter((c) => c !== code)
        : [...prev.alignedIndicatorCodes, code];
      return { ...prev, alignedIndicatorCodes: next };
    });
  }

  function resetAll() {
    setAnswers(emptyGcmAnswers());
    setRationale("");
  }

  function handleDownload() {
    if (score === null) return;
    const record: GcmRatingRecord = {
      ratedAt: new Date().toISOString(),
      raterInitials,
      teacherOrPortfolioId: portfolioId,
      prioritizedIndicatorCodes: answers.prioritizedIndicatorCodes.join("; "),
      partialAlignment: answers.partialAlignment === true,
      alignedIndicatorCodes: answers.alignedIndicatorCodes.join("; "),
      fullAlignment: answers.fullAlignment === null ? "" : String(answers.fullAlignment),
      performanceLevelsPresent: answers.performanceLevelsPresent === null ? "" : String(answers.performanceLevelsPresent),
      sufficientDetail: answers.sufficientDetail === null ? "" : String(answers.sufficientDetail),
      finalScore: score,
      scoreJustification: GCM_SCORE_JUSTIFICATIONS[score],
      rationale,
    };
    const filename = `gcm-rating-${portfolioId || "portfolio"}-${Date.now()}.csv`;
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
        <h1 className="text-2xl font-semibold text-slate-900">Global Competency Measurement</h1>
        <p className="text-base text-slate-500 mt-1">{GCM_DESCRIPTION}</p>
      </div>

      <ReferencePanel title="Constructs">
        <ul className="list-disc pl-5 space-y-1">
          {GCM_CONSTRUCTS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </ReferencePanel>

      <ReferencePanel title="How to review portfolio components">
        <p>{GCM_PORTFOLIO_REVIEW_INTRO}</p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          {GCM_PORTFOLIO_REVIEW_ORDER.map((item, i) => (
            <li key={i}>
              <strong>{item.heading}.</strong> {item.detail}
            </li>
          ))}
        </ol>
      </ReferencePanel>

      <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <p className="text-base font-semibold text-slate-900">
          What are the prioritized Global SLO indicator(s) that the teacher identified at the beginning of the
          reflection tool?
        </p>
        <ReferencePanel title={GCM_INDICATOR_STEP_GUIDANCE.title}>
          <p>{GCM_INDICATOR_STEP_GUIDANCE.body}</p>
        </ReferencePanel>
        <IndicatorMultiSelect
          selectedCodes={answers.prioritizedIndicatorCodes}
          onChange={(codes) => update("prioritizedIndicatorCodes", codes)}
        />
      </section>

      <YesNoQuestion
        number={1}
        question="Alignment: Are the assessment and/or criteria for rating student work at least partially aligned to the prioritized Global SLO indicator(s)?"
        value={answers.partialAlignment}
        onChange={handlePartialAlignmentChange}
        colors={GCM_COLORS}
        beforeButtons={
          answers.prioritizedIndicatorCodes.length > 0 ? (
            <div className="space-y-1 pb-1">
              {answers.prioritizedIndicatorCodes.map((code) => (
                <LookForsToggle key={code} code={code} />
              ))}
            </div>
          ) : undefined
        }
      >
        <ReferencePanel title="Alignment guidance">
          <ul className="list-disc pl-5 space-y-1">
            {GCM_Q2_GUIDANCE.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <ul className="list-disc pl-5 space-y-1 ml-4">
            {GCM_Q2_GUIDANCE.subBullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </ReferencePanel>

        {showQ2a && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-sm font-medium text-slate-800">
              To which prioritized Global SLO indicator(s) does the assessment align?
            </p>
            {answers.prioritizedIndicatorCodes.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No prioritized indicators were selected above.</p>
            ) : (
              <div className="space-y-2">
                {answers.prioritizedIndicatorCodes.map((code) => {
                  const ind = getIndicatorByCode(code);
                  const checked = answers.alignedIndicatorCodes.includes(code);
                  return (
                    <label key={code} className="flex items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAlignedIndicator(code)}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300"
                      />
                      <span>
                        <span className="font-mono text-slate-500">{code}</span> -- {ind?.name ?? "Unknown indicator"}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </YesNoQuestion>

      {score === 1 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: GCM_COLORS.primary }}>
          <ScoreBadge score={1} />
          <p className="text-base text-slate-700">{GCM_SCORE_JUSTIFICATIONS[1]}</p>
        </section>
      )}

      {showQ3 && (
        <YesNoQuestion
          number={2}
          question="Are the assessment and/or criteria for rating student work fully aligned to the prioritized Global SLO indicator(s)?"
          value={answers.fullAlignment}
          onChange={handleFullAlignmentChange}
          colors={GCM_COLORS}
        >
          <ReferencePanel title="Full alignment guidance">
            <ul className="list-disc pl-5 space-y-1">
              {GCM_Q3_GUIDANCE.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <ul className="list-disc pl-5 space-y-1 ml-4">
              {GCM_Q3_GUIDANCE.subBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </ReferencePanel>
        </YesNoQuestion>
      )}

      {showQ4 && (
        <YesNoQuestion
          number={3}
          question="Does the assessment tool include performance levels?"
          value={answers.performanceLevelsPresent}
          onChange={handlePerformanceLevelsChange}
          colors={GCM_COLORS}
        />
      )}

      {score === 2 && (
        <section className="bg-white border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: GCM_COLORS.primary }}>
          <ScoreBadge score={2} />
          <p className="text-base text-slate-700">{GCM_SCORE_JUSTIFICATIONS[2]}</p>
        </section>
      )}

      {showQ5 && (
        <YesNoQuestion
          number={4}
          question="Do the performance levels have sufficient detail to support assessment?"
          value={answers.sufficientDetail}
          onChange={(v) => update("sufficientDetail", v)}
          colors={GCM_COLORS}
        >
          <ReferencePanel title={GCM_Q5_GUIDANCE.title}>
            <p>{GCM_Q5_GUIDANCE.body}</p>
          </ReferencePanel>
        </YesNoQuestion>
      )}

      {score !== null && (score === 3 || score === 4) && (
        <section className="rounded-xl p-6 space-y-3 text-white" style={{ backgroundColor: GCM_COLORS.primary }}>
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-3xl font-bold"
              style={{ color: GCM_COLORS.primary }}
            >
              {score}
            </span>
            <div>
              <p className="text-base font-semibold">Final GCM score</p>
              <p className="text-sm opacity-90">{GCM_SCORE_JUSTIFICATIONS[score]}</p>
            </div>
          </div>
          <RationaleAndActions rationale={rationale} setRationale={setRationale} onDownload={handleDownload} onReset={resetAll} />
        </section>
      )}

      {(score === 1 || score === 2) && (
        <section className="rounded-xl p-6 space-y-3 text-white" style={{ backgroundColor: GCM_COLORS.primary }}>
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

"use client";

import { useState } from "react";
import ReferencePanel from "@/components/ReferencePanel";
import { usePortfolioSession } from "@/lib/PortfolioSession";
import { downloadCsv, recordToCsv, SwaRatingRecord } from "@/lib/csv";
import {
  SWA_COLORS,
  SWA_DESCRIPTION,
  SWA_CONSTRUCTS,
  SWA_PORTFOLIO_REVIEW_INTRO,
  SWA_PORTFOLIO_REVIEW_ORDER,
  SWA_Q1_GUIDANCE,
  SWA_Q2_GUIDANCE,
  SWA_Q3_GUIDANCE,
  SWA_SCORE_JUSTIFICATIONS,
} from "@/lib/swa/content";
import { SwaAnswers, SwaSample, emptySwaAnswers, emptySample, computeSwaScore } from "@/lib/swa/scoring";

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-slate-300"
      />
      <span className="text-slate-800">{label}</span>
    </label>
  );
}

export default function SwaPage() {
  const { raterInitials, setRaterInitials, portfolioId, setPortfolioId } = usePortfolioSession();
  const [answers, setAnswers] = useState<SwaAnswers>(emptySwaAnswers());
  const [rationaleNotes, setRationaleNotes] = useState("");

  const score = computeSwaScore(answers);

  function updateSample(id: string, key: keyof SwaSample, value: boolean) {
    setAnswers((prev) => ({
      ...prev,
      samples: prev.samples.map((s) => (s.id === id ? { ...s, [key]: value } : s)),
    }));
  }

  function addSample() {
    setAnswers((prev) => ({ ...prev, samples: [...prev.samples, emptySample()] }));
  }

  function removeSample(id: string) {
    setAnswers((prev) => ({ ...prev, samples: prev.samples.filter((s) => s.id !== id) }));
  }

  function updateWholeClass(key: keyof SwaAnswers["wholeClass"], value: boolean) {
    setAnswers((prev) => ({ ...prev, wholeClass: { ...prev.wholeClass, [key]: value } }));
  }

  function resetAll() {
    setAnswers(emptySwaAnswers());
    setRationaleNotes("");
  }

  function handleDownload() {
    const record: SwaRatingRecord = {
      ratedAt: new Date().toISOString(),
      raterInitials,
      teacherOrPortfolioId: portfolioId,
      sampleCount: answers.samples.length,
      samplesJson: JSON.stringify(answers.samples),
      wholeClassJson: JSON.stringify(answers.wholeClass),
      finalScore: score,
      scoreJustification: SWA_SCORE_JUSTIFICATIONS[score],
      rationale: rationaleNotes,
    };
    const filename = `swa-rating-${portfolioId || "portfolio"}-${Date.now()}.csv`;
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
        <h1 className="text-2xl font-semibold text-slate-900">Analysis of Student Work</h1>
        <p className="text-base text-slate-500 mt-1">{SWA_DESCRIPTION}</p>
      </div>

      <ReferencePanel title="Constructs">
        <ul className="list-disc pl-5 space-y-1">
          {SWA_CONSTRUCTS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </ReferencePanel>

      <ReferencePanel title="How to review portfolio components">
        <p>{SWA_PORTFOLIO_REVIEW_INTRO}</p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          {SWA_PORTFOLIO_REVIEW_ORDER.map((item, i) => (
            <li key={i}>
              <strong>{item.heading}</strong>
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

      <ReferencePanel title="Assessed global competency">
        <ul className="list-disc pl-5 space-y-1">
          {SWA_Q1_GUIDANCE.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <p className="pt-2 border-t border-slate-200">{SWA_Q1_GUIDANCE.questionsToSupport}</p>
      </ReferencePanel>

      <ReferencePanel title="Descriptions vs. claims, and what counts as supported">
        <div>
          <p className="font-medium text-slate-800 mb-1">{SWA_Q2_GUIDANCE.descriptionsVsClaimsTitle}</p>
          <ul className="list-disc pl-5 space-y-1">
            {SWA_Q2_GUIDANCE.descriptionsVsClaims.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="pt-2 border-t border-slate-200">
          <p className="font-medium text-slate-800 mb-1">{SWA_Q2_GUIDANCE.reasonablySupportedTitle}</p>
          <ul className="list-disc pl-5 space-y-1">
            {SWA_Q2_GUIDANCE.reasonablySupportedBullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <p className="pt-2 border-t border-slate-200">{SWA_Q2_GUIDANCE.wholeClassNote}</p>
        <p className="pt-2 border-t border-slate-200">
          <strong>Detail:</strong> {SWA_Q3_GUIDANCE}
        </p>
      </ReferencePanel>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900">Individual student work samples</h2>
        {answers.samples.map((sample, i) => (
          <div key={sample.id} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-800">Sample {i + 1}</p>
              {answers.samples.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeSample(sample.id)}
                  className="text-sm text-slate-400 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Checkbox
                label="Reflection is related to specific global competency"
                checked={sample.relatesToCompetency}
                onChange={(v) => updateSample(sample.id, "relatesToCompetency", v)}
              />
              <Checkbox
                label="Reflection makes a claim"
                checked={sample.makesAClaim}
                onChange={(v) => updateSample(sample.id, "makesAClaim", v)}
              />
              <Checkbox
                label="Description is consistent with work sample provided"
                checked={sample.consistentWithSample}
                onChange={(v) => updateSample(sample.id, "consistentWithSample", v)}
              />
              <Checkbox
                label="Reflection provides examples related to the specific global competency"
                checked={sample.providesExamples}
                onChange={(v) => updateSample(sample.id, "providesExamples", v)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addSample}
          style={{ borderColor: SWA_COLORS.primary, color: SWA_COLORS.primary }}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-pink-50"
        >
          + Add sample
        </button>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <h2 className="text-base font-semibold text-slate-900">Whole class analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Checkbox
            label="Descriptions of strengths & growth areas relate to specific global competency"
            checked={answers.wholeClass.relatesToCompetency}
            onChange={(v) => updateWholeClass("relatesToCompetency", v)}
          />
          <Checkbox
            label="Reflection makes a claim"
            checked={answers.wholeClass.makesAClaim}
            onChange={(v) => updateWholeClass("makesAClaim", v)}
          />
          <Checkbox
            label="Reflection provides examples related to the specific global competency"
            checked={answers.wholeClass.providesExamples}
            onChange={(v) => updateWholeClass("providesExamples", v)}
          />
        </div>
      </section>

      <section className="rounded-xl p-6 space-y-3 text-white" style={{ backgroundColor: SWA_COLORS.primary }}>
        <div className="flex items-center gap-4">
          <span
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-3xl font-bold"
            style={{ color: SWA_COLORS.primary }}
          >
            {score}
          </span>
          <div>
            <p className="text-base font-semibold">Current SWA score</p>
            <p className="text-sm opacity-90">{SWA_SCORE_JUSTIFICATIONS[score]}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Rationale / notes (for feedback and QA)</label>
          <textarea
            value={rationaleNotes}
            onChange={(e) => setRationaleNotes(e.target.value)}
            rows={3}
            className="w-full rounded-lg bg-black/20 border border-white/30 px-3 py-2 text-base text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="Optional: explain the score."
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-lg bg-white text-base font-medium px-4 py-2 hover:bg-slate-100"
            style={{ color: SWA_COLORS.primary }}
          >
            Download this rating as CSV
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-lg border border-white/40 text-white text-base font-medium px-4 py-2 hover:bg-white/10"
          >
            Start a new rating
          </button>
        </div>
      </section>
    </div>
  );
}

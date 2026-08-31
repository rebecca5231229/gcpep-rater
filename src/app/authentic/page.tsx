"use client";

import { useMemo, useState } from "react";
import ReferencePanel from "@/components/ReferencePanel";
import { usePortfolioSession } from "@/lib/PortfolioSession";
import { downloadCsv, recordToCsv, AuthenticRatingRecord } from "@/lib/csv";
import {
  AUTHENTIC_PRACTICES,
  AUTHENTIC_DIMENSION_DESCRIPTION,
  AUTHENTIC_DIMENSION_CONSTRUCTS,
  AUTHENTIC_RATING_GUIDANCE,
  AUTHENTIC_ORDER_REMINDER,
  COLLABORATION_COMPOSITION_NOTE,
  PracticeLevel,
  PracticeRatings,
  emptyPracticeRatings,
  getTopPractices,
  getQualifyingPractices,
} from "@/lib/authentic/practices";
import {
  PR_DESCRIPTION,
  PR_TIERS,
  PR_CONTEXT_DEPENDENT_LEAD,
  PR_CONTEXT_DEPENDENT_VERBS,
  PR_CENTRAL_TASK_GUIDANCE,
  PR_RATING_GUIDANCE,
  PR_DISTINGUISHING,
} from "@/lib/authentic/plannedRigor";
import {
  SED_DESCRIPTION,
  EFFICACY_SOURCES,
  EfficacyRatings,
  emptyEfficacyRatings,
  scoreSed,
  SED_SEQUENCE_GUIDANCE,
  SED_OTHER_GUIDANCE,
  SED_DISTINGUISHING,
} from "@/lib/authentic/selfEfficacy";
import { scoreAuthenticDimension } from "@/lib/authentic/scoring";

const PRACTICE_LEVEL_LABELS: Record<PracticeLevel, string> = {
  1: "Not present",
  2: "Present, not high-quality",
  3: "Present, high-quality",
};

function practiceListText(practices: { label: string }[]): string {
  const names = practices.map((p) => p.label);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export default function AuthenticPage() {
  const { raterInitials, setRaterInitials, portfolioId, setPortfolioId } = usePortfolioSession();

  // Step 1: authentic learning practices
  const [practiceRatings, setPracticeRatings] = useState<PracticeRatings>(emptyPracticeRatings());

  // Step 2: Planned Rigor, scoped to whichever practice(s) scored a 3
  const [ctScores, setCtScores] = useState<Record<string, number | null>>({});

  // Step 3: Student Efficacy Development
  const [efficacyRatings, setEfficacyRatings] = useState<EfficacyRatings>(emptyEfficacyRatings());
  const [connected, setConnected] = useState<boolean | null>(null);

  const [rationale, setRationale] = useState("");

  const top = getTopPractices(practiceRatings);
  const qualifyingPractices = useMemo(() => getQualifyingPractices(practiceRatings), [practiceRatings]);

  const ctFinalScore = useMemo(() => {
    const scores = qualifyingPractices.map((p) => ctScores[p.key]).filter((s): s is number => s !== null && s !== undefined);
    return scores.length ? Math.max(...scores) : null;
  }, [ctScores, qualifyingPractices]);

  const ctBestPractice = useMemo(() => {
    if (ctFinalScore === null) return null;
    return qualifyingPractices.find((p) => ctScores[p.key] === ctFinalScore) ?? null;
  }, [ctFinalScore, qualifyingPractices, ctScores]);

  const anyEfficacyHighQuality = EFFICACY_SOURCES.some((s) => efficacyRatings[s.key].highQuality);
  const sedResult = scoreSed(efficacyRatings, connected);

  const finalResult = scoreAuthenticDimension(top?.level ?? null, ctFinalScore, sedResult.score);
  const gateCleared = top !== null && top.level >= 3;

  function updatePracticeLevel(key: string, level: PracticeLevel) {
    setPracticeRatings((prev) => ({ ...prev, [key]: { ...prev[key], level } }));
    if (level !== 3) {
      setCtScores((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function updatePracticeNotes(key: string, notes: string) {
    setPracticeRatings((prev) => ({ ...prev, [key]: { ...prev[key], notes } }));
  }

  function updateCtScore(key: string, score: number) {
    setCtScores((prev) => ({ ...prev, [key]: score }));
  }

  function updateEfficacyObserved(key: string, observed: boolean) {
    setEfficacyRatings((prev) => ({
      ...prev,
      [key]: { ...prev[key], observed, highQuality: observed ? prev[key].highQuality : false },
    }));
    if (!observed) setConnected(null);
  }

  function updateEfficacyQuality(key: string, highQuality: boolean) {
    setEfficacyRatings((prev) => ({ ...prev, [key]: { ...prev[key], highQuality } }));
  }

  function updateEfficacyNotes(key: string, notes: string) {
    setEfficacyRatings((prev) => ({ ...prev, [key]: { ...prev[key], notes } }));
  }

  function resetAll() {
    setPracticeRatings(emptyPracticeRatings());
    setCtScores({});
    setEfficacyRatings(emptyEfficacyRatings());
    setConnected(null);
    setRationale("");
  }

  function handleDownload() {
    const record: AuthenticRatingRecord = {
      ratedAt: new Date().toISOString(),
      raterInitials,
      teacherOrPortfolioId: portfolioId,
      practiceRatings: JSON.stringify(practiceRatings),
      bestPractice: top ? practiceListText(top.practices) : "",
      bestPracticeLevel: top ? String(top.level) : "",
      ctPracticeScores: JSON.stringify(ctScores),
      ctFinalScore: ctFinalScore !== null ? String(ctFinalScore) : "",
      efficacyRatings: JSON.stringify(efficacyRatings),
      efficacyConnected: connected === null ? "" : String(connected),
      efficacyScore: String(sedResult.score),
      finalScore: finalResult.score,
      rationale,
    };
    const filename = `authentic-rating-${portfolioId || "portfolio"}-${Date.now()}.csv`;
    downloadCsv(filename, recordToCsv(record));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Authentic Global Competency Teaching Practices</h1>
      </div>

      {/* Metadata -- shared across all dimension tabs */}
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

      <p className="text-base text-slate-500">{AUTHENTIC_DIMENSION_DESCRIPTION}</p>

      <ReferencePanel title="Dimension constructs & rating guidance">
        <div className="space-y-3">
          <div>
            <p className="font-medium text-slate-800 mb-1">Constructs</p>
            <ul className="list-disc pl-5 space-y-1">
              {AUTHENTIC_DIMENSION_CONSTRUCTS.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-800 mb-1">Rating guidance</p>
            <ol className="list-decimal pl-5 space-y-1">
              {AUTHENTIC_RATING_GUIDANCE.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ol>
          </div>
          <p className="italic text-slate-600">{AUTHENTIC_ORDER_REMINDER}</p>
        </div>
      </ReferencePanel>

      <p className="text-base text-slate-500">
        Rate all four authentic learning practices first. If none reach a high-quality rating, you&rsquo;re
        done — the score is a 1 and Planned Rigor / Student Efficacy Development don&rsquo;t need to be
        scored.
      </p>

      {/* Step 1: Authentic learning practices */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="text-base font-semibold text-slate-900">1. Authentic learning practices</h2>
        <p className="text-sm text-slate-500">
          Does the lesson include high-quality authentic global competency teaching practices? Rate each
          independently.
        </p>
        <div className="space-y-4">
          {AUTHENTIC_PRACTICES.map((p) => {
            const r = practiceRatings[p.key];
            return (
              <div key={p.key} className="border border-slate-100 rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-base">{p.label}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{p.definition}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                      {([1, 2, 3] as PracticeLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => updatePracticeLevel(p.key, lvl)}
                          title={PRACTICE_LEVEL_LABELS[lvl]}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            r.level === lvl
                              ? lvl === 3
                                ? "bg-emerald-600 text-white"
                                : lvl === 2
                                ? "bg-amber-500 text-white"
                                : "bg-slate-500 text-white"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                    {r.level !== null && (
                      <span className="text-sm text-slate-500">{PRACTICE_LEVEL_LABELS[r.level]}</span>
                    )}
                  </div>
                </div>
                <ReferencePanel title="Present / quality markers">
                  <p>
                    <strong>1 — Not present:</strong> {p.notPresentDescription}
                  </p>
                  <p>
                    <strong>2 — Present:</strong> {p.presentMarker}
                  </p>
                  <p>
                    <strong>3 — Present, high-quality:</strong> {p.qualityMarker}
                  </p>
                  {p.key === "collaboration" && (
                    <p className="pt-1 border-t border-slate-200 text-slate-600">{COLLABORATION_COMPOSITION_NOTE}</p>
                  )}
                </ReferencePanel>
                <input
                  type="text"
                  value={r.notes}
                  onChange={(e) => updatePracticeNotes(p.key, e.target.value)}
                  placeholder="Optional notes…"
                  className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Gate result */}
      {top !== null && (
        <section className="bg-white border border-slate-200 rounded-xl p-5">
          {gateCleared ? (
            <p className="text-base text-slate-700">
              <strong>{practiceListText(top.practices)}</strong>{" "}
              {top.practices.length === 1 ? "is" : "are"} the strongest practice{top.practices.length === 1 ? "" : "s"},
              rated <strong>high-quality</strong>. Continue to Planned Rigor and Student Efficacy Development
              below.
            </p>
          ) : (
            <p className="text-base text-slate-700">
              No practice reached high-quality (best: <strong>{practiceListText(top.practices)}</strong> at{" "}
              {PRACTICE_LEVEL_LABELS[top.level]}). The dimension score is <strong>1</strong> — no need to
              score Planned Rigor or Student Efficacy Development.
            </p>
          )}
        </section>
      )}

      {/* Step 2: Planned Rigor, scoped to qualifying practices */}
      {gateCleared && (
        <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">2. Planned rigor</h2>
          <p className="text-sm text-slate-500">{PR_DESCRIPTION}</p>
          <p className="text-sm text-slate-500">
            For each high-quality practice below, identify its central task and rate the level of critical
            thinking it requires. If more than one practice qualified, rate each — the highest score drives
            this dimension.
          </p>
          <ReferencePanel title="Central task guidance">
            <p className="whitespace-pre-line">{PR_CENTRAL_TASK_GUIDANCE}</p>
          </ReferencePanel>
          <ReferencePanel title="Score points and verb reference">
            <div className="space-y-3">
              {PR_TIERS.map((tier) => (
                <div key={tier.score}>
                  <p>
                    <strong>
                      {tier.score} — {tier.label}
                    </strong>
                  </p>
                  <p className="text-slate-600">{tier.shortDescription}</p>
                  <p className="text-slate-500 mt-1">{tier.elaboratedDescription}</p>
                  <p className="text-slate-500 mt-1">
                    <strong>Actions to look for:</strong> {tier.verbs.join(", ")}
                  </p>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200">
                <p className="font-medium text-slate-800 mb-1">Context-dependent verbs</p>
                <p className="text-slate-600 mb-1">{PR_CONTEXT_DEPENDENT_LEAD}</p>
                {PR_CONTEXT_DEPENDENT_VERBS.map((group, i) => (
                  <p key={i} className="mb-1">
                    <span className="text-slate-500">{group.tier}:</span> {group.verbs}
                  </p>
                ))}
              </div>
            </div>
          </ReferencePanel>
          <ReferencePanel title="Rating guidance">
            <ul className="list-disc pl-5 space-y-1">
              {PR_RATING_GUIDANCE.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </ReferencePanel>
          <ReferencePanel title="Distinguishing between ratings">
            <div className="space-y-2">
              {PR_DISTINGUISHING.map((d, i) => (
                <p key={i}>
                  <strong>{d.boundary}:</strong> {d.text}
                </p>
              ))}
            </div>
          </ReferencePanel>
          <div className="space-y-3">
            {qualifyingPractices.map((p) => (
              <div key={p.key} className="flex items-center justify-between gap-4 border border-slate-100 rounded-lg p-3">
                <span className="text-base font-medium text-slate-800">{p.label}</span>
                <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                  {[1, 2, 3, 4].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => updateCtScore(p.key, lvl)}
                      className={`w-9 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        ctScores[p.key] === lvl ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {ctFinalScore !== null && (
            <div className="border-t border-slate-100 pt-3">
              <p className="text-sm text-slate-500">
                Planned Rigor score: <strong className="text-slate-800">{ctFinalScore}</strong>
                {ctBestPractice && <> — driven by {ctBestPractice.label}</>}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Step 3: Student Efficacy Development */}
      {gateCleared && (
        <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">3. Student efficacy development</h2>
          <p className="text-sm text-slate-500">{SED_DESCRIPTION}</p>
          <p className="text-sm text-slate-500">
            Does the lesson design incorporate the four sources of self-efficacy below (Usher &amp; Pajares,
            2008, drawing on Bandura, 1997)?
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-4 font-medium">Source</th>
                  <th className="py-2 px-2 font-medium">Observed?</th>
                  <th className="py-2 px-2 font-medium">High-quality?</th>
                  <th className="py-2 pl-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {EFFICACY_SOURCES.map((s) => {
                  const r = efficacyRatings[s.key];
                  return (
                    <tr key={s.key} className="border-b border-slate-100 last:border-0 align-top">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-slate-800">{s.label}</p>
                        <ReferencePanel title="Definition, supportive actions & quality marker">
                          <p>{s.definition}</p>
                          <p>
                            <strong>Supportive teacher actions:</strong> {s.supportiveActions}
                          </p>
                          <p>
                            <strong>High-quality markers:</strong> {s.qualityMarker}
                          </p>
                        </ReferencePanel>
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="checkbox"
                          checked={r.observed}
                          onChange={(e) => updateEfficacyObserved(s.key, e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="checkbox"
                          disabled={!r.observed}
                          checked={r.highQuality}
                          onChange={(e) => updateEfficacyQuality(s.key, e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300 disabled:opacity-30"
                        />
                      </td>
                      <td className="py-3 pl-2">
                        <input
                          type="text"
                          value={r.notes}
                          onChange={(e) => updateEfficacyNotes(s.key, e.target.value)}
                          placeholder="Optional notes…"
                          className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {anyEfficacyHighQuality && (
            <div className="border-t border-slate-100 pt-4">
              <p className="text-base font-medium text-slate-800 mb-1">
                Are any of the sources above designed to be connected to another — enabled by or building on an
                earlier one?
              </p>
              <p className="text-sm text-slate-500 mb-2">{SED_SEQUENCE_GUIDANCE}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setConnected(true)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${
                    connected === true ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConnected(false)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${
                    connected === false ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          )}

          <ReferencePanel title="Other guidance">
            <ul className="list-disc pl-5 space-y-1">
              {SED_OTHER_GUIDANCE.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </ReferencePanel>

          <ReferencePanel title="Distinguishing between ratings">
            <div className="space-y-2">
              {SED_DISTINGUISHING.map((d, i) => (
                <p key={i}>
                  <strong>{d.boundary}:</strong> {d.text}
                </p>
              ))}
            </div>
          </ReferencePanel>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-sm text-slate-500">
              Student Efficacy Development score: <strong className="text-slate-800">{sedResult.score}</strong> —{" "}
              {sedResult.reason}
            </p>
          </div>
        </section>
      )}

      {/* Final score */}
      {top !== null && (
        <section className="bg-slate-900 text-white rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-slate-900 text-3xl font-bold">
              {finalResult.score}
            </span>
            <div>
              <p className="text-base font-semibold">Final Authentic Global Competency Teaching Practices score</p>
              <p className="text-sm text-slate-300">{finalResult.reason}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Rationale / notes (for feedback and QA)</label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={3}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Optional: explain the score."
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-lg bg-white text-slate-900 text-base font-medium px-4 py-2 hover:bg-slate-100"
            >
              Download this rating as CSV
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="rounded-lg border border-slate-600 text-slate-200 text-base font-medium px-4 py-2 hover:bg-slate-800"
            >
              Start a new rating
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

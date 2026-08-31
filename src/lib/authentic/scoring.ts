export interface AuthenticDimensionResult {
  score: 1 | 2 | 3 | 4;
  reason: string;
}

/**
 * Combines the three sub-scores into the overall dimension score.
 * topPracticeLevel: the highest of the four authentic learning practice scores (1-3), or null if none rated.
 * plannedRigorScore: the highest Planned Rigor score (1-4) across all qualifying practices, or null if not yet scored.
 * sedScore: the Student Efficacy Development score (1-4), or null if not yet scored.
 */
export function scoreAuthenticDimension(
  topPracticeLevel: number | null,
  plannedRigorScore: number | null,
  sedScore: number | null
): AuthenticDimensionResult {
  if (topPracticeLevel === null || topPracticeLevel < 3) {
    return {
      score: 1,
      reason: "No high-quality authentic learning experience is present.",
    };
  }

  const ctQualifies = plannedRigorScore !== null && plannedRigorScore >= 3;
  const sedQualifies = sedScore !== null && sedScore >= 3;

  if (ctQualifies && sedQualifies) {
    return {
      score: 4,
      reason: "A high-quality authentic learning experience is present, and the lesson is rigorous (3+) and is designed to develop students' self-efficacy (3+).",
    };
  }
  if (ctQualifies || sedQualifies) {
    return {
      score: 3,
      reason: `A high-quality authentic learning experience is present, and the lesson is ${
        ctQualifies ? "rigorous (3+)" : "designed to develop students' self-efficacy (3+)"
      }.`,
    };
  }
  return {
    score: 2,
    reason: "A high-quality authentic learning experience is present, but the lesson lacks rigor and is not designed to develop students' self-efficacy.",
  };
}

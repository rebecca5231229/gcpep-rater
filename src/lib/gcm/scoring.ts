export interface GcmAnswers {
  prioritizedIndicatorCodes: string[]; // collected up front, not gated on any prior answer
  partialAlignment: boolean | null; // Q2
  alignedIndicatorCodes: string[]; // Q2a -- subset of prioritizedIndicatorCodes; only relevant once partialAlignment === true
  fullAlignment: boolean | null; // Q3
  performanceLevelsPresent: boolean | null; // Q4
  sufficientDetail: boolean | null; // Q5
}

export function emptyGcmAnswers(): GcmAnswers {
  return {
    prioritizedIndicatorCodes: [],
    partialAlignment: null,
    alignedIndicatorCodes: [],
    fullAlignment: null,
    performanceLevelsPresent: null,
    sufficientDetail: null,
  };
}

export type GcmScore = 1 | 2 | 3 | 4;

/**
 * 1 = not even partially aligned
 * 2 = partially aligned but not fully, OR fully aligned but no performance levels
 * 3 = fully aligned, performance levels present, but insufficient detail
 * 4 = fully aligned, performance levels present, with sufficient detail
 */
export function computeGcmScore(answers: GcmAnswers): GcmScore | null {
  if (answers.partialAlignment === null) return null;
  if (answers.partialAlignment === false) return 1;

  if (answers.fullAlignment === null) return null;
  if (answers.fullAlignment === false) return 2;

  if (answers.performanceLevelsPresent === null) return null;
  if (answers.performanceLevelsPresent === false) return 2;

  if (answers.sufficientDetail === null) return null;
  return answers.sufficientDetail ? 4 : 3;
}

/** Whether the Q2a indicator checklist has at least one indicator checked. */
export function isQ2aResolved(answers: GcmAnswers): boolean {
  return answers.alignedIndicatorCodes.length > 0;
}

export function shouldShowQ2a(answers: GcmAnswers): boolean {
  return answers.partialAlignment === true;
}

export function shouldShowQ3(answers: GcmAnswers): boolean {
  return answers.partialAlignment === true && isQ2aResolved(answers);
}

export function shouldShowQ4(answers: GcmAnswers): boolean {
  return answers.fullAlignment === true;
}

export function shouldShowQ5(answers: GcmAnswers): boolean {
  return answers.performanceLevelsPresent === true;
}

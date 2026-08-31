export interface SwaSample {
  id: string;
  relatesToCompetency: boolean;
  makesAClaim: boolean;
  consistentWithSample: boolean; // accuracy/support check -- individual samples only, not whole-class
  providesExamples: boolean;
}

export interface SwaWholeClass {
  relatesToCompetency: boolean;
  makesAClaim: boolean;
  providesExamples: boolean;
  // No "consistentWithSample" equivalent -- raters can't verify a whole-class claim
  // against evidence they can't see, since only the submitted samples are visible.
}

export interface SwaAnswers {
  samples: SwaSample[];
  wholeClass: SwaWholeClass;
}

let idCounter = 0;
export function newSampleId(): string {
  idCounter += 1;
  return `sample-${Date.now()}-${idCounter}`;
}

export function emptySample(): SwaSample {
  return {
    id: newSampleId(),
    relatesToCompetency: false,
    makesAClaim: false,
    consistentWithSample: false,
    providesExamples: false,
  };
}

export function emptyWholeClass(): SwaWholeClass {
  return { relatesToCompetency: false, makesAClaim: false, providesExamples: false };
}

export function emptySwaAnswers(): SwaAnswers {
  return { samples: [emptySample(), emptySample()], wholeClass: emptyWholeClass() };
}

export type SwaScore = 1 | 2 | 3 | 4;

/**
 * 1 = fewer than 2 samples, or not every sample + whole-class relates to the competency
 * 2 = all relate, but not every sample+whole-class makes a claim, or a claim isn't
 *     consistent with its sample (individual samples only)
 * 3 = all make claims (and individual claims are consistent), but not every sample+whole-class
 *     provides specific examples
 * 4 = all of the above pass
 */
export function computeSwaScore(answers: SwaAnswers): SwaScore {
  const { samples, wholeClass } = answers;

  const enoughSamples = samples.length >= 2;
  const allRelate = samples.every((s) => s.relatesToCompetency) && wholeClass.relatesToCompetency;
  if (!enoughSamples || !allRelate) return 1;

  const allClaim = samples.every((s) => s.makesAClaim) && wholeClass.makesAClaim;
  const allConsistent = samples.every((s) => s.consistentWithSample);
  if (!allClaim || !allConsistent) return 2;

  const allExamples = samples.every((s) => s.providesExamples) && wholeClass.providesExamples;
  if (!allExamples) return 3;

  return 4;
}

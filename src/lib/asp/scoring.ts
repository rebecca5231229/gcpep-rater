export interface AspAnswers {
  connection: boolean | null; // Q1
  instructionalNecessity: boolean | null; // Q2, only asked if connection === true
  deep: boolean | null; // Q3, only asked if instructionalNecessity === true
}

export function emptyAspAnswers(): AspAnswers {
  return { connection: null, instructionalNecessity: null, deep: null };
}

export type AspScore = 1 | 2 | 3 | 4;

/**
 * 1 = no connection at all
 * 2 = connection present, but not instructionally necessary
 * 3 = instructionally necessary, but only surface
 * 4 = instructionally necessary and deep
 */
export function computeAspScore(answers: AspAnswers): AspScore | null {
  if (answers.connection === null) return null;
  if (answers.connection === false) return 1;

  if (answers.instructionalNecessity === null) return null;
  if (answers.instructionalNecessity === false) return 2;

  if (answers.deep === null) return null;
  return answers.deep ? 4 : 3;
}

export function shouldShowQ2(answers: AspAnswers): boolean {
  return answers.connection === true;
}

export function shouldShowQ3(answers: AspAnswers): boolean {
  return answers.instructionalNecessity === true;
}

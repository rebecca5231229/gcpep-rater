export interface PaAnswers {
  rationaleDepth: boolean | null; // Q1a
  rationaleDetail: boolean | null; // Q1b
  engagementDepth: boolean | null; // Q2a, only asked once Q1 fully passes
  engagementDetail: boolean | null; // Q2b
  mechanismPresent: boolean | null; // Q3a, only asked once Q2 fully passes
  mechanismConnected: boolean | null; // Q3b, only asked if mechanismPresent === true
}

export function emptyPaAnswers(): PaAnswers {
  return {
    rationaleDepth: null,
    rationaleDetail: null,
    engagementDepth: null,
    engagementDetail: null,
    mechanismPresent: null,
    mechanismConnected: null,
  };
}

export type PaScore = 1 | 2 | 3 | 4;

/**
 * 1 = rationale depth or detail fails
 * 2 = rationale passes, but engagement depth or detail fails
 * 3 = rationale + engagement pass, but no connected mechanism
 * 4 = rationale + engagement pass, and a connected mechanism is identified
 */
export function computePaScore(answers: PaAnswers): PaScore | null {
  if (answers.rationaleDepth === null || answers.rationaleDetail === null) return null;
  if (answers.rationaleDepth === false || answers.rationaleDetail === false) return 1;

  if (answers.engagementDepth === null || answers.engagementDetail === null) return null;
  if (answers.engagementDepth === false || answers.engagementDetail === false) return 2;

  if (answers.mechanismPresent === null) return null;
  if (answers.mechanismPresent === false) return 3;

  if (answers.mechanismConnected === null) return null;
  return answers.mechanismConnected ? 4 : 3;
}

export function shouldShowQ2(answers: PaAnswers): boolean {
  return answers.rationaleDepth === true && answers.rationaleDetail === true;
}

export function shouldShowQ3(answers: PaAnswers): boolean {
  return answers.engagementDepth === true && answers.engagementDetail === true;
}

export function shouldShowMechanismConnected(answers: PaAnswers): boolean {
  return answers.mechanismPresent === true;
}

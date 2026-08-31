export interface GcaAnswers {
  presence: boolean | null;
  isOfficialIndicator: boolean | null; // only asked if presence === true
  selectedIndicatorCodes: string[]; // filled if isOfficialIndicator === true
  customCompetencyText: string; // filled if isOfficialIndicator === false
  adherence: boolean | null; // only asked once the Q1 follow-up is resolved
  scope: boolean | null; // only asked if adherence === true
}

export function emptyGcaAnswers(): GcaAnswers {
  return {
    presence: null,
    isOfficialIndicator: null,
    selectedIndicatorCodes: [],
    customCompetencyText: "",
    adherence: null,
    scope: null,
  };
}

export type GcaScore = 1 | 2 | 3 | 4;

/**
 * Returns the score if the walkthrough has reached a determinable outcome, else null.
 * Mirrors the score-point ladder exactly:
 *  1 = presence fails
 *  2 = presence passes, adherence fails
 *  3 = presence + adherence pass, scope fails
 *  4 = presence + adherence + scope all pass
 */
export function computeGcaScore(answers: GcaAnswers): GcaScore | null {
  if (answers.presence === null) return null;
  if (answers.presence === false) return 1;

  if (answers.adherence === null) return null;
  if (answers.adherence === false) return 2;

  if (answers.scope === null) return null;
  return answers.scope ? 4 : 3;
}

/** Whether the Q1 follow-up (indicator selection or custom text) has been resolved. */
export function isQ1FollowUpResolved(answers: GcaAnswers): boolean {
  if (answers.isOfficialIndicator === null) return false;
  if (answers.isOfficialIndicator === true) return answers.selectedIndicatorCodes.length > 0;
  return answers.customCompetencyText.trim().length > 0;
}

/** Whether Question 2 (Conceptual Adherence) should be shown yet. */
export function shouldShowQ2(answers: GcaAnswers): boolean {
  return answers.presence === true && isQ1FollowUpResolved(answers);
}

/** Whether Question 3 (Scope) should be shown yet. */
export function shouldShowQ3(answers: GcaAnswers): boolean {
  return answers.adherence === true;
}

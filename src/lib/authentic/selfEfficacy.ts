export interface EfficacySource {
  key: string;
  label: string;
  definition: string;
  supportiveActions: string;
  qualityMarker: string;
}

export const SED_DESCRIPTION =
  "Self-efficacy is the ability and motivation to learn, adapt, take action, and put forth one's best effort, particularly in challenging situations.";

export const EFFICACY_SOURCES: EfficacySource[] = [
  {
    key: "mastery",
    label: "Mastery experiences",
    definition:
      "Students complete an academic task, interpret and evaluate the results, and create or revise judgments of their own competence. Positive and negative outcomes from previous experiences influence feelings of self-efficacy.",
    supportiveActions:
      "Teacher asks students to set goals (behavioral, academic, personal, etc.), generate solutions to personal or social problems, or reflect on or self-assess their learning experiences.",
    qualityMarker:
      "The level of challenge or support is calibrated to students' current readiness, as described in the lesson plan or reflection document.",
  },
  {
    key: "vicarious",
    label: "Vicarious experience",
    definition:
      "Students observe peers' or near-peers' performance or coping strategies to develop models for their own performance or to calibrate their own performance.",
    supportiveActions:
      "Teacher shows students examples from another student or class, asks a student to demonstrate how to solve a problem in front of the class, or uses think-aloud modeling using a real student's assignment to show how to edit work.",
    qualityMarker: "The model is a relatable peer or near-peer, not a distant or idealized example.",
  },
  {
    key: "verbal",
    label: "Verbal persuasion",
    definition:
      "Peers, teachers, or other adults (e.g., parents) provide supportive feedback to students about their academic performance, which in turn bolsters students' effort and confidence.",
    supportiveActions:
      "Teacher provides opportunities for students to give and/or receive feedback, or teacher provides constructive feedback on student work.",
    qualityMarker: "Feedback is specific and tied to the observed effort or strategy, not generic.",
  },
  {
    key: "emotional",
    label: "Emotional arousal",
    definition:
      "Students interpret their emotions about a task as indicators of personal competence. Interpretations of one's emotions can affect the development of self-efficacy (e.g., \"that was stressful, so I must not have been very good at it\").",
    supportiveActions:
      "Teacher names that a task may feel difficult or uncomfortable and frames that as an expected reaction for the students, praises students for tolerating discomfort, intentionally reduces stress for new tasks (e.g., extra time), or provides reflection prompts that attempt to normalize difficult feelings (e.g., \"was this hard, and if so, what helped you push through?\").",
    qualityMarker:
      "The lesson invites reframing of how the task might feel and what that means for students' self-appraisals, not just asking students to name an emotion.",
  },
];

export const SED_SEQUENCE_GUIDANCE =
  "Score point 4 sequences: the lesson incorporates two or more connected opportunities to develop self-efficacy. This can be the same source, revisited later in the lesson (e.g., goal-setting early, followed by reflection later), or one source enabling another source (e.g., peer modeling followed by students attempting the task themselves).";

export const SED_OTHER_GUIDANCE = [
  "Assess the presence and quality of each source throughout the entire lesson, not just in one central task.",
  "The teacher must describe the level of scaffolding/calibration and feedback quality in the lesson plan or reflection document. Do not infer from context.",
  "A teacher may describe providing extra support and scaffolding for students in an earlier developmental stage or in an early stage relative to the task. This should still be considered an intentional design choice that supports the development of self-efficacy.",
  "This dimension scores lesson design, not verified student outcomes. A high score credits the teacher's design and is unrelated to whether students' self-efficacy changed.",
];

export interface SedDistinguishing {
  boundary: string;
  text: string;
}

export const SED_DISTINGUISHING: SedDistinguishing[] = [
  {
    boundary: "Distinguishing between 1 and 2",
    text: "At score point 1, none of the lesson's activities and assignments include any of the four named actions. At score point 2, at least one specific action is present, however minimally executed.",
  },
  {
    boundary: "Distinguishing between 2 and 3",
    text: "At score point 2, a source is present, but is not considered high-quality. At score point 3, the source is present and is high-quality.",
  },
  {
    boundary: "Distinguishing between 3 and 4",
    text: "At score point 3, one source is present and is high quality. At score point 4, a second source is also present and high-quality, and the later one is enabled by or builds on an earlier one.",
  },
];

export interface EfficacyRating {
  observed: boolean;
  highQuality: boolean;
  notes: string;
}

export type EfficacyRatings = Record<string, EfficacyRating>;

export function emptyEfficacyRatings(): EfficacyRatings {
  const ratings: EfficacyRatings = {};
  for (const s of EFFICACY_SOURCES) {
    ratings[s.key] = { observed: false, highQuality: false, notes: "" };
  }
  return ratings;
}

export interface SedScoreResult {
  score: 1 | 2 | 3 | 4;
  reason: string;
}

/**
 * Scores Student Efficacy Development.
 * connected is null until the rater has answered the connection question (only asked
 * when at least one source is marked high-quality).
 */
export function scoreSed(ratings: EfficacyRatings, connected: boolean | null): SedScoreResult {
  const anyObserved = EFFICACY_SOURCES.some((s) => ratings[s.key].observed);
  const anyHighQuality = EFFICACY_SOURCES.some((s) => ratings[s.key].highQuality);

  if (!anyObserved) {
    return { score: 1, reason: "None of the lesson's activities and assignments include any of the four named actions." };
  }
  if (!anyHighQuality) {
    return { score: 2, reason: "At least one specific action is present, however minimally executed, but no source is considered high-quality." };
  }
  if (connected === true) {
    return {
      score: 4,
      reason: "A second source is also present and high-quality, and the later one is enabled by or builds on an earlier one.",
    };
  }
  return {
    score: 3,
    reason: "One source is present and is high-quality, but no connection between sources or instances was identified.",
  };
}

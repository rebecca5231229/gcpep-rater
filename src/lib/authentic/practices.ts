export const AUTHENTIC_DIMENSION_DESCRIPTION =
  "The lesson uses high quality, rigorous activities and assignments that are grounded in real-world relevance, give students an active role in constructing their own understanding, application, or action related to a global competency, and build students' efficacy in their capacity to do so.";

export const AUTHENTIC_DIMENSION_CONSTRUCTS = [
  "Presence of one or more authentic global competency teaching practices across lesson activities and assignments",
  "Quality of the practice(s) used",
  "Quality of required critical thinking",
  "Quality of self-efficacy design",
];

export const AUTHENTIC_RATING_GUIDANCE = [
  "Score each of the four authentic learning practices independently, using each practice's own 1-3 rubric. Record the result for every practice attempted.",
  "If none of the four practices reaches a 3 (high quality), stop here. The dimension score is a 1 and you do not need to score Planned Rigor or Student Efficacy Development.",
  "If one or more practices reach a 3 (high quality), score Planned Rigor for the central task(s) of the activities. If more than one practice reaches score point 3, identify and score each practice separately using the Planned Rigor rubric.",
  "Score Student Efficacy Development using its rubric, considering the lesson as a whole.",
  "Combine the 3 results to score the Authentic Global Competency Teaching Practices rubric.",
];

export const AUTHENTIC_ORDER_REMINDER =
  "Reminder: Order matters. Raters must score the authentic learning practices first before selecting activities to rate using the Planned Rigor rubric.";

export interface AuthenticPractice {
  key: string;
  label: string;
  definition: string;
  notPresentDescription: string;
  presentMarker: string;
  qualityMarker: string;
}

export const AUTHENTIC_PRACTICES: AuthenticPractice[] = [
  {
    key: "globalToLocal",
    label: "Global-to-local connections",
    definition: "The lesson provides students opportunities to observe what's happening with a global issue or concept in their city firsthand.",
    notPresentDescription: "The lesson does not provide opportunities for students to engage in a firsthand investigation of a global issue or concept in their local community.",
    presentMarker: "Students engage in a firsthand investigation of a global issue or concept in their local community.",
    qualityMarker: "Students are given an opportunity to connect their local observations to broader global issues or concepts.",
  },
  {
    key: "peerExchange",
    label: "Peer exchange",
    definition: "The lesson provides students opportunities to engage in substantive exchange with peers from different places.",
    notPresentDescription: "The lesson does not provide opportunities for students to engage in peer exchange.",
    presentMarker: "Students are given an opportunity to communicate about global issues or concepts with peers in different places.",
    qualityMarker: "There is evidence the exchange is ongoing and that both sides are both providing information and asking questions of one another.",
  },
  {
    key: "localAction",
    label: "Opportunities to act locally",
    definition: "The lesson provides students opportunities to apply their learning around a global issue or concept in their own communities.",
    notPresentDescription: "The lesson does not provide opportunities for students to act locally.",
    presentMarker: "Students are given an opportunity to plan or propose local action connected to a global issue or concept.",
    qualityMarker: "There is evidence the action is grounded in the issue's complexity and local feasibility.",
  },
  {
    key: "collaboration",
    label: "Collaboration across difference",
    definition: "The lesson provides students opportunities to collaborate with people from other cultures, places, or lived experiences.",
    notPresentDescription: "The lesson does not provide opportunities for students to collaborate across differences.",
    presentMarker: "Students are given an opportunity to communicate, problem solve, or work with others from different cultures, places, or lived experiences.",
    qualityMarker: "There is evidence the collaboration requires soliciting, reconciling, and integrating different perspectives while completing the task.",
  },
];

// Not part of the pasted rubric table itself -- a clarification worth keeping visible,
// since it addresses a real ambiguity: the difference has to be among the students
// collaborating, not just in the content being studied.
export const COLLABORATION_COMPOSITION_NOTE =
  "The difference must be among the students collaborating, not just in the content being studied -- a group researching diverse cultures is not the same as a group made up of students from diverse cultures.";

export type PracticeLevel = 1 | 2 | 3;

export interface PracticeRating {
  level: PracticeLevel | null;
  notes: string;
}

export type PracticeRatings = Record<string, PracticeRating>;

export function emptyPracticeRatings(): PracticeRatings {
  const ratings: PracticeRatings = {};
  for (const p of AUTHENTIC_PRACTICES) {
    ratings[p.key] = { level: null, notes: "" };
  }
  return ratings;
}

export function getTopPractices(ratings: PracticeRatings): { practices: AuthenticPractice[]; level: PracticeLevel } | null {
  let maxLevel: PracticeLevel | null = null;
  for (const p of AUTHENTIC_PRACTICES) {
    const level = ratings[p.key].level;
    if (level !== null && (maxLevel === null || level > maxLevel)) {
      maxLevel = level;
    }
  }
  if (maxLevel === null) return null;
  const practices = AUTHENTIC_PRACTICES.filter((p) => ratings[p.key].level === maxLevel);
  return { practices, level: maxLevel };
}

export function getQualifyingPractices(ratings: PracticeRatings): AuthenticPractice[] {
  return AUTHENTIC_PRACTICES.filter((p) => ratings[p.key].level === 3);
}

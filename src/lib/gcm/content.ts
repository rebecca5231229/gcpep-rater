export const GCM_COLORS = { primary: "#4a86e8", secondary: "#dee8fa" };

export const GCM_DESCRIPTION =
  "The assessment(s) is designed to provide evidence of students' learning of the prioritized Global SLO indicator(s).";

export const GCM_CONSTRUCTS = [
  "Amount of alignment between assessment/performance criteria and the prioritized Global SLO indicator(s).",
  "Level of detail and relation to the prioritized Global SLO indicator(s).",
];

export const GCM_PORTFOLIO_REVIEW_INTRO =
  "When applying the Global Competency Measurement rubric, review portfolio components in this order.";

export const GCM_PORTFOLIO_REVIEW_ORDER = [
  {
    heading: "Reflection",
    detail: "Part III: Assessment Approach -- review all of Part III.",
    subItems: [],
  },
  { heading: "Assessment Tool & Rubric", detail: "Review the complete Assessment Tool & Rubric.", subItems: [] },
  { heading: "Student Work", detail: "Review all student work.", subItems: [] },
  { heading: "Lesson Plan", detail: "Review the complete Lesson Plan.", subItems: [] },
];

export const GCM_INDICATOR_STEP_GUIDANCE = {
  title: "Prioritized Global SLO Indicator(s)",
  body: "These are the indicator(s) the teacher identifies at the beginning of the reflection document that they are prioritizing. If the teacher aligns the assessment tool with any of the indicator(s), it should be given credit on this dimension.",
};

export const GCM_Q2_GUIDANCE = {
  bullets: [
    "Review the Codebook's coding instructions for the prioritized Global SLO indicator(s). Look for references to the prioritized indicator(s) in the assessment and assessment rubric.",
    "An assessment may align to the full prioritized Global SLO indicator or just one aspect of the indicator, but this must be consistent with how the indicator was aligned throughout the lesson.",
  ],
  subBullets: [
    "Partial alignment suggests the assessment criteria are only indirectly related to the prioritized Global SLO indicator. The assessment may use some language related to the prioritized indicator, but it does not offer a valid method for assessing the specific concepts within the indicator.",
    "Global competency assessment can be integrated into the assessment for the overall assignment as long as there are separate criteria to assess global competencies.",
  ],
};

export const GCM_Q3_GUIDANCE = {
  bullets: [
    "Fully aligned means that at least one component of the assessment is designed to assess development of the prioritized Global SLO indicator(s).",
  ],
  subBullets: [
    "The focus of the assessment(s) must align with at least one aspect of the coding instructions.",
    "The assessment rating criteria must align with at least one aspect of the coding instructions.",
  ],
};

export const GCM_Q5_GUIDANCE = {
  title: "Sufficient versus insufficient detail",
  body: "Ask yourself, if two teachers independently scored the same piece of student work using this assessment, would they likely agree on the level? If so, the detail is considered sufficient. If not, the detail is considered insufficient.",
};

export const GCM_SCORE_JUSTIFICATIONS: Record<1 | 2 | 3 | 4, string> = {
  1: "The assessment and/or criteria for rating student work are not aligned to the prioritized Global SLO indicator(s).",
  2: "The assessment and/or criteria for rating student work are only partially aligned to the prioritized Global SLO indicator(s), or the performance levels are not identified.",
  3: "The assessment and/or criteria for rating student work are fully aligned to the prioritized Global SLO indicator(s) and performance levels are identified but do not include sufficient detail.",
  4: "The assessment and/or criteria for rating student work are fully aligned to the prioritized Global SLO indicator(s) and the performance levels have sufficient detail.",
};

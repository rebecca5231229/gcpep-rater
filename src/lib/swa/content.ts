export const SWA_COLORS = { primary: "#a64d79", secondary: "#ead1dc" };

export const SWA_DESCRIPTION =
  "The reflection demonstrates the teacher's ability to analyze student work for evidence of student learning related to the assessed global competency(ies).";

export const SWA_CONSTRUCTS = [
  "Focus on assessed global competency (vs. generic student performance).",
  "Depth and detail of reasoning across the reflection.",
];

export const SWA_PORTFOLIO_REVIEW_INTRO =
  "When applying the Analysis of Student Work rubric, review portfolio components in this order.";

export const SWA_PORTFOLIO_REVIEW_ORDER = [
  {
    heading: "Reflection document",
    subItems: [
      'Part II: Teaching Approach -- become familiar with the lesson objectives and planned activities by reviewing the first question.',
      "Part IV -- Global Learning Reflections: examine the descriptions (analyses) of individual student work, and the description of class performance (strengths and growth areas related to the prioritized indicator(s), with evidence or examples).",
    ],
  },
  { heading: "Student work", subItems: [] },
];

export const SWA_Q1_GUIDANCE = {
  bullets: [
    'Assessed global competency: This is the competency or set of competencies the teacher indicated (via the reflection tool or elsewhere in the portfolio) they would be assessing among students. Identify the competency the way Global Competency Alignment identifies the "identified global competency" -- i.e., by looking at what the teacher is substantively teaching and analyzing.',
    "This will not necessarily be the same as what is reflected in the portfolio's assessment tools; it is possible the assessment tool is poorly designed or unaligned with the global competency objective but that the teacher is able to provide a strong analysis nonetheless.",
  ],
  questionsToSupport:
    "Questions to support rating: Is the subject of the discussion the specific, assessed global competency, or is it about generic student performance, classroom behavior, or other content? Would the teacher's statement need to change if the global competency were a different, unrelated one? If not, it isn't related to the global competency, regardless of how well-written it is.",
};

export const SWA_Q2_GUIDANCE = {
  reasonablySupportedTitle: "Reasonably supported",
  reasonablySupportedBullets: [
    "Would a reasonable person, looking only at the work sample itself, draw the same conclusion the teacher drew? Or, does the claim require assuming context or intention the sample doesn't actually show?",
    "This check applies to individual student work samples only. It does not apply to whole-class claims. Raters have no way to verify a whole-class claim against evidence they can't see, since only the submitted samples (not the full class) are visible.",
  ],
  descriptionsVsClaimsTitle: "Descriptions vs. claims",
  descriptionsVsClaims: [
    "A description restates what's in the student work.",
    "A claim makes an assertion about what that work demonstrates regarding students' learning of the global competency. It can take several forms: comparing observed performance to what was expected, comparing across samples or students, tracing a change over time, or identifying a specific gap.",
  ],
  wholeClassNote:
    "Whole-class discussion has two components: strengths and growth areas. Both must independently meet each score point's requirements. A strong discussion of strengths paired with a purely descriptive discussion of growth areas (or vice versa) does not meet the higher score points.",
};

export const SWA_Q3_GUIDANCE =
  "Detail means specific evidence (e.g., a direct quote, a named example, a cited detail from the work) used to support a claim, not just the claim on its own.";

export const SWA_SCORE_JUSTIFICATIONS: Record<1 | 2 | 3 | 4, string> = {
  1: "The reflection does not include 2 or more individual work samples, or it includes 2 or more work samples but the discussion of individual work or the whole class's performance is unrelated to the assessed global competency.",
  2: "The reflection includes 2 or more individual work samples, and the discussion is related to the assessed global competency, but the descriptions of individual student work and/or whole class performance describe rather than make claims about student learning related to the assessed global competency, or the claims about individual student work are not supported by what is actually shown in the student work samples.",
  3: "The reflection includes claims about student work and whole class performance, but there are not specific examples to support the claims.",
  4: "The reflection includes claims about student work and whole class performance, and there are specific examples to support the claims.",
};

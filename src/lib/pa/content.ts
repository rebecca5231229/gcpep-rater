export const PA_COLORS = { primary: "#ffd966", secondary: "#fff2cc" };

export const PA_DESCRIPTION =
  "The reflection presents a detailed analysis of global competency teaching throughout the instructional cycle, including decisions about which competencies to prioritize, students' engagement with global learning, and how this process might inform the teacher's future practice.";

export const PA_CONSTRUCTS = [
  "Depth and detail of reasoning across all areas of reflection.",
  "Coherence: whether the reflection about improvements or changes connects to and builds on previous reflections.",
];

export const PA_PORTFOLIO_REVIEW_INTRO =
  "When applying the Pedagogical Analysis rubric, review only the Reflection document. The rater should first consult these specific sections for evidence, but evidence can be found anywhere in the reflection document.";

export const PA_PORTFOLIO_REVIEW_ORDER = [
  { heading: "Part I", detail: '"Why did you choose the outcome(s) and indicator(s)?", "How do you think the outcome(s) and indicator(s) align with your local curriculum...?"' },
  { heading: "Part II", detail: '"Share 3-5 observations...how did students respond?"' },
  { heading: "Part IV", detail: '"Discuss how you might respond..."' },
  { heading: "Part V conclusion", detail: '"What would you do differently...?"' },
];

export const PA_Q1_GUIDANCE = {
  title: "Depth vs. Detail",
  body: "These are independent requirements. Depth asks whether a reason for integration is given at all. Detail asks whether that reason is anchored in specific examples.",
};

export const PA_Q2_GUIDANCE = {
  title: "Types of student engagement with the lesson",
  bullets: [
    "Descriptions of student engagement should indicate how and when students expressed confusion, enthusiasm, etc. during lesson activities.",
    "Engagement can include cognitive, emotional, or behavioral reactions (e.g., confusion, understanding, enthusiasm).",
    "Descriptions must be related to student engagement with the global competency rather than generic observations.",
  ],
  generalVsSpecificTitle: "General versus Specific Examples",
  general: {
    label: "General evidence",
    body: 'presents broader themes from what the teacher observed as students engaged with the lesson. The teacher\'s claims do not have supporting examples of how students engaged as they learned the global competency (e.g., "During the lesson, students were confused, but I was able to support them.").',
  },
  specific: {
    label: "Specific evidence",
    body: 'is specific examples of how these themes presented themselves as students engaged with the lesson. The teacher provides some examples with detail about how students engaged as they learned the global competency (e.g., "During the lesson, several students were confused about why they needed to find multiple sources and could not just rely on one source to learn about the global issue. I was able to support them by showing them how different sources might offer different perspectives or can help corroborate or refute claims, and they were able to complete the activity.").',
  },
};

export const PA_SCORE_JUSTIFICATIONS: Record<1 | 2 | 3 | 4, string> = {
  1: "The reflection does not describe why the specific global competency is important for their students and/or it does not name the specific elements of the teacher's curriculum or specific student needs that make the global competency a good fit for their class.",
  2: "The reflection includes a strong rationale, but it does not describe student engagement with the specific global competency and/or it does not include specific examples to support claims about student engagement.",
  3: "The reflection includes a strong rationale and description of student engagement with the global competency, but it does not identify a mechanism for improving the lesson that is connected to earlier parts of the reflection.",
  4: "The reflection includes a strong rationale and description of student engagement with the global competency, and it identifies a mechanism for improving the lesson that is connected to earlier parts of the reflection.",
};

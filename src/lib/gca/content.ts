export const GCA_COLORS = { primary: "#e06666", secondary: "#f4cccc" };

export const GCA_DESCRIPTION =
  "The lesson objective and lesson plan reflect consistent integration of a global competency into the teacher's lesson.";

export const GCA_CONSTRUCTS = [
  "Presence: Whether one or more identifiable global competency objectives can be found in the lesson.",
  "Conceptual adherence: Whether the substance of the lesson is consistent with the global competency objectives.",
  "Scope: The degree to which the teaching of the global competency is blended throughout the lesson.",
];

export const GCA_PORTFOLIO_REVIEW_ORDER = [
  {
    heading: "Reflection",
    detail:
      "Become familiar with the lesson objectives and planned activities by reviewing only the following two parts of the Reflection. (The lesson objective may also be written in the lesson plan.)",
    subItems: [
      "Part I: Global Learning Priorities -- review all of Part I.",
      'Part II: Teaching Approach -- review the first question ("Enter the instructional objective you taught") and the first part of the second question ("How did you teach the instructional objective?").',
    ],
  },
  {
    heading: "Lesson Plan",
    detail: "Review the complete Lesson Plan.",
    subItems: [],
  },
  {
    heading: "Handouts",
    detail: "Review all handouts that do NOT include student work.",
    subItems: [],
  },
];

export const GCA_PORTFOLIO_REVIEW_INTRO =
  "Global Competency Alignment reviews planning materials only, not what was assessed, what actually happened, or how the teacher reflected on it afterward. When applying the rubric, review portfolio components in this order.";

export const GCA_Q1_GUIDANCE = {
  title: "Presence of one or more identifiable global competency objectives",
  body: "Teacher should identify a learning objective related to a global competency. It can be included as a formal learning objective or described in the lesson plan or in Part I or Part II of the reflection document.",
  bullets: [
    "If a teacher names multiple global competencies in their objectives, score against whichever ones are substantively taught. An additional competency that is not taught does not negatively affect the rating.",
    "The global competency objective does not need to be the primary goal of the lesson. It can be used to teach another objective related to the course subject (e.g., an ELA standard).",
  ],
};

export const GCA_Q2_GUIDANCE = {
  title: "Substance of the lesson",
  body: "The content of the lesson should be related to the global competency objective(s) stated in the reflection document or lesson plan. A lesson that teaches closely-related content still adheres to the substance of the objective.",
  examples: [
    "The lesson objective is for students to understand aspects of their culture, but the lesson itself only teaches students to describe aspects of their culture. This would be considered closely-related content.",
    "The lesson objective is for students to understand the complexity of global issues, but the lesson focuses on having students develop a basic understanding of a global issue. This would be considered closely-related content.",
  ],
  afterExamples:
    "A lesson that veers entirely from the stated global learning objective(s) is not considered closely related to the substance of the objective(s).",
  bullets: [
    {
      label: "Unrelated",
      text: "means the substance of the lesson has nothing or little to do with the identified competency (e.g., a lesson claiming to teach the complexity of global issues instead focuses on local geographic vocabulary).",
    },
    {
      label: "Related but insufficient",
      text: "means that the lesson never explicitly connects instruction to the specific global learning objective. Example: the global competency objective is to positively affect students' attitudes about their own culture, but the lesson itself focuses only on studying local artists, and there is no clear mechanism to connect facts about local artists to student attitudes about their cultures. This would be particularly true in a class of young learners who require more explicitness. When judging sufficiency, raters should be able to point to the specific task or activity that builds the competency.",
    },
    {
      label: "Developmental competency area mismatch",
      text: "One flag to look for is whether the lesson focuses on a global competency in a different developmental competency area than the one identified as a learning objective -- e.g., focusing on building knowledge when the identified global competency is behavioral.",
    },
  ],
};

export const GCA_Q3_GUIDANCE = {
  title: "Integrated throughout",
  body: "Irrespective of whether the lesson is implemented in a single session or across multiple sessions, raters should look for whether the identified global competency is taught, practiced, or assessed (not just mentioned) at various points throughout the lesson. The global competency does not need to be the single focus of the lesson steps. It can be taught alongside or in service of other academic competencies.",
};

export const GCA_SCORE_JUSTIFICATIONS: Record<1 | 2 | 3 | 4, string> = {
  1: "The lesson does not teach a global competency.",
  2: "The lesson aims to teach a global competency, but the substance of the lesson is unrelated to or insufficient to teach it.",
  3: "The lesson is well-designed to teach a global competency, but its teaching is not integrated throughout the lesson.",
  4: "The lesson is well-designed to teach a global competency, and its teaching is integrated throughout the entire lesson.",
};

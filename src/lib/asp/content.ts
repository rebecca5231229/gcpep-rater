export const ASP_COLORS = { primary: "#595959", secondary: "#d9d9d9" };

export const ASP_DESCRIPTION =
  "The teacher uses activities and assignments that explicitly account for students' existing ideas and perspectives, cultural, linguistic, or academic backgrounds, or their lived experiences to engage students and create connections to deeper, more rigorous development of the learning objective(s).";

export const ASP_CONSTRUCTS = [
  "Degree of connection between the lesson and students' perspectives (i.e., no connection versus surface connection versus deep connection).",
  "Connection is used to help students demonstrate learning related to the learning objective(s).",
];

export const ASP_PORTFOLIO_REVIEW_INTRO =
  "When applying the Attention to Students' Perspectives rubric, review portfolio components in this order.";

export const ASP_PORTFOLIO_REVIEW_ORDER = [
  {
    heading: "Reflection",
    detail: "Become familiar with the lesson objectives and planned activities by reviewing only the following two parts of the Reflection.",
    subItems: [
      "Part I: Global Learning Priorities -- review all of Part I.",
      'Part II: Teaching Approach -- review the first question ("Enter the instructional objective you taught") and the first part of the second question ("How did you teach the instructional objective?").',
    ],
  },
  { heading: "Lesson Plan", detail: "Review the complete Lesson Plan.", subItems: [] },
  { heading: "Handouts", detail: "Review all handouts that do NOT include student work.", subItems: [] },
];

export const ASP_CONNECTION_TYPES = [
  { label: "Ideas and perspectives", text: "Students' viewpoints or opinions, as shaped by their prior knowledge, beliefs, values, and logical reasoning." },
  { label: "Culture", text: "Shared beliefs, customs, traditions, language, arts, and values of a group of people, including communication styles, family structures, social norms, history, religion, and power dynamics." },
  { label: "Linguistic background", text: "Students' experience with written and spoken language, including how they use language at home or in their communities." },
  { label: "Academic background", text: "Students' knowledge and skills, beyond what they are expected to know or be able to do as students in a specific class or course. This can include attention to students' learning styles and learning differences, as well as the academic assets they bring to the classroom as individuals or as a group." },
  {
    label: "Lived experiences",
    text: "What students bring to the classroom from their families and communities, based on family structure, socioeconomic status, immigration history, as well as personal challenges and interests.",
    note: "A reference to a shared location (school, home, town, community) is not itself evidence, but the location's actual character or characteristics can be, since lived experiences explicitly includes what students bring from their families and communities. Does the lesson draw on something specific to the community (e.g., conditions, history, culture) to engage students? Or does the community just serve as the site where students happen to act or observe, without anything about its own character being observed?",
  },
];

export const ASP_Q1_GUIDANCE = {
  title: "Types of connections",
  intro:
    "Look for evidence that the teacher intentionally connected aspects of the lesson to students' interests, backgrounds, experiences, etc. and that those connections shaped or informed the lesson's learning objective(s). A reflection prompt at the end of a lesson that doesn't inform any lesson decisions doesn't count. Student choice (e.g., letting teams pick which topic to research) is not, by itself, evidence of this construct. It only counts if the reflection shows the choice was shaped by or connected to something specific about the students (e.g., background, culture, prior experience), not simply that students were given options.",
};

export const ASP_Q2_GUIDANCE = {
  title: "Instructional necessity",
  body: "Whether the connections are essential to achieving the lesson's learning objective(s). Do students need to draw on their own backgrounds, experiences, or interests to engage with and accomplish the learning goals? Are their perspectives treated as classroom resources that inform reasoning, problem solving, or interpretation of the lesson (not just an icebreaker)?",
};

export const ASP_Q3_GUIDANCE = {
  title: "Surface and deep connections",
  surface: {
    label: "Surface connections",
    parenthetical: "(perspectives, traditions, language, dress, communication)",
    body: "are easily observable and often shared across cultures in some form, but specifics vary. Teachers may reference them to make learning relatable, without exploring or building upon the reasoning, beliefs, or implications behind them.",
    example: "Teacher asks students to share family traditions, or briefly notes students' views on a global topic.",
  },
  deep: {
    label: "Deep connections",
    parenthetical: "(personal values, social roles, education systems, views on authority)",
    body: "are rooted in historical, cultural, and societal foundations and can vary greatly, even when outward appearances seem similar.",
    personalValuesNote:
      "Personal values: Ethical and moral commitments that guide individuals' actions and interpersonal relationships. Include empathy, integrity, self-reliance, generosity, and trustworthiness.",
    example:
      "Teacher guides students to explore how cultural norms shape classroom dynamics (e.g., how to collaborate, how to participate in classroom discussions, leadership and power dynamics). Or, teacher asks students to explain why they hold their opinions, and teacher uses their reasoning to compare perspectives or frame a problem.",
  },
};

export const ASP_SCORE_JUSTIFICATIONS: Record<1 | 2 | 3 | 4, string> = {
  1: "The lesson does not make connections to one or more aspects of students' lives or perspectives.",
  2: "The lesson makes connections, but they are not instructionally necessary (i.e., they aren't necessary to help students demonstrate the lesson objective).",
  3: "The lesson makes surface connections that are instructionally necessary.",
  4: "The lesson makes deep connections that are instructionally necessary.",
};

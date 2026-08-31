export interface PrTier {
  score: 1 | 2 | 3 | 4;
  label: string;
  shortDescription: string;
  elaboratedDescription: string;
  verbs: string[];
}

export const PR_DESCRIPTION =
  "The lesson's central task requires students to think critically about the issues, concepts, or content it addresses.";

export const PR_TIERS: PrTier[] = [
  {
    score: 1,
    label: "Awareness / Recall / Understanding / Application",
    shortDescription:
      "The central task requires students to become aware of, recall, recognize, or apply a known procedure to the issues, concepts, or content.",
    elaboratedDescription:
      "Activities and assignments require students to retrieve relevant knowledge from memory, determine the meaning of instructional messages, and/or carry out or use a procedure in a given situation.",
    verbs: [
      "Adapt", "Apply", "Categorize", "Cite", "Classify", "Compare", "Conclude", "Contrast", "Count",
      "Create (from a template)", "Design (from a template)", "Define", "Demonstrate", "Describe (in a basic, recall sense)",
      "Dramatize", "Draw (simple illustration)", "Enumerate", "Explain", "Find (facts, objects, etc.)", "Generalize",
      "Give examples", "Identify (facts, objects, people, etc.)", "Illustrate", "Index", "Indicate", "Interpret",
      "Label", "List", "Locate", "Match", "Memorize", "Name", "Operate", "Outline (basic structure)",
      "Paraphrase", "Point", "Practice", "Predict", "Quote", "Read", "Recall", "Recognize", "Record",
      "Repeat", "Represent", "Reproduce", "Show", "Sort", "State", "Summarize", "Tabulate", "Tell (simple facts)",
      "Trace", "Underline", "Use", "Write (simple transcription)",
    ],
  },
  {
    score: 2,
    label: "Analyze",
    shortDescription: "The central task requires students to analyze issues, concepts, or content.",
    elaboratedDescription:
      "Activities and assignments require students to analyze issues, concepts, or content -- e.g., breaking it into parts, differentiating between components, or organizing information to reveal patterns or relationships.",
    verbs: ["Analyze", "Differentiate", "Discriminate", "Distinguish", "Inspect", "Integrate", "Order", "Organize", "Select", "Separate", "Subdivide"],
  },
  {
    score: 3,
    label: "Evaluate",
    shortDescription: "The central task requires students to evaluate the issues, concepts, or content.",
    elaboratedDescription:
      "Activities and assignments require students to evaluate the issues, concepts, or content -- e.g., making and defending a judgment against criteria, critiquing a claim or approach, or checking a claim's validity.",
    verbs: ["Appraise", "Assess", "Criticize", "Critique", "Defend", "Detect", "Evaluate", "Judge", "Justify", "Rate", "Test", "Validate", "Verify"],
  },
  {
    score: 4,
    label: "Create",
    shortDescription: "The central task requires students to create something new in relation to the issues, concepts, or content.",
    elaboratedDescription:
      "Activities and assignments require students to create something new in relation to the issues, concepts, or content -- e.g., generating an original idea, designing a plan, or constructing an artifact that goes beyond reassembling given information.",
    verbs: ["Assemble", "Brainstorm", "Combine", "Compose", "Construct", "Create (a new product or artifact without a template)", "Design (a new product or artifact without a template)", "Develop", "Devise", "Formulate", "Generate", "Innovate", "Invent", "Plan", "Produce", "Propose"],
  },
];

export const PR_CONTEXT_DEPENDENT_LEAD = "For context-dependent verbs, judge the task itself and then assign a rating.";

export const PR_CONTEXT_DEPENDENT_VERBS = [
  { tier: "Likely score point 1 unless the task clearly requires more", verbs: "Choose, Discuss, Prepare, Solve, Estimate, Modify, Arrange, Compile, Rearrange" },
  { tier: "Likely score point 2", verbs: "Examine, Find (evidence, themes), Identify (patterns, trends), Investigate, Relate, Experiment" },
  { tier: "Likely score point 3, occasionally 4 if the task requires proposing something new rather than judging existing options", verbs: "Argue, Debate, Decide, Prioritize, Rank, Recommend, Support, Weigh" },
  { tier: "Likely score point 4 if task requires divergent thinking", verbs: "Suggest, Revise" },
  { tier: "No clear default", verbs: "Question" },
];

export const PR_CENTRAL_TASK_GUIDANCE = `The activity or assignment the lesson is organized around. The central task may be a short sequence of directly connected steps (e.g., an interview followed by writing it up), not just a single isolated step. Use the following signals to determine the central task:

1. Explicit culminating framing in the lesson plan or reflection document (e.g., "to conclude," language naming something as the final piece);
2. What the Assessment Approach section in the lesson plan or reflection document identifies as evidence of student learning;
3. What later parts of the lesson build on or depend on;
4. Time allocation (used as a last resort).

When there appears to be more than one central task: identify the small subset of genuine candidates and score each independently. Take the highest score from this small subset.`;

export const PR_RATING_GUIDANCE = [
  "Identify the central task(s) first, before judging critical thinking.",
  "Score each candidate.",
  'Judge the cognitive demand of the task itself, not its format or the verb used to describe it in the lesson plan. The same activity (e.g., "make a poster") can sit at different tiers depending on what students are actually required to do.',
  "If the portfolio does not provide enough detail to determine what a task actually requires students to do, do not infer intent. Rate based only on available information.",
  'A task is not automatically assigned score point 4 (i.e., Create) because it asks students to make, create, design, or produce something. Ask whether the task calls for convergent thinking (working toward one correct or expected outcome via following a known procedure) or divergent thinking (generating multiple valid outcomes, requiring judgment across alternatives). Question to ask: if two students or groups completed this task independently with the same starting material, would their outputs converge on essentially the same result, or diverge into different, still-valid outputs? Convergent tasks are lower-tier tasks, regardless of the verb used to describe them. Divergent tasks are genuine "Create"-level thinking.',
];

export interface PrDistinguishing {
  boundary: string;
  text: string;
}

export const PR_DISTINGUISHING: PrDistinguishing[] = [
  {
    boundary: "Distinguishing between 1 and 2",
    text: "At score point 1, the central task asks students to recall, describe, or apply a known procedure without organizing information, differentiation, or breaking anything down. At score point 2, the task requires organizing information, differentiating between parts, or breaking something down to reveal a pattern.",
  },
  {
    boundary: "Distinguishing between 2 and 3",
    text: "At score point 2, the central task requires analysis without requiring students to render a judgment. At score point 3, the task requires judging, critiquing, or checking the validity of a claim, approach, or artifact against some standard.",
  },
  {
    boundary: "Distinguishing between 3 and 4",
    text: 'At score point 3, students render a judgment about existing material. At score point 4, the task requires generating something new -- a design, a proposed solution, an original artifact. Use the convergent/divergent check above to confirm a task is genuinely a 4 and not simply a lower tier dressed in creative language.',
  },
];

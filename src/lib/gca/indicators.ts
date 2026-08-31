// Source: Codebook for Global Student Learning Outcomes (Tiven et al., 2023),
// "Global Student Learning Outcomes with Indicators" table.

export type Domain =
  | "Appreciation for Diversity"
  | "Cultural Understanding"
  | "Global Knowledge"
  | "Global Engagement";

export type CompetencyType = "Knowledge" | "Skill" | "Attitudinal" | "Behavioral";

export interface Indicator {
  code: string;
  name: string;
  domain: Domain;
  type: CompetencyType;
}

export const INDICATORS: Indicator[] = [
  { code: "1-AD", name: "Awareness of how one's life and the lives of others are influenced by broader cultural and historical contexts", domain: "Appreciation for Diversity", type: "Knowledge" },
  { code: "2-AD", name: "Awareness of one's culture (behaviors, identity, beliefs)", domain: "Appreciation for Diversity", type: "Knowledge" },
  { code: "3-AD", name: "Awareness of one's city and how it relates to other cities around the world", domain: "Appreciation for Diversity", type: "Knowledge" },
  { code: "4-AD", name: "Awareness of different cultures within one's school, city, region, country, and world", domain: "Appreciation for Diversity", type: "Knowledge" },
  { code: "5-AD", name: "Awareness of one's identity as a citizen of one's city", domain: "Appreciation for Diversity", type: "Knowledge" },
  { code: "6-AD", name: "Ability to identify and critically reflect on stereotypes in thinking about others", domain: "Appreciation for Diversity", type: "Skill" },
  { code: "7-AD", name: "Ability to listen to others and discuss issues in a respectful and unbiased way", domain: "Appreciation for Diversity", type: "Skill" },
  { code: "8-AD", name: "Ability to ask questions when encountering different perspectives", domain: "Appreciation for Diversity", type: "Skill" },
  { code: "9-AD", name: "Ability to identify and critically reflect on bullying behavior online and in-person", domain: "Appreciation for Diversity", type: "Skill" },
  { code: "10-AD", name: "Positive attitude towards one's own culture", domain: "Appreciation for Diversity", type: "Attitudinal" },
  { code: "11-AD", name: "Tolerance of differences", domain: "Appreciation for Diversity", type: "Attitudinal" },
  { code: "12-AD", name: "Responding to differences with openness and positivity, not fear", domain: "Appreciation for Diversity", type: "Attitudinal" },
  { code: "13-AD", name: "Willingness to interact with peers and adults of different backgrounds respectfully", domain: "Appreciation for Diversity", type: "Attitudinal" },
  { code: "14-AD", name: "Willingness to work collaboratively with peers and adults of different backgrounds to achieve shared goals", domain: "Appreciation for Diversity", type: "Attitudinal" },
  { code: "15-AD", name: "Interacting with people of different backgrounds positively and respectfully", domain: "Appreciation for Diversity", type: "Behavioral" },
  { code: "16-AD", name: "Working collaboratively with people of different backgrounds to achieve shared goals", domain: "Appreciation for Diversity", type: "Behavioral" },
  { code: "17-AD", name: "Intervening against intolerant behavior online and in-person", domain: "Appreciation for Diversity", type: "Behavioral" },
  { code: "18-CU", name: "Understanding how one's life and the lives of others are influenced by broader cultural and historical contexts", domain: "Cultural Understanding", type: "Knowledge" },
  { code: "19-CU", name: "Understanding of one's culture (behaviors, identity, beliefs)", domain: "Cultural Understanding", type: "Knowledge" },
  { code: "20-CU", name: "Understanding of one's city and how it relates to other cities around the world", domain: "Cultural Understanding", type: "Knowledge" },
  { code: "21-CU", name: "Understanding of different cultures within one's school, city, region, country, and world", domain: "Cultural Understanding", type: "Knowledge" },
  { code: "22-CU", name: "Understanding that problems may be solved differently depending on cultural factors", domain: "Cultural Understanding", type: "Knowledge" },
  { code: "23-CU", name: "Ability to adapt language and content of writing to meet the needs of diverse audiences", domain: "Cultural Understanding", type: "Skill" },
  { code: "24-CU", name: "Ability to recognize different perspectives on specific global issues", domain: "Cultural Understanding", type: "Skill" },
  { code: "25-CU", name: "Recognition of different perspectives as legitimate", domain: "Cultural Understanding", type: "Attitudinal" },
  { code: "26-CU", name: "Positive attitude towards other cultures", domain: "Cultural Understanding", type: "Attitudinal" },
  { code: "27-GK", name: "Knowledge of local and world geography", domain: "Global Knowledge", type: "Knowledge" },
  { code: "28-GK", name: "Knowledge of global issues and their local impact", domain: "Global Knowledge", type: "Knowledge" },
  { code: "29-GK", name: "Knowledge of economics and politics and their impact", domain: "Global Knowledge", type: "Knowledge" },
  { code: "30-GK", name: "Knowledge of one's city government and differences between city governments around the world", domain: "Global Knowledge", type: "Knowledge" },
  { code: "31-GK", name: "Understanding that global issues are borderless and affect everyone", domain: "Global Knowledge", type: "Knowledge" },
  { code: "32-GK", name: "Understanding that global issues are complex", domain: "Global Knowledge", type: "Knowledge" },
  { code: "33-GK", name: "Understanding that differences in access to information, technology, and resources affect quality of life and perspectives", domain: "Global Knowledge", type: "Knowledge" },
  { code: "34-GK", name: "Understanding that problems may be solved differently depending on socioeconomic status, natural resources, government policy, and political differences", domain: "Global Knowledge", type: "Knowledge" },
  { code: "35-GK", name: "Ability to apply research skills (finding, selecting, and applying information from multiple sources) to global issues", domain: "Global Knowledge", type: "Skill" },
  { code: "36-GK", name: "Ability to find information about global issues using credible sources from around the world", domain: "Global Knowledge", type: "Skill" },
  { code: "37-GK", name: "Ability to synthesize different perspectives on the same topic to draw conclusions about global issues", domain: "Global Knowledge", type: "Skill" },
  { code: "38-GK", name: "Recognition of the importance of learning about other cities and countries", domain: "Global Knowledge", type: "Attitudinal" },
  { code: "39-GK", name: "Recognition of the importance of learning about global issues that affect us all", domain: "Global Knowledge", type: "Attitudinal" },
  { code: "40-GK", name: "Recognition of the importance of analyzing multiple perspectives", domain: "Global Knowledge", type: "Attitudinal" },
  { code: "41-GE", name: "Ability to engage in inclusive problem-solving", domain: "Global Engagement", type: "Skill" },
  { code: "42-GE", name: "Interest in the larger world, particularly unfamiliar people and places", domain: "Global Engagement", type: "Attitudinal" },
  { code: "43-GE", name: "Interest in global issues", domain: "Global Engagement", type: "Attitudinal" },
  { code: "44-GE", name: "Recognition of the value of inclusive problem-solving", domain: "Global Engagement", type: "Attitudinal" },
  { code: "45-GE", name: "Recognition of one's capacity to advocate for and contribute to local, regional, or global improvement", domain: "Global Engagement", type: "Attitudinal" },
  { code: "46-GE", name: "Appreciation of language learning as a means of communicating and collaborating with people around the world", domain: "Global Engagement", type: "Attitudinal" },
  { code: "47-GE", name: "Willingness to take action to address global issues", domain: "Global Engagement", type: "Attitudinal" },
  { code: "48-GE", name: "Using digital tools to learn from and communicate with students from cities around the world", domain: "Global Engagement", type: "Behavioral" },
  { code: "49-GE", name: "Seeking opportunities to communicate with people in other cities and cultures, as well as one's own", domain: "Global Engagement", type: "Behavioral" },
  { code: "50-GE", name: "Seeking opportunities to interact and collaborate with people of different cultures and backgrounds", domain: "Global Engagement", type: "Behavioral" },
  { code: "51-GE", name: "Gathering and interpreting information from people in one's own city and culture", domain: "Global Engagement", type: "Behavioral" },
  { code: "52-GE", name: "Gathering and interpreting information from people in other cities and cultures", domain: "Global Engagement", type: "Behavioral" },
  { code: "53-GE", name: "Presenting information, formally and informally, to people in one's own city and culture", domain: "Global Engagement", type: "Behavioral" },
  { code: "54-GE", name: "Presenting information, formally and informally, to people in other cities and cultures", domain: "Global Engagement", type: "Behavioral" },
  { code: "55-GE", name: "Working to contribute to local, regional, or global improvement", domain: "Global Engagement", type: "Behavioral" },
];

export function getIndicatorByCode(code: string): Indicator | undefined {
  return INDICATORS.find((i) => i.code === code);
}

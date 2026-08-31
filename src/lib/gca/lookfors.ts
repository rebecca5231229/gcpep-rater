// Source: Global Cities Codebook Look-Fors document.
// Each indicator's 'Students will be able to...' (positive look-fors) and
// 'Not aligned with this indicator' (negative examples) content.

export interface LookForsEntry {
  code: string;
  lookFors: string; // "Students will be able to..."
  notAligned: string; // "Not aligned with this indicator"
}

export const LOOK_FORS: LookForsEntry[] = [
  {
    code: "1-AD",
    lookFors: "Acknowledge connections between one's life and the culture(s) in which one has grown up and/or the historical moment in which one lives;\n\nAcknowledge that actions taken in the past influence the way people are living today;\n\nRecognize that cultural and/or historical components make up one's own identity and those of others; \n\nMake a connection between the historical past and the present culture.",
    notAligned: "Just mentioning a date without making a connection to one's culture or life does not suffice. \n\nSimply naming a cultural component/feature without connecting it to their life or others' lives.",
  },
  {
    code: "2-AD",
    lookFors: "Demonstrate familiarity with one's cultural identifiers (behaviors, identity, beliefs); \n\nNotice one has a culture; \n\nSituate oneself in relation to culture. \n\nDiscuss shared behaviors or beliefs in their school, neighborhood, family, or other group with which they identify. \n\nDiscuss weather/climate in the context of how they influence shared values, characteristics, or norms. \n\nAcknowledge of the meaning or symbolism of the physical or built environment as it relates to culture.",
    notAligned: "Simply stating they do not have the same culture/cultural identifiers as another student.\n\nMentioning isolated facts that do not relate to a shared cultural practice in the place where the student is located or a place or community to which they feel affiliated. \n\nSaying something like, \"we have a pool,\" or \"we have a library,\" unless they relate it to some shared activity, history, belief, or value. For example, the following: \"I think what you shared is interesting because there is also a really rare fish call Formosan landlocked salmon in Taiwan, and it almost extinct once,\" or \"we have monuments.\" \n\nMentions of weather/climate when they are isolated facts that are not connected to culture.",
  },
  {
    code: "3-AD",
    lookFors: "Recognize there are differences between another student's lived experience in their city and one's own;\n\nCompare aspects of one's own city (e.g., culture, technology, local environment, environmental issues, etc.) to those of another city. \n\nMention a relationship where it is unclear if the unit of analysis is their city or the broader country.",
    notAligned: "Comparing schools (e.g., their facilities)",
  },
  {
    code: "4-AD",
    lookFors: "Recognize that there are different cultures within one's school, city, region, country, and world. \n\nAcknowledge that there are connections and comparisons between different cultures within one's school, city, region, country, and world. \n\nName a concrete difference at a specified location/level (\"I learn that many people don't have access to clean drinking water in Shanghai\"). \n\nAnytime a student mentions a group—e.g., Christians—assume that they are acknowledging that different cultures exist. Such a group can either be one that the student belongs to/identifies with or one the student views as separate. At a global level, the student needs to explicity acknowledge a multitude of cultures in the world.",
    notAligned: "Mentioning specific differences in beliefs (e.g., about global warming, deforestation, or recycling) without mentioning any context (e.g., city, country, or world) or a specific group identity or culture (e.g., \"not everyone disregards extreme weather\").\n\nAsking questions that allude to but do not directly reference different cultures (\"Does everyone waste food?\"), since they do not demonstrate a current awareness about different cultures. Such questions are better aligned with 8-AD Ability to ask questions when encountering different perspectives and/or 42-GE Interest in the larger world, particularly unfamiliar people and places.",
  },
  {
    code: "5-AD",
    lookFors: "Acknowledge one's role as a citizen of one's city beyond simply naming where one lives (e.g., naming the importance of raising awareness about electricity use in one's own city); \n\nExpress a sense of responsibility (\"I must\"); \n\nExpress a sense of belonging-- i.e., instances where students explicitly name their own sense of responsibility or belonging to their city or community specifically. \n\nThis indicator is distinct from 45-GE Recognizing one's capacity to advocate for and contribute to local, regional, or global improvement. Statements about one's capacity or sense of agency (e.g., \"I can...\" or \"Something I can do to prevent pollution in my city is...\") are aligned with 45-GE. \"I can\" statements that are accompanied by statements that also explicitly name a sense of responsibility towards one's city are aligned with both 45-GE and 5-AD.",
    notAligned: "",
  },
  {
    code: "6-AD",
    lookFors: "Notice and namestereotypes and the impact of these stereotypes on people and communities; \n\nAsk critical questions and/or naming criticisms about stereotypes to oneself, one's community, and/or one's online peers; \n\nReflect on one's own bias; \n\nArticulate why prejudices should be rejected.",
    notAligned: "",
  },
  {
    code: "7-AD",
    lookFors: "Give a response that shows evidence of careful listening, reading, or observing through respectful discussion of issues\n\nRespectfully comment on or pose a question about something specific that another student share; \n\nMake statements that suggest how someone else's statement gave them a new perspective or new information (e.g., \"You taught me that...\"). \n\nThe emphasis here is on respectful communication that demonstrates a student has listened to another person. The \"issues\" discussed can be any topic—including, but not limited to, global issues or curriculum projects as well as personal interests or anecdotes.",
    notAligned: "Illustrations of listening that are simply responses to other students' questions. This is distinct from 51-GE Gathering and interpreting information from people in one's own city and culture which involves more formally collecting and analyzing data from others.",
  },
  {
    code: "8-AD",
    lookFors: "Ask questions to learn more about a peer's life, place, and/or culture (language, life in the city, school life, how they spend their free time, etc.); \n\nExpress a desire to learn more—and even visit; \n\nAsk questions that suggest how someone else's post gave them a new perspective or new information. \n\nAsk questions about different cultures within one's school, city, region, country, and world.\n\nAsk questions about different perspectives, without acknowledging them as legitimate.\n\nAsk questions that indicate a desire to find out more about another person's life experiences or way of life.\n\nThis indicator reflects a broad interpretation of \"different perspectives\" to include different life experiences rather than just opinions or ways of looking at the world, with an emphasis on showing an ability to ask questions.",
    notAligned: "Asking technical questions that are purely about the global issue rather than the peer's life, place, and/or culture.",
  },
  {
    code: "9-AD",
    lookFors: "Notice and name bullying behavior online and/or sharing instances of noticing and naming bullying behavior in-person; \n\nAsk critical questions and/or naming criticisms of online and/or in-person bullying behavior.",
    notAligned: "",
  },
  {
    code: "10-AD",
    lookFors: "Express pride in and/or enthusiasm about one's own culture and/or place. \n\nThis may include statements about the beauty of where one lives.",
    notAligned: "",
  },
  {
    code: "11-AD",
    lookFors: "Make explicit reference to differences among people (e.g., in perspectives, experiences, cultures, interests, etc.) with neither positivity nor negativity; \n\nExpress openness to content and/or perspectives shared by another student or respond in respectful ways to differences without expressing explicit positivity (e.g., saying that they can see another students' perspective even if they disagree with it). \n\nThe lack of explicit positivity toward difference distinguishes this from indicators 12-AD Responding to differences with openness and positivity, not fear and 15-AD Interacting with people of different backgrounds positively and respectfully.",
    notAligned: "",
  },
  {
    code: "12-AD",
    lookFors: "Make explicit, positive reference to differences among people (e.g., in perspectives, experiences, cultures, interests, etc.); \n\nRespond to these differences with inclusive and collaborative language; \n\nExpress an appreciation for diverse perspectives and places; \n\nExpress excitement or enthusiasm for the diverse content and/or perspectives shared by another student. \n\nIdentify a difference as \"interesting.\"\n\nIn addition to the positive content, be alert to and consider stylistic choices (e.g., all caps, emoticons, exclamation points, etc.) that may indicate tone.",
    notAligned: "Positivity does not include very basic politeness like simply saying \"Thank you.\" \n\nSimply observing/naming a difference without expressing interest (or other form of positivity) would align with 11-AD Tolerance of differences. \n\nThe key distinction between 11-AD and 12-AD is that 12-AD must show evidence of interest, excitement, or other positivity about the difference.",
  },
  {
    code: "13-AD",
    lookFors: "Articulate a willingness to interact with peers and adults of different backgrounds respectfully, including expressing an interest in hearing more from an online peer, explicitly desiring to learn more from a peer, mentioning the possibility of connecting outside of the Global Scholars platform, or soliciting advice from online peers. \n\nShow willingness to interact about anything, not just topics related to the curriculum. \n\nSolicit the perspectives of others, without acknowledging the perspectives' legitimacy",
    notAligned: "Simply interacting with peers on the platform respectfully through posting, replying, and questioning, which would be an indirect but not explicit expression of willingness to interact  and would include an unhelpfully broad range of interactions. \n\nRelative to 12-AD Responding to differences with openness and positivity, not fear, this is more about interest in interaction with peers or the process of exchange, not just interest in the content of the post. Also, there does not have to be a discussion of difference as there does in 12-AD.",
  },
  {
    code: "14-AD",
    lookFors: "Express a willingness to work collaboratively with others (peers or adults) to achieve shared goals. \n\nExpress intent to work collaboratively where no action has yet been undertaken (actually working collaboratively is captured in 16-AD Working collaboratively with people of different backgrounds to achieve shared goals). \n\nExpress willingness to work collaboratively with other individuals or groups on shared goals, with the assumption that others inherently have different backgrounds (e.g., different race, ethnicity, religion, socioeconomic status, family composition, etc.).",
    notAligned: "General statements such as \"we should conserve water\" because\nthey are too broad to suggest collaboration with others.",
  },
  {
    code: "15-AD",
    lookFors: "Respond in respectful and positive ways to peers from different places. \n\nDemonstrate positivity when focusing on differences or on commonalities. \n\nShow encouragement in response to other students' statements as well as signing off with \"your friend/s\" or other similarly positive sign-offs. \n\nIdentify something another person shared as \"interesting.\" \n\nThis should be applied only where there is an interaction between students from another place or when a student mentions having an interaction with someone else from another place. \n\nBe alert to and consider stylistic choices (e.g., all caps, emoticons, exclamation points, etc.) in addition to positive and respectful content. \n\nUse a broad definition of positivity to be sensitive to cultural differences in how people express positivity.",
    notAligned: "Positivity does not include very basic  politeness like simply saying \"Thank you.\"",
  },
  {
    code: "16-AD",
    lookFors: "Work collaboratively with students or others in one's community toward specific goals. \n\nCollaborate on a final project, additional projects or organizations they may have become involved with, or actively seeking other students' input or advice on actions—for example, \"Please give us your advice on ways we can help our community.\" \n\nAs with 14-AD Willingness to work collaboratively with peers and adults of different backgrounds to achieve shared goals, the assumption is that others inherently have different backgrounds, so any collaborative work toward shared goals is included.",
    notAligned: "",
  },
  {
    code: "17-AD",
    lookFors: "Actively intervene against intolerant behavior online (e.g., challenging a peer who has posted an offensive or harmful comment); \n\nDescribe ways in which one intervenes against intolerant behavior online and/or in-person.",
    notAligned: "",
  },
  {
    code: "18-CU",
    lookFors: "Explain or describe how or why actions taken in the past influence the way people are living or why things are as they are in the world today. \n\nRecognize the ways in which cultural and/or historical components make up one's own identity and/or those of one's peers.\n\nTo distinguish between \"awareness\" (1-AD Awareness of how one's life and the lives of others are influenced by broader cultural and historical contexts) versus \"understanding\" (18-CU), in 1-AD awareness would be demonstrated by making a connection between one's life and the culture/historical context. In 18-CU, understanding is demonstrated by going a step further and explaining how or why that connection exists.",
    notAligned: "Simply providing a history of an event or a celebration; the event must be explained as an historical or cultural context or influence for how people live today.",
  },
  {
    code: "19-CU",
    lookFors: "Explicitly define one's culture by explaining cultural aspects (behavior, identity, beliefs); \n\nExpress nuanced beliefs/opinions about one's own culture (positive and critical within the same post—e.g., noting both valuable customs as well as issues in one's city); \n\nDifferentiate between what is and/or what is not one's own \"culture.\" \n\nTo distinguish \"awareness\" as in 2-AD Awareness of one's culture (behaviors, identity, beliefs) from \"understanding\" (19-CU), naming a tradition would fall under 2-AD; explaining the reason or meaning behind a tradition or how it affects people's lives would be 19-CU.",
    notAligned: "\"We waste a lot of water\" aligns with 2-AD. The \"we\" shows awareness that culture is a group phenomenon, and the \"waste a lot of water\" is an action that reflects group norms or customs related to water use. Explaining why they waste a lot of water or providing additional details aligns with 19-CU.",
  },
  {
    code: "20-CU",
    lookFors: "Explain explicit connections and comparisons between another person's lived experience in their city and one's own (e.g., my water waste versus yours; city features; climate differences; varying amounts of green space, etc.); \n\nName similarities and/or differences between culture, technology, local environment, environmental issues, etc. (e.g., noting connections between cultural values like wastefulness, appreciation of nature, etc.). The two cities examined can be in the same country or different countries, but the comparison city must be identified or implied.",
    notAligned: "Comparing their own city to the world as a whole. There must be some sort of explanation of \"why\" there is a similarity or difference to align with 20-CU rather than simply naming a similarity or difference, which would align with 3-AD Awareness of one's city and how it relates to other cities around the world.",
  },
  {
    code: "21-CU",
    lookFors: "Analyze different cultures within one's school, city, region, country, and/or world. \n\nExplain connections, similarities, and/or differences between different cultures within one's school, city, region, country, and/or world.\n\nAcknowledge multiple cultures and explain aspects of one or more of those cultures; if the student merely names the presence of different cultures, it is better aligned with 4-AD.",
    notAligned: "Explanations of personal interests (e.g., video games) unless they state explicitly that the interest reflects a cultural practice among a particular group of people (e.g., teenagers).",
  },
  {
    code: "22-CU",
    lookFors: "Name or explaining how cultural differences affect approaches to problem solving (beyond just recognizing different cultural viewpoints); \n\nAcknowledge or explaining how one can use information, opinions, and contexts derived from cultural learning to understand different perspectives on problems and develop solutions. \n\nMention differences related to culture\n\nStudents do not need to explain their understanding to achieve this indicator; naming or acknowledging is sufficient demonstration of cultural awareness.",
    notAligned: "Mentioning differences in socioeconomic status, natural resources, government policy, and/or political differences, which are captured in 34-GK Understanding that problems may be solved differently depending on socioeconomic status, natural resources, government policy, and political differences.",
  },
  {
    code: "23-CU",
    lookFors: "1. Provide translations for words (often in parentheses or brackets) \n2. Explain the meaning of words or phrases\n3. Make a comparison between something that is likely unfamiliar and something they think others will be familiar with (e.g., \"it is kind of like…\")\n4. Attempt to explain or describe in words something another person has never experienced before or would likely be unfamiliar with \n5. Adapt language or content as part of engaging with different audiences through any medium, including translation",
    notAligned: "",
  },
  {
    code: "24-CU",
    lookFors: "Name different perspectives about a specific global issue; \n\nDescribe what makes those perspectives different. \n\nSay the solutions stem from different perspectives or opinions about the issue.\n\nAcknowledge that not everyone will hold the same opinion or care about the same issues (e.g., \"I do not think that a large percentage of members in my community are concerned about transportation issues\"). This indicator pertains to different perspectives on a global issue and not just different solutions.",
    notAligned: "",
  },
  {
    code: "25-CU",
    lookFors: "Name and acknowledge different perspectives that exist in the world, such as in their community, in the media, or among experts. \n\n\"Legitimate\" in this case means different perspectives are seen as valid, fair, reasonable, supported by tradition, custom, or standard.\n\nThe different perspectives do not need to be about a global issue.",
    notAligned: "The perspectives should be specific-- i.e., do not include general statements such as \"people don't care about extreme weather.\" \n\nAsking questions or soliciting the opinions or perspectives of their peers, which are captured elsewhere (e.g., 8-AD Ability to ask questions when encountering different perspectives, 13-AD Willingness to interact with peers and adults of different backgrounds respectfully, and 42-GE Interest in the larger world, particularly unfamiliar people and places), unless they also explicitly identify those perspectives as being legitimate",
  },
  {
    code: "26-CU",
    lookFors: "Express positive attitudes towards other cultures at any point (including in an initial discussion board post or in responding to the post of another student). \n\nMake a positive general comment about another city.\n\nThis includes a positive, warm, or interested response to another student sharing facets of their culture.",
    notAligned: "Giving a warm, positive, or interested response to a student's post that is not related to culture (e.g., physical characteristics of a city or an individual student's personal interest).",
  },
  {
    code: "27-GK",
    lookFors: "Share facts and information about and/or showing one's understanding of local and world geography; \n\nName new learning about local and world geography. \n\nName geographic facts even if they do not show an awareness of student's relative place (e.g., \"We get our water from the Wanaque Reservoir.\")\n\nGeography only includes natural, physical features (lakes, rivers, islands, etc.) and national/ international geography (states, capitals, borders, etc.).",
    notAligned: "Knowledge of local infrastructure or cultural markers.",
  },
  {
    code: "28-GK",
    lookFors: "Acknowledge connections between global issues and their local impacts. Local impacts could be ones that affect students' cities, neighborhoods, families, or schools. \n\nNote the ways in which local behaviors affect global issues. \n\nDemonstrate (if only implicitly) that they understand that some change is happening globally, whether or not there is evidence of it locally. \n\nStudents do not need to make explicit statements to show that they understand the connection between global issues and their local impact; there can be an implicit connection. \n\nThe student need not show an understanding of causal relationships (e.g., \"because of X, Y happened\").",
    notAligned: "",
  },
  {
    code: "29-GK",
    lookFors: "Share information about and showing understanding of economics and/or politics and their impact. \n\nReference their city's municipal service providers (e.g., local water or electricity supplier), since it shows the student has some understanding that their city government has suppliers for the services it provides to residents.\n \nReference broader level policies or economic forces.",
    notAligned: "Simply mentioning something about local infrastructure (e.g., a museum or casino) without acknowledging its political or economic origins or impact. \n\nSimply providing isolated facts about a city (e.g., \"our state capital is Albany\") without connecting those facts to politics or economics.",
  },
  {
    code: "30-GK",
    lookFors: "Share information about and showing one's understanding of the structure and workings of one's own city government; \n\nMake comparative statements about other city governments. \n\nReference their city's local trash collection, water treatment, electricity supplier, educational department, or other city-run service, since it shows the student has some understanding of their city government's operations. \n\nRelate to a local government issue. \n\nReference local, city-level policies.",
    notAligned: "Simply providing isolated facts about a city (e.g., \"Our state capital is Albany\") or local institutions (e.g., a museum or casino) without stating why those facts are relevant to or impacted by city government.",
  },
  {
    code: "31-GK",
    lookFors: "Name or explain ways in which global issues are borderless and affect multiple people, places, and species. \n\nMention shared conceptions of environment, planet, etc., and describe or analyze how issues like pollution and plastic bags are impacting them. \n\nWhen students use \"we,\" this can be a cue that they understand that global issues are borderless. \n\nIf students refer to effects on animal or plant life, then there should be at least an implicit connection to effects on human life. \n\nRefer to a global issue at a macro level and also impacts at a micro level. \n\nStudents do not need to explain their understanding to achieve this indicator; naming or describing is sufficient demonstration.",
    notAligned: "",
  },
  {
    code: "32-GK",
    lookFors: "Note complexity of global issues; \n\nRecognize and identify the challenges of finding, planning, and implementing viable solutions to global issues; \n\nAcknowledge and/or grappling with personal lifestyle/enjoyment versus environmental or social responsibility; \n\nPropose solutions to issues at different levels—individual solutions, neighborhood solutions, infrastructure solutions, etc; \n\nRecognize that multiple systems are involved/at play and/or explaining explicit ways systems interact (intercity; local-global).\n\nStudents do not need to explain their understanding to achieve this indicator; acknowledging, identifying, or recognizing is sufficient demonstration.",
    notAligned: "",
  },
  {
    code: "33-GK",
    lookFors: "Acknowledge there are varying levels of access to information, technology, and resources; \n\nMake connections between one's access and others' access and connecting that to quality of life and/or perspectives (e.g., reflecting on the availability of green space or clean water in one context versus elsewhere in the world and naming how this impacts one's life). \n\nStudents do not need to explain their understanding to achieve this indicator; acknowledging relevant differences is sufficient demonstration.",
    notAligned: "Mentions of informational campaigns unless they specifically reference a disparity in information in the target community.",
  },
  {
    code: "34-GK",
    lookFors: "Name or explain specific ways in which solutions to problems may differ based on (i) socioeconomic status of communities implementing solutions, (ii) natural resources in the local area, and/or (iii) government policies and political differences. \n\nThe term \"solution\" should be interpreted expansively (e.g., a general solution to a global problem, even if a detailed plan is not presented). \n\nA statement such as \"this reflects my local...\" can be a cue that this indicator should be applied. \n\nStudents do not need to explain their understanding to achieve this indicator; naming is sufficient demonstration.",
    notAligned: "",
  },
  {
    code: "35-GK",
    lookFors: "Find, select, and apply existing information, be this from primary and/or secondary sources (e.g., consulting websites, books, videos, newspapers); \n\nCite sources; \n\nCompare multiple sources. \n\nLook up information on websites, etc. \n\nDescribe the research process even if they do not share specific findings.\n\nAlthough the indicator suggests that multiple sources need to be consulted, describing only one specific source aligns with this indicator.",
    notAligned: "Describing information students generated themselves through interviews, surveys, tracking or observing their own behaviors, or field research (which should be coded as 51-GE Gathering and interpreting information from people in one's own city and culture, and/or 52-GE Gathering and interpreting information from people in other cities and cultures).",
  },
  {
    code: "36-GK",
    lookFors: "Cite or share information about global issues from multiple credible sources. \n\nFind two sources; the sources do not need to be international as long as they are two different sources. Note that credibility can be determined through the students' citation of a source. \n\nStudents do not have to explicitly address a source's credibility as long as they identify the origin/s of their information. It is not necessary for students to follow academic citation conventions for this indicator to align.",
    notAligned: "",
  },
  {
    code: "37-GK",
    lookFors: "Distill information from different sources/perspectives to develop an argument or make a claim about global issues, drawing on evidence as needed. \n\nThis can involve discussing debates or different points of view as discussed in a single article or source. \n\nPerspectives may come from different sources (e.g., published writings by experts or journalists, speeches by public figures, and stances shared by classmates and online peers). \n\nMake their own observations (e.g., observing leaky faucets or recycling systems in their school) as long as they are also synthesizing their own observations with other perspectives (e.g., from secondary sources or from other people's observations).",
    notAligned: "Describing one's own observations if there is no synthesis.",
  },
  {
    code: "38-GK",
    lookFors: "Acknowledge that it is important to learn about other cities and countries.",
    notAligned: "Simply noting that something is interesting or informative. Students should say why learning about something is important. \n\nThanking others for teaching them about their cities or countries does not count unless the student acknowledges why it is important to learn about other cities or countries.",
  },
  {
    code: "39-GK",
    lookFors: "Acknowledge that it is important to learn about global issues that affect us all. \n\nState that they (a) are part of an information campaign to generate awareness around a global issue and/or (b) plan to share information about a global issue informally with friends or family (the implication being that the student believes the issue is important).",
    notAligned: "Descriptions of a project that is addressing a global issue unless that project is related to building knowledge or sharing learning around global issues. \n\nStudents saying they look forward to learning more without explicitly saying that learning about global issues is important, as this is captured in 43-GE Interest in global issues.",
  },
  {
    code: "40-GK",
    lookFors: "Name specific reasons why analyzing multiple perspectives is important; \n\nExpress positivity relating to recognizing multiple perspectives or mentioning the value of weighing different forms of input or perspectives",
    notAligned: "",
  },
  {
    code: "41-GE",
    lookFors: "Actively engage in inclusive problem solving, which involves gathering input, feedback, or data from others who are impacted by the problem being solved. \n\nAsk for feedback on how to improve an existing solution. \n\nWhen addressing global problems, this can involve anyone in the world who could be impacted. \n\nWork to solve problems with other students outside of a project group, including other Global Scholars on the platform. \n\nRelevant problem-solving activities include conducting surveys to gather information about problems or about opinions on solutions.",
    notAligned: "Collaborating with group members on a group project does not count as working with others;\n\nAsking technical questions, such as how to edit a video; \n\nSimple information sharing (e.g., \"I will tell my family about this so we can make changes together\"); \n\nIntentions to engage in inclusive problem solving without having done so yet; \n\nAsking for generic feedback without a specific problem to be solved (e.g., \"Please give us advice about our video\" is insufficient, but \"Please give us advice because we can't figure out how to make a video that will appeal to children under age 8,\" would count because they are asking for feedback on a specific problem).",
  },
  {
    code: "42-GE",
    lookFors: "Express curiosity about the larger world, including unfamiliar people and places. \n\nAsk questions about another student's life, interests, or the place where they live (e.g., \"Which is your favorite skyscraper?\" or \"What do you do in your free time?\").\n\nMake statements of enthusiasm to learn more or an expression of interest in something that has been shared (e.g., \"I think what you shared is interesting\" when what was shared was about unfamiliar people and places). \n\nAsk questions that allude to different cultures (e.g., \"Does everyone waste food?\").\n\nAsk questions eliciting information about peers' cities/cultures or experiences. \n\nAsk questions soliciting the perspectives of others without acknowledging the legitimacy of those perspectives.\n\nThere are certain sentences where both indicator 42-GE and 43-GE may be present in one excerpt, such as, \"I find the history of buildings in your city to be super interesting (42-GE), and I also think it's great that over time they have been designed to conserve more and more water (43-GE).\"",
    notAligned: "Showing interest in solutions to global issues, the impact of global issues on a city, or the global issue being explored in general (e.g., \"tell me more about nature\") align with 43-GE Interest in global issues rather than 42-GE.",
  },
  {
    code: "43-GE",
    lookFors: "Express curiosity and wanting to know more about global issues. \n\nAsk questions related to a global issue, even if they appear technical (e.g., \"A question we have for your group is: how do the subway trains work?\" or \"What types of faucets do you think will be water wise?\"). \n\nExplicitly express interest or surprise about a global issue (e.g., \"I was amazed at how much electricity I used per day.\"). \n\nAsk questions eliciting information about global issues. \n\nMake positive statements that specifically refer to a global issue and which convey enjoyment or positivity towards learning about that global issue (e.g., \"The amount of food you save is great!!!\").",
    notAligned: "General positive statements such as \"good job\" or \"Could you tell us more about your video?\" do not align with 43-GE. \n\nDiscussions of the importance of learning about global issues align with 39-GK Recognition of the importance of learning about global issues that affect us all, not 43-GE.",
  },
  {
    code: "44-GE",
    lookFors: "Articulate the importance of inclusive problem solving. Inclusive problem solving involves gathering input, feedback, or data from others who are impacted by the problem being solved. \n\nWork to solve problems with other students outside of a project group, including other Global Scholars on the platform, does count. \n\nAsk an adult for help; this is the lowest level of demonstration for this indicator. \n\nArticulate the importance of inclusive problem solving that does not include the students themselves. \n\n\"We\" is a key word to suggest inclusivity, but the \"we\" should include students outside of their group. \n\nThere should be evidence that the student understands that people need to take collective responsibility for solving the problem.",
    notAligned: "Collaborating with group members on a group project does not count as inclusive problem solving.\n\nNaming a solution such as \"the school should/could do something about this,\" but the student does not indicate that they play a role in solving the problem. \n\nSimple information sharing (e.g., \"I will tell my family about this so we can make changes together\").\n\nAsking for generic feedback without a specific problem to be solved (e.g., \"It's important to get outside advice about our video\"). However, something like, \"It's important to get advice because we can't figure out how to make a video that will appeal to children under age 8,\" would count because there is a specific problem.",
  },
  {
    code: "45-GE",
    lookFors: "Recognize one's capacity to advocate for and/or contribute to local, regional, or global improvement; \n\nExpress a sense of efficacy in relation to participating in advocacy and other social change efforts at the local, regional, and/or global levels. \n\nMake explicit \"I can\" statements indicating their sense that they have the capacity and agency to do something. \n\nSay \"you can\" because it indicates that the student understands personal agency and a capacity for action. \n\nMake implicit references to capacity—for example, instances in which students describe how proposed community actions will contribute to positive change (\"The action we will take is…Achieving this goal will help our community by…\"). Such statements align with both 45-GE and 47-GE. \n\nDescribe a willingness to take action or actual actions include implicit statements of efficacy. For example, expressing pride in community actions (\"The accomplishment we are most proud of is…\") or naming specific accomplishments (\"Things we accomplished so far are…\") both align with 45-GE.\n\n\"I can\" statements that explicitly name a sense of responsibility towards one's city align with both 45-GE and 5-AD Awareness of one's identity as a citizen of one's city.",
    notAligned: "Explicit \"I/we will\" statements align with 47-GE Willingness to take action, and from past or present actions\n\nExplicit \"I/we did\" statements align with 55-GE Working to contribute to local, regional, or global improvement\n\nPointing out things that others can do to fix a problem. For example, a student saying \"The school can...\" does not necessarily show that the student understands that they can do something to fix the problem.",
  },
  {
    code: "46-GE",
    lookFors: "Explicitly acknowledge the value of language learning as a means of communicating and collaborating with people around the world.\n\nUse encouraging or positive language regarding the study of a particular language, including English",
    notAligned: "",
  },
  {
    code: "47-GE",
    lookFors: "Indicate a desire and clear intention on the part of the student to take action, make changes, and/or solve problems\n\nMake plans to do something; \n\nThink in terms of the future; \n\nExplicitly name intended or planned shifts in habits or behaviors; \n\nExpress an interest in or a sense of responsibility to educate others (\"I must...\"); \n\nExpress excitement, positivity, and/or conviction (a \"we can—and must—do it!\" attitude) often with a sense of urgency. \n\nDescribe willingness to take action alongside recognition of their capacity to take action.",
    notAligned: "Simply repeating the goal of a class project without indicating (explicitly or implicitly) that they plan to take individual or collective action through the project. \n\nExpressions of interest, willingness, and responsibility are distinct from \"I/we can\" statements, which align with 45-GE Recognizing one's capacity to advocate for and contribute to local, regional, or global improvement and from reporting of past or present actions (\"I/we did\" or \"I/we are doing\"), which align with 55-GE Working to contribute to local, regional, or global improvement.",
  },
  {
    code: "48-GE",
    lookFors: "Share evidence of using digital tools or describing having used or using digital tools to learn from and/or communicate with students from cities around the world, other than the use of the Global Scholars online discussion board platform itself. \n\nSay that they learned from other students' digital content (e.g., \"I learned a lot from your video.\"). \n\nDigital tools include, but are not limited to: the Internet, digital cameras, tablets, a digital slideshow presentation, an online video, digital photographs, and online infographics.",
    notAligned: "Referring to a website or other digital tool that students learned from unless that digital material was made or shared by one or more students in another city (learning from a CNN article would not be coded, for example). \n\nGeneric mentions of videos that students learned from unless it is clear that other students made or shared the video.",
  },
  {
    code: "49-GE",
    lookFors: "Seek opportunities to communicate with people in other cities and/or cultures or with people in their own city/culture (e.g., attending events, reaching out to members of the community, etc.). \n\nDescribe communication opportunities that they have sought out but not yet engaged in (e.g., saying they have looked into bringing in a guest speaker or asking another student to communicate with them outside of the discussion boards in the future).",
    notAligned: "Asking online peers about their perspectives or ways of life (captured in 8-AD Ability to ask questions when encountering different perspectives), factual information about their city/culture (captured in 42-GE Interest in the larger world, particularly unfamiliar people and places), or about global issues (captured in 43-GE Interest in global issues). \n\nCommunicating with guest speakers or otherwise engaging in communication that was arranged by teachers, parents, or others and not initiated by the student/s. The emphasis is on students themselves seeking out opportunities to communicate.",
  },
  {
    code: "50-GE",
    lookFors: "Seek opportunities to collaborate with people of different cultures and/or backgrounds. \n\nAs with 49-GE Seeking opportunities to communicate with people in other cities and cultures, as well as one's own, the emphasis is on students themselves actually seeking out opportunities to collaborate in an activity with others (which could include, but is not limited to, solving problems with others' help or input). \n\nThe distinction between 50-GE and 49-GE is that 50-GE requires seeking out collaboration, which goes beyond communication or simple interaction. \n\nAny mentions of seeking opportunities to collaborate with others are aligned with 50-GE, with the assumption that others inherently have different backgrounds (e.g., different race, ethnicity, religion, socio-economic status, family composition, etc.).",
    notAligned: "",
  },
  {
    code: "51-GE",
    lookFors: "Collect information and content of data/information collected from people in one's city or culture. \n\nCarry out surveys or interviews.\n\nDescribe what was actively learned during a site visit.",
    notAligned: "Activities that do not involve engaging with other people, such as measuring or technical activities. \n\nInterpreting information provided by another student, as this is not commensurate with actively generating information.\n\nThis indicator is to be distinguished from 35-GK Ability to apply research skills (finding, selecting, and applying information from multiple sources) to global issues, which is about students finding information rather than generating their own.  \n\nOther indicators capture when students ask questions or learn from one another, such as 8-AD Ability to ask questions when encountering different perspectives, and 7-AD Ability to listen to others and discuss issues in a respectful and unbiased way.",
  },
  {
    code: "52-GE",
    lookFors: "Collect information and content of data/information collected from people in other cities and cultures.",
    notAligned: "This indicator is to be distinguished from 35-GK Ability to apply research skills (finding, selecting, and applying information from multiple sources) to global issues, which is about students finding information rather than generating their own.",
  },
  {
    code: "53-GE",
    lookFors: "Share or present information with other people outside one's classroom but within one's city and/or culture. \n\nInformation includes self-reported observations or cited research but not opinions, anecdotes, or generalizations that students make. \n\nShare information formally or informally. Formal includes something like a prepared demonstration, speech, digital product, or workshop. Informal could be sharing through spoken or written conversation, including in the e-classroom. \n\nTeach or talk with younger students about issues (e.g., pollution, food waste, recycling, water conservation strategies).\n\nHave conversations with school leaders to share results of research.\n\nHave conversations with neighbors or other community members\n\nCreate websites, social media posts, posters or other information campaigns, and/or videos for the purposes of sharing information with people in their city or culture. \n\nThis should include plans to share or present information (e.g., \"We will make a presentation for everyone in the school\") or descriptions of sharing/presenting information in the past.",
    notAligned: "",
  },
  {
    code: "54-GE",
    lookFors: "Share or present information with other people in other cities and/or cultures. \n\nInformation includes self-reported observations or cited research as well as statements presented as facts, even if a source is not cited (e.g., \"This tradition started in the 1800s.\"). \n\nShare information formally or informally. Formal includes something like a prepared demonstration, speech, digital product, or workshop. Informal could be sharing through spoken or written conversation, including in the e-classroom. \n\nThis should include plans to share or present information (e.g., \"We will make a presentation for people in our sister city.\") or descriptions of sharing/presenting information in the past.\n\nNote: Sharing information online without specifying that it is targeting the local city or culture is considered presenting information to people in other cities and cultures, given the global nature of online information",
    notAligned: "Sharing personal opinions, anecdotes, or generalizations.",
  },
  {
    code: "55-GE",
    lookFors: "Describe projects or actions that have been or are currently being implemented and that seek to resolve issues at the local, regional, or global levels (\"I/we have....\" or \"I/we are doing…\" statements, as well as more implicit references to actions taken). \n\nName their accomplishments on a project addressing a local, regional, or global issue (e.g., \"The accomplishment we are most proud of is…\" or \"Things we accomplished so far are…\").\n\nIt should be clear that the actions are in progress or completed and not just vague plans.",
    notAligned: "Examples such as \"In our city, we try to use less fossil fuels\" are not included here unless the student indicated that they, too, were engaging in actions to use less fossil fuels. \n\nDo not include students' research projects as contributions to improvement. The student must have taken action (or be currently taking action) to address a global issue. \n\nDescriptions of actions taken or underway are distinct from expressions of interest, willingness, and responsibility (\"I/we will\"), which should be coded as 47-GE Willingness to take action to address global issues and from \"I/we can\" statements, which should be coded as 45-GE Recognizing one's capacity to advocate for and contribute to local, regional, or global improvement.",
  },
];

export function getLookForsByCode(code: string): LookForsEntry | undefined {
  return LOOK_FORS.find((l) => l.code === code);
}
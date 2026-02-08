import { v4 as uuidv4 } from "uuid";

export const normalizeSheetData = (apiData) => {
  if (!apiData || !apiData.data || !apiData.data.sheet) return [];

  const { sheet, questions } = apiData.data;
  const { config } = sheet;
  const topicOrder = config?.topicOrder || [];

  return topicOrder.map((topicTitle) => {
    // Filter questions for this topic
    const topicQuestions = questions.filter((q) => q.topic === topicTitle);

    // Since API doesn't have subtopics, we group all questions into a default subtopic
    // or if the API had subtopics we would group by them.
    // Looking at the response, subTopic is null.
    // We will create a single SubTopic named "Problems" or "General"
    
    // Map API questions to our Question model
    const normalizedQuestions = topicQuestions.map((q) => ({
      id: q._id || uuidv4(),
      text: q.title,
      status: "todo", // Default status
    }));

    return {
      id: uuidv4(),
      title: topicTitle,
      subTopics: [
        {
          id: uuidv4(),
          title: "Problems", // Default subtopic container
          questions: normalizedQuestions,
        },
      ],
    };
  });
};

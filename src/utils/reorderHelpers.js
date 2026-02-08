import { arrayMove } from "@dnd-kit/sortable";

export const findItemPath = (topics, id) => {
  for (let tIndex = 0; tIndex < topics.length; tIndex++) {
    const topic = topics[tIndex];
    if (topic.id === id) return { type: "topic", topicIndex: tIndex };

    for (let sIndex = 0; sIndex < topic.subTopics.length; sIndex++) {
      const sub = topic.subTopics[sIndex];
      if (sub.id === id)
        return { type: "subTopic", topicIndex: tIndex, subTopicIndex: sIndex };

      for (let qIndex = 0; qIndex < sub.questions.length; qIndex++) {
        const q = sub.questions[qIndex];
        if (q.id === id)
          return {
            type: "question",
            topicIndex: tIndex,
            subTopicIndex: sIndex,
            questionIndex: qIndex,
          };
      }
    }
  }
  return null;
};

// Simple reorder within the same list
export const reorderList = (list, activeIndex, overIndex) => {
  return arrayMove(list, activeIndex, overIndex);
};

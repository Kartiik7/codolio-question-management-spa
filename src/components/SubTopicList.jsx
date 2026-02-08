import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useQuestionStore from "../store/useQuestionStore";
import SubTopicItem from "./SubTopicItem";

const SubTopicList = ({ topicId, subTopics }) => {
  return (
    <SortableContext items={subTopics.map((s) => s.id)} strategy={verticalListSortingStrategy}>
      <div className="space-y-3 pl-4 border-l-2 border-gray-100 dark:border-zinc-700 ml-2">
        {subTopics.map((subTopic) => (
          <SubTopicItem key={subTopic.id} topicId={topicId} subTopic={subTopic} />
        ))}
      </div>
    </SortableContext>
  );
};

export default SubTopicList;

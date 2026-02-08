import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useQuestionStore from "../store/useQuestionStore";
import TopicItem from "./TopicItem";

const TopicList = ({ topics }) => {

  return (
    <SortableContext items={topics.map((t) => t.id)} strategy={verticalListSortingStrategy}>
      <div className="space-y-4">
        {topics.map((topic) => (
          <TopicItem key={topic.id} topic={topic} />
        ))}
      </div>
    </SortableContext>
  );
};

export default TopicList;

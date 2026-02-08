import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import QuestionItem from "./QuestionItem";

const QuestionList = ({ topicId, subTopicId, questions }) => {
  return (
    <SortableContext items={questions.map((q) => q.id)} strategy={verticalListSortingStrategy}>
      <div className="space-y-2">
        {questions.length === 0 && (
            <div className="text-gray-400 text-sm italic py-2 text-center">No questions yet. Add one!</div>
        )}
        {questions.map((question) => (
          <QuestionItem key={question.id} topicId={topicId} subTopicId={subTopicId} question={question} />
        ))}
      </div>
    </SortableContext>
  );
};

export default QuestionList;

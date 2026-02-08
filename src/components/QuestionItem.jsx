import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Edit2, Check, ExternalLink } from "lucide-react";
import useQuestionStore from "../store/useQuestionStore";

const QuestionItem = ({ topicId, subTopicId, question }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(question.text);
  const { updateQuestion, deleteQuestion } = useQuestionStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    updateQuestion(topicId, subTopicId, question.id, { text: editText });
    setIsEditing(false);
  };

  const toggleStatus = () => {
    updateQuestion(topicId, subTopicId, question.id, {
      status: question.status === "done" ? "todo" : "done",
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center justify-between p-3 bg-white dark:bg-zinc-800 rounded-md border border-gray-100 dark:border-zinc-700/50 hover:border-gray-300 dark:hover:border-zinc-600 transition-all ${
        isDragging ? "z-50 shadow-md ring-2 ring-indigo-400" : ""
      } ${question.status === "done" ? "bg-opacity-50" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <button
          {...attributes}
          {...listeners}
          className="cursor-move text-gray-300 hover:text-gray-500 p-0.5 rounded transition opacity-0 group-hover:opacity-100"
        >
          <GripVertical size={14} />
        </button>

        <input
          type="checkbox"
          checked={question.status === "done"}
          onChange={toggleStatus}
          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full bg-transparent border-b border-indigo-500 focus:outline-none py-0.5 text-sm"
            />
          ) : (
             <div className="flex items-center gap-2">
                <span
                onDoubleClick={() => setIsEditing(true)}
                className={`truncate text-sm ${
                    question.status === "done"
                    ? "text-gray-400 line-through"
                    : "text-gray-700 dark:text-gray-200"
                }`}
                >
                {question.text}
                </span>
                {/* Mock link if text looks like url or generic link icon - for now just generic */}
             </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-100 transition-opacity ml-2">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 text-gray-400 hover:text-indigo-600 rounded transition"
          title="Edit"
        >
          {isEditing ? <Check size={14} /> : <Edit2 size={14} />}
        </button>

        <button
          onClick={() => deleteQuestion(topicId, subTopicId, question.id)}
          className="p-1 text-gray-400 hover:text-red-600 rounded transition"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default QuestionItem;

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, GripVertical, Trash2, Edit2, Check, Plus } from "lucide-react";
import useQuestionStore from "../store/useQuestionStore";
import QuestionList from "./QuestionList";

const SubTopicItem = ({ topicId, subTopic }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(subTopic.title);
  const { updateSubTopic, deleteSubTopic, addQuestion } = useQuestionStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: subTopic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    updateSubTopic(topicId, subTopic.id, { title: editTitle });
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700 shadow-sm transition-all ${
        isDragging ? "z-50 shadow-md ring-2 ring-indigo-400" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-t-lg">
        <button
          {...attributes}
          {...listeners}
          className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
        >
          <GripVertical size={16} />
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        <div className="flex-1 font-medium text-gray-700 dark:text-gray-300">
          {isEditing ? (
            <input
              autoFocus
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full bg-transparent border-b border-indigo-500 focus:outline-none py-0.5 text-sm"
            />
          ) : (
            <span onDoubleClick={() => setIsEditing(true)}>{subTopic.title}</span>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-zinc-700 rounded transition"
            title="Edit Sub-Topic"
          >
            {isEditing ? <Check size={14} /> : <Edit2 size={14} />}
          </button>
          
          <button
            onClick={() => addQuestion(topicId, subTopic.id, "New Question")}
            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-zinc-700 rounded transition"
            title="Add Question"
          >
            <Plus size={14} />
          </button>

          <button
            onClick={() => deleteSubTopic(topicId, subTopic.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-zinc-700 rounded transition"
            title="Delete Sub-Topic"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-b-lg">
           <QuestionList topicId={topicId} subTopicId={subTopic.id} questions={subTopic.questions} />
        </div>
      )}
    </div>
  );
};

export default SubTopicItem;

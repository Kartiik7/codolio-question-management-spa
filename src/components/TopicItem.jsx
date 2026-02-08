import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, GripVertical, Trash2, Edit2, Check, Plus } from "lucide-react";
import useQuestionStore from "../store/useQuestionStore";
import SubTopicList from "./SubTopicList";

const TopicItem = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(topic.title);
  const { updateTopic, deleteTopic, addSubTopic } = useQuestionStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    updateTopic(topic.id, { title: editTitle });
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm transition-all ${
        isDragging ? "z-50 shadow-lg ring-2 ring-indigo-500" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-zinc-700/50">
        <button
          {...attributes}
          {...listeners}
          className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
        >
          <GripVertical size={20} />
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
        >
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              {isEditing ? (
                <input
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="w-full bg-transparent border-b-2 border-indigo-500 focus:outline-none py-1"
                />
              ) : (
                <span onDoubleClick={() => setIsEditing(true)}>{topic.title}</span>
              )}
            </div>
            {/* Progress Badge */}
             <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
                {Math.round((topic.subTopics.reduce((acc, sub) => acc + sub.questions.filter(q => q.status === 'done').length, 0) / 
                  Math.max(1, topic.subTopics.reduce((acc, sub) => acc + sub.questions.length, 0))) * 100)}%
             </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-xs mt-1 h-1.5 bg-gray-100 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{ 
                width: `${Math.round((topic.subTopics.reduce((acc, sub) => acc + sub.questions.filter(q => q.status === 'done').length, 0) / 
                  Math.max(1, topic.subTopics.reduce((acc, sub) => acc + sub.questions.length, 0))) * 100)}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-zinc-700 rounded-lg transition"
            title="Edit Topic"
          >
            {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
          </button>
          
          <button
            onClick={() => addSubTopic(topic.id, "New Sub-Topic")}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-zinc-700 rounded-lg transition"
            title="Add Sub-Topic"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={() => deleteTopic(topic.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-zinc-700 rounded-lg transition"
            title="Delete Topic"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="p-4 pt-2 bg-gray-50/50 dark:bg-zinc-800/50 rounded-b-xl">
           <SubTopicList topicId={topic.id} subTopics={topic.subTopics} />
        </div>
      )}
    </div>
  );
};

export default TopicItem;

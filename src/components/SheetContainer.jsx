import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useQuestionStore from "../store/useQuestionStore";
import TopicList from "./TopicList";
import { Plus } from "lucide-react";
import { createPortal } from "react-dom";
import TopicItem from "./TopicItem";
import SubTopicItem from "./SubTopicItem";
import QuestionItem from "./QuestionItem";
import SkeletonLoader from "./SkeletonLoader";
import Dashboard from "./Dashboard";
import SearchBar from "./SearchBar";

const SheetContainer = () => {
  const {
    topics,
    initialize,
    isLoading,
    error,
    addTopic,
    reorderTopics,
    reorderSubTopics,
    reorderQuestions,
  } = useQuestionStore();

  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Derived state for filtering
  const filteredTopics = React.useMemo(() => {
    if (!searchTerm && filterStatus === 'all') return topics;

    const lowerTerm = searchTerm.toLowerCase();

    return topics.map(topic => {
      // Check if topic matches
      const topicMatches = topic.title.toLowerCase().includes(lowerTerm);
      
      // Filter subtopics and questions
      const filteredSubTopics = topic.subTopics.map(sub => {
         const subMatches = sub.title.toLowerCase().includes(lowerTerm);
         
         const filteredQuestions = sub.questions.filter(q => {
             const textMatches = q.text.toLowerCase().includes(lowerTerm);
             const statusMatches = filterStatus === 'all' || q.status === filterStatus;
             return (textMatches || topicMatches || subMatches) && statusMatches;
         });

         if (filteredQuestions.length > 0) {
             return { ...sub, questions: filteredQuestions };
         }
         return null;
      }).filter(Boolean);

      if (filteredSubTopics.length > 0) {
          return { ...topic, subTopics: filteredSubTopics };
      }
      return null;
    }).filter(Boolean);
  }, [topics, searchTerm, filterStatus]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findItem = (id) => {
    // Search in topics
    const topic = topics.find((t) => t.id === id);
    if (topic) return { type: "topic", item: topic, topicId: topic.id };

    // Search in subtopics
    for (const t of topics) {
      const sub = t.subTopics.find((s) => s.id === id);
      if (sub) return { type: "subTopic", item: sub, topicId: t.id, subTopicId: sub.id };
    }

    // Search in questions
    for (const t of topics) {
      for (const s of t.subTopics) {
        const q = s.questions.find((q) => q.id === id);
        if (q) return { type: "question", item: q, topicId: t.id, subTopicId: s.id, questionId: q.id };
      }
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    const found = findItem(active.id);
    if (found) setActiveItem(found);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // Reset active state
    setActiveId(null);
    setActiveItem(null);

    if (!over) return;

    if (active.id !== over.id) {
       const activeFound = findItem(active.id);
       const overFound = findItem(over.id);

       if (!activeFound || !overFound) return;

       // Reorder Topics
       if (activeFound.type === 'topic' && overFound.type === 'topic') {
         reorderTopics(active.id, over.id);
       } 
       // Reorder SubTopics (must be in same topic)
       else if (activeFound.type === 'subTopic' && overFound.type === 'subTopic') {
         if (activeFound.topicId === overFound.topicId) {
             reorderSubTopics(activeFound.topicId, active.id, over.id);
         }
       }
       // Reorder Questions (must be in same subtopic)
       else if (activeFound.type === 'question' && overFound.type === 'question') {
           if (activeFound.subTopicId === overFound.subTopicId) {
             reorderQuestions(activeFound.topicId, activeFound.subTopicId, active.id, over.id);
           }
       }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8 font-sans transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex justify-between items-center bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700/50">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                DSA Tracker
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your daily goals and questions. Drag to reorder.
              </p>
            </div>
            <button
              onClick={() => addTopic("New Topic")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Plus size={20} />
              Add Topic
            </button>
          </header>

          <main className="space-y-6 pb-20">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <>
                <Dashboard />
                
                <SearchBar 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                />

                {filteredTopics.length > 0 ? (
                  <TopicList topics={filteredTopics} />
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p className="text-lg">No questions found matching your search.</p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

       {createPortal(
        <DragOverlay>
          {activeItem && activeItem.type === 'topic' && (
             <TopicItem topic={activeItem.item} />
          )}
          {activeItem && activeItem.type === 'subTopic' && (
             <SubTopicItem topicId={activeItem.topicId} subTopic={activeItem.item} />
          )}
          {activeItem && activeItem.type === 'question' && (
             <QuestionItem topicId={activeItem.topicId} subTopicId={activeItem.subTopicId} question={activeItem.item} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default SheetContainer;

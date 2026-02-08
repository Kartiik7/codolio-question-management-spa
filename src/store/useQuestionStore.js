import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";
import { initialData } from "../utils/initialData";
import { fetchSheetData } from "../api/sheetApi";
import { normalizeSheetData } from "../utils/normalizeData";

const useQuestionStore = create((set) => ({
  topics: [],
  isLoading: false,
  error: null,

  // --- Initialization ---
  initialize: async () => {
    set({ isLoading: true, error: null });

    // 1. Try Local Storage
    const saved = localStorage.getItem("sheet-data");
    if (saved) {
      try {
        set({ topics: JSON.parse(saved), isLoading: false });
        return;
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }

    // 2. Try API
    try {
      const apiData = await fetchSheetData();
      const normalized = normalizeSheetData(apiData);
      set({ topics: normalized, isLoading: false });
      localStorage.setItem("sheet-data", JSON.stringify(normalized));
    } catch (error) {
      console.error("API Error:", error);
      set({ 
        topics: initialData, 
        isLoading: false, 
        error: "Failed to load from API. Using local offline data." 
      });
    }
  },

  saveData: () => {
    set((state) => {
      localStorage.setItem("sheet-data", JSON.stringify(state.topics));
      return state;
    });
  },

  resetData: () => {
    set({ topics: [], isLoading: true });
    localStorage.removeItem("sheet-data");
    // Trigger re-initialization
    // We can just call initialData import, but better to re-fetch to get fresh API data
    window.location.reload(); 
  },

  // --- Topic CRUD ---
  addTopic: (title) =>
    set((state) => {
      const newTopic = {
        id: uuidv4(),
        title,
        subTopics: [],
      };
      const newTopics = [...state.topics, newTopic];
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  updateTopic: (id, updates) =>
    set((state) => {
      const newTopics = state.topics.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  deleteTopic: (id) =>
    set((state) => {
      const newTopics = state.topics.filter((t) => t.id !== id);
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  reorderTopics: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.topics.findIndex((t) => t.id === activeId);
      const newIndex = state.topics.findIndex((t) => t.id === overId);
      const newTopics = arrayMove(state.topics, oldIndex, newIndex);
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  // --- SubTopic CRUD ---
  addSubTopic: (topicId, title) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            subTopics: [
              ...t.subTopics,
              { id: uuidv4(), title, questions: [] },
            ],
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  updateSubTopic: (topicId, subTopicId, updates) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            subTopics: t.subTopics.map((s) =>
              s.id === subTopicId ? { ...s, ...updates } : s
            ),
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  deleteSubTopic: (topicId, subTopicId) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            subTopics: t.subTopics.filter((s) => s.id !== subTopicId),
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  reorderSubTopics: (topicId, activeId, overId) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          const oldIndex = t.subTopics.findIndex((s) => s.id === activeId);
          const newIndex = t.subTopics.findIndex((s) => s.id === overId);
          return {
            ...t,
            subTopics: arrayMove(t.subTopics, oldIndex, newIndex),
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  // --- Question CRUD ---
  addQuestion: (topicId, subTopicId, text) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            subTopics: t.subTopics.map((s) => {
              if (s.id === subTopicId) {
                return {
                  ...s,
                  questions: [
                    ...s.questions,
                    { id: uuidv4(), text, status: "todo" },
                  ],
                };
              }
              return s;
            }),
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  updateQuestion: (topicId, subTopicId, questionId, updates) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            subTopics: t.subTopics.map((s) => {
              if (s.id === subTopicId) {
                return {
                  ...s,
                  questions: s.questions.map((q) =>
                    q.id === questionId ? { ...q, ...updates } : q
                  ),
                };
              }
              return s;
            }),
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  deleteQuestion: (topicId, subTopicId, questionId) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            subTopics: t.subTopics.map((s) => {
              if (s.id === subTopicId) {
                return {
                  ...s,
                  questions: s.questions.filter((q) => q.id !== questionId),
                };
              }
              return s;
            }),
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),

  reorderQuestions: (topicId, subTopicId, activeId, overId) =>
    set((state) => {
      const newTopics = state.topics.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            subTopics: t.subTopics.map((s) => {
              if (s.id === subTopicId) {
                const oldIndex = s.questions.findIndex((q) => q.id === activeId);
                const newIndex = s.questions.findIndex((q) => q.id === overId);
                return {
                  ...s,
                  questions: arrayMove(s.questions, oldIndex, newIndex),
                };
              }
              return s;
            }),
          };
        }
        return t;
      });
      localStorage.setItem("sheet-data", JSON.stringify(newTopics));
      return { topics: newTopics };
    }),
}));

export default useQuestionStore;

# Codolio Task – Interactive Question Management Sheet

An interactive single-page application built as a **task from Codolio**.  
The application allows users to manage a hierarchical set of questions organized by **topics** and **sub-topics**, with full CRUD support and drag-and-drop reordering.

The project focuses on clean UI, efficient state management, and smooth user experience for large, nested data sets.

---

## ✨ Features

- Hierarchical structure: **Topics → Sub-topics → Questions**
- Create, edit, and delete:
  - Topics
  - Sub-topics
  - Questions
- Drag-and-drop reordering at all levels
- Optimized rendering for smooth performance
- Loading skeletons for better UX during data fetch
- Search functionality for quick filtering (if enabled)
- Responsive and clean UI

---

## 🛠️ Tech Stack

- **React** – Single Page Application (SPA)
- **Zustand** – State management
- **Tailwind CSS** – Styling
- **Vite** – Build tool
- **Netlify** – Deployment

---

## 🔌 API Integration

The application fetches initial data using the following public API (as referenced in the task):
GET https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet


- The API is used to populate the initial state of the application.
- All subsequent **CRUD operations** are handled locally via state management (no database required), as allowed by the task instructions.

---

## 📂 Project Structure

```text
src/
├── api/
│ └── sheetApi.js
├── components/
│ ├── Dashboard.jsx
│ ├── TopicList.jsx
│ ├── TopicItem.jsx
│ ├── SubTopicList.jsx
│ ├── SubTopicItem.jsx
│ ├── QuestionList.jsx
│ ├── QuestionItem.jsx
│ ├── SearchBar.jsx
│ ├── SkeletonLoader.jsx
│ └── SortableItem.jsx
├── store/
│ └── useQuestionStore.js
├── utils/
│ ├── initialData.js
│ ├── normalizeData.js
│ └── reorderHelpers.js
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm or yarn

### Installation

```bash
git clone https://github.com/Kartiik7/codolio-question-management-spa
cd codolio-task-interactive-question-sheet
npm install
```

### Run Locally

```bash
npm run dev
```

The app will be available at:

http://localhost:5173

---

## 🌐 Live Demo
[https://codoliotask.kartikpatel.tech](https://codoliotask.kartikpatel.tech)
or 
[https://codoliotask-question-sheet.netlify.app/](https://codoliotask-question-sheet.netlify.app/)

---

## 📌 Notes & Assumptions

- The task mentioned using sample data attached via email. Since no dataset was received, the application initializes data using the provided API reference.
- Backend persistence was not required; all updates are handled in-memory using state management.
- UI design follows a Codolio-style sheet layout, with flexibility as allowed by the task.

---

## ⭐ Bonus Enhancements

- **Performance optimizations** using memoization
- **Conditional rendering** to reduce unnecessary DOM updates
- **Clean and scalable** component architecture

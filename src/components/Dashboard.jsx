import React from 'react';
import useQuestionStore from '../store/useQuestionStore';
import { RotateCcw, CheckCircle, ListTodo, BrainCircuit } from 'lucide-react';

const Dashboard = () => {
  const { topics, resetData } = useQuestionStore();

  const totalQuestions = topics.reduce(
    (acc, topic) => acc + topic.subTopics.reduce((sAcc, sub) => sAcc + sub.questions.length, 0),
    0
  );

  const completedQuestions = topics.reduce(
    (acc, topic) => acc + topic.subTopics.reduce((sAcc, sub) => sAcc + sub.questions.filter(q => q.status === 'done').length, 0),
    0
  );

  const progress = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-zinc-700/50 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Progress Circle & Title */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="relative h-20 w-20 flex-shrink-0">
             <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-100 dark:text-zinc-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                  strokeDasharray={`${progress}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{progress}%</span>
             </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Keep pushing! You're doing great.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 w-full md:w-auto flex-1 max-w-lg">
           <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl flex flex-col items-center">
              <BrainCircuit className="text-indigo-600 dark:text-indigo-400 mb-1" size={20} />
              <span className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{totalQuestions}</span>
              <span className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Total</span>
           </div>
           <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl flex flex-col items-center">
              <CheckCircle className="text-green-600 dark:text-green-400 mb-1" size={20} />
              <span className="text-xl font-bold text-green-700 dark:text-green-300">{completedQuestions}</span>
              <span className="text-xs text-green-600/70 dark:text-green-400/70">Done</span>
           </div>
           <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl flex flex-col items-center">
              <ListTodo className="text-amber-600 dark:text-amber-400 mb-1" size={20} />
              <span className="text-xl font-bold text-amber-700 dark:text-amber-300">{totalQuestions - completedQuestions}</span>
              <span className="text-xs text-amber-600/70 dark:text-amber-400/70">Todo</span>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                if(window.confirm("Are you sure? This will reset all your progress and reload the page.")) {
                  resetData();
                }
              }} 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
              Reset Progress
            </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 dark:text-gray-200"
        />
      </div>
      
      <div className="flex bg-white dark:bg-zinc-800 p-1 rounded-xl border border-gray-200 dark:border-zinc-700">
        <button
          onClick={() => setFilterStatus('all')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterStatus === 'all' 
              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
              : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('done')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterStatus === 'done' 
              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
              : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-700'
          }`}
        >
          Done
        </button>
        <button
          onClick={() => setFilterStatus('todo')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterStatus === 'todo' 
              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' 
              : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-700'
          }`}
        >
          Todo
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

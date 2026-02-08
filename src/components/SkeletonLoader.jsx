import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm p-4"
        >
          {/* Topic Title Skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-1/3"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>

          {/* Subtopic/Questions Skeleton */}
          <div className="space-y-3 pl-4 border-l-2 border-gray-100 dark:border-zinc-700">
            <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-1/4 mb-2"></div>
            {[1, 2].map((j) => (
              <div key={j} className="flex items-center gap-3 py-2">
                 <div className="h-5 w-5 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                 <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

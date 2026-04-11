"use client";

import { useProgressStore, selectModuleProgress } from "@/lib/store";

export default function ProgressBar({
  moduleId,
  totalLessons,
}: {
  moduleId: number;
  totalLessons: number;
}) {
  const progress = useProgressStore((s) => selectModuleProgress(s, moduleId));
  const totalItems = totalLessons + 1; // lessons + quiz
  const completedItems =
    progress.lessons.length + (progress.quizPassed ? 1 : 0);
  const percent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-medium text-mid shrink-0">
        {percent}%
      </span>
    </div>
  );
}

"use client";

import Link from "next/link";
import { modules } from "@/lib/curriculum";
import { useProgressStore, selectModuleProgress } from "@/lib/store";

export default function Sidebar({
  activeModuleId,
}: {
  activeModuleId: number;
}) {
  const storeState = useProgressStore();

  return (
    <aside className="w-[260px] shrink-0 border-r border-gray-200 bg-white h-full overflow-y-auto hidden lg:block">
      <div className="p-5">
        <Link href="/learn" className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          <span className="font-display font-bold text-lg text-dark">
            LearnClaude
          </span>
        </Link>

        <nav className="space-y-1">
          {modules.map((mod) => {
            const progress = selectModuleProgress(storeState, mod.id);
            const totalItems = mod.lessons.length + 1;
            const completedItems =
              progress.lessons.length + (progress.quizPassed ? 1 : 0);
            const percent = Math.round((completedItems / totalItems) * 100);
            const isActive = mod.id === activeModuleId;

            return (
              <Link
                key={mod.id}
                href={`/learn/${mod.id}`}
                className={`block rounded-lg p-3 transition-colors ${
                  isActive
                    ? "bg-accent/10 border border-accent/20"
                    : "hover:bg-surface"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-accent text-white"
                        : "bg-surface text-mid"
                    }`}
                  >
                    {String(mod.id).padStart(2, "0")}
                  </span>
                  {percent === 100 && (
                    <span className="text-accent text-xs">&#10003;</span>
                  )}
                </div>
                <p
                  className={`text-sm font-medium leading-snug ${
                    isActive ? "text-dark" : "text-mid"
                  }`}
                >
                  {mod.title}
                </p>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

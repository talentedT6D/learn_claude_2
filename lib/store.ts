"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ModuleProgress {
  lessons: number[];
  quizPassed: boolean;
}

interface ProgressStore {
  modules: Record<number, ModuleProgress>;
  completeLesson: (moduleId: number, lessonIndex: number) => void;
  passQuiz: (moduleId: number) => void;
}

const DEFAULT_PROGRESS: ModuleProgress = { lessons: [], quizPassed: false };

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      modules: {},
      completeLesson: (moduleId, lessonIndex) =>
        set((state) => {
          const current = state.modules[moduleId] ?? DEFAULT_PROGRESS;
          if (current.lessons.includes(lessonIndex)) return state;
          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                ...current,
                lessons: [...current.lessons, lessonIndex],
              },
            },
          };
        }),
      passQuiz: (moduleId) =>
        set((state) => {
          const current = state.modules[moduleId] ?? DEFAULT_PROGRESS;
          return {
            modules: {
              ...state.modules,
              [moduleId]: { ...current, quizPassed: true },
            },
          };
        }),
    }),
    { name: "learn-claude-progress" }
  )
);

/** Stable selector — returns the stored object or a frozen default. */
export function selectModuleProgress(
  state: ProgressStore,
  moduleId: number
): ModuleProgress {
  return state.modules[moduleId] ?? DEFAULT_PROGRESS;
}

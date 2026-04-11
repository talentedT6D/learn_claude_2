"use client";

import { useState } from "react";
import { useProgressStore, selectModuleProgress } from "@/lib/store";

interface QuizProps {
  quiz: { question: string; options: string[]; correct: number };
  moduleId: number;
}

export default function QuizSection({ quiz, moduleId }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const passQuiz = useProgressStore((s) => s.passQuiz);
  const quizPassed = useProgressStore(
    (s) => selectModuleProgress(s, moduleId).quizPassed
  );

  const handleSelect = (index: number) => {
    if (selected !== null) return; // locked after first answer
    setSelected(index);
    if (index === quiz.correct) {
      passQuiz(moduleId);
    }
  };

  const reset = () => setSelected(null);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-accent text-lg">&#9733;</span>
        <h3 className="font-display font-bold text-dark">Knowledge Check</h3>
        {quizPassed && (
          <span className="text-xs bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-full ml-auto">
            Passed
          </span>
        )}
      </div>
      <p className="text-sm text-dark mb-4">{quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((opt, i) => {
          let style = "border-gray-200 hover:border-accent/40";
          if (selected !== null) {
            if (i === quiz.correct) style = "border-accent bg-accent/5";
            else if (i === selected)
              style = "border-red-400 bg-red-50";
            else style = "border-gray-100 opacity-60";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left rounded-lg border p-3 text-sm transition-all ${style}`}
            >
              <span className="font-medium text-mid mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && selected !== quiz.correct && (
        <button
          onClick={reset}
          className="mt-3 text-xs text-accent hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}

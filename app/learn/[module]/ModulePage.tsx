"use client";

import { useState } from "react";
import { Module } from "@/lib/curriculum";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import LessonGrid from "@/components/LessonGrid";
import QuizSection from "@/components/QuizSection";
import ChatPanel from "@/components/ChatPanel";
import VideoPanel from "@/components/VideoPanel";
import ModuleIllustration from "@/components/ModuleIllustration";
import ProgressBar from "@/components/ProgressBar";

export default function ModulePage({ mod }: { mod: Module }) {
  const [rightTab, setRightTab] = useState<"chat" | "videos">("chat");

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top bar */}
      <header className="h-14 shrink-0 border-b border-gray-200 bg-white flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">LC</span>
          </div>
          <span className="font-display font-bold text-sm text-dark hidden sm:inline">
            LearnClaude
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">
            Module {String(mod.id).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* Mobile nav */}
      <MobileNav activeModuleId={mod.id} />

      {/* Main grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeModuleId={mod.id} />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Module header */}
            <ModuleIllustration moduleId={mod.id} />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                  {mod.badge}
                </span>
                <span className="text-xs text-mid">{mod.duration}</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-dark mb-2">
                {mod.title}
              </h1>
              <ProgressBar
                moduleId={mod.id}
                totalLessons={mod.lessons.length}
              />
            </div>

            {/* Lessons */}
            <section>
              <h2 className="font-display font-bold text-lg text-dark mb-3">
                Lessons
              </h2>
              <LessonGrid lessons={mod.lessons} moduleId={mod.id} />
            </section>

            {/* Quiz */}
            <section>
              <QuizSection quiz={mod.quiz} moduleId={mod.id} />
            </section>
          </div>
        </main>

        {/* Right panel */}
        <aside className="w-[320px] shrink-0 border-l border-gray-200 bg-white hidden md:flex flex-col">
          {/* Tab switcher */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setRightTab("chat")}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                rightTab === "chat"
                  ? "text-accent border-b-2 border-accent"
                  : "text-mid hover:text-dark"
              }`}
            >
              Claude Tutor
            </button>
            <button
              onClick={() => setRightTab("videos")}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                rightTab === "videos"
                  ? "text-accent border-b-2 border-accent"
                  : "text-mid hover:text-dark"
              }`}
            >
              Videos
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {rightTab === "chat" ? (
              <ChatPanel moduleTitle={mod.title} />
            ) : (
              <VideoPanel moduleTitle={mod.title} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

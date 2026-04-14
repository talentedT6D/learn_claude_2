"use client";

import { Lesson } from "@/lib/curriculum";
import { useProgressStore, selectModuleProgress } from "@/lib/store";

export default function LessonGrid({
  lessons,
  moduleId,
  openLesson,
  onOpenLessonChange,
}: {
  lessons: Lesson[];
  moduleId: number;
  openLesson: number | null;
  onOpenLessonChange: (index: number | null) => void;
}) {
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const progress = useProgressStore((s) => selectModuleProgress(s, moduleId));

  const handleClick = (index: number) => {
    if (openLesson === index) {
      onOpenLessonChange(null);
    } else {
      onOpenLessonChange(index);
      completeLesson(moduleId, index);
    }
  };

  return (
    <div className="space-y-3">
      {/* Grid of lesson cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lessons.map((lesson, i) => {
          const completed = progress.lessons.includes(i);
          const isOpen = openLesson === i;
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                isOpen
                  ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                  : completed
                    ? "border-accent/30 bg-accent/5"
                    : "border-gray-200 bg-white hover:border-accent/40 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-mid bg-surface rounded-full px-2 py-0.5">
                  Lesson {i + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  {completed && (
                    <span className="text-accent text-sm font-bold">
                      &#10003;
                    </span>
                  )}
                  <span
                    className={`text-xs text-mid transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    &#9660;
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-dark text-sm mb-1">
                {lesson.title}
              </h3>
              <p className="text-xs text-mid leading-relaxed">
                {lesson.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Expanded lesson content panel */}
      {openLesson !== null && (
        <div className="rounded-xl border border-accent/20 bg-white overflow-hidden animate-in fade-in duration-200">
          <div className="bg-accent/5 border-b border-accent/10 px-6 py-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-accent bg-accent/10 rounded-full px-2 py-0.5">
                Lesson {openLesson + 1}
              </span>
              <h3 className="font-display font-bold text-dark text-lg mt-1">
                {lessons[openLesson].title}
              </h3>
            </div>
            <button
              onClick={() => onOpenLessonChange(null)}
              className="text-mid hover:text-dark text-lg px-2"
              aria-label="Close lesson"
            >
              &#10005;
            </button>
          </div>
          <div className="px-6 py-5">
            <LessonContent content={lessons[openLesson].content} />
          </div>
        </div>
      )}
    </div>
  );
}

/** Renders lesson content with basic markdown-like formatting */
function LessonContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = "";
  let key = 0;

  const flushCode = () => {
    if (codeLines.length > 0) {
      elements.push(
        <div key={key++} className="my-4 rounded-xl overflow-hidden">
          <div className="bg-[#181825] px-4 py-2">
            <span className="text-xs text-gray-400 font-mono">{codeLang}</span>
          </div>
          <pre className="code-block !rounded-t-none !mt-0 text-[13px] leading-relaxed">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      codeLines = [];
      codeLang = "";
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        flushCode();
      } else {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      continue;
    }

    // Headings
    if (line.startsWith("**") && line.endsWith("**") && !line.includes("**", 2)) {
      elements.push(
        <h4
          key={key++}
          className="font-display font-bold text-dark text-base mt-6 mb-2"
        >
          {line.replace(/\*\*/g, "")}
        </h4>
      );
      continue;
    }

    // Table rows
    if (line.startsWith("|")) {
      // Collect all table rows
      const tableRows: string[] = [line];
      while (i + 1 < lines.length && lines[i + 1].startsWith("|")) {
        i++;
        tableRows.push(lines[i]);
      }
      // Filter out separator rows
      const dataRows = tableRows.filter((r) => !r.match(/^\|[\s-:|]+\|$/));
      if (dataRows.length > 0) {
        const headerCells = dataRows[0]
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim());
        const bodyRows = dataRows.slice(1);
        elements.push(
          <div key={key++} className="my-4 overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  {headerCells.map((cell, ci) => (
                    <th
                      key={ci}
                      className="text-left px-3 py-2 text-xs font-medium text-dark border-b border-gray-200"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => {
                  const cells = row
                    .split("|")
                    .filter((c) => c.trim())
                    .map((c) => c.trim());
                  return (
                    <tr
                      key={ri}
                      className={ri % 2 === 1 ? "bg-surface/50" : ""}
                    >
                      {cells.map((cell, ci) => (
                        <td
                          key={ci}
                          className="px-3 py-2 text-xs text-mid border-b border-gray-100"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Bullet points
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [line.slice(2)];
      while (
        i + 1 < lines.length &&
        (lines[i + 1].startsWith("- ") || lines[i + 1].startsWith("* "))
      ) {
        i++;
        items.push(lines[i].slice(2));
      }
      elements.push(
        <ul key={key++} className="my-3 space-y-1.5 pl-4">
          {items.map((item, ii) => (
            <li
              key={ii}
              className="text-sm text-mid leading-relaxed list-disc"
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [line.replace(/^\d+\.\s/, "")];
      while (i + 1 < lines.length && /^\d+\.\s/.test(lines[i + 1])) {
        i++;
        items.push(lines[i].replace(/^\d+\.\s/, ""));
      }
      elements.push(
        <ol key={key++} className="my-3 space-y-1.5 pl-4">
          {items.map((item, ii) => (
            <li
              key={ii}
              className="text-sm text-mid leading-relaxed list-decimal"
            >
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-sm text-mid leading-relaxed my-2">
        {renderInline(line)}
      </p>
    );
  }

  flushCode();

  return <div>{elements}</div>;
}

/** Renders inline markdown: **bold**, `code`, and mixed text */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Match **bold**, `code`, or plain text
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  let partKey = 0;

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={partKey++} className="font-semibold text-dark">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={partKey++}
          className="bg-surface text-accent font-mono text-xs px-1.5 py-0.5 rounded"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

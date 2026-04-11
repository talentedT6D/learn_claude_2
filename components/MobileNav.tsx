"use client";

import Link from "next/link";
import { modules } from "@/lib/curriculum";

export default function MobileNav({
  activeModuleId,
}: {
  activeModuleId: number;
}) {
  return (
    <div className="lg:hidden border-b border-gray-200 bg-white overflow-x-auto">
      <div className="flex gap-1 p-2 min-w-max">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={`/learn/${mod.id}`}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              mod.id === activeModuleId
                ? "bg-accent text-white"
                : "bg-surface text-mid hover:bg-gray-200"
            }`}
          >
            {String(mod.id).padStart(2, "0")} {mod.title.split(" ").slice(0, 2).join(" ")}
          </Link>
        ))}
      </div>
    </div>
  );
}

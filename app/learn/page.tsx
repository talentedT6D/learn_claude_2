import Link from "next/link";
import { modules } from "@/lib/curriculum";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-dark">
              LearnClaude
            </h1>
            <p className="text-xs text-mid">AI Curriculum Platform</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full mb-4">
            6 Modules &middot; 23 Lessons &middot; Built-in AI Tutor
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-dark mb-3">
            Learn to Build with Claude
          </h2>
          <p className="text-mid text-base max-w-xl mx-auto">
            A structured curriculum for marketers, designers, and creatives who
            want to understand and use Claude&apos;s API — no prior coding
            experience required.
          </p>
        </div>
      </section>

      {/* Module Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => {
            const gradients: Record<number, string> = {
              1: "from-accent/20 to-accent/5",
              2: "from-blue/20 to-blue/5",
              3: "from-purple-200 to-purple-50",
              4: "from-orange-200 to-orange-50",
              5: "from-cyan-200 to-cyan-50",
              6: "from-yellow-200 to-yellow-50",
            };
            const icons: Record<number, string> = {
              1: "\u{1F680}",
              2: "\u2699\uFE0F",
              3: "\u{1F3A8}",
              4: "\u{1F4E7}",
              5: "\u{1F4CA}",
              6: "\u{1F3C6}",
            };
            return (
              <Link
                key={mod.id}
                href={`/learn/${mod.id}`}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md hover:border-accent/30 transition-all"
              >
                <div
                  className={`h-28 bg-gradient-to-br ${gradients[mod.id]} flex items-center justify-center`}
                >
                  <span className="text-4xl">{icons[mod.id]}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-surface text-mid px-2 py-0.5 rounded-full">
                      Module {String(mod.id).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-mid">{mod.duration}</span>
                  </div>
                  <h3 className="font-display font-bold text-dark text-base mb-1 group-hover:text-accent transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-mid">
                    {mod.lessons.length} lessons &middot; {mod.badge}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

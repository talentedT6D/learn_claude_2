export default function ModuleIllustration({
  moduleId,
}: {
  moduleId: number;
}) {
  const illustrations: Record<number, { icon: string; bg: string }> = {
    1: { icon: "&#x1F680;", bg: "from-accent/20 to-accent/5" },
    2: { icon: "&#x2699;", bg: "from-blue/20 to-blue/5" },
    3: { icon: "&#x1F3A8;", bg: "from-purple-200 to-purple-50" },
    4: { icon: "&#x1F4E7;", bg: "from-orange-200 to-orange-50" },
    5: { icon: "&#x1F4CA;", bg: "from-cyan-200 to-cyan-50" },
    6: { icon: "&#x1F3C6;", bg: "from-yellow-200 to-yellow-50" },
  };

  const item = illustrations[moduleId] ?? illustrations[1];

  return (
    <div
      className={`w-full h-32 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center`}
    >
      <span
        className="text-5xl"
        dangerouslySetInnerHTML={{ __html: item.icon }}
      />
    </div>
  );
}

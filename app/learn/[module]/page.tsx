import { notFound } from "next/navigation";
import { modules } from "@/lib/curriculum";
import ModulePage from "./ModulePage";

export function generateStaticParams() {
  return modules.map((mod) => ({ module: String(mod.id) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleParam } = await params;
  const moduleId = parseInt(moduleParam, 10);
  const mod = modules.find((m) => m.id === moduleId);

  if (!mod) notFound();

  return <ModulePage mod={mod} />;
}

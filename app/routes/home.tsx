import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fluorite Labs — Estúdio Digital" },
    {
      name: "description",
      content:
        "Estúdio digital focado em experiências web de alto impacto, arquitetura moderna e design de precisão.",
    },
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[#9494a8]">
          Fluorite Labs
        </p>
        <h1 className="text-3xl font-light tracking-tight text-[#f5f5f7]">
          Fundação Técnica Inicializada
        </h1>
        <p className="text-sm text-[#5e5e72]">
          M0 — FND-001 Toolchain canônica ativa.
        </p>
      </div>
    </main>
  );
}

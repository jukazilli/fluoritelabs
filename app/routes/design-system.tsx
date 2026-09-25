import type { Route } from "./+types/design-system";

export function meta(_args?: Route.MetaArgs) {
  return [
    { title: "Design System & Tokens — Fluorite Labs" },
    {
      name: "description",
      content:
        "Especificação técnica e sandbox de tokens visuais, tipografia e componentes do Design System da Fluorite Labs.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function DesignSystem() {
  const baseDarkColors = [
    {
      name: "Obsidian Black",
      hex: "#05070B",
      desc: "Fundo principal (80% da área)",
      varName: "--color-obsidian-black",
    },
    {
      name: "Deep Charcoal",
      hex: "#0A0E14",
      desc: "Superfícies secundárias e cards",
      varName: "--color-deep-charcoal",
    },
    {
      name: "Soft White",
      hex: "#F5F7FA",
      desc: "Texto principal no dark mode",
      varName: "--color-soft-white",
    },
    {
      name: "Muted Silver",
      hex: "#A8B0BC",
      desc: "Texto secundário e micro labels",
      varName: "--color-muted-silver",
    },
  ];

  const fluoriteAccents = [
    {
      name: "Fluorite Violet",
      hex: "#8C72FF",
      desc: "Acento primário violeta",
      varName: "--color-fluorite-violet",
    },
    {
      name: "Crystal Lilac",
      hex: "#C7B8FF",
      desc: "Refração luminosa lilás",
      varName: "--color-crystal-lilac",
    },
    {
      name: "Emerald Teal",
      hex: "#62E7D6",
      desc: "Refração esmeralda / teal",
      varName: "--color-emerald-teal",
    },
    {
      name: "Ice Cyan",
      hex: "#A8F2FF",
      desc: "Brilho e dispersão prismática",
      varName: "--color-ice-cyan",
    },
    {
      name: "Deep Indigo Glow",
      hex: "#3C4C9E",
      desc: "Halo de profundidade e sombra",
      varName: "--color-deep-indigo-glow",
    },
  ];

  const editorialLightColors = [
    {
      name: "Editorial White",
      hex: "#F7F7F5",
      desc: "Fundo jornal/leitura",
      varName: "--color-editorial-white",
    },
    {
      name: "Editorial Warm White",
      hex: "#F2F1ED",
      desc: "Superfície editorial quente",
      varName: "--color-editorial-warm-white",
    },
    {
      name: "Refraction Mist",
      hex: "#EDEAF7",
      desc: "Névoa de acento fluorita",
      varName: "--color-refraction-mist",
    },
    {
      name: "Ink",
      hex: "#111318",
      desc: "Texto principal leitura",
      varName: "--color-ink",
    },
    {
      name: "Ink Muted",
      hex: "#555B66",
      desc: "Texto secundário editorial",
      varName: "--color-ink-muted",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-obsidian-black)] text-[var(--color-soft-white)] font-body py-16 px-6 md:px-16 selection:bg-[var(--color-fluorite-violet)] selection:text-white">
      <div className="max-w-[1280px] mx-auto space-y-24">
        {/* Header */}
        <header className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[var(--color-fluorite-violet)]" />
              <span className="text-micro-overline text-[var(--color-crystal-lilac)]">
                DESIGN SYSTEM CANÔNICO — DOCUMENTO 03
              </span>
            </div>
            <h1 className="text-display-h1 font-medium tracking-tight">
              Tokens Visuais &amp; Tipografia
            </h1>
            <p className="text-body-regular text-[var(--color-muted-silver)] mt-2 max-w-xl">
              Página técnica de validação (VIS-002 e VIS-003) para garantia de fidelidade estrita à
              identidade visual da Fluorite Labs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-emerald-teal">
              <span className="w-2 h-2 rounded-full bg-emerald-teal animate-pulse" />
              TOKENS VALIDADOS
            </span>
            <a
              href="/"
              className="text-xs uppercase tracking-[0.2em] text-muted-silver hover:text-white transition-colors"
            >
              ← Voltar à Home
            </a>
          </div>
        </header>

        {/* Section 1: Base Dark Colors */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-display-h3 font-medium">1. Base Dark (6.1)</h2>
            <span className="text-xs font-mono text-muted-silver">80% da experiência pública</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {baseDarkColors.map((color) => (
              <div
                key={color.name}
                className="glass-card rounded-2xl p-5 border-subtle flex flex-col justify-between h-44"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl border border-white/20 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="font-mono text-xs text-muted-silver">{color.hex}</span>
                </div>
                <div>
                  <h3 className="font-medium text-base text-soft-white">{color.name}</h3>
                  <p className="text-xs text-muted-silver mt-1">{color.desc}</p>
                  <code className="text-[10px] text-white/40 font-mono block mt-2">
                    {color.varName}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Fluorite Accents */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-display-h3 font-medium">
              2. Acentos Fluorita &amp; Refração (6.2 / 6.3)
            </h2>
            <span className="text-xs font-mono text-muted-silver">
              Regra de raridade: ~5% da área
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fluoriteAccents.map((accent) => (
              <div
                key={accent.name}
                className="glass-card rounded-2xl p-5 border-subtle flex flex-col justify-between h-48"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl shadow-lg border border-white/30"
                    style={{
                      backgroundColor: accent.hex,
                      boxShadow: `0 0 20px ${accent.hex}44`,
                    }}
                  />
                  <span className="font-mono text-xs text-muted-silver">{accent.hex}</span>
                </div>
                <div>
                  <h3 className="font-medium text-base text-soft-white">{accent.name}</h3>
                  <p className="text-xs text-muted-silver mt-1">{accent.desc}</p>
                  <code className="text-[10px] text-white/40 font-mono block mt-2">
                    {accent.varName}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Editorial Light Mode */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-display-h3 font-medium">
              3. Modo Editorial Claro (6.4 — FLUOR JOURNAL &amp; Leitura)
            </h2>
            <span className="text-xs font-mono text-muted-silver">Páginas de leitura profunda</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {editorialLightColors.map((color) => (
              <div
                key={color.name}
                className="rounded-2xl p-5 border flex flex-col justify-between h-44"
                style={{
                  backgroundColor: color.hex,
                  borderColor: "rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: color.hex === "#111318" ? "#FFF" : "#111" }}
                  >
                    {color.hex}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-medium text-base"
                    style={{ color: color.hex === "#111318" ? "#FFF" : "#111" }}
                  >
                    {color.name}
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{
                      color: color.hex === "#111318" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                    }}
                  >
                    {color.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Typography Scale */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-display-h3 font-medium">
                4. Hierarquia Tipográfica (7.1 &amp; 8.1)
              </h2>
              <p className="text-xs text-muted-silver mt-1">
                Display: General Sans (500, 600) | Body &amp; UI: Inter (400, 500)
              </p>
            </div>
            <span className="text-xs font-mono text-muted-silver">
              Webfonts com preload &amp; zero CLS
            </span>
          </div>

          <div className="space-y-10">
            {/* Display XL */}
            <div className="space-y-2 border-b border-white/5 pb-8">
              <span className="text-micro-overline text-crystal-lilac">
                Display XL (clamp 48px – 100px, -0.04em, lh 0.95)
              </span>
              <p className="text-display-xl">
                Ideias, <span className="text-refraction-gradient">refratadas</span> em
                experiências.
              </p>
            </div>

            {/* Display H1 */}
            <div className="space-y-2 border-b border-white/5 pb-8">
              <span className="text-micro-overline text-crystal-lilac">
                H1 (clamp 40px – 72px, -0.03em, lh 1.02)
              </span>
              <p className="text-display-h1">Arquitetura digital de alta precisão</p>
            </div>

            {/* Display H2 */}
            <div className="space-y-2 border-b border-white/5 pb-8">
              <span className="text-micro-overline text-crystal-lilac">
                H2 (clamp 28px – 44px, -0.02em, lh 1.08)
              </span>
              <p className="text-display-h2">Clareza estrutural para produtos contemporâneos</p>
            </div>

            {/* Display H3 */}
            <div className="space-y-2 border-b border-white/5 pb-8">
              <span className="text-micro-overline text-crystal-lilac">
                H3 (clamp 20px – 28px, -0.01em, lh 1.15)
              </span>
              <p className="text-display-h3">01 — Estratégia, Design e Engenharia Integrados</p>
            </div>

            {/* Body Large */}
            <div className="space-y-2 border-b border-white/5 pb-8">
              <span className="text-micro-overline text-crystal-lilac">
                Body Large (18px – 26px, -0.01em, lh 1.38)
              </span>
              <p className="text-body-large text-muted-silver max-w-3xl">
                Criamos websites e interfaces para marcas que buscam diferenciação, escala e
                autoridade técnica memorável.
              </p>
            </div>

            {/* Body Regular */}
            <div className="space-y-2 border-b border-white/5 pb-8">
              <span className="text-micro-overline text-crystal-lilac">
                Body Regular (18px, lh 1.55)
              </span>
              <p className="text-body-regular text-muted-silver max-w-2xl">
                A experiência principal transmite luxo sombrio e precisão tecnológica através de
                amplo espaço negativo e tipografia editorial.
              </p>
            </div>

            {/* UI Small & Micro Overline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-micro-overline text-crystal-lilac">
                  UI Small (15px, lh 1.4, tracking 0.02em)
                </span>
                <p className="text-ui-small text-soft-white">
                  Work / Serviços / Processo / Journal / Começar agora
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-micro-overline text-crystal-lilac">
                  Micro Label / Overline (12px, tracking 0.22em, uppercase)
                </span>
                <p className="text-micro-overline text-muted-silver">
                  PRODUTOS DIGITAIS PARA UM AMANHÃ MAIS BRILHANTE
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Buttons & Interactive Components */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-display-h3 font-medium">
              5. Componentes de UI &amp; Botões (11 &amp; 14)
            </h2>
            <p className="text-xs text-muted-silver mt-1">
              Botões pill de alto contraste, glassmorphism controlado e bordas subtis
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="block text-[11px] font-mono text-muted-silver mb-2">
                btn-primary-pill
              </span>
              <a href="#test" className="btn-primary-pill">
                <span>Começar agora</span>
                <span>↗</span>
              </a>
            </div>

            <div>
              <span className="block text-[11px] font-mono text-muted-silver mb-2">
                btn-secondary-pill
              </span>
              <a href="#test" className="btn-secondary-pill">
                <span>Ver projetos</span>
                <span>→</span>
              </a>
            </div>

            <div>
              <span className="block text-[11px] font-mono text-muted-silver mb-2">glass-pill</span>
              <div className="glass-pill px-6 py-2.5 text-sm font-medium text-soft-white inline-flex items-center gap-2">
                <span>Iniciar projeto</span>
                <span className="text-xs">↗</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer className="pt-12 border-t border-white/10 text-center text-xs text-muted-silver">
          Fluorite Labs Design System v1.0.0 — Em estrita conformidade com os Documentos 03, 08 e
          10.
        </footer>
      </div>
    </div>
  );
}

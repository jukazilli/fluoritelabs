import { Link } from "react-router";
import type { Route } from "./+types/privacy";
import { buildSeoMeta } from "../features/seo/metadata.ts";

export function meta(_args?: Route.MetaArgs) {
  return buildSeoMeta({
    title: "Política de Privacidade & Proteção de Dados — Fluorite Labs",
    description:
      "Diretrizes de transparência, proteção e tratamento ético de dados da Fluorite Labs, em estrita conformidade com a LGPD.",
    path: "/privacidade",
  });
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-obsidian-black)] text-[var(--color-soft-white)] font-body selection:bg-[var(--color-fluorite-violet)] selection:text-white">
      {/* Header Navigation */}
      <header className="relative z-30 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-8 flex items-center justify-between border-b border-white/10 pb-6">
        <Link
          to="/"
          className="group flex flex-col focus:outline-none"
          aria-label="Fluorite Labs Home"
        >
          <span className="font-display font-medium text-[1.125rem] tracking-[0.24em] text-soft-white group-hover:text-crystal-lilac transition-colors duration-300 leading-none">
            FLUORITE
          </span>
          <span className="font-display font-medium text-[0.625rem] tracking-[0.42em] text-muted-silver mt-1.5 leading-none">
            LABS
          </span>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-10 text-xs font-mono uppercase tracking-wider text-[#86868b]">
          <Link to="/work" className="hover:text-white transition-colors">
            Work
          </Link>
          <Link to="/#services" className="hover:text-white transition-colors">
            Serviços
          </Link>
          <Link to="/journal" className="hover:text-white transition-colors">
            Journal
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <article className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-12">
        <header className="space-y-4 border-b border-white/10 pb-8">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-crystal-lilac">
            GOVERNANÇA & COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-white leading-tight">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-xs font-mono text-[#86868b]">
            Última atualização: Março de 2026 • Em conformidade com a Lei Geral de Proteção de Dados
            (LGPD — Lei nº 13.709/2018)
          </p>
        </header>

        <section className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed font-light">
          <h2 className="text-lg font-display text-white font-medium">
            1. Princípio Fundamental de Rigor
          </h2>
          <p>
            Na <strong className="text-white">Fluorite Labs</strong>, o respeito à privacidade dos
            nossos clientes e visitantes é parte integrante da nossa arquitetura técnica de
            precisão. Tratamos seus dados com o mesmo minimalismo e cuidado cirúrgico com que
            desenvolvemos interfaces de alto impacto.
          </p>
          <p>
            Não vendemos, não alugamos e não compartilhamos suas informações com terceiros para fins
            de monetização ou marketing não solicitado.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed font-light">
          <h2 className="text-lg font-display text-white font-medium">
            2. Dados Coletados no Microbriefing
          </h2>
          <p>
            Ao utilizar o formulário de início de projeto (Microbriefing), solicitamos
            exclusivamente os dados estritamente necessários para a condução do diagnóstico
            comercial:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs font-mono text-[#d1d1d6]">
            <li>
              <strong>Primeiro Nome:</strong> para identificação do interlocutor;
            </li>
            <li>
              <strong>Necessidade do Projeto:</strong> tipo de solução desejada (ex: Site
              Institucional, Landing Page, etc.);
            </li>
            <li>
              <strong>Faixa de Orçamento Estimada:</strong> para alinhamento inicial de viabilidade
              técnica e escopo;
            </li>
            <li>
              <strong>Metadados Técnicos de Origem:</strong> URL de referência e parâmetros de
              campanha (UTMs), quando fornecidos espontaneamente pelo navegador.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed font-light">
          <h2 className="text-lg font-display text-white font-medium">
            3. Transição Segura para o WhatsApp
          </h2>
          <p>
            Após o registro do Microbriefing em nossa infraestrutura criptografada (Neon
            PostgreSQL), você é convidado a continuar o diálogo pelo canal oficial de WhatsApp da
            Fluorite Labs. A mensagem pré-formatada contém apenas as opções selecionadas por você, e
            o envio é 100% deliberado sob o seu controle.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed font-light">
          <h2 className="text-lg font-display text-white font-medium">
            4. Telemetria e Ausência Estrita de PII em Analytics
          </h2>
          <p>
            Utilizamos ferramentas de análise de performance (como Google Analytics 4) configuradas
            com barreiras ativas de proteção de privacidade (Data Guard).
          </p>
          <p>
            <strong className="text-white">Regra de Segurança:</strong> Nenhuma informação de
            identificação pessoal (PII) — tais como nomes, e-mails, números de telefone ou mensagens
            — é transmitida aos servidores de métricas de terceiros. Apenas dados agregados de
            telemetria técnica, visualizações de páginas e tempos de carregamento são monitorados.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed font-light">
          <h2 className="text-lg font-display text-white font-medium">
            5. Armazenamento e Criptografia em Repouso
          </h2>
          <p>
            Todas as conexões são protegidas por criptografia ponta a ponta (TLS 1.3 / HTTPS). Os
            dados armazenados residem em instâncias isoladas com criptografia em repouso padrão de
            mercado e políticas de retenção controladas.
          </p>
        </section>

        <section className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed font-light">
          <h2 className="text-lg font-display text-white font-medium">
            6. Direitos do Titular (LGPD)
          </h2>
          <p>Você possui o direito inalienável de solicitar a qualquer momento:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#d1d1d6]">
            <li>A confirmação da existência de tratamento dos seus dados;</li>
            <li>O acesso completo aos dados armazenados em nossos registros;</li>
            <li>A correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>
              A eliminação definitiva dos seus dados pessoais tratados mediante consentimento.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-[#a1a1a6] leading-relaxed font-light border-t border-white/10 pt-8">
          <h2 className="text-lg font-display text-white font-medium">7. Canal de Contato e DPO</h2>
          <p>
            Para exercer seus direitos ou esclarecer qualquer dúvida sobre o tratamento de dados
            pela Fluorite Labs, entre em contato diretamente com o nosso canal de privacidade:
          </p>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0a0b0e] font-mono text-xs text-white">
            E-mail direto:{" "}
            <a
              href="mailto:privacidade@fluoritelabs.com"
              className="text-crystal-lilac hover:underline"
            >
              privacidade@fluoritelabs.com
            </a>
          </div>
        </section>
      </article>

      {/* Footer Minimal */}
      <footer className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 py-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#86868b]">
        <span>© 2026 Fluorite Labs. Todos os direitos reservados.</span>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/privacidade" className="text-white underline">
            Privacidade
          </Link>
          <a href="mailto:hello@fluoritelabs.com" className="hover:text-white transition-colors">
            Contato
          </a>
        </div>
      </footer>
    </main>
  );
}

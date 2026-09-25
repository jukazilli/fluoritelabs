# Fluorite Labs — Processo de Desenvolvimento do Site com IA

> Status: processo inicial aprovado para condução do projeto  
> Formato canônico: Markdown  
> Repositório: `jukazilli/fluritelabs`

## 1. Objetivo

Este diretório documenta o processo de definição, projeto, engenharia e implementação do site da Fluorite Labs.

O processo é inspirado no repositório `processo-de-desenvolvimento-de-mvp-de-software-com-ia-assistida`, porém deliberadamente simplificado para um site institucional premium orientado a:

- posicionamento de marca;
- apresentação de serviços e portfólio;
- geração de oportunidades comerciais;
- SEO e descoberta orgânica;
- performance;
- experiência visual diferenciada;
- implementação sustentável e evolutiva.

A regra principal permanece:

```text
Discovery humano assistido por IA
        ↓
Documento gerado
        ↓
Revisão e decisão humana
        ↓
Ajuste do mesmo documento
        ↓
Aprovação
        ↓
Versionamento no GitHub
        ↓
Próximo documento
```

Nenhuma etapa seguinte deve transformar hipóteses ainda não aprovadas em requisitos definitivos.

---

## 2. Processo simplificado da Fluorite Labs

A documentação canônica será construída nesta ordem:

```text
Discovery / Entrevista
        ↓
01_Briefing_e_Escopo.md
        ↓
02_Visao_de_Produto_PO.md
        ↓
03_Direcao_de_Marca_UI_e_Design_System.md
        ↓
04_Experiencia_UX_e_Arquitetura_de_Informacao.md
        ↓
05_SEO_Performance_e_Otimizacao.md
        ↓
06_Arquitetura_e_Engenharia.md
        ↓
07_Infraestrutura_Deploy_e_Observabilidade.md
        ↓
08_Visao_do_Tech_Lead_e_Stack.md
        ↓
09_Backlog_e_Plano_de_Entrega.md
        ↓
10_Setup_e_Fundacao.md
        ↓
Implementação por slices / sprints
        ↓
Validação, lançamento e otimização
```

---

## 3. Responsabilidade de cada documento

### 01 — Briefing e Escopo

Define o que estamos construindo, para quem, por quê, objetivos, público, proposta de valor, funcionalidades, páginas, escopo e não escopo.

### 02 — Visão de Produto / PO

Transforma o briefing em experiência de produto: objetivos do visitante, jornadas principais, prioridades, critérios de sucesso, conversões e decisões de produto.

### 03 — Direção de Marca, UI e Design System

Canoniza a direção visual aprovada, tipografia, cores, grid, componentes, imagens, motion, responsividade, acessibilidade visual e regras de consistência.

### 04 — Experiência UX e Arquitetura de Informação

Define sitemap, navegação, hierarquia das páginas, estrutura das seções, jornadas, CTAs, formulários e comportamento responsivo.

### 05 — SEO, Performance e Otimização

Define estratégia de busca, arquitetura semântica, conteúdo indexável, palavras-chave e intenção, metadados, dados estruturados, Core Web Vitals, mídia, analytics e requisitos técnicos de SEO.

### 06 — Arquitetura e Engenharia

Define como o site será construído: composição da aplicação, renderização, componentes, conteúdo, integrações, formulários, segurança, acessibilidade, qualidade e estratégia de testes.

### 07 — Infraestrutura, Deploy e Observabilidade

Define ambientes, hospedagem, domínio, DNS, CDN, CI/CD, variáveis, segurança operacional, analytics, logs, monitoramento e estratégia de rollback.

### 08 — Visão do Tech Lead e Stack

Consolida as decisões de tecnologia: framework, linguagem, bibliotecas, CMS quando aplicável, padrões de código, convenções, dependências e limites arquiteturais.

### 09 — Backlog e Plano de Entrega

Transforma os documentos aprovados em épicos, histórias/tarefas, critérios de aceite, dependências e sequência de implementação.

### 10 — Setup e Fundação

Checklist executável para preparar repositório, projeto, lint, formatação, testes, CI/CD, ambientes, estrutura inicial, componentes-base e design tokens.

---

## 4. Implementação por slices

A implementação não será organizada apenas por camada técnica.

Cada slice deve produzir uma parte verificável do site, por exemplo:

```text
Slice 0 — Fundação
Slice 1 — Shell global + Header + Footer
Slice 2 — Hero
Slice 3 — Posicionamento + Serviços
Slice 4 — Portfólio / Selected Work
Slice 5 — Processo + Sobre
Slice 6 — Conversão / Contato
Slice 7 — SEO técnico + Analytics + Schema
Slice 8 — Performance + Acessibilidade + QA
Slice 9 — Produção + Lançamento
```

A divisão final só será canonizada depois que arquitetura de informação, funcionalidades e tecnologia forem aprovadas.

---

## 5. Regras do processo

1. Produzir um documento por vez.
2. Revisar com o responsável pelo produto antes de avançar.
3. Atualizar o mesmo arquivo quando houver correção; evitar cópias como `final-v2`.
4. Separar claramente decisões, hipóteses e pendências.
5. Não decidir tecnologia antes de compreender produto, UX, SEO e requisitos.
6. Tratar SEO, performance, acessibilidade e conversão como requisitos de produto, não como acabamento.
7. Registrar no backlog somente itens sustentados pelos documentos aprovados.
8. Implementar em slices pequenos, demonstráveis e testáveis.
9. Manter `docs/` como fonte canônica das decisões do projeto.
10. Atualizar a documentação quando uma decisão aprovada mudar.

---

## 6. Estado atual

### Já definido

- Nome: Fluorite Labs.
- Posicionamento visual: estúdio digital premium, sofisticado, futurista, minimalista e preciso.
- Direção visual principal: dark luxury tech, espaço negativo, tipografia editorial minimalista, fluorita 3D, refração e brilho controlado.
- Direção de motion: sutil, física e cinematográfica.
- A homepage deverá ser orientada a posicionamento, percepção de valor e conversão.

### Em Discovery

- público prioritário;
- nichos e mercados;
- proposta comercial;
- serviços e pacotes;
- funcionalidades;
- páginas;
- estratégia de conversão;
- estratégia de conteúdo;
- portfólio inicial;
- integrações;
- requisitos de SEO;
- requisitos de analytics;
- stack;
- infraestrutura.

---

## 7. Próxima etapa

Realizar a entrevista de Discovery necessária para produzir e aprovar:

`01_Briefing_e_Escopo.md`

Somente depois da aprovação desse documento deve ser iniciada a Visão de Produto / PO.

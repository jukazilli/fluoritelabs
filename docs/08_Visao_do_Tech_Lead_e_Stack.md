# Fluorite Labs — Visão do Tech Lead e Stack

> **Documento:** 08  
> **Status:** APROVADO — documento canônico  
> **Última atualização:** 2026-09-25  
> **Documentos anteriores:** `01_Briefing_e_Escopo.md`, `02_Visao_de_Produto_PO.md`, `03_Direcao_de_Marca_UI_e_Design_System.md`, `04_Experiencia_UX_e_Arquitetura_de_Informacao.md`, `05_SEO_Performance_e_Otimizacao.md`, `06_Arquitetura_e_Engenharia.md`, `07_Infraestrutura_Deploy_e_Observabilidade.md`

---

# 1. Objetivo

Este documento transforma a arquitetura aprovada em uma stack tecnológica explícita.

Ele define:

- linguagem;
- framework web;
- runtime;
- rendering;
- banco;
- acesso a dados;
- autenticação;
- validação;
- editor;
- styling;
- motion;
- mídia;
- testes;
- package manager;
- toolchain;
- políticas de dependência;
- regras de uso;
- alternativas rejeitadas.

A pergunta central é:

> **Com quais tecnologias implementaremos a Fluorite Labs preservando fidelidade visual, performance, SEO, segurança, manutenibilidade e o teto operacional aprovado?**

---

# 2. Regra superior — fidelidade à direção visual

A stack não possui autoridade para redefinir a UI.

A imagem de referência visual aprovada e o Documento 03 são restrições de implementação.

## Hierarquia

```text
referência visual aprovada
        +
Produto / UX / UI canônicos
        ↓
arquitetura
        ↓
stack
        ↓
código
```

Framework, biblioteca ou componente que force a Fluorite Labs a se parecer com um template deve ser:

1. customizado;
2. substituído;
3. ou removido.

## Regra crítica

> **A tecnologia deve servir ao design. O design não será simplificado para caber na aparência padrão de uma biblioteca.**

---

# 3. Contrato visual de implementação

A implementação pública deve preservar o DNA da referência:

- superfície dark full-bleed;
- composição assimétrica;
- grande área negativa;
- headline editorial de grande escala à esquerda;
- fluorita monumental central/direita;
- contraste alto nos elementos primários;
- microcopy e labels de baixa interferência;
- linhas finas;
- CTA pill;
- header leve;
- elementos inferiores integrados ao cenário;
- profundidade por luz, material e refração;
- ausência de aparência de grid SaaS;
- ausência de cards genéricos;
- ausência de iconografia tecnológica decorativa;
- motion discreto e cinematográfico.

## Importante

A referência não congela os textos literais.

O conteúdo deverá obedecer aos documentos 01–05.

Exemplo:

- a referência visual pode mostrar `About` e `Contact`;
- a V1 aprovada utiliza `Work`, `Serviços`, `Processo`, `Journal` e `Começar agora`.

A **composição permanece fiel**; o conteúdo segue o produto aprovado.

---

# 4. Stack aprovada em entrevista

Direção tecnológica aceita pelo responsável do produto em 2026-09-25:

```text
TypeScript
React
React Router v8 — Framework Mode / SSR
Vite
Cloudflare Vite Plugin
Cloudflare Workers

Clerk
Neon PostgreSQL — São Paulo
Drizzle ORM
Zod

BlockNote Core + React + Ariakit
Tailwind CSS 4
CSS Custom Properties
Motion for React

Vitest
Playwright

pnpm
GitHub
GitHub Actions
GA4
Google Search Console
Cloudflare R2
```

O documento permanece em revisão até a aprovação formal do conjunto completo de regras.

---

# 5. Política de versões

## Regra

Usar versões estáveis e compatíveis no momento da Fundação.

## Fixação

- major lines canônicas ficam documentadas;
- versões exatas ficam fixadas no lockfile;
- CI utiliza lockfile congelado;
- não usar `latest` como política operacional;
- upgrades relevantes passam por PR e testes.

## Pré-release

Não utilizar em produção por padrão:

- alpha;
- beta;
- RC;
- canary;
- nightly.

Exceção exige:

- necessidade real;
- análise de risco;
- aprovação explícita.

---

# 6. Linguagem — TypeScript

TypeScript será a linguagem principal.

## Requisitos

- strict mode;
- evitar `any`;
- boundaries externos validados em runtime;
- tipos devem revelar domínio;
- código técnico em inglês;
- copy visível ao usuário em português.

## Regra

TypeScript não substitui validação de dados externos.

---

# 7. React

React será a camada de UI.

## Uso

- componentes públicos;
- admin;
- microbriefing;
- editor;
- estados interativos;
- motion quando necessário.

## Regra

Não transformar toda página em client-side JavaScript.

Componentes sem necessidade de interatividade devem permanecer no caminho mais simples suportado pelo framework.

---

# 8. React Router v8 — Framework Mode

React Router v8 será o framework web preferencial.

## Motivos

- SSR;
- loaders/actions;
- rotas;
- integração full-stack;
- compatibilidade oficial com Cloudflare Workers;
- Vite como toolchain;
- suporte oficial do Clerk;
- menor dependência de adapters para o hosting escolhido.

## Uso

- páginas públicas;
- páginas do admin;
- loaders;
- actions;
- metadata;
- boundaries;
- redirects;
- error boundaries.

---

# 9. Rendering

A aplicação utilizará SSR onde necessário para garantir:

- SEO;
- conteúdo inicial;
- metadata;
- performance;
- resiliência.

## Regra

Conteúdo essencial de:

- Home;
- Serviços;
- Work;
- Journal;
- artigos;

não deve depender de execução client-side para existir.

## Observação

A estratégia pode combinar rendering conforme a capacidade estável do framework/runtime, mas não pode violar o Documento 05.

---

# 10. Vite

Vite será a ferramenta de build/dev associada ao React Router.

## Uso

- desenvolvimento;
- build;
- plugins canônicos;
- Tailwind;
- integração Cloudflare.

## Regra

Evitar plugins sem necessidade concreta.

---

# 11. Cloudflare Vite Plugin

O plugin oficial do Cloudflare será utilizado para integrar desenvolvimento e Workers quando compatível com a versão aprovada.

## Objetivo

Reduzir divergência entre:

- ambiente local;
- runtime de produção.

---

# 12. Runtime — Cloudflare Workers

Cloudflare Workers é a direção de runtime/hosting da aplicação.

## Motivos

- compatibilidade oficial com React Router;
- CDN global;
- server-side;
- preview/deploy;
- modelo pay-as-you-grow;
- aderência ao orçamento.

## Regra

Evitar APIs Node-specific quando a plataforma Web API resolver.

Compatibilidade Node só deve ser habilitada quando realmente necessária.

---

# 13. compatibility date

O runtime do Cloudflare deverá possuir `compatibility_date` explícita.

## Regra

Atualizações de compatibility date passam por:

- PR;
- testes;
- revisão.

Nunca avançar silenciosamente em produção.

---

# 14. Banco — Neon PostgreSQL

Neon PostgreSQL será o banco preferencial.

## Região

> **AWS South America East 1 — São Paulo (`sa-east-1`).**

## Responsabilidades

- leads;
- artigos;
- categorias;
- metadata;
- estados editoriais.

## Motivos

- PostgreSQL;
- região São Paulo;
- serverless;
- branching;
- compatibilidade com Drizzle;
- bom encaixe com previews.

---

# 15. Branching de banco

Neon branches poderão ser utilizadas para:

- preview;
- migrations;
- testes de integração;
- isolamento.

## Regra de privacidade

Preview não deve receber cópia desnecessária de dados pessoais de produção.

Preferir:

- schema-only;
- dados sintéticos;
- fixtures.

---

# 16. Acesso a dados — Drizzle ORM

Drizzle ORM será a solução canônica de acesso ao PostgreSQL.

## Responsabilidades

- schema;
- queries;
- migrations;
- types;
- relacionamentos.

## Regra

Módulos de UI não importam o client de banco diretamente.

Acesso fica dentro das fronteiras de dados/casos de uso.

---

# 17. Driver Neon

Preferir o driver serverless do Neon.

## Direção

Para consultas simples e operações não interativas:

> preferir conexão HTTP quando adequada.

WebSocket/transações interativas só quando a regra exigir.

## Objetivo

Reduzir custo e complexidade em ambiente serverless.

---

# 18. Migrations

Migrations serão versionadas no Git.

## Regras

- nunca alterar schema de produção manualmente;
- migration revisada;
- migration testada;
- deploy com ordem segura;
- rollback/plano de correção quando relevante.

---

# 19. Validação — Zod

Zod será a biblioteca canônica de schemas e validação runtime.

## Usar em

- microbriefing;
- admin;
- variáveis de ambiente;
- payloads;
- parâmetros;
- conteúdo estruturado;
- responses externas quando necessário.

## Regra

Não duplicar validações equivalentes em bibliotecas diferentes.

---

# 20. Auth — Clerk

Clerk será o provider de autenticação administrativa.

SDK canônico:

> `@clerk/react-router`

## Uso

- login;
- sessão;
- identidade.

## Não usar como

- banco de leads;
- CMS;
- autorização única;
- storage de conteúdo.

---

# 21. Autorização administrativa

Repetir o princípio comprovado no Oplib:

```text
Clerk
  ↓
identidade autenticada
  ↓
regra própria de autorização
  ↓
admin
```

Na V1, somente o administrador explicitamente autorizado acessa o painel.

## Regra

Usuário Clerk autenticado ≠ administrador automaticamente.

---

# 22. Journal — BlockNote

Editor canônico:

- `@blocknote/core`;
- `@blocknote/react`;
- `@blocknote/ariakit`.

## Motivo do Ariakit

A integração Ariakit oferece primitives headless/acessíveis e permite estilização própria.

Isso reduz o risco de o admin receber estética genérica de um kit visual.

---

# 23. Experiência do editor

O editor deve se aproximar da ergonomia do Notion:

- blocos;
- slash menu;
- drag/reorder quando adequado;
- headings;
- listas;
- links;
- imagens;
- quote;
- code;
- atalhos;
- edição visual.

## Regra

O usuário não edita:

- Markdown;
- HTML;
- JSON.

---

# 24. Persistência BlockNote

O conteúdo será persistido como estrutura de blocos em JSON.

Preferência:

> PostgreSQL `jsonb`.

## Adicionar

- schema/version do conteúdo;
- validação;
- migrations de conteúdo quando necessário.

## Regra

HTML renderizado pode existir como derivado/cache.

Não será a única fonte canônica do artigo.

---

# 25. Licença do BlockNote

Utilizar apenas pacotes compatíveis com o modelo comercial da Fluorite Labs.

## Direção

Pacotes principais do BlockNote utilizam MPL-2.0 e permitem aplicação comercial fechada.

## Regra

Não adicionar automaticamente pacotes `@blocknote/xl-*`.

Esses pacotes possuem licença diferente e exigem nova revisão jurídica/técnica antes de uso.

---

# 26. Styling — Tailwind CSS 4

Tailwind CSS 4 será a ferramenta de utility styling.

Integração preferida:

> plugin oficial para Vite.

## Regra central

Tailwind é uma ferramenta de implementação.

> **Tailwind não define a estética.**

Não utilizar classes/templates como justificativa para alterar:

- grid;
- proporções;
- tipografia;
- espaçamento;
- atmosfera;
- direção visual.

---

# 27. Design tokens

Tokens canônicos devem existir em CSS Custom Properties.

Exemplos conceituais:

```css
--color-obsidian
--color-charcoal
--color-soft-white
--color-fluorite-violet
--color-emerald-teal
--space-*
--radius-*
--motion-*
```

Tailwind deve consumir ou respeitar esses tokens.

## Benefício

A identidade não fica acoplada à sintaxe do framework CSS.

---

# 28. Componentes públicos

A UI pública será predominantemente custom.

## Não haverá

- theme de component library;
- dashboard kit;
- template SaaS;
- shadcn visual padrão;
- Mantine visual padrão;
- biblioteca de cards pronta.

## Primitives

Primitives acessíveis podem ser utilizadas apenas quando resolverem comportamento complexo real.

A aparência final é sempre Fluorite Labs.

---

# 29. Ícones

Não instalar biblioteca de ícones como decoração visual padrão.

## Permitido

- seta;
- close;
- chevron;
- controles funcionais mínimos.

## Regra

Se um ícone não ajuda compreensão ou operação:

> remover.

---

# 30. Motion

Biblioteca canônica quando necessário:

> **Motion for React**.

## Ordem de preferência

```text
CSS
  ↓
Web Animations API
  ↓
Motion for React
```

Usar Motion somente quando houver benefício real de:

- orchestration;
- enter/exit;
- shared transitions;
- spring;
- gesture;
- layout animation.

---

# 31. Motion e fidelidade

A animação deve reforçar a referência:

- lenta quando ambiental;
- curta na interação;
- precisa;
- física;
- suave.

Não adicionar animações chamativas apenas porque a biblioteca permite.

---

# 32. Scroll

Não instalar smooth-scroll library por padrão.

## V1

- scroll nativo;
- CSS;
- APIs do navegador.

Lenis ou equivalente só entra após evidência concreta de que melhora a experiência sem prejudicar:

- acessibilidade;
- performance;
- mobile;
- scroll behavior.

---

# 33. 3D / WebGL

Não utilizar Three.js/WebGL na Hero da V1.

## Direção

A fluorita será entregue como:

- vídeo otimizado;
- poster;
- imagem;
- assets preparados.

## Motivo

Evitar:

- bundle;
- GPU;
- consumo mobile;
- instabilidade;
- complexidade.

WebGL pode ser revisitado em experiência futura com necessidade real.

---

# 34. Imagens e mídia — R2

Cloudflare R2 é o storage preferencial para mídia editorial.

## Usar em

- capas do Journal;
- imagens internas futuras;
- assets gerenciados pelo admin.

## Não usar Git

Publicar artigo não deve gerar commit de imagem.

---

# 35. Assets de marca

Assets estáticos controlados pelo desenvolvimento podem permanecer no projeto quando fizer sentido:

- wordmark;
- ícones próprios;
- poster inicial;
- assets fixos do Work.

Assets editoriais mutáveis pertencem ao storage.

---

# 36. Forms

Não adicionar form framework na Fundação sem necessidade.

## Microbriefing

Pode usar:

- estado React;
- actions do React Router;
- Zod;
- server validation.

Adicionar biblioteca de formulário apenas se complexidade real justificar.

---

# 37. State management

Não utilizar inicialmente:

- Redux;
- Zustand;
- MobX;
- store global equivalente.

## Regra

- estado local → local;
- estado URL → URL;
- estado servidor → loaders/actions/framework;
- sessão → Clerk;
- estado persistente → banco.

Store global só entra com problema comprovado.

---

# 38. Analytics

Ferramentas aprovadas:

- Google Analytics 4;
- Google Search Console.

## Arquitetura

Eventos passam por adapter interno.

Não espalhar chamadas do provider pela aplicação inteira.

---

# 39. Eventos

Eventos canônicos seguem Documento 05.

No mínimo:

- `start_briefing`;
- `briefing_step_1`;
- `briefing_step_2`;
- `briefing_step_3`;
- `lead_created`;
- `whatsapp_open`;
- `service_view`;
- `work_view`;
- `journal_view`;
- `cta_click`.

---

# 40. Unit tests — Vitest

Vitest será o runner canônico para:

- unit tests;
- regras;
- schemas;
- helpers;
- aplicação;
- integração leve compatível.

## Regra

Testar comportamento, não implementação acidental.

---

# 41. E2E — Playwright

Playwright será a solução canônica de E2E.

## Jornadas obrigatórias

### Lead

```text
Home
→ Começar agora
→ 3 passos
→ lead criado
→ WhatsApp
```

### Journal

```text
Login
→ admin
→ criar artigo
→ blocos
→ preview
→ publicar
→ página pública
```

### Visual

Playwright poderá auxiliar em screenshots de regressão visual.

---

# 42. Visual regression

A fidelidade à imagem aprovada é requisito de QA.

## Durante implementação da Home

Manter screenshots em viewports de referência e comparar lado a lado com a direção canônica.

## Avaliar

- posição;
- escala;
- ritmo;
- proporção;
- hierarquia;
- espaço negativo;
- tamanho relativo da fluorita;
- densidade;
- contraste;
- composição da dobra inicial.

## Regra

Teste visual automatizado pode auxiliar, mas não substitui revisão humana.

---

# 43. Viewport de referência

A imagem canônica aprovada possui composição desktop ampla.

Durante implementação, utilizar ao menos uma viewport desktop comparável à referência para revisão visual.

## Importante

Não codificar a página apenas para uma resolução.

A referência orienta proporções.

Responsividade continua obrigatória.

---

# 44. Mobile visual

Mobile não precisa reproduzir geometricamente o desktop.

Precisa reproduzir a **mesma identidade**.

## Preservar

- dark;
- headline forte;
- fluorita protagonista;
- baixa densidade;
- espaço;
- refinamento;
- CTA;
- microelementos raros.

## Adaptar

- ordem;
- crop;
- tamanho;
- vídeo → poster;
- navegação;
- labels.

---

# 45. Acessibilidade

A referência visual não autoriza:

- contraste ilegível;
- focus invisível;
- botão sem nome;
- interação hover-only;
- animação sem reduced motion;
- texto essencial minúsculo.

Acessibilidade deve ser resolvida sem descaracterizar a direção.

---

# 46. Package manager — pnpm

pnpm será o package manager canônico.

## Regras

- lockfile versionado;
- instalação frozen em CI;
- nenhum segundo package manager;
- scripts canônicos no `package.json`.

---

# 47. Toolchain de qualidade

A Fundação deverá configurar:

- TypeScript;
- lint;
- formatter;
- typecheck;
- unit tests;
- E2E;
- build;
- dependency audit;
- secret scanning quando disponível.

## Direção

ESLint + Prettier são escolhas preferenciais, salvo incompatibilidade atual demonstrada.

---

# 48. Estrutura de módulos

Estrutura conceitual:

```text
/app
/features
  /auth
  /leads
  /journal
  /analytics
  /work
/ui
/data
/integrations
/styles
/tests
/docs
```

A nomenclatura final deve respeitar convenções do React Router.

## Regra

Organizar por responsabilidade, não por arquivo genérico.

---

# 49. Boundaries

## UI

Não acessa banco diretamente.

## Application

Orquestra casos de uso.

## Data

Implementa persistência.

## Integrations

Isola providers.

## Public routes

Não recebem secrets.

## Admin

Exige auth + authorization.

---

# 50. Environment variables

Variáveis deverão ser validadas no startup/boundary adequado.

## Separação

- públicas;
- servidor;
- local;
- preview;
- produção.

## Regra

Prefixo público não pode conter segredo.

---

# 51. CI

PR deve executar, conforme aplicável:

```text
install frozen
  ↓
format check
  ↓
lint
  ↓
typecheck
  ↓
unit/integration tests
  ↓
build
  ↓
E2E crítico
  ↓
preview
```

O custo/tempo do E2E poderá ser organizado por camadas, sem remover cobertura das jornadas críticas.

---

# 52. Observabilidade

Começar com capacidades nativas do Cloudflare e logs estruturados.

## Adicionar provider externo apenas quando

- houver lacuna real;
- investigação estiver difícil;
- alertas nativos forem insuficientes.

Não instalar Sentry ou similar por hábito.

---

# 53. Performance

A implementação deve privilegiar:

- SSR;
- baixo JS;
- code splitting;
- assets otimizados;
- mídia responsiva;
- poster da Hero;
- lazy loading adequado;
- fontes enxutas.

## Regra

Biblioteca visual é removível se seu custo superar seu benefício.

---

# 54. Dependências

Antes de adicionar dependência, verificar:

1. requisito existe?
2. plataforma resolve?
3. stack já resolve?
4. já existe biblioteca canônica?
5. impacto em bundle/runtime?
6. manutenção?
7. licença?
8. compatibilidade Workers?
9. benefício supera custo?

---

# 55. Regra de dependência única por responsabilidade

Exemplos:

```text
routing/framework   → React Router
auth                → Clerk
database access     → Drizzle
validation          → Zod
block editor        → BlockNote
motion              → Motion
unit tests          → Vitest
E2E                 → Playwright
```

Não adicionar concorrente para mesma função sem revisão.

---

# 56. Alternativas rejeitadas — Next.js na V1

## TL-DEC-001

**Status:** rejeitada para a stack inicial.

## Motivo

Next.js é tecnicamente capaz, mas a combinação:

- orçamento;
- hosting Cloudflare;
- integração oficial de React Router;
- menor camada de adaptação;

favorece React Router v8 neste projeto.

## Regra

Não interpretar como proibição permanente de Next.js.

Revisitar apenas se requisitos mudarem.

---

# 57. Alternativas rejeitadas — Vercel como premissa

## TL-DEC-002

Vercel não será premissa da arquitetura.

## Motivo

Documento 07 já identificou incompatibilidade do Hobby com produção comercial e custo do Pro acima do teto inicial.

---

# 58. Alternativas rejeitadas — UI kit visual

## TL-DEC-003

Não adotar kit visual completo para a UI pública.

Rejeitados como fonte de aparência:

- themes;
- dashboards;
- templates;
- card systems genéricos.

## Motivo

Fidelidade visual é requisito de produto.

---

# 59. Alternativas rejeitadas — Three.js na Hero

## TL-DEC-004

Não utilizar render 3D em tempo real na V1.

Vídeo/poster atende a direção artística com custo operacional inferior.

---

# 60. Alternativas rejeitadas — state manager global

## TL-DEC-005

Sem Redux/Zustand na Fundação.

Revisitar com caso concreto.

---

# 61. Alternativas rejeitadas — smooth scroll library

## TL-DEC-006

Sem Lenis/equivalente por padrão.

Revisitar após protótipo real.

---

# 62. Alternativas rejeitadas — HTML como conteúdo canônico do Journal

## TL-DEC-007

Conteúdo canônico é estruturado em blocos.

HTML é representação derivada.

---

# 63. Regra para agentes de IA

Agente implementador deve, antes de criar UI:

1. ler Documentos 01–08;
2. consultar a referência visual;
3. identificar qual decisão está implementando;
4. evitar componente genérico;
5. comparar resultado com a referência;
6. validar responsividade;
7. validar acessibilidade;
8. validar performance;
9. revisar o diff.

## Proibição

Nenhum agente pode “melhorar”, “modernizar”, “simplificar” ou “adaptar ao padrão do framework” a direção visual sem aprovação explícita.

---

# 64. Fundação visual obrigatória

Antes de implementar seções completas da Home:

### FND-VIS-001

Guardar a imagem de referência visual aprovada dentro dos artefatos/referências oficiais do projeto.

### FND-VIS-002

Implementar tokens de cor, tipo, spacing e motion.

### FND-VIS-003

Implementar shell da Hero.

### FND-VIS-004

Comparar side-by-side com a referência.

### FND-VIS-005

Aprovar desktop antes de expandir para seções posteriores.

### FND-VIS-006

Criar adaptação mobile preservando identidade.

## Regra

Não construir a Home inteira para descobrir no final que a direção visual se perdeu.

---

# 65. Fundação técnica obrigatória

Antes das slices de produto:

- workspace;
- pnpm;
- TypeScript strict;
- React Router;
- Cloudflare local runtime;
- Tailwind + tokens;
- lint/format;
- Vitest;
- Playwright;
- env validation;
- Neon;
- Drizzle migrations;
- Clerk;
- admin protection;
- R2;
- preview;
- CI.

A ordem exata pertence ao plano de Fundação.

---

# 66. Critérios de escolha de novas bibliotecas

Qualquer biblioteca futura deve atender:

- runtime Cloudflare;
- React Router;
- TypeScript;
- licença comercial;
- manutenção ativa;
- acessibilidade quando UI;
- bundle aceitável;
- tree shaking quando aplicável;
- documentação;
- testes.

---

# 67. Decisões que não devem ser revertidas sem revisão explícita

1. TypeScript strict;
2. React;
3. React Router v8 Framework Mode;
4. SSR como capacidade central;
5. Vite;
6. Cloudflare Workers;
7. Clerk para auth administrativo;
8. autorização própria além do Clerk;
9. Neon PostgreSQL em São Paulo;
10. Drizzle ORM;
11. Zod;
12. BlockNote para Journal;
13. edição visual próxima do Notion;
14. BlockNote JSON estruturado como conteúdo canônico;
15. Ariakit como adapter visual preferido do editor;
16. Tailwind CSS 4;
17. CSS Custom Properties para design tokens;
18. UI pública custom;
19. Motion apenas quando necessário;
20. sem smooth-scroll library por padrão;
21. sem Three.js na Hero V1;
22. sem store global na Fundação;
23. R2 como storage preferencial;
24. Vitest;
25. Playwright;
26. pnpm;
27. stack deve respeitar teto de infraestrutura;
28. referência visual canônica tem precedência sobre aparência padrão de qualquer biblioteca;
29. comparação visual é gate de qualidade;
30. agentes não podem reinterpretar a direção visual sem aprovação.

---

# 68. Pesquisa técnica validada em 2026-09-25

Antes desta especificação foram verificadas fontes oficiais atuais para:

- React Router v8 e Framework Mode;
- integração oficial React Router + Cloudflare Workers;
- Clerk SDK para React Router;
- Neon Serverless Postgres;
- Neon São Paulo;
- branching do Neon;
- Drizzle + Neon;
- BlockNote;
- BlockNote + Ariakit;
- licença BlockNote;
- Tailwind CSS 4 + Vite;
- Motion for React.

## Regra

Na Fundação, versões exatas devem ser revalidadas antes da instalação.

---

# 69. Aprovação da Visão do Tech Lead e Stack

O responsável pelo produto aprovou este documento em 2026-09-25.

Ficam canonizados neste documento:

- TypeScript strict;
- React;
- React Router v8 em Framework Mode;
- SSR como capacidade central;
- Vite;
- Cloudflare Workers;
- Clerk para autenticação administrativa;
- autorização administrativa própria além do Clerk;
- Neon PostgreSQL em São Paulo;
- Drizzle ORM;
- Zod;
- BlockNote com experiência editorial próxima do Notion;
- Ariakit como base headless do editor;
- Tailwind CSS 4;
- CSS Custom Properties para tokens;
- UI pública custom;
- Motion apenas quando necessário;
- ausência de smooth-scroll library por padrão;
- ausência de Three.js na Hero da V1;
- ausência de state manager global na Fundação;
- Cloudflare R2 como storage preferencial;
- Vitest;
- Playwright;
- pnpm;
- GitHub/GitHub Actions;
- GA4 + Search Console;
- fidelidade à imagem de referência como restrição superior de UI;
- comparação visual como gate de qualidade;
- agentes de IA sem liberdade para reinterpretar a direção visual sem aprovação.

O próximo documento será:

`09_Backlog_e_Plano_de_Entrega.md`

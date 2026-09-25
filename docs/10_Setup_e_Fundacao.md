# Fluorite Labs — Setup e Fundação

> **Documento:** 10  
> **Status:** EM REVISÃO — não canonizado  
> **Última atualização:** 2026-09-25  
> **Base canônica:** Documentos 01–09 aprovados  
> **Backlog relacionado:** `FND-001` a `FND-012`, `VIS-001` a `VIS-006`

---

# 1. Objetivo

Este documento transforma a Fundação do backlog em um runbook operacional.

Ele define:

- sequência de setup;
- comandos e ferramentas;
- estrutura inicial;
- gates humanos;
- contas externas;
- configuração de ambientes;
- banco;
- auth;
- storage;
- CI;
- preview;
- observabilidade;
- backup;
- critérios para declarar a Fundação pronta.

A pergunta central é:

> **Qual sequência segura devemos executar para sair de um repositório com documentação e chegar a uma Fundação operacional pronta para receber a Hero da Fluorite Labs?**

---

# 2. Estado atual do repositório

Em 2026-09-25, a raiz do repositório `jukazilli/fluritelabs` contém apenas:

```text
/docs
```

Isso significa que:

- não existe aplicação inicializada;
- não existe `package.json`;
- não existe lockfile;
- não existe toolchain;
- não existe código de produção;
- a documentação já existente precisa ser preservada integralmente.

## Regra

Nenhum scaffold pode:

- apagar `docs/`;
- substituir o histórico Git;
- reinicializar o repositório;
- mover a documentação sem decisão explícita.

---

# 3. Estratégia de scaffold

Como o repositório não está vazio, a Fundação deverá evitar executar um gerador destrutivo diretamente sobre a raiz sem antes verificar seu comportamento.

## Método preferido

Criar o scaffold em diretório temporário:

```bash
pnpm create cloudflare@latest fluorite-scaffold --framework=react-router
```

Depois:

1. revisar os arquivos gerados;
2. copiar somente a estrutura necessária para a raiz de `fluritelabs`;
3. preservar `.git/` e `docs/`;
4. revisar o diff;
5. remover o diretório temporário;
6. instalar dependências na raiz;
7. executar os primeiros gates.

## Regra

O agente não deve executar cópia em massa sem revisar:

- arquivos existentes;
- `.gitignore`;
- configuração TypeScript;
- Vite;
- Wrangler/Cloudflare;
- scripts;
- package manager.

---

# 4. Stack da Fundação

A Fundação deve materializar:

```text
TypeScript strict
React
React Router v8 — Framework Mode
Vite
Cloudflare Vite Plugin
Cloudflare Workers

Clerk
Neon PostgreSQL — São Paulo
Drizzle ORM
Zod

Tailwind CSS 4
CSS Custom Properties

Vitest
Playwright

pnpm
GitHub Actions
```

## Ainda não é necessário na primeira etapa

Podem ser adicionados somente quando o item correspondente iniciar:

- BlockNote;
- Ariakit;
- Motion;
- R2 SDK/bindings adicionais;
- GA4;
- bibliotecas especializadas.

Evitar instalar antecipadamente dependências que ainda não serão usadas.

---

# 5. Política de versões

Antes de executar a Fundação:

1. consultar documentação oficial;
2. identificar versões estáveis;
3. verificar compatibilidade React Router / Cloudflare / Clerk;
4. instalar versões aprovadas;
5. versionar `pnpm-lock.yaml`.

## Regras

- não utilizar versões beta/RC sem decisão explícita;
- não usar `latest` como contrato permanente;
- lockfile é a versão exata instalada;
- major upgrades posteriores exigem PR;
- CI instala com lockfile congelado.

---

# 6. Pré-requisitos locais

Antes do scaffold:

- Git;
- Node.js compatível com as versões aprovadas;
- Corepack quando necessário;
- pnpm;
- acesso ao repositório GitHub.

## Verificações conceituais

```bash
node --version
pnpm --version
git --version
git status
```

## Regra

O working tree deve estar limpo antes de mudanças estruturais.

---

# 7. Branch da Fundação

A Fundação deve ocorrer em branch própria.

Exemplo:

```text
foundation/setup
```

## Fluxo

```text
main
  ↓
foundation/setup
  ↓
commits pequenos
  ↓
CI
  ↓
preview
  ↓
revisão
  ↓
merge
```

Não desenvolver Fundação diretamente em `main`.

---

# 8. FND-001 — Inicializar aplicação

## Objetivo

Criar a aplicação React Router + Cloudflare preservando o repositório existente.

## Passos

1. gerar scaffold temporário com create-cloudflare;
2. revisar estrutura;
3. mover arquivos aprovados para raiz;
4. preservar `docs/`;
5. confirmar pnpm;
6. instalar;
7. rodar aplicação;
8. rodar build.

## Critérios

- `pnpm dev` funciona;
- `pnpm build` funciona;
- React Router Framework Mode ativo;
- Cloudflare Vite Plugin presente;
- TypeScript ativo;
- nenhum arquivo canônico apagado.

## Evidência

- diff revisado;
- aplicação inicial respondendo.

---

# 9. Estrutura inicial sugerida

A estrutura final deverá respeitar convenções reais do React Router instalado.

Direção conceitual:

```text
/
├── app/
│   ├── routes/
│   ├── features/
│   │   ├── auth/
│   │   ├── leads/
│   │   ├── journal/
│   │   ├── analytics/
│   │   └── work/
│   ├── ui/
│   ├── data/
│   ├── integrations/
│   ├── styles/
│   └── root.tsx
│
├── drizzle/
├── tests/
├── public/
├── docs/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.*
├── wrangler.*
└── .env.example
```

## Regra

Não criar pastas vazias apenas para corresponder ao desenho.

Criar módulo quando existir responsabilidade real.

---

# 10. TypeScript strict

Confirmar configuração forte.

## Requisitos

- `strict: true`;
- sem relaxar erros apenas para compilar;
- evitar `any`;
- aliases apenas quando ajudam legibilidade;
- código técnico em inglês.

## Gate

```bash
pnpm typecheck
```

O script deverá ser criado caso o scaffold não forneça um equivalente adequado.

---

# 11. Scripts canônicos

Ao final da Fundação, o `package.json` deverá oferecer comandos previsíveis.

Direção:

```text
dev
build
preview
lint
format
format:check
typecheck
test
test:watch
test:e2e
db:generate
db:migrate
db:check
```

Comandos específicos podem variar conforme as versões aprovadas.

## Regra

Outro agente não deve precisar conhecer comandos ocultos para validar o projeto.

---

# 12. ESLint e formatting

Configurar:

- ESLint;
- Prettier;
- configuração compatível com a stack.

## Gates

```bash
pnpm lint
pnpm format:check
```

## Regra

Não adicionar dezenas de regras estilísticas particulares sem ganho real.

O objetivo é:

- consistência;
- erros;
- imports;
- qualidade.

---

# 13. Tailwind CSS 4

Instalar pelo mecanismo oficial do Vite.

Direção atual:

```bash
pnpm add tailwindcss @tailwindcss/vite
```

Depois:

- registrar plugin no Vite;
- importar Tailwind no stylesheet principal.

## Regra

Tailwind entra como ferramenta.

Não criar theme genérico.

---

# 14. CSS Custom Properties

Antes da Hero, criar os tokens canônicos.

Exemplo estrutural:

```css
:root {
  --color-obsidian: #05070b;
  --color-charcoal: #0a0e14;
  --color-soft-white: #f5f7fa;
  --color-muted-silver: #a8b0bc;

  --color-fluorite-violet: #8c72ff;
  --color-crystal-lilac: #c7b8ff;
  --color-emerald-teal: #62e7d6;
  --color-ice-cyan: #a8f2ff;

  /* demais tokens canônicos */
}
```

## Fonte

Os valores completos vêm do Documento 03.

Não inventar novos tokens visuais sem necessidade.

---

# 15. Tipografia

Preparar:

- General Sans;
- Inter.

## Regras

- somente pesos necessários;
- estratégia de carregamento performática;
- fontes self-hosted ou mecanismo aprovado;
- nenhum arquivo de fonte deve ser exposto fora do projeto/licença aplicável;
- fallback adequado.

## Gate

Verificar:

- layout shift;
- rendering;
- desktop;
- mobile.

---

# 16. FND-002 — Runtime Cloudflare

A Fundação deve confirmar que o código roda no runtime de Workers.

## Configuração

- Cloudflare Vite Plugin;
- Wrangler/configuração equivalente;
- `compatibility_date` explícita;
- bindings tipados quando aplicável.

## Gates

```bash
pnpm dev
pnpm build
pnpm preview
```

O preview local deve executar no runtime compatível com Workers.

---

# 17. Conta Cloudflare — gate humano

Para deploy real será necessário acesso autorizado ao Cloudflare.

## Agente pode

- preparar configuração;
- indicar tela;
- preparar comandos;
- validar depois da autenticação.

## Humano deve

- entrar na conta;
- concluir MFA/CAPTCHA;
- aceitar termos;
- autorizar GitHub quando solicitado;
- aprovar qualquer recurso cobrável.

## Proibido enviar pelo chat

- password;
- API token permanente;
- recovery code;
- private key.

---

# 18. FND-003 — Environment schema

Criar validação Zod para variáveis.

Categorias:

## Públicas

Exemplos conceituais:

```text
VITE_SITE_URL
VITE_CLERK_PUBLISHABLE_KEY
```

## Server-side

```text
CLERK_SECRET_KEY
ADMIN_CLERK_USER_ID
DATABASE_URL
```

## Storage / observabilidade

Definir quando provider for configurado.

## Regra

A nomenclatura final deve respeitar o comportamento real do framework/bundler.

Nenhuma variável pública pode conter segredo.

---

# 19. .env.example

Criar arquivo contendo somente nomes e explicações.

Exemplo:

```text
VITE_SITE_URL=
VITE_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ADMIN_CLERK_USER_ID=
DATABASE_URL=
```

Adicionar variáveis conforme surgirem.

## Regra

Nunca inserir valor real.

---

# 20. Neon — gate humano

Será necessário criar/provisionar o projeto Neon.

## Configuração desejada

- região: São Paulo / `sa-east-1`;
- branch principal de produção;
- estratégia de dev/preview isolada;
- credenciais separadas.

## Agente pode

- preparar schema;
- preparar migrations;
- orientar criação;
- usar CLI/API após autorização adequada.

## Humano deve

- autenticar;
- criar/autorizar projeto se necessário;
- aprovar qualquer cobrança.

---

# 21. FND-004 — Banco por ambiente

Estratégia inicial:

```text
production
    ↓
Neon main/protected

development
    ↓
branch dev ou equivalente

preview PR
    ↓
branch efêmera / isolada
```

## Regra

Não clonar PII real automaticamente para preview.

Para testes usar:

- fixtures;
- seeds;
- dados sintéticos.

---

# 22. Drizzle + Neon

Direção atual de dependências:

```bash
pnpm add drizzle-orm @neondatabase/serverless
pnpm add -D drizzle-kit
```

## Importante

No momento da Fundação, verificar se Drizzle está com alguma linha major/RC especial.

Não instalar RC automaticamente apenas porque uma página de documentação demonstra RC.

Preferir versão estável compatível.

---

# 23. Driver Neon

Para operações comuns serverless, preferir:

```text
drizzle-orm/neon-http
```

quando as regras não exigirem sessão/transação interativa.

## Motivo

HTTP é adequado para operações simples e serverless.

## WebSocket

Utilizar somente se um caso de uso exigir:

- sessão;
- transação interativa;
- comportamento não atendido por HTTP.

---

# 24. FND-005 — Migrations iniciais

A primeira Fundação pode criar apenas a infraestrutura mínima de schema ou já preparar os domínios iniciais.

Recomendação:

criar schemas iniciais para:

- leads;
- articles;
- categories.

## Regra

Não construir toda funcionalidade nesse item.

Objetivo é provar:

```text
schema
→ migration
→ banco
→ query
```

---

# 25. Gate de migrations

Antes de migration em produção:

1. gerar;
2. revisar SQL;
3. aplicar em ambiente isolado;
4. executar testes;
5. somente depois promover.

## Proibido

Editar schema diretamente no console de produção como fluxo normal.

---

# 26. Clerk — setup

SDK canônico:

```bash
pnpm add @clerk/react-router
```

A documentação oficial atual utiliza:

- `clerkMiddleware()`;
- `rootAuthLoader()`;
- `<ClerkProvider>`.

## Regra

Seguir documentação da versão instalada, não memória do agente.

---

# 27. Clerk — gate humano

O Clerk pode ser iniciado por CLI ou Dashboard.

## Regra de segurança

O agente não deve pedir que o usuário cole `CLERK_SECRET_KEY` no chat.

O segredo deve ir diretamente:

- para ambiente local seguro;
- secret manager do provider;
- GitHub Environment/Secrets quando aplicável.

## Primeiro admin

Após autenticação válida:

1. criar primeiro usuário;
2. obter identificador do usuário por mecanismo seguro;
3. configurar `ADMIN_CLERK_USER_ID` diretamente no ambiente;
4. testar allowlist.

---

# 28. FND-006 — Auth + authorization

Implementar duas camadas:

```text
Clerk session
   ↓
authenticated?
   ↓
application authorization
   ↓
allowed admin?
```

## Cenários obrigatórios

- anônimo → login;
- usuário Clerk não autorizado → acesso negado;
- admin permitido → acesso;
- logout → perde acesso.

## Segurança

Rotas de API/admin devem repetir autorização server-side.

Não depender apenas do layout visual.

---

# 29. FND-007 — R2

Provisionar storage quando chegar o momento de testar mídia.

## Configuração

Separar quando necessário:

- dev;
- production.

Preview pode compartilhar bucket não produtivo com prefixos isolados, se isso permanecer seguro e simples.

## Gate humano

Criação do recurso/upgrade potencialmente cobrável exige aprovação.

---

# 30. R2 — segurança

Uploads passam pelo servidor/autorização apropriada.

Validar:

- MIME;
- extensão quando útil;
- tamanho;
- nome/chave;
- ownership/contexto;
- erros.

Nunca entregar credenciais de escrita privilegiada ao browser.

---

# 31. Vitest

Instalar/configurar runner unitário.

## Primeiros testes obrigatórios

Mesmo antes das features:

- environment schema;
- autorização administrativa;
- helpers puros que surgirem.

## Gate

```bash
pnpm test
```

---

# 32. Playwright

Configurar E2E.

## Primeira finalidade

- smoke da aplicação;
- base futura para Hero visual;
- auth;
- leads;
- Journal.

## Gate

```bash
pnpm test:e2e
```

No início pode existir apenas smoke test.

---

# 33. FND-008 — GitHub Actions

Criar workflow para PR.

## Gate mínimo

```text
checkout
  ↓
setup runtime
  ↓
pnpm install --frozen-lockfile
  ↓
format:check
  ↓
lint
  ↓
typecheck
  ↓
test
  ↓
build
```

## E2E

Pode ser:

- job separado;
- smoke no início;
- expandido conforme backlog.

---

# 34. Branch protection

Quando disponível, configurar `main` para evitar merge com gates falhando.

## Direção

- PR obrigatório;
- checks obrigatórios;
- evitar force push;
- evitar delete acidental.

## Gate humano

Mudança de regras administrativas do repositório deve ser feita com permissão/autorização apropriada.

---

# 35. FND-009 — Preview deploy

Cada PR relevante deve poder produzir URL de preview.

## Estratégia

Cloudflare deve receber:

- branch/commit;
- secrets de preview;
- URL;
- database branch isolada.

## SEO

Aplicar:

```html
<meta name="robots" content="noindex,nofollow">
```

ou mecanismo equivalente robusto para ambientes não produtivos.

---

# 36. Preview + Neon branch

Fluxo desejado:

```text
PR aberto
   ↓
criar/obter branch Neon isolada
   ↓
aplicar migrations
   ↓
configurar DATABASE_URL do preview
   ↓
deploy preview
   ↓
testar
   ↓
PR encerrado
   ↓
remover branch efêmera quando aplicável
```

## Regra

Automação inicial pode começar mais simples se o custo operacional de branches por PR não justificar imediatamente.

Mas isolamento de produção é obrigatório.

---

# 37. FND-010 — Logging

Criar mecanismo central simples.

## Requisitos

- nível;
- mensagem;
- contexto técnico;
- request/correlation id quando útil;
- sem PII desnecessária.

## Exemplos de eventos

```text
lead.create.failed
journal.publish.failed
admin.authorization.denied
database.query.failed
```

---

# 38. Error boundaries

React Router deve possuir error handling coerente.

## Público

Erro não deve expor:

- stack;
- segredo;
- SQL;
- payload.

## Admin

Pode apresentar informação operacional mais útil, sem revelar segredo.

---

# 39. FND-011 — Uptime

Configurar monitor externo simples depois que houver URL de preview/produção estável.

## Verificar

- `/`;
- health endpoint quando existir.

## Alertas

E-mail.

## Regra

Não adicionar serviço caro apenas para uptime.

---

# 40. FND-012 — Backup

Antes de lançamento:

- definir método;
- automatizar;
- criptografar quando backup sair do provider;
- armazenar separadamente quando apropriado;
- registrar retenção.

## Preferência

Daily.

## Retenção desejada

Até 30 dias dentro do orçamento.

---

# 41. Restore test

Executar restore em ambiente isolado.

## Validar

- schema;
- leads de teste;
- articles;
- categories;
- referências de mídia quando aplicável.

## Evidência

Criar runbook em:

```text
docs/runbooks/restore.md
```

quando a Fundação for executada.

---

# 42. Domínio — adiado até próximo do release

Não é necessário comprar o domínio para começar o código.

## Durante Fundação

- usar URLs de preview;
- manter `SITE_URL` configurável.

## Antes de produção

REL-001 exige domínio real.

## Regra

Não bloquear desenvolvimento por domínio ainda não adquirido.

---

# 43. E-mail profissional — adiado até domínio

E-mail profissional depende do domínio final.

Portanto:

- requisito permanece;
- contratação não ocorre no FND inicial;
- entra no fluxo de Release.

---

# 44. BlockNote — não instalar ainda

Apesar de aprovado na stack, BlockNote pertence ao marco Journal/Admin.

## Motivo

A Fundação deve permanecer mínima.

Instalar no item:

`ADM-004 — Editor visual do Journal`.

Na instalação futura:

```bash
pnpm add @blocknote/core @blocknote/react @blocknote/ariakit
```

Verificar versões/licenças novamente naquele momento.

---

# 45. Motion — não instalar ainda

Motion pertence à necessidade visual real.

## Momento

Durante:

- Hero;
- transições;
- interações onde CSS/WAAPI não bastarem.

## Regra

Não adicionar apenas porque está aprovado como biblioteca possível.

---

# 46. VIS-001 — Referência visual

Antes da Hero, a imagem aprovada precisa estar acessível como referência oficial de desenvolvimento.

## Requisitos

- não alterar o asset original;
- identificar como referência;
- documentação aponta para ela;
- não usar asset de referência diretamente na produção se ele não for o asset final adequado.

## Importante

A referência serve para:

- composição;
- proporção;
- atmosfera;
- hierarquia.

---

# 47. VIS-002/003 — Tokens + Tipografia

Antes de desenhar Hero:

1. tokens;
2. fontes;
3. base CSS;
4. reset mínimo;
5. responsive foundations.

## Gate

Não começar a montar dezenas de componentes antes disso.

---

# 48. VIS-004 — Hero como primeira slice visual

A primeira interface real será a Hero.

## Não implementar simultaneamente

- Services inteira;
- Work inteira;
- Journal;
- Footer final.

Primeiro provar a linguagem.

---

# 49. VIS-006 — Gate humano obrigatório

Depois da primeira Hero desktop:

1. gerar screenshot;
2. colocar lado a lado com referência;
3. medir deltas;
4. corrigir;
5. pedir aprovação.

## Avaliar

- área ocupada pelo cristal;
- headline;
- alinhamentos;
- relação esquerda/direita;
- altura da primeira dobra;
- respiro;
- header;
- CTA;
- micro labels;
- fundo;
- luz;
- contraste;
- densidade.

## Resultado

Somente após aprovação:

`VIS-006 = VALIDATED`

e a Home pode avançar.

---

# 50. Ordem operacional completa

```text
00. Git status limpo
01. Criar foundation/setup
02. Scaffold temporário Cloudflare + React Router
03. Integrar scaffold preservando docs
04. pnpm / lockfile
05. TypeScript strict
06. scripts de qualidade
07. ESLint + Prettier
08. Tailwind 4
09. tokens CSS
10. tipografia base
11. Cloudflare runtime local
12. Zod env schema
13. .env.example
14. Vitest
15. Playwright smoke
16. GitHub Actions
17. Provisionar Neon [HUMANO/AUTORIZAÇÃO]
18. Drizzle + migration inicial
19. Provisionar Clerk [HUMANO/AUTORIZAÇÃO]
20. Implementar auth + authorization
21. Configurar preview deploy
22. Isolar banco de preview
23. Configurar logs
24. Provisionar R2 quando necessário [HUMANO/AUTORIZAÇÃO]
25. Definir backup
26. Testar restore
27. Uptime/alerta
28. Fundação técnica auditada
29. Registrar referência visual
30. Implementar Hero desktop
31. Screenshot + comparação
32. Aprovação humana da Hero
```

---

# 51. Gates humanos

## GATE-H-001 — Provedor Cloudflare

Humano autentica/autoriza.

## GATE-H-002 — Neon

Humano autentica e aprova recurso/custo.

## GATE-H-003 — Clerk

Humano autentica e configura aplicação/claim quando necessário.

## GATE-H-004 — Secrets

Humano insere segredo diretamente no mecanismo seguro quando não houver automação autorizada.

## GATE-H-005 — Custo

Qualquer cobrança recorrente nova exige aprovação.

## GATE-H-006 — Hero

Humano aprova fidelidade visual.

---

# 52. O que nunca deve ser enviado pelo chat

- senha;
- token permanente;
- API secret;
- Clerk secret key;
- Neon database password/connection string completa;
- Cloudflare API token;
- recovery codes;
- private key;
- dados de cartão.

## Regra

Se o setup exigir segredo:

> armazenar diretamente no provider/secret manager.

---

# 53. Evidências de Fundação

Ao fim do FND, coletar evidências não sensíveis:

- CI verde;
- preview URL;
- build;
- tests;
- screenshot de admin protegido sem informação sensível;
- migration aplicada em ambiente de teste;
- log técnico controlado;
- teste de backup/restore;
- uptime;
- screenshot da Hero para gate visual.

---

# 54. FND_READY

A Fundação somente será considerada pronta quando:

```text
repo estruturado
+
lockfile
+
React Router/Cloudflare
+
TypeScript strict
+
lint/format/typecheck
+
testes
+
CI
+
preview
+
Neon
+
migrations
+
Clerk
+
autorização
+
secrets seguros
+
observabilidade
+
backup/restore definido
=
FUNDAÇÃO TÉCNICA PRONTA
```

Depois:

```text
FUNDAÇÃO TÉCNICA PRONTA
+
tokens
+
tipografia
+
Hero
+
comparação com referência
+
aprovação humana
=
FUNDAÇÃO VISUAL PRONTA
```

---

# 55. O que não deve acontecer durante a Fundação

- construir features fora da ordem;
- implementar Journal antes da base;
- montar Home inteira antes da Hero;
- instalar bibliotecas “para usar depois”;
- criar abstrações sem uso;
- copiar Oplib integralmente;
- usar Vercel por hábito;
- usar Next.js contrariando D08;
- usar template visual;
- adicionar shadcn/theme à UI pública;
- criar Three.js;
- criar smooth scroll;
- adicionar Redux/Zustand;
- comprometer secrets;
- conectar preview ao banco de produção;
- ativar plano pago sem aprovação.

---

# 56. Pesquisa técnica revalidada

Em 2026-09-25, a Fundação foi confrontada com documentação oficial atual.

## React Router + Cloudflare

O guia oficial do Cloudflare oferece scaffold React Router v8 diretamente via `create-cloudflare` e utiliza o Cloudflare Vite Plugin.

## Cloudflare Vite Plugin

Executa código em `workerd` durante desenvolvimento e suporta oficialmente SSR com React Router v8.

## Clerk

O quickstart oficial possui SDK `@clerk/react-router` para Framework Mode, com middleware e root auth loader.

## Neon + Drizzle

Drizzle possui drivers oficiais para Neon via HTTP/WebSocket.

Para operações serverless simples, HTTP é a escolha preferencial.

## Tailwind 4

A documentação recomenda o plugin oficial `@tailwindcss/vite` para projetos Vite.

## BlockNote

A integração Ariakit é headless e permite estilização própria; será instalada somente no marco Journal.

---

# 57. Critérios de aprovação

Este documento estará aprovado quando o responsável pelo produto confirmar:

- estratégia de scaffold sem destruir docs;
- ordem operacional;
- dependências mínimas;
- Cloudflare;
- Neon;
- Drizzle;
- Clerk;
- R2;
- CI;
- preview;
- secrets;
- backup/restore;
- gates humanos;
- adiamento de BlockNote/Motion até uso real;
- Fundação visual iniciando pela Hero;
- aprovação da Hero como hard gate.

Após aprovação deste documento:

> **a próxima etapa deixa de ser documentação de planejamento e passa a ser execução de `FND-001` em branch de Fundação.**

A execução deverá atualizar o backlog conforme evidências reais forem produzidas.

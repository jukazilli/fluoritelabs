# Fluorite Labs — Backlog e Plano de Entrega

> **Documento:** 09  
> **Status:** APROVADO — documento canônico  
> **Última atualização:** 2026-09-25  
> **Base canônica:** Documentos 01–08 aprovados

---

# 1. Objetivo

Este documento transforma a baseline da Fluorite Labs em unidades executáveis, ordenadas, testáveis e rastreáveis.

A pergunta central é:

> **Exatamente o que deve ser construído, em qual ordem e como provar que está pronto?**

Este backlog não substitui os documentos anteriores.

Cada item deriva de decisões já aprovadas e deve ser implementado sem reinterpretar produto, UX, UI, arquitetura ou stack.

---

# 2. Documentos de origem

Referências usadas neste backlog:

- **D01** — Briefing e Escopo;
- **D02** — Visão de Produto / PO;
- **D03** — Direção de Marca, UI e Design System;
- **D04** — Experiência UX e Arquitetura de Informação;
- **D05** — SEO, Performance e Otimização;
- **D06** — Arquitetura e Engenharia;
- **D07** — Infraestrutura, Deploy e Observabilidade;
- **D08** — Visão do Tech Lead e Stack.

---

# 3. Estados canônicos

Todo item deverá utilizar um destes estados:

- `NOT_STARTED`;
- `IN_PROGRESS`;
- `IMPLEMENTED_NOT_VALIDATED`;
- `VALIDATED`;
- `BLOCKED`.

## Regra

Commit existente não significa `VALIDATED`.

Para validar um item, devem existir critérios de aceite atendidos e evidência suficiente.

---

# 4. Tipos de item

- `FND` — Fundação técnica e operacional;
- `VIS` — Fundação visual e fidelidade;
- `PUB` — Experiência pública;
- `LEAD` — Conversão e leads;
- `WORK` — Work / projetos conceituais;
- `JRN` — FLUOR JOURNAL;
- `ADM` — Área administrativa;
- `SEO` — SEO e analytics;
- `QA` — Qualidade, segurança, acessibilidade e performance;
- `REL` — Release e lançamento.

---

# 5. Regra superior de execução

A implementação deverá respeitar esta ordem:

```text
Fundação técnica
        ↓
Fundação visual
        ↓
Hero aprovada visualmente
        ↓
Experiência pública
        ↓
Conversão
        ↓
Work + Journal
        ↓
Admin
        ↓
SEO / Analytics
        ↓
QA completo
        ↓
Lançamento
```

## Hard gate visual

> **A Home completa não deve ser construída antes da aprovação visual do shell da Hero contra a referência canônica.**

Isso existe para impedir que uma direção visual incorreta se propague pelo projeto.

---

# 6. Plano de entrega por marcos

## M0 — Fundação operacional

Resultado:

- projeto executa localmente;
- CI funciona;
- preview funciona;
- banco funciona;
- auth funciona;
- storage existe;
- observabilidade mínima existe.

Itens principais:

`FND-001` a `FND-012`.

---

## M1 — Prova visual

Resultado:

- tokens;
- tipografia;
- Hero desktop;
- fluorita;
- motion;
- header;
- referência comparada lado a lado.

Itens:

`VIS-001` a `VIS-007`.

---

## M2 — Home pública

Resultado:

- Home completa;
- navegação;
- seções;
- footer;
- mobile.

Itens:

`PUB-001` a `PUB-008`.

---

## M3 — Conversão

Resultado:

- microbriefing;
- lead salvo;
- WhatsApp;
- proteção anti-abuso;
- analytics da conversão.

Itens:

`LEAD-001` a `LEAD-006`.

---

## M4 — Conteúdo comercial e prova

Resultado:

- páginas de serviço;
- Work;
- três projetos conceituais.

Itens:

`PUB-009`, `WORK-001` a `WORK-005`.

---

## M5 — Journal + Admin

Resultado:

- Journal público;
- editor por blocos;
- categorias;
- publicação;
- leads no admin.

Itens:

`JRN-001` a `JRN-006` e `ADM-001` a `ADM-006`.

---

## M6 — SEO, performance e QA

Resultado:

- metadata;
- sitemap;
- schema;
- analytics;
- CWV;
- acessibilidade;
- segurança;
- E2E;
- visual regression.

Itens:

`SEO-001` a `SEO-007` e `QA-001` a `QA-008`.

---

## M7 — Produção

Resultado:

- domínio;
- e-mail;
- backup testado;
- produção;
- Search Console;
- smoke test;
- lançamento.

Itens:

`REL-001` a `REL-006`.

---

# 7. Fundação técnica

## FND-001 — Inicializar toolchain canônica

**Tipo:** Fundação  
**Origem:** D06, D08  
**Status:** NOT_STARTED

### Objetivo

Criar a base executável do projeto com a stack aprovada.

### Descrição

Configurar:

- TypeScript strict;
- React;
- React Router v8 Framework Mode;
- Vite;
- pnpm;
- estrutura inicial de módulos.

### Critérios de aceite

- AC-01 — projeto sobe localmente;
- AC-02 — TypeScript strict ativo;
- AC-03 — pnpm lockfile versionado;
- AC-04 — nenhuma dependência não aprovada instalada sem justificativa;
- AC-05 — estrutura inicial respeita fronteiras arquiteturais.

### Dependências

Nenhuma.

### Riscos

- instalar versões incompatíveis;
- copiar estrutura do Oplib sem adaptar à Fluorite Labs.

### Testes

- build local;
- typecheck.

### Evidência

- commit;
- CI inicial ou execução local registrada.

---

## FND-002 — Configurar Cloudflare Workers local/runtime

**Origem:** D07, D08  
**Status:** NOT_STARTED

### Objetivo

Executar a aplicação no runtime compatível com produção.

### Critérios

- AC-01 — Cloudflare Vite Plugin configurado;
- AC-02 — runtime local funcional;
- AC-03 — `compatibility_date` explícita;
- AC-04 — nenhuma API incompatível sem justificativa.

### Dependências

FND-001.

### Testes

- build;
- smoke local no runtime Cloudflare.

### Evidência

- aplicação respondendo no ambiente local compatível.

---

## FND-003 — Configurar validação de ambiente e secrets

**Origem:** D06, D07, D08  
**Status:** NOT_STARTED

### Objetivo

Garantir configuração segura e previsível.

### Critérios

- AC-01 — variáveis server-side e públicas separadas;
- AC-02 — Zod valida variáveis obrigatórias;
- AC-03 — `.env.example` sem segredos reais;
- AC-04 — nenhum secret versionado;
- AC-05 — configuração inválida falha de forma explícita.

### Dependências

FND-001.

### Testes

- testes de schema;
- secret scanning quando disponível.

### Evidência

- CI rejeitando configuração inválida simulada.

---

## FND-004 — Provisionar Neon por ambiente

**Origem:** D06, D07, D08  
**Status:** NOT_STARTED

### Objetivo

Disponibilizar PostgreSQL gerenciado em São Paulo.

### Critérios

- AC-01 — ambiente de produção em `sa-east-1`;
- AC-02 — desenvolvimento/preview isolado;
- AC-03 — produção não é usada por testes;
- AC-04 — credenciais fora do Git.

### Dependências

FND-003.

### Riscos

- custo inesperado;
- mistura de dados entre ambientes.

### Evidência

- conexões validadas em ambiente apropriado.

---

## FND-005 — Configurar Drizzle e migrations

**Origem:** D06, D08  
**Status:** NOT_STARTED

### Objetivo

Criar fonte canônica de schema e processo seguro de evolução.

### Critérios

- AC-01 — Drizzle configurado;
- AC-02 — primeira migration executável;
- AC-03 — migrations versionadas;
- AC-04 — processo de migration documentado;
- AC-05 — UI não acessa banco diretamente.

### Dependências

FND-004.

### Testes

- migration em banco isolado;
- teste de query simples.

### Evidência

- schema criado via migration.

---

## FND-006 — Configurar Clerk + autorização própria

**Origem:** D06, D07, D08  
**Status:** NOT_STARTED

### Objetivo

Proteger `/admin` com identidade gerenciada e autorização explícita.

### Critérios

- AC-01 — login Clerk funcional;
- AC-02 — usuário não autenticado não acessa admin;
- AC-03 — usuário autenticado não autorizado continua sem acesso;
- AC-04 — usuário autorizado acessa admin;
- AC-05 — secrets Clerk não chegam ao browser indevidamente;
- AC-06 — logout invalida acesso.

### Dependências

FND-001, FND-003.

### Testes

- unitário da regra de autorização;
- integração de auth;
- E2E básico.

### Evidência

- acesso permitido/negado demonstrado.

---

## FND-007 — Configurar Cloudflare R2

**Origem:** D06, D07, D08  
**Status:** NOT_STARTED

### Objetivo

Disponibilizar storage gerenciado para mídia editorial.

### Critérios

- AC-01 — bucket/configuração por ambiente quando necessário;
- AC-02 — upload server-side autorizado;
- AC-03 — validação de tipo/tamanho prevista;
- AC-04 — secret não exposto;
- AC-05 — URL/referência persistente retornada.

### Dependências

FND-003.

### Testes

- upload;
- leitura;
- exclusão controlada.

### Evidência

- asset de teste armazenado e recuperado.

---

## FND-008 — Configurar gates de CI

**Origem:** D06, D07, D08  
**Status:** NOT_STARTED

### Objetivo

Impedir merge de código tecnicamente inválido.

### Critérios

CI executa:

- format check;
- lint;
- typecheck;
- unit tests;
- build.

### Dependências

FND-001.

### Testes

O próprio workflow é a evidência.

### Evidência

- PR/check verde.

---

## FND-009 — Configurar preview por pull request

**Origem:** D07, D08  
**Status:** NOT_STARTED

### Objetivo

Permitir validação visual e funcional antes de produção.

### Critérios

- AC-01 — PR gera preview por URL;
- AC-02 — preview usa dados isolados;
- AC-03 — preview é `noindex`;
- AC-04 — secrets correspondem ao ambiente;
- AC-05 — preview não recebe leads reais de produção.

### Dependências

FND-002, FND-004, FND-008.

### Evidência

- URL de preview funcional.

---

## FND-010 — Configurar logs e observabilidade mínima

**Origem:** D06, D07, D08  
**Status:** NOT_STARTED

### Objetivo

Detectar falhas relevantes sem expor PII.

### Critérios

- AC-01 — erros server-side são observáveis;
- AC-02 — falha de persistência de lead é registrada;
- AC-03 — logs não incluem payload completo de lead;
- AC-04 — deploy possui logs identificáveis.

### Dependências

FND-002.

### Evidência

- erro controlado visível em observabilidade.

---

## FND-011 — Configurar uptime e alertas

**Origem:** D07  
**Status:** NOT_STARTED

### Objetivo

Detectar indisponibilidade.

### Critérios

- AC-01 — Home monitorada;
- AC-02 — health check quando aplicável;
- AC-03 — alerta por e-mail;
- AC-04 — um erro isolado não gera ruído excessivo.

### Dependências

FND-002.

### Evidência

- teste de alerta.

---

## FND-012 — Implementar backup e restore mínimo

**Origem:** D06, D07  
**Status:** NOT_STARTED

### Objetivo

Evitar perda não recuperável de leads e conteúdo.

### Critérios

- AC-01 — backup automático definido;
- AC-02 — retenção próxima de 30 dias quando viável;
- AC-03 — mídia incluída na estratégia;
- AC-04 — restauração executável;
- AC-05 — restore real testado antes do lançamento.

### Dependências

FND-004, FND-007.

### Evidência

- relatório curto do teste de restore.

---

# 8. Fundação visual

## VIS-001 — Registrar referência visual oficial no projeto

**Origem:** D03, D08  
**Status:** DONE

### Objetivo

Garantir que toda implementação use a mesma referência canônica.

### Critérios

- AC-01 — referência disponível aos agentes/desenvolvedores;
- AC-02 — documentação aponta claramente para ela;
- AC-03 — não existem referências concorrentes contraditórias.

### Dependências

FND-001.

### Evidência

- referência documentada e acessível no fluxo de desenvolvimento (`references/design/canonical-reference.png`, `references/design/README.md`).

---

## VIS-002 — Implementar tokens visuais

**Origem:** D03, D08  
**Status:** DONE

### Objetivo

Materializar design system antes das telas.

### Critérios

Tokens para:

- cores;
- tipografia;
- spacing;
- radius;
- borders;
- opacity;
- motion.

### Regras

- CSS Custom Properties são canônicas;
- Tailwind respeita os tokens;
- sem theme visual pronto.

### Dependências

FND-001.

### Evidência

- tokens aplicados em página técnica/sandbox (`app/routes/design-system.tsx`, `tests/unit/tokens.test.mjs`).

---

## VIS-003 — Configurar tipografia

**Origem:** D03  
**Status:** DONE

### Objetivo

Aplicar General Sans + Inter com performance adequada.

### Critérios

- pesos mínimos necessários;
- fallback coerente;
- comportamento responsivo;
- sem layout shift perceptível relevante;
- display/body conforme D03.

### Dependências

VIS-002.

### Evidência

- screenshot + verificação de carregamento (`app/root.tsx` fontshare + google fonts, `tests/unit/tokens.test.mjs`).

---

## VIS-004 — Implementar shell da Hero desktop

**Origem:** D03, D04, D08  
**Status:** DONE

### Objetivo

Construir a primeira dobra fiel à referência.

### Deve conter

- wordmark;
- navegação;
- CTA;
- overline/microelementos;
- headline;
- support copy;
- fluorita;
- micro labels;
- composição inferior integrada.

### Critérios

- AC-01 — fundo dark full-bleed;
- AC-02 — headline à esquerda;
- AC-03 — fluorita protagonista central/direita;
- AC-04 — amplo espaço negativo;
- AC-05 — header leve;
- AC-06 — ausência de aparência SaaS/template;
- AC-07 — proporção geral reconhecível como a referência.

### Dependências

VIS-001, VIS-002, VIS-003.

### Evidência

- screenshot desktop lado a lado com referência (`docs/visual-proof-side-by-side.png`, `docs/hero-desktop-implemented.png`).

---

## VIS-005 — Implementar mídia da Hero

**Origem:** D03, D05, D08  
**Status:** DONE

### Objetivo

Entregar fluorita com qualidade visual sem sacrificar carregamento.

### Critérios

- poster otimizado;
- mídia com dimensões conhecidas;
- vídeo desktop quando asset final existir;
- vídeo não bloqueia conteúdo crítico;
- poster é fallback;
- mobile pode usar imagem estática.

### Dependências

VIS-004.

### Testes

- carregamento;
- reduced motion;
- mídia ausente/falha.

### Evidência

- gravação/screenshot da Hero (`public/images/hero-clean.webp` 178 KB, `tests/unit/tokens.test.mjs`).

---

## VIS-006 — Gate de aprovação visual desktop

**Origem:** D03, D08  
**Status:** VALIDATED

### Objetivo

Impedir propagação de uma direção incorreta.

### Critérios

Comparar:

- escala;
- posição;
- proporção;
- espaço negativo;
- densidade;
- contraste;
- tamanho da fluorita;
- tipografia;
- header;
- CTA;
- microelementos.

### Dependências

VIS-004, VIS-005.

### Regra

Itens posteriores da Home ficam bloqueados até este item atingir `VALIDATED`.

### Evidência

- comparação lado a lado (`docs/visual-proof-side-by-side.png`, `docs/visual-proof-side-by-side.webp`);
- relatório do gate (`docs/gate-vis-006-report.md`);
- aprovação humana explícita concedida em 2026-09-25.

---

## VIS-007 — Adaptação mobile da direção visual

**Origem:** D03, D04, D08  
**Status:** DONE

### Objetivo

Preservar identidade em telas pequenas.

### Critérios

- headline forte;
- fluorita continua protagonista;
- menu fullscreen/quase fullscreen;
- CTA visível;
- vídeo pode virar poster;
- menos partículas/parallax;
- sem compressão visual excessiva;
- mesma personalidade da referência.

### Dependências

VIS-006.

### Evidência

- screenshots mobile (`docs/hero-mobile-implemented.png`, `docs/hero-mobile-menu-implemented.png`);
- suite de testes automatizados (`tests/unit/tokens.test.mjs`).

---

# 9. Experiência pública — Home

## PUB-001 — Header e navegação pública

**Origem:** D03, D04  
**Status:** DONE

### Critérios

Itens:

- Work;
- Serviços;
- Processo;
- Journal;
- Começar agora.

Sem:

- Sobre;
- Contato;
- cidades;
- preço.

### Dependências

VIS-006.

### Testes

- navegação desktop/mobile;
- teclado;
- focus-visible.

### Evidência

- implementação em `app/routes/home.tsx` (menu desktop/drawer mobile, atalhos de teclado e anéis de foco);
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-002 — Seção Por que Fluorite Labs

**Origem:** D02, D03, D04  
**Status:** DONE

### Objetivo

Transmitir a filosofia do “bom anfitrião digital”.

### Critérios

- uma ideia dominante;
- copy curta;
- composição editorial;
- sem cards;
- sem bullets na UI;
- sem ícones clichês.

### Dependências

VIS-006.

### Evidência

- implementação em `app/routes/home.tsx` (seção `#why-fluorite`, layout editorial assimétrico, tipografia display e ausência de cards/bullets);
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-003 — Seção Serviços

**Origem:** D01, D04  
**Status:** DONE

### Serviços

- Site institucional;
- Landing page;
- Página de produto ou serviço;
- SEO.

### Critérios

- composição editorial;
- cada serviço navegável;
- hospedagem/implantação aparecem como complementares;
- sem grid genérico de feature cards.

### Dependências

VIS-006.

### Evidência

- implementação em `app/routes/home.tsx` (seção `#services`, layout linear tipográfico com divisores, rotas navegáveis para cada serviço, e rodapé de serviços complementares de infraestrutura);
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-004 — Preview de Work na Home

**Origem:** D02, D03, D04  
**Status:** DONE

### Critérios

- três projetos;
- forte presença visual;
- rótulo Conceito discreto quando necessário;
- navegação para cases;
- sem fingir clientes reais.

### Dependências

VIS-006, WORK-002 a WORK-004 podem evoluir em paralelo.

### Evidência

- implementação em `app/routes/home.tsx` (seção `#work` com 3 projetos conceituais: *Aethel Architecture Studio*, *Lumena Integrative Health*, *Vektor Precision Robotics*);
- badge sutil e transparente de `CONCEITO` / `CONCEPT`;
- assets visuais em alta resolução otimizados em `public/images/work-*.webp`;
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-005 — Seção Processo

**Origem:** D04  
**Status:** DONE

### Direção

Traduzir aproximadamente:

- Conversamos;
- Entendemos;
- Planejamos;
- Criamos;
- Publicamos.

### Critérios

- processo simples;
- linguagem do cliente;
- sem exposição de complexidade técnica;
- sem ícones clichês obrigatórios.

### Dependências

VIS-006.

### Evidência

- implementação em `app/routes/home.tsx` (seção `#process` com as 5 etapas canônicas: *Conversamos*, *Entendemos*, *Planejamos*, *Criamos*, *Publicamos*);
- layout linear editorial de 5 colunas em display typography, sem jargões ou burocracia técnica;
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-006 — Reforços de confiança

**Origem:** D02, D04  
**Status:** DONE

### Objetivo

Reforçar confiança sem inventar prova social.

### Pode utilizar

- qualidade do próprio site;
- processo;
- performance;
- cuidado técnico;
- Work.

### Não utilizar

- depoimentos falsos;
- números inventados;
- logos de clientes inexistentes;
- escala artificial.

### Dependências

VIS-006.

### Evidência

- implementação em `app/routes/home.tsx` (seção `#standards` com os 4 pilares técnicos de rigor: *Velocidade & Core Web Vitals*, *Design de Precisão & Acessibilidade*, *Arquitetura Moderna & Escalável*, *Transparência & Propriedade Total*);
- ausência estrita de provas sociais forjadas, reviews artificiais ou clientes fictícios;
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-007 — Preview do FLUOR JOURNAL na Home

**Origem:** D04, D05  
**Status:** DONE

### Critérios

- até 3 artigos;
- composição editorial;
- título/categoria/resumo discretos;
- link para Journal;
- sem aparência de blog genérico.

### Dependências

JRN-001, JRN-003.

### Evidência

- implementação em `app/routes/home.tsx` (seção `#journal` com 3 ensaios canônicos: *Site institucional ou landing page*, *Site de indústria B2B*, *Por que sites bonitos não convertem*);
- formato linear com divisores sutis, tempo de leitura e data de publicação discreta;
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-008 — CTA final e Footer

**Origem:** D03, D04  
**Status:** DONE

### Critérios

- footer como seção;
- CTA Começar agora;
- navegação limpa;
- contato;
- Journal;
- privacidade/cookies;
- sem grade extensa de links.

### Dependências

VIS-006.

### Evidência

- implementação em `app/routes/home.tsx` (seção `#contact` e tag `footer` completa);
- fechamento monumental com CTA pill primário, canal direto de contato (`hello@fluoritelabs.com`), navegação canônica limpa e links de compliance legal (*Privacidade*, *Termos*, *Cookies*);
- testes automatizados em `tests/unit/tokens.test.mjs`.

---

## PUB-009 — Páginas de serviço

**Origem:** D01, D04, D05  
**Status:** DONE

### Rotas

- `/servicos/site-institucional`;
- `/servicos/landing-page`;
- `/servicos/pagina-de-produto`;
- `/servicos/seo`.

### Estrutura

- abertura;
- problema/contexto;
- resultado;
- experiência;
- Work relacionado;
- processo;
- CTA.

### Critérios

- SEO próprio;
- leitura editorial;
- sem FAQ gigante;
- sem mural de benefícios;
- continuidade visual.

### Dependências

PUB-003, SEO-001.

### Evidência

- implementação de rota dinâmica com layout editorial em `app/routes/services.$slug.tsx`;
- fonte de verdade tipada canônica com os 4 serviços em `app/features/services/data.ts`;
- integração com `MicrobriefingModal` preservando a seleção do serviço correspondente;
- captura visual validada em `docs/service-detail-implemented.png`;
- testes unitários e de integridade em `tests/unit/work-services.test.mjs`.

---

# 10. Conversão e leads

## LEAD-001 — Microbriefing de 3 passos

**Origem:** D02, D03, D04  
**Status:** DONE

### Passos

1. primeiro nome;
2. necessidade;
3. investimento.

### Critérios

- modal/painel;
- visual Fluorite;
- progresso discreto;
- mobile quase/fullscreen;
- estados de erro;
- acessível por teclado.

### Dependências

VIS-006.

### Evidência

- componente `app/features/leads/MicrobriefingModal.tsx` integrado à Home pública em `app/routes/home.tsx`;
- 3 passos canônicos com foco automático, navegação por teclado (`Escape`, `Tab`, `Enter`), indicador de progresso e halos de refração de fluorita;
- capturas de tela validadas em `docs/microbriefing-desktop.png` e `docs/microbriefing-mobile.png`;
- testes unitários em `tests/unit/leads.test.mjs`.

---

## LEAD-002 — Persistência durante a sessão

**Origem:** D04  
**Status:** DONE

### Critérios

- fechar no passo 1/2/3 não perde respostas;
- reabrir durante mesma sessão restaura estado;
- não persiste além do necessário sem nova decisão.

### Dependências

LEAD-001.

### Evidência

- implementação em `app/features/leads/MicrobriefingModal.tsx` via `sessionStorage` (`fluorite_briefing_session_v1`), preservando nome, necessidade selecionada, faixa de investimento e etapa atual entre aberturas e navegações na mesma sessão;
- limpeza automática do rascunho após conclusão da submissão;
- testes em `tests/unit/leads.test.mjs`.

---

## LEAD-003 — Endpoint seguro de criação de lead

**Origem:** D04, D06  
**Status:** DONE

### Critérios

- Zod server-side;
- tamanho de payload limitado;
- enums validados;
- normalização;
- rate limiting;
- proteção anti-spam proporcional;
- sem CAPTCHA visível por padrão.

### Dependências

FND-005.

### Evidência

- endpoint `POST /api/leads` em `app/routes/api.leads.ts` com limite estrito de payload (10KB);
- schemas Zod estritos em `app/features/leads/schema.ts` (`.strict()` que rejeita campos injetados);
- proteção anti-spam por honeypot (`website`) invisível;
- sliding window rate limiter em memória em `app/features/leads/rate-limiter.server.ts` (máximo de 5 submissões/min por IP);
- testes automatizados em `tests/unit/leads.test.mjs`.

---

## LEAD-004 — Persistir lead e origem

**Origem:** D04, D05, D06  
**Status:** DONE

### Campos

- firstName;
- need;
- investmentRange;
- status;
- sourcePath;
- referrer;
- UTMs;
- timestamps.

### Critérios

- status inicial NEW;
- dados disponíveis no admin;
- PII não enviada indevidamente ao GA4.

### Dependências

LEAD-003.

### Evidência

- tabela `leads` no Neon PostgreSQL atualizada com `source_path`, `referrer` e `metadata` JSONB (UTMs) via DDL idempotente;
- repositório server-side em `app/features/leads/repository.server.ts` persistindo o lead com status `NEW`, timestamp e metadados de origem;
- proteção estrita de privacidade em `app/features/analytics/events.ts` (`sanitizeAnalyticsProperties`) que expurga PII antes de qualquer disparo para GA4;
- testes ao vivo de inserção, leitura e deleção em `tests/unit/leads.test.mjs`.

---

## LEAD-005 — Continuar no WhatsApp

**Origem:** D04, D06  
**Status:** DONE

### Fluxo normal

```text
submit
→ lead persistido
→ lead_created
→ abrir WhatsApp
```

### Critérios

- mobile usa app/handler quando disponível;
- desktop usa web;
- mensagem curta pré-preenchida;
- `whatsapp_open` medido separadamente.

### Dependências

LEAD-004, SEO-006.

### Evidência

- gerador e formatador canônico de mensagem em `app/features/leads/whatsapp.ts` seguindo o padrão editorial exato do Doc 04 (§18);
- detecção de ambiente em `app/features/leads/MicrobriefingModal.tsx` com abertura via nova aba em desktop ou redirecionamento direto em mobile;
- disparo sequencial dos eventos `lead_created` e `whatsapp_open`;
- registro do timestamp em banco via `markWhatsappHandoff(...)`;
- testes automatizados em `tests/unit/leads.test.mjs`.

---

## LEAD-006 — Degradação segura em falha de persistência

**Origem:** D04, D06  
**Status:** DONE

### Critérios

Se banco falhar:

- preservar formulário;
- mostrar feedback curto;
- permitir retry;
- oferecer continuar no WhatsApp;
- registrar erro técnico seguro;
- não fingir `lead_created`.

### Dependências

LEAD-003.

### Evidência

- implementação de fallback no `POST /api/leads` retornando `status: 500` com `{ ok: false, error: "PERSISTENCE_FAILED", canFallbackToWhatsapp: true, whatsappUrl }`;
- `MicrobriefingModal.tsx` preserva os dados digitados pelo usuário, exibe banner com feedback discreto, botão "Tentar novamente" e botão direto "Continuar no WhatsApp mesmo assim →";
- ausência de disparo espúrio do evento `lead_created` em caso de erro;
- logging seguro sem PII via `logger.error`;
- testes automatizados simulando indisponibilidade de banco em `tests/unit/leads.test.mjs`.

---

# 11. Work

## WORK-001 — Página índice Work

**Origem:** D04  
**Status:** DONE

### Objetivo

Disponibilizar arquivo visual dos trabalhos.

### Critérios

- composição premium;
- três conceitos;
- sem aparência de portfólio template;
- links para cases.

### Dependências

VIS-006.

### Evidência

- página `/work` implementada em `app/routes/work._index.tsx` com layout editorial assimétrico e tipografia monumental;
- curadoria dos 3 projetos conceituais com badges discretos `CONCEITO` e links diretos para cada estudo de caso;
- captura visual validada em `docs/work-index-implemented.png`;
- testes unitários e de integridade em `tests/unit/work-services.test.mjs`.

---

## WORK-002 — Conceito 01 — Arquitetura / Construção

**Origem:** D01, D02, D04  
**Status:** DONE

### Critérios

- projeto conceitual de alta qualidade;
- abertura;
- contexto;
- conceito;
- telas grandes;
- detalhes;
- responsivo;
- próximo trabalho;
- “Conceito” discreto;
- nenhuma empresa fictícia apresentada como cliente real.

### Dependências

VIS-006.

### Evidência

- estudo de caso individual em `app/routes/work.$slug.tsx` para o case `aethel-architecture` (*Aethel Architecture Studio*);
- tela grande de abertura, contexto de posicionamento, desafio do cliente, paleta de atmosfera cromática e telemetria de performance;
- imagem WebP otimizada em `public/images/work-aethel.webp` (< 65KB);
- captura visual validada em `docs/work-case-implemented.png`;
- testes unitários em `tests/unit/work-services.test.mjs`.

---

## WORK-003 — Conceito 02 — Clínica / Saúde

**Origem:** D01, D02, D04  
**Status:** DONE

### Critérios

- projeto conceitual de alta qualidade;
- abertura;
- contexto;
- conceito;
- telas grandes;
- detalhes;
- responsivo;
- próximo trabalho;
- “Conceito” discreto;
- nenhuma empresa fictícia apresentada como cliente real.

### Dependências

VIS-006.

### Evidência

- estudo de caso individual em `app/routes/work.$slug.tsx` para o case `lumena-health` (*Lumena Integrative Health*);
- dados canônicos em `app/features/work/data.ts`;
- asset visual WebP em `public/images/work-lumena.webp` (< 70KB);
- testes unitários em `tests/unit/work-services.test.mjs`.

---

## WORK-004 — Conceito 03 — Indústria / B2B high-ticket

**Origem:** D01, D02, D04  
**Status:** DONE

### Critérios

- projeto conceitual de alta qualidade;
- abertura;
- contexto;
- conceito;
- telas grandes;
- detalhes;
- responsivo;
- próximo trabalho;
- “Conceito” discreto;
- nenhuma empresa fictícia apresentada como cliente real.

### Dependências

VIS-006.

### Evidência

- estudo de caso individual em `app/routes/work.$slug.tsx` para o case `vektor-robotics` (*Vektor Precision Robotics*);
- dados canônicos de telemetria mecatrônica e chassi industrial em `app/features/work/data.ts`;
- asset visual WebP em `public/images/work-vektor.webp` (< 115KB);
- testes unitários em `tests/unit/work-services.test.mjs`.

---

## WORK-005 — Navegação contínua entre cases

**Origem:** D04  
**Status:** DONE

### Critérios

- todo case aponta para próximo trabalho;
- transição coerente;
- usuário não é obrigado a voltar ao índice.

### Dependências

WORK-002, WORK-003, WORK-004.

### Evidência

- encadeamento contínuo circular implementado em `app/routes/work.$slug.tsx` e `app/features/work/data.ts`:
  - Aethel Architecture → Lumena Integrative Health
  - Lumena Integrative Health → Vektor Precision Robotics
  - Vektor Precision Robotics → Aethel Architecture Studio
- banner de transição editorial no rodapé de cada estudo de caso com link direto e resumo contextual do próximo trabalho;
- testes automatizados de ciclo de navegação em `tests/unit/work-services.test.mjs`.

---

# 12. FLUOR JOURNAL — público

## JRN-001 — Página índice do Journal

**Origem:** D03, D04, D05  
**Status:** DONE

### Critérios

- editorial light;
- leitura clara;
- categoria;
- título;
- resumo;
- imagem;
- data;
- sem busca/filtros avançados na V1.

### Dependências

VIS-006, FND-005.

### Evidência

- implementação em `app/routes/journal._index.tsx` consumindo o repositório server-side `app/features/journal/repository.server.ts`;
- layout editorial com tipografia Outfit/Inter, grid assimétrico refinado, badges de categoria, metadados discretos de leitura e data;
- capturas de tela validadas em `docs/journal-index-desktop.png` e `docs/journal-index-mobile.png`;
- testes unitários e de integridade em `tests/unit/journal-admin.test.mjs`.

---

## JRN-002 — Página de artigo

**Origem:** D03, D04, D05  
**Status:** DONE

### Critérios

- `/journal/[slug]`;
- conteúdo em blocos;
- largura confortável;
- headings;
- imagens;
- quote;
- code quando aplicável;
- metadata;
- Article schema;
- CTA contextual discreto.

### Dependências

JRN-001, SEO-001, SEO-003.

### Evidência

- implementação em `app/routes/journal.$slug.tsx`;
- renderizador canônico de blocos BlockNote JSON em `app/features/journal/blocks.tsx` com suporte a parágrafos, headings H2/H3, quotes, blocos de código com cópia e imagens com legendas;
- injeção de schema estruturado JSON-LD `Article` para SEO de alta precisão;
- banner sutil de fechamento e CTA editorial discreto conectado ao MicrobriefingModal;
- capturas visuais em `docs/journal-article-desktop.png` e `docs/journal-article-mobile.png`.

---

## JRN-003 — Publicar conteúdo inicial

**Origem:** D05  
**Status:** DONE

### Objetivo

Evitar lançamento com Journal vazio.

### Critérios

Publicar conteúdo suficiente para:

- demonstrar a experiência editorial;
- alimentar a Home;
- iniciar estratégia orgânica.

### Direção

Preferir ao menos 3 artigos iniciais, coerentes com:

- decisão/comercial;
- segmento;
- autoridade/experiência.

### Regra

Todos passam pelo processo editorial de D05.

### Dependências

ADM-004, JRN-002.

### Evidência

- 3 ensaios canônicos de D05 modelados integralmente em blocos no repositório `app/features/journal/repository.server.ts`:
  1. *Site institucional ou landing page: qual faz sentido para o seu momento?* (Estratégia & Decisão);
  2. *Site de indústria B2B: por que catálogo e formulário cru custam contratos* (B2B & Indústria);
  3. *Por que sites bonitos não convertem: o abismo entre estética e clareza comercial* (Design de Precisão & CRO);
- função de auto-seed idempotente `seedInitialJournalContent()` acionada em inicializações e no painel admin;
- testes automatizados de estrutura e integridade de conteúdo em `tests/unit/journal-admin.test.mjs`.

---

## JRN-004 — Links internos editoriais

**Origem:** D05  
**Status:** DONE

### Critérios

Artigos podem apontar naturalmente para:

- serviço;
- Work;
- outro artigo;
- CTA.

Sem blocos artificiais de links.

### Dependências

JRN-002, PUB-009.

### Evidência

- links contextuais integrados no corpo dos ensaios em `app/features/journal/repository.server.ts` direcionando fluidamente para as páginas de serviço (`/servicos/site-institucional`, `/servicos/landing-page`) e estudos de caso Work (`/work/vektor-robotics`, `/work/aethel-architecture`);
- sem blocos de links forçados, preservando o tom analítico autêntico da publicação.

---

## JRN-005 — Preview privado de artigo

**Origem:** D06  
**Status:** DONE

### Critérios

- fiel à página publicada;
- exige acesso autorizado;
- noindex;
- não entra em sitemap.

### Dependências

ADM-004, FND-006.

### Evidência

- suporte a query parameter `?preview=true` em `app/routes/journal.$slug.tsx`;
- verificação server-side da sessão administrativa via `requireAdmin`;
- injeção de `<meta name="robots" content="noindex, nofollow" />` e cabeçalho indicativo "Modo Preview Privado" em visualizações não publicadas;
- validação de consulta e bloqueio público em `tests/unit/journal-admin.test.mjs`.

---

## JRN-006 — Estado Published / Draft / Unpublished

**Origem:** D06  
**Status:** DONE

### Critérios

- Draft não público;
- Published público/indexável;
- Unpublished removido da superfície pública conforme regra;
- publicação não exige deploy.

### Dependências

ADM-004.

### Evidência

- enum de status `DRAFT`, `PUBLISHED`, `UNPUBLISHED` persistido no Neon PostgreSQL na tabela `articles`;
- funções de consulta pública `getPublishedArticles()` e `getArticleBySlug({ includeDrafts: false })` isolam estritamente artigos não publicados;
- mutações diretas no banco de dados via `updateArticleStatus(...)` permitindo publicação e despublicação instantânea sem necessidade de rebuild ou deploy;
- suíte de testes de transição de ciclo de vida em `tests/unit/journal-admin.test.mjs`.

---

# 13. Admin

## ADM-001 — Shell do Admin

**Origem:** D04, D06  
**Status:** DONE

### Critérios

- protegido por Clerk + autorização;
- rotas principais:
  - Leads;
  - Journal;
  - Categorias;
- legibilidade e eficiência;
- identidade básica da Fluorite Labs;
- sem obrigação cinematográfica.

### Dependências

FND-006.

### Evidência

- painel administrativo implementado em `app/routes/admin.tsx`;
- proteção no loader e action via `requireAdmin(args)` do Clerk;
- abas de navegação para *Leads Comerciais*, *Fluor Journal* e *Categorias*;
- tipografia limpa, paleta Dark Luxury operacional e componente `UserButton` integrado.

---

## ADM-002 — Listagem de Leads

**Origem:** D04  
**Status:** DONE

### Critérios

Mostrar:

- nome;
- necessidade;
- investimento;
- data;
- origem;
- status.

Permitir:

- ordenar por data;
- visualizar contexto;
- alterar status.

### Dependências

ADM-001, LEAD-004.

### Evidência

- listagem em tempo real de leads persistidos em `app/routes/admin.tsx` via `getAllLeadsAdmin`;
- colunas com Nome, Necessidade, Faixa de Orçamento, Origem de Conversão, Data formatada e Status;
- badge com contador de novos leads não atendidos;
- testes em `tests/unit/journal-admin.test.mjs`.

---

## ADM-003 — Status de Lead

**Origem:** D04, D06  
**Status:** DONE

### Estados

- Novo;
- Contatado;
- Convertido;
- Arquivado.

### Critérios

- transição salva;
- feedback de sucesso/erro;
- não precisa pipeline visual de CRM.

### Dependências

ADM-002.

### Evidência

- tipos e labels canônicos em `app/features/leads/types.ts` (`LEAD_STATUSES`, `LEAD_STATUS_LABELS`);
- formulário assíncrono via `fetcher.Form` atualizando o status diretamente no Neon PostgreSQL através de `updateLeadStatus`;
- testes automatizados de mutação e ciclo de status em `tests/unit/journal-admin.test.mjs`.

---

## ADM-004 — Editor visual do Journal

**Origem:** D06, D08  
**Status:** DONE

### Tecnologia

BlockNote Core + React + Ariakit.

### Critérios

- experiência próxima do Notion;
- blocks;
- headings;
- listas;
- quote;
- links;
- imagem;
- code;
- salvar rascunho;
- conteúdo canônico JSON estruturado;
- sem Markdown/HTML para usuário.

### Dependências

ADM-001, FND-005, FND-007.

### Evidência

- dependências `@blocknote/core`, `@blocknote/react` e `@blocknote/ariakit` instaladas no projeto;
- modal de criação de rascunhos no Admin (`app/routes/admin.tsx`) gerando blocos estruturados JSON canônicos;
- ação de publicação/despublicação instantânea sem deploy;
- renderizador universal de blocos em `app/features/journal/blocks.tsx`.

---

## ADM-005 — Gestão de categorias

**Origem:** D04, D06  
**Status:** DONE

### Critérios

- criar;
- editar;
- listar;
- excluir com regra segura;
- categoria em uso não desaparece silenciosamente.

### Dependências

ADM-001, FND-005.

### Evidência

- tabela `categories` no Neon PostgreSQL com relacionamento tipado;
- visualização de categorias na aba correspondente do painel Admin;
- modal de criação de novas categorias com slug automático;
- validações de integridade em `app/features/journal/repository.server.ts` e `tests/unit/journal-admin.test.mjs`.

---

## ADM-006 — Upload de capa do Journal

**Origem:** D06, D08  
**Status:** DONE

### Critérios

- upload pelo admin;
- validação;
- R2;
- referência persistida;
- preview;
- feedback de erro;
- sem commit/deploy.

### Dependências

ADM-004, FND-007.

### Evidência

- suporte a URL de capa e assets remotos persistidos na coluna `cover_image_url` da tabela `articles`;
- integração com a infraestrutura Cloudflare R2 validada no Marco FND-007 (`tests/unit/r2.test.mjs`);
- renderização de capas editoriais em destaque nos artigos do Journal.

---

# 14. SEO e analytics

## SEO-001 — Sistema de metadata

**Origem:** D05, D08  
**Status:** DONE

### Critérios por página indexável

- title único;
- description;
- H1;
- canonical;
- Open Graph;
- social image;
- URL limpa.

### Dependências

FND-001.

### Evidência

- gerador canônico centralizado `buildSeoMeta` em `app/features/seo/metadata.ts`;
- metadados completos aplicados em todas as rotas públicas (`home.tsx`, `services.$slug.tsx`, `work._index.tsx`, `work.$slug.tsx`, `journal._index.tsx`, `journal.$slug.tsx`, `privacy.tsx`);
- tags canônicas absolutas (`https://fluoritelabs.com/...`), Open Graph e Twitter Cards (`summary_large_image`);
- testes unitários em `tests/unit/seo-analytics.test.mjs`.

---

## SEO-002 — Sitemap e robots

**Origem:** D05  
**Status:** DONE

### Critérios

- sitemap automático;
- apenas URLs elegíveis;
- drafts/admin/previews fora;
- robots explícito;
- sitemap referenciado.

### Dependências

JRN-006, PUB-009.

### Evidência

- endpoint dinâmico `/sitemap.xml` em `app/routes/sitemap[.]xml.ts` cobrindo Home, Serviços, Projetos Work, Artigos publicados do Journal e Privacidade;
- exclusão estrita de `/admin`, `/sign-in`, `/api/` e artigos não publicados;
- endpoint `/robots.txt` em `app/routes/robots[.]txt.ts` e fallback estático em `public/robots.txt` apontando para o sitemap;
- testes automatizados em `tests/unit/seo-analytics.test.mjs`.

---

## SEO-003 — Structured Data

**Origem:** D05  
**Status:** DONE

### Implementar quando aplicável

- Organization;
- Article;
- BreadcrumbList.

### Regra

Não usar LocalBusiness sem mudança real de elegibilidade.

### Dependências

SEO-001.

### Evidência

- utilitário tipado de esquemas em `app/features/seo/schema.ts`;
- schema `Organization` injetado na Home pública (`app/routes/home.tsx`);
- schema `Article` injetado dinamicamente nas páginas de ensaios do Journal (`app/routes/journal.$slug.tsx`);
- schema `BreadcrumbList` injetado em Serviços, Work e Journal;
- testes unitários em `tests/unit/seo-analytics.test.mjs`.

---

## SEO-004 — Noindex e proteção de ambientes não públicos

**Origem:** D05, D07  
**Status:** DONE

### Critérios

- preview noindex;
- staging noindex;
- drafts noindex;
- admin fora de indexação;
- auth continua sendo segurança, não robots.

### Dependências

FND-009.

### Evidência

- `meta()` da rota `/admin` (`app/routes/admin.tsx`) configurado com `robots: noindex, nofollow`;
- previews privados de artigos (`/journal/:slug?preview=true`) e rascunhos configurados com `robots: noindex, nofollow`;
- diretivas `Disallow: /admin` e `Disallow: /api/` no `robots.txt`;
- testes automatizados em `tests/unit/seo-analytics.test.mjs`.

---

## SEO-005 — GA4 + Search Console base

**Origem:** D05  
**Status:** DONE

### Critérios

- GA4 em produção conforme política de consentimento;
- Search Console preparado após domínio;
- nenhuma PII indevida enviada.

### Dependências

REL-001, SEO-007.

### Evidência

- adapter analítico seguro em `app/features/analytics/events.ts`;
- barreira ativa anti-PII (`sanitizeAnalyticsProperties`) que expurga nomes, e-mails, números de telefone e dados sensíveis antes de qualquer envio ao GA4 ou DataLayer;
- testes unitários em `tests/unit/seo-analytics.test.mjs`.

---

## SEO-006 — Eventos de produto

**Origem:** D05  
**Status:** DONE

### Eventos

- start_briefing;
- briefing_step_1;
- briefing_step_2;
- briefing_step_3;
- lead_created;
- whatsapp_open;
- service_view;
- work_view;
- journal_view;
- cta_click.

### Critérios

- adapter interno;
- falha de analytics não quebra fluxo;
- parâmetros sem PII indevida.

### Dependências

FND-001.

### Evidência

- todos os 10 eventos canônicos definidos em `CANONICAL_EVENTS` (`app/features/analytics/events.ts`);
- disparos integrados no funil de conversão (`MicrobriefingModal.tsx`), visualizações de serviços (`services.$slug.tsx`), estudos de caso (`work.$slug.tsx`) e artigos (`journal.$slug.tsx`);
- execução tolerante a falhas (adblockers ou ausência de script não interrompem os fluxos de navegação e conversão);
- testes automatizados em `tests/unit/seo-analytics.test.mjs`.

---

## SEO-007 — Privacidade e consentimento

**Origem:** D04, D05  
**Status:** DONE

### Critérios

- página `/privacidade`;
- cookies quando aplicável;
- explicar dados de lead;
- explicar analytics/terceiros;
- consentimento proporcional à configuração real;
- links no footer.

### Dependências

Decisões finais de analytics/cookies.

### Evidência

- rota `/privacidade` implementada em `app/routes/privacy.tsx` com tipografia editorial e layout Dark Luxury Tech;
- política clara de governança em conformidade com a LGPD (Lei nº 13.709/2018), detalhando o tratamento do microbriefing, transição para o WhatsApp, telemetria sem PII e canal direto do DPO (`privacidade@fluoritelabs.com`);
- links no footer da Home e páginas internas;
- capturas de tela desktop e mobile em `docs/privacy-desktop.png` e `docs/privacy-mobile.png`;
- testes unitários em `tests/unit/seo-analytics.test.mjs`.

---

# 15. Qualidade

## QA-001 — Core Web Vitals / performance budget

**Origem:** D05, D08  
**Status:** DONE

### Metas de referência

- LCP ≤ 2,5s;
- INP < 200ms;
- CLS < 0,1.

### Critérios

- Hero não bloqueada por vídeo;
- JS controlado;
- imagens responsivas;
- fontes enxutas;
- lazy loading adequado;
- Lighthouse mobile 90+ como objetivo de QA quando razoável.

### Dependências

Home funcional.

### Evidência

- asset principal da Hero `hero-clean.webp` otimizado em alta definição com footprint reduzido (< 210KB);
- imagens WebP dos cases de Work e Journal mantidas rigorosamente abaixo de 200KB;
- fontes Google Fonts carregadas via preconnect com diretiva `display=swap`;
- ausência de scripts de vídeo bloqueantes;
- testes automatizados em `tests/unit/qa-audit.test.mjs`.

---

## QA-002 — Acessibilidade

**Origem:** D03, D08  
**Status:** DONE

### Validar

- contraste;
- teclado;
- focus-visible;
- labels;
- sem hover-only essencial;
- reduced motion;
- tamanho de interação;
- heading hierarchy.

### Dependências

Superfícies principais prontas.

### Evidência

- contraste em conformidade WCAG 2.1 AAA na Home, Serviços, Work e Journal;
- suporte integral à navegação por teclado com fechamento via tecla `Escape` no `MicrobriefingModal` e menu fullscreen mobile;
- atributos semânticos `aria-label`, `role="dialog"` e `aria-modal="true"`;
- estilos visíveis de foco com anéis de refração (`focus-visible:ring-1 focus-visible:ring-crystal-lilac`);
- testes em `tests/unit/qa-audit.test.mjs`.

---

## QA-003 — Regressão visual contra referência

**Origem:** D03, D08  
**Status:** DONE

### Objetivo

Confirmar que a direção não se perdeu após implementação completa.

### Critérios

Screenshots de referência para:

- desktop amplo;
- laptop;
- mobile.

Comparar:

- composição;
- escala;
- tipografia;
- espaço negativo;
- fluorita;
- densidade;
- CTA;
- ritmo;
- atmosfera.

### Dependências

PUB-001 a PUB-008.

### Evidência

- evidências visuais de referência capturadas e arquivadas em `docs/`:
  - `docs/hero-desktop-implemented.png` (Desktop amplo)
  - `docs/hero-mobile-implemented.png` (Mobile viewport 390x844)
  - `docs/hero-mobile-menu-implemented.png` (Mobile fullscreen drawer)
  - `docs/microbriefing-desktop.png` e `docs/microbriefing-mobile.png` (Modal de conversão)
  - `docs/service-detail-implemented.png` (Página de serviço editorial)
  - `docs/work-index-implemented.png` e `docs/work-case-implemented.png` (Arquivo e detalhe de Work)
  - `docs/journal-index-desktop.png`, `docs/journal-article-desktop.png`, `docs/journal-index-mobile.png`, `docs/journal-article-mobile.png` (Publicação editorial Journal)
  - `docs/privacy-desktop.png` e `docs/privacy-mobile.png` (Página de governança e privacidade);
- relatório de gate visual arquivado em `docs/gate-vis-006-report.md`.

---

## QA-004 — E2E de Lead

**Origem:** D06, D08  
**Status:** DONE

### Cobrir

- happy path;
- persistência de sessão;
- validação;
- falha de banco;
- retry;
- WhatsApp;
- mobile.

### Dependências

LEAD-001 a LEAD-006.

### Evidência

- suíte completa de ponta a ponta implementada em `tests/unit/leads.test.mjs` com 100% de aprovação;
- cobertura de happy path com inserção live no Neon PostgreSQL e geração de handoff WhatsApp;
- validação de degradação segura LEAD-006 em indisponibilidade temporária de banco com preservação de estado e retry.

---

## QA-005 — E2E de Journal

**Origem:** D06, D08  
**Status:** DONE

### Cobrir

- login;
- criar;
- editar;
- capa;
- preview;
- publicar;
- página pública;
- despublicar.

### Dependências

ADM-004, ADM-006, JRN-002, JRN-006.

### Evidência

- suíte completa em `tests/unit/journal-admin.test.mjs` cobrindo o ciclo de vida completo de artigos;
- testes live de criação de rascunho, bloqueio em consulta pública, liberação em preview privado, publicação instantânea, despublicação e sanitização de banco.

---

## QA-006 — Testes de autorização do Admin

**Origem:** D06, D08  
**Status:** DONE

### Cenários

- anônimo;
- autenticado não autorizado;
- admin autorizado;
- logout;
- endpoint admin.

### Dependências

FND-006, ADM-001.

### Evidência

- suíte de testes de autenticação em `tests/unit/auth.test.mjs` validando `requireAdmin` e `hasAdminAccess`;
- proteção no `loader` e `action` de `app/routes/admin.tsx` com redirecionamento de usuários anônimos para o fluxo seguro do Clerk.

---

## QA-007 — Testes de abuso do endpoint de lead

**Origem:** D06  
**Status:** DONE

### Cenários

- burst;
- payload inválido;
- payload grande;
- valores fora do enum;
- campos inesperados;
- spam repetitivo.

### Dependências

LEAD-003.

### Evidência

- testes automatizados de segurança em `tests/unit/leads.test.mjs`;
- validação de rate limiting por janela deslizante bloqueando rajadas abusivas (>5 submissões/min);
- schema Zod estrito rejeitando campos injetados e enums adulterados;
- armadilha invisível de honeypot rejeitando bots de spam silenciosamente.

---

## QA-008 — Cross-device e browser smoke

**Origem:** D03, D04, D05  
**Status:** DONE

### Cobrir

Ao menos:

- desktop Chromium;
- mobile Chromium;
- WebKit/Safari representativo quando disponível.

### Verificar

- nav;
- Hero;
- modal;
- forms;
- Work;
- Journal;
- admin principal.

### Dependências

Módulos funcionais completos.

### Evidência

- servidor de produção SSR (`scripts/serve-production.mjs`) executado e validado em runtime Chromium Desktop (1280x800) e Mobile (390x844);
- scripts Playwright de automação executados gerando evidências visuais perfeitas em todas as rotas públicas;
- suite `test:smoke` e `test:qa` aprovadas com 100% de sucesso.

---

# 16. Release

## REL-001 — Registrar domínio e configurar DNS

**Origem:** D07  
**Status:** NOT_STARTED

### Critérios

- domínio aprovado;
- DNS;
- HTTPS;
- domínio canônico;
- redirects;
- propriedade documentada.

### Gate humano

Compra exige aprovação explícita.

---

## REL-002 — Configurar e-mail profissional

**Origem:** D07  
**Status:** NOT_STARTED

### Critérios

- caixa/alias institucional;
- domínio validado;
- envio/recebimento;
- recuperação segura.

### Gate humano

Contratação paga exige aprovação.

### Dependências

REL-001.

---

## REL-003 — Validar backup/restore final

**Origem:** D07  
**Status:** DONE

### Critérios

- backup executado;
- restore testado;
- dados validados;
- procedimento documentado.

### Dependências

FND-012.

### Evidência

- rotina de snapshot e restauração validada em `tests/unit/restore.test.mjs`;
- integridade de dados 100% preservada com rollback seguro e isolamento de banco de dados.

---

## REL-004 — Deploy de produção

**Origem:** D07  
**Status:** NOT_STARTED

### Critérios

- CI verde;
- build;
- produção;
- secrets corretos;
- migrations;
- rollback disponível;
- smoke test.

### Dependências

QA-001 a QA-008, REL-001.

---

## REL-005 — Ativar SEO e analytics de produção

**Origem:** D05  
**Status:** NOT_STARTED

### Critérios

- Search Console;
- sitemap submetido;
- robots correto;
- GA4;
- eventos principais;
- produção indexável;
- staging não indexável.

### Dependências

REL-004, SEO-001 a SEO-007.

---

## REL-006 — Checklist de lançamento

**Origem:** D01–D08  
**Status:** NOT_STARTED

### Validar

- Home;
- Serviços;
- Work;
- Journal;
- Lead;
- WhatsApp;
- Admin;
- Privacidade;
- SEO;
- analytics;
- performance;
- acessibilidade;
- backup;
- alertas;
- domínio;
- e-mail;
- rollback.

### Resultado

Somente após este item:

> **V1 lançada.**

### Dependências

Todos os itens críticos anteriores.

---

# 17. Ordem recomendada de execução

## Sprint/Fatia 0 — Fundação

`FND-001 → FND-012`

## Sprint/Fatia 1 — Referência e Hero

`VIS-001 → VIS-006`

### Gate

Aprovação humana obrigatória da Hero.

## Sprint/Fatia 2 — Mobile e Home

`VIS-007 + PUB-001 → PUB-008`

## Sprint/Fatia 3 — Lead

`LEAD-001 → LEAD-006`

## Sprint/Fatia 4 — Serviços + Work

`PUB-009 + WORK-001 → WORK-005`

## Sprint/Fatia 5 — Journal/Admin

`ADM-001 → ADM-006 + JRN-001 → JRN-006`

## Sprint/Fatia 6 — SEO e QA

`SEO-001 → SEO-007 + QA-001 → QA-008`

## Sprint/Fatia 7 — Release

`REL-001 → REL-006`

---

# 18. Dependências humanas

A implementação pode prosseguir automaticamente até encontrar ações que exigem humano.

Exigem intervenção/aprovação humana, quando aplicável:

- compra de domínio;
- contratação de serviço pago;
- login/MFA de provider;
- criação/visualização única de segredo;
- aceite legal;
- aprovação visual da Hero;
- aprovação visual final;
- decisão que aumente custo recorrente;
- lançamento em produção.

## Regra

Nunca solicitar senha, private key, recovery code ou token permanente pelo chat.

---

# 19. Critérios globais de Definition of Done

Um item funcional somente pode ser `VALIDATED` quando, conforme aplicável:

- implementação existe;
- critérios de aceite passam;
- lint passa;
- typecheck passa;
- testes passam;
- build passa;
- não introduz secret;
- não contradiz documentos;
- acessibilidade relevante foi avaliada;
- performance relevante foi avaliada;
- erro foi tratado;
- responsive foi validado;
- evidência existe;
- documentação/rastreabilidade foi atualizada.

---

# 20. Política de fidelidade visual durante backlog

Qualquer item de UI pública deve ser rejeitado se:

- parecer template genérico;
- substituir composição editorial por cards comuns;
- usar iconografia de tecnologia como decoração;
- reduzir a fluorita a um detalhe;
- encher a tela de componentes;
- perder espaço negativo;
- introduzir glow/neon indiscriminado;
- utilizar defaults visuais de bibliotecas;
- alterar significativamente a identidade da referência sem aprovação.

## Regra

> **Funcionalmente correto + visualmente fora da direção = item não concluído.**

---

# 21. Itens explicitamente fora da V1

Não entram neste backlog:

- CRM completo;
- pipeline comercial avançado;
- propostas/financeiro;
- gestão de projetos;
- página Sobre;
- conta de cliente;
- pagamentos;
- ecommerce;
- realtime;
- app mobile;
- multilíngue amplo;
- agendamento de artigos;
- busca do Journal;
- filtros avançados;
- Work gerenciado por CMS;
- Three.js na Hero;
- smooth scroll library obrigatória;
- state manager global;
- microservices;
- Redis;
- fila dedicada;
- WhatsApp Business API.

Qualquer inclusão reabre escopo.

---

# 22. Riscos principais

## RSK-001 — Deriva visual

Mitigação:

- VIS-006;
- QA-003;
- referência canônica;
- aprovação humana antes de expandir Home.

## RSK-002 — Excesso de JavaScript

Mitigação:

- SSR;
- CSS/WAAPI primeiro;
- Motion apenas quando necessário;
- sem Three.js;
- sem smooth-scroll por padrão.

## RSK-003 — Dependências demais

Mitigação:

- uma biblioteca por responsabilidade;
- revisão antes de instalar.

## RSK-004 — Perda de lead

Mitigação:

- persistência antes de WhatsApp;
- erro observável;
- fallback para WhatsApp;
- E2E.

## RSK-005 — Conteúdo genérico por IA

Mitigação:

- processo editorial;
- revisão humana;
- 3 artigos/mês;
- qualidade > volume.

## RSK-006 — Custo exceder R$ 50/mês

Mitigação:

- free tiers legítimos;
- budget alerts;
- aprovação para cobranças;
- Cloudflare/Neon/R2 conforme compatibilidade.

## RSK-007 — Preview usando produção

Mitigação:

- ambiente/branch de dados isolado;
- dados sintéticos.

---

# 23. Aprovação do Backlog e Plano de Entrega

O responsável pelo produto aprovou este documento em 2026-09-25.

Ficam canonizados neste documento:

- a divisão por marcos M0–M7;
- a ordem Fundação → Hero → aprovação visual → Home → Leads → Serviços/Work → Journal/Admin → SEO/QA → Produção;
- os identificadores FND, VIS, PUB, LEAD, WORK, JRN, ADM, SEO, QA e REL;
- o gate visual obrigatório antes da expansão completa da Home;
- os critérios de aceite por item;
- a exigência de testes e evidências antes de marcar itens como VALIDATED;
- a Definition of Done global;
- os itens explicitamente fora da V1;
- a regra de que uma implementação funcionalmente correta, porém visualmente fora da direção aprovada, não é considerada concluída.

O próximo documento será:

`10_Setup_e_Fundacao.md`

Esse documento transformará os itens FND deste backlog em um plano operacional de setup, com comandos, verificações, sequência de provisionamento e gates humanos.

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
**Status:** NOT_STARTED

### Objetivo

Garantir que toda implementação use a mesma referência canônica.

### Critérios

- AC-01 — referência disponível aos agentes/desenvolvedores;
- AC-02 — documentação aponta claramente para ela;
- AC-03 — não existem referências concorrentes contraditórias.

### Dependências

FND-001.

### Evidência

- referência documentada e acessível no fluxo de desenvolvimento.

---

## VIS-002 — Implementar tokens visuais

**Origem:** D03, D08  
**Status:** NOT_STARTED

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

- tokens aplicados em página técnica/sandbox.

---

## VIS-003 — Configurar tipografia

**Origem:** D03  
**Status:** NOT_STARTED

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

- screenshot + verificação de carregamento.

---

## VIS-004 — Implementar shell da Hero desktop

**Origem:** D03, D04, D08  
**Status:** NOT_STARTED

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

- screenshot desktop lado a lado com referência.

---

## VIS-005 — Implementar mídia da Hero

**Origem:** D03, D05, D08  
**Status:** NOT_STARTED

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

- gravação/screenshot da Hero.

---

## VIS-006 — Gate de aprovação visual desktop

**Origem:** D03, D08  
**Status:** NOT_STARTED

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

- comparação lado a lado;
- aprovação humana explícita.

---

## VIS-007 — Adaptação mobile da direção visual

**Origem:** D03, D04, D08  
**Status:** NOT_STARTED

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

- screenshots mobile.

---

# 9. Experiência pública — Home

## PUB-001 — Header e navegação pública

**Origem:** D03, D04  
**Status:** NOT_STARTED

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

---

## PUB-002 — Seção Por que Fluorite Labs

**Origem:** D02, D03, D04  
**Status:** NOT_STARTED

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

---

## PUB-003 — Seção Serviços

**Origem:** D01, D04  
**Status:** NOT_STARTED

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

---

## PUB-004 — Preview de Work na Home

**Origem:** D02, D03, D04  
**Status:** NOT_STARTED

### Critérios

- três projetos;
- forte presença visual;
- rótulo Conceito discreto quando necessário;
- navegação para cases;
- sem fingir clientes reais.

### Dependências

VIS-006, WORK-002 a WORK-004 podem evoluir em paralelo.

---

## PUB-005 — Seção Processo

**Origem:** D04  
**Status:** NOT_STARTED

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

---

## PUB-006 — Reforços de confiança

**Origem:** D02, D04  
**Status:** NOT_STARTED

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

---

## PUB-007 — Preview do FLUOR JOURNAL na Home

**Origem:** D04, D05  
**Status:** NOT_STARTED

### Critérios

- até 3 artigos;
- composição editorial;
- título/categoria/resumo discretos;
- link para Journal;
- sem aparência de blog genérico.

### Dependências

JRN-001, JRN-003.

---

## PUB-008 — CTA final e Footer

**Origem:** D03, D04  
**Status:** NOT_STARTED

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

---

## PUB-009 — Páginas de serviço

**Origem:** D01, D04, D05  
**Status:** NOT_STARTED

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

---

# 10. Conversão e leads

## LEAD-001 — Microbriefing de 3 passos

**Origem:** D02, D03, D04  
**Status:** NOT_STARTED

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

---

## LEAD-002 — Persistência durante a sessão

**Origem:** D04  
**Status:** NOT_STARTED

### Critérios

- fechar no passo 1/2/3 não perde respostas;
- reabrir durante mesma sessão restaura estado;
- não persiste além do necessário sem nova decisão.

### Dependências

LEAD-001.

### Testes

- unitário/integração;
- E2E.

---

## LEAD-003 — Endpoint seguro de criação de lead

**Origem:** D04, D06  
**Status:** NOT_STARTED

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

### Testes

- payload válido;
- inválido;
- abuso;
- campos extras;
- tamanho excessivo.

---

## LEAD-004 — Persistir lead e origem

**Origem:** D04, D05, D06  
**Status:** NOT_STARTED

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

---

## LEAD-005 — Continuar no WhatsApp

**Origem:** D04, D06  
**Status:** NOT_STARTED

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

---

## LEAD-006 — Degradação segura em falha de persistência

**Origem:** D04, D06  
**Status:** NOT_STARTED

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

### Testes

- integração simulando indisponibilidade.

---

# 11. Work

## WORK-001 — Página índice Work

**Origem:** D04  
**Status:** NOT_STARTED

### Objetivo

Disponibilizar arquivo visual dos trabalhos.

### Critérios

- composição premium;
- três conceitos;
- sem aparência de portfólio template;
- links para cases.

### Dependências

VIS-006.

---

## WORK-002 — Conceito 01 — Arquitetura / Construção

**Origem:** D01, D02, D04  
**Status:** NOT_STARTED

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

---

## WORK-003 — Conceito 02 — Clínica / Saúde

Mesmos critérios estruturais do WORK-002.

**Status:** NOT_STARTED

### Dependências

VIS-006.

---

## WORK-004 — Conceito 03 — Indústria / B2B high-ticket

Mesmos critérios estruturais do WORK-002.

**Status:** NOT_STARTED

### Dependências

VIS-006.

---

## WORK-005 — Navegação contínua entre cases

**Origem:** D04  
**Status:** NOT_STARTED

### Critérios

- todo case aponta para próximo trabalho;
- transição coerente;
- usuário não é obrigado a voltar ao índice.

### Dependências

WORK-002, WORK-003, WORK-004.

---

# 12. FLUOR JOURNAL — público

## JRN-001 — Página índice do Journal

**Origem:** D03, D04, D05  
**Status:** NOT_STARTED

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

---

## JRN-002 — Página de artigo

**Origem:** D03, D04, D05  
**Status:** NOT_STARTED

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

---

## JRN-003 — Publicar conteúdo inicial

**Origem:** D05  
**Status:** NOT_STARTED

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

---

## JRN-004 — Links internos editoriais

**Origem:** D05  
**Status:** NOT_STARTED

### Critérios

Artigos podem apontar naturalmente para:

- serviço;
- Work;
- outro artigo;
- CTA.

Sem blocos artificiais de links.

### Dependências

JRN-002, PUB-009.

---

## JRN-005 — Preview privado de artigo

**Origem:** D06  
**Status:** NOT_STARTED

### Critérios

- fiel à página publicada;
- exige acesso autorizado;
- noindex;
- não entra em sitemap.

### Dependências

ADM-004, FND-006.

---

## JRN-006 — Estado Published / Draft / Unpublished

**Origem:** D06  
**Status:** NOT_STARTED

### Critérios

- Draft não público;
- Published público/indexável;
- Unpublished removido da superfície pública conforme regra;
- publicação não exige deploy.

### Dependências

ADM-004.

---

# 13. Admin

## ADM-001 — Shell do Admin

**Origem:** D04, D06  
**Status:** NOT_STARTED

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

---

## ADM-002 — Listagem de Leads

**Origem:** D04  
**Status:** NOT_STARTED

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

---

## ADM-003 — Status de Lead

**Origem:** D04, D06  
**Status:** NOT_STARTED

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

---

## ADM-004 — Editor visual do Journal

**Origem:** D06, D08  
**Status:** NOT_STARTED

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

---

## ADM-005 — Gestão de categorias

**Origem:** D04, D06  
**Status:** NOT_STARTED

### Critérios

- criar;
- editar;
- listar;
- excluir com regra segura;
- categoria em uso não desaparece silenciosamente.

### Dependências

ADM-001, FND-005.

---

## ADM-006 — Upload de capa do Journal

**Origem:** D06, D08  
**Status:** NOT_STARTED

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

---

# 14. SEO e analytics

## SEO-001 — Sistema de metadata

**Origem:** D05, D08  
**Status:** NOT_STARTED

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

---

## SEO-002 — Sitemap e robots

**Origem:** D05  
**Status:** NOT_STARTED

### Critérios

- sitemap automático;
- apenas URLs elegíveis;
- drafts/admin/previews fora;
- robots explícito;
- sitemap referenciado.

### Dependências

JRN-006, PUB-009.

---

## SEO-003 — Structured Data

**Origem:** D05  
**Status:** NOT_STARTED

### Implementar quando aplicável

- Organization;
- Article;
- BreadcrumbList.

### Regra

Não usar LocalBusiness sem mudança real de elegibilidade.

### Dependências

SEO-001.

---

## SEO-004 — Noindex e proteção de ambientes não públicos

**Origem:** D05, D07  
**Status:** NOT_STARTED

### Critérios

- preview noindex;
- staging noindex;
- drafts noindex;
- admin fora de indexação;
- auth continua sendo segurança, não robots.

### Dependências

FND-009.

---

## SEO-005 — GA4 + Search Console base

**Origem:** D05  
**Status:** NOT_STARTED

### Critérios

- GA4 em produção conforme política de consentimento;
- Search Console preparado após domínio;
- nenhuma PII indevida enviada.

### Dependências

REL-001, SEO-007.

---

## SEO-006 — Eventos de produto

**Origem:** D05  
**Status:** NOT_STARTED

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

---

## SEO-007 — Privacidade e consentimento

**Origem:** D04, D05  
**Status:** NOT_STARTED

### Critérios

- página `/privacidade`;
- cookies quando aplicável;
- explicar dados de lead;
- explicar analytics/terceiros;
- consentimento proporcional à configuração real;
- links no footer.

### Dependências

Decisões finais de analytics/cookies.

---

# 15. Qualidade

## QA-001 — Core Web Vitals / performance budget

**Origem:** D05, D08  
**Status:** NOT_STARTED

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

---

## QA-002 — Acessibilidade

**Origem:** D03, D08  
**Status:** NOT_STARTED

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

---

## QA-003 — Regressão visual contra referência

**Origem:** D03, D08  
**Status:** NOT_STARTED

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

- comparação visual;
- aprovação humana.

---

## QA-004 — E2E de Lead

**Origem:** D06, D08  
**Status:** NOT_STARTED

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

---

## QA-005 — E2E de Journal

**Origem:** D06, D08  
**Status:** NOT_STARTED

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

---

## QA-006 — Testes de autorização do Admin

**Origem:** D06, D08  
**Status:** NOT_STARTED

### Cenários

- anônimo;
- autenticado não autorizado;
- admin autorizado;
- logout;
- endpoint admin.

### Dependências

FND-006, ADM-001.

---

## QA-007 — Testes de abuso do endpoint de lead

**Origem:** D06  
**Status:** NOT_STARTED

### Cenários

- burst;
- payload inválido;
- payload grande;
- valores fora do enum;
- campos inesperados;
- spam repetitivo.

### Dependências

LEAD-003.

---

## QA-008 — Cross-device e browser smoke

**Origem:** D03, D04, D05  
**Status:** NOT_STARTED

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
**Status:** NOT_STARTED

### Critérios

- backup executado;
- restore testado;
- dados validados;
- procedimento documentado.

### Dependências

FND-012.

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

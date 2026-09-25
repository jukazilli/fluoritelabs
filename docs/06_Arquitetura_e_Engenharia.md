# Fluorite Labs — Arquitetura e Engenharia

> **Documento:** 06  
> **Status:** EM REVISÃO — não canonizado  
> **Última atualização:** 2026-09-25  
> **Documentos anteriores:** `01_Briefing_e_Escopo.md`, `02_Visao_de_Produto_PO.md`, `03_Direcao_de_Marca_UI_e_Design_System.md`, `04_Experiencia_UX_e_Arquitetura_de_Informacao.md`, `05_SEO_Performance_e_Otimizacao.md`

---

# 1. Objetivo

Este documento converte as decisões de produto, UX, UI, SEO e operação em requisitos de engenharia e em uma arquitetura implementável.

Ele define:

- forças de engenharia;
- atributos de qualidade;
- contexto do sistema;
- superfícies;
- fronteiras;
- módulos;
- dados;
- autenticação;
- autorização;
- segurança;
- persistência;
- mídia;
- observabilidade;
- testes;
- ambientes;
- backup;
- deploy;
- responsabilidades do repositório;
- decisões arquiteturais;
- alternativas rejeitadas;
- necessidades que deverão orientar Tech Lead e Infraestrutura.

Este documento **não escolhe framework, banco, provedor cloud, CMS, biblioteca de editor, ORM ou ferramenta específica**.

A pergunta central é:

> **Quais propriedades técnicas a Fluorite Labs precisa possuir e qual estrutura satisfaz essas propriedades com o menor conjunto de compromissos aceitáveis?**

---

# 2. Filosofia arquitetural

A regra central será:

> **Começar simples, mas separar responsabilidades o suficiente para evoluir sem reescrever tudo.**

A Fluorite Labs não deve adotar:

- arquitetura cerimonial;
- microservices prematuros;
- múltiplos deploys sem necessidade;
- filas sem caso real;
- cache distribuído por hábito;
- abstrações para cenários hipotéticos.

Ao mesmo tempo, não deve:

- concentrar toda regra na UI;
- misturar acesso a dados com apresentação;
- duplicar regras entre rotas;
- acoplar domínio a fornecedores externos;
- dificultar testes.

Direção:

```text
UI
 ↓
Aplicação / casos de uso
 ↓
Dados e integrações
```

com módulos claros por responsabilidade.

---

# 3. Escala inicial

## Referência de negócio

Em seis meses:

- 1.000 visitas;
- 30 leads;
- 4 clientes;
- 40% do tráfego vindo de busca orgânica.

## Direção de engenharia

A arquitetura será desenhada para baixo volume inicial e baixa complexidade operacional.

Ela não precisa ser construída para hiperescala.

Ao mesmo tempo, não deve introduzir limitações artificiais que impeçam crescimento para:

- dezenas de milhares de visitas;
- centenas de leads;
- centenas de artigos;
- múltiplos projetos de Work.

## Regra

Escala futura será tratada por evidência.

Não adotar complexidade distribuída antes de existirem limites mensuráveis.

---

# 4. Superfícies do sistema

A V1 possui três superfícies principais.

## 4.1. Aplicação pública

Responsabilidades:

- Home;
- Serviços;
- Work;
- Journal;
- páginas legais;
- microbriefing;
- conversão;
- SEO;
- analytics.

## 4.2. Aplicação administrativa

Responsabilidades:

- autenticação;
- leads;
- Journal;
- categorias;
- publicação;
- conteúdo editorial.

## 4.3. Camada de servidor e dados

Responsabilidades:

- regras da aplicação;
- persistência;
- autenticação;
- autorização;
- validação;
- captura de leads;
- conteúdo;
- mídia;
- integrações;
- observabilidade.

---

# 5. Estratégia de aplicação

A V1 deverá favorecer:

> **um único sistema/repositório com separação modular interna.**

Não há justificativa inicial para:

- frontend em repositório separado;
- API independente por princípio;
- CMS externo obrigatório;
- serviço separado de leads;
- microservices;
- múltiplas equipes com deploy independente.

## Motivos

- equipe pequena;
- baixo volume inicial;
- forte integração entre site, admin e conteúdo;
- velocidade de desenvolvimento;
- baixo custo operacional;
- menor superfície de falha;
- consistência de tipos e contratos;
- deploy e observabilidade simplificados.

---

# 6. Estratégia de repositório

Direção:

> **repositório único simples.**

Estrutura conceitual:

```text
/src
  /app-or-pages
  /features
    /auth
    /leads
    /journal
    /work
    /analytics
  /ui
  /domain
  /data
  /integrations
  /lib
/tests
/public
/docs
```

Essa estrutura é conceitual.

A Visão do Tech Lead poderá adaptar nomenclatura e organização conforme o framework escolhido.

## Regra

A estrutura deve refletir responsabilidades reais.

Não criar camadas apenas para reproduzir um diagrama.

---

# 7. Forças de engenharia

## ENG-001 — Baixa complexidade operacional

A V1 deve ser operável por uma equipe pequena.

Toda nova infraestrutura deve justificar:

- benefício;
- necessidade;
- custo;
- manutenção.

---

## ENG-002 — Conteúdo público indexável sem dependência crítica de JS no cliente

O conteúdo principal das páginas públicas deve estar disponível de forma adequada para:

- mecanismos de busca;
- carregamento rápido;
- resiliência;
- acessibilidade.

A página não deve depender de JavaScript do navegador para que o conteúdo essencial exista.

---

## ENG-003 — Admin autenticado

Nenhuma função administrativa pode depender apenas de URL obscura.

A área administrativa exige:

- autenticação;
- sessão segura;
- autorização;
- proteção contra abuso.

---

## ENG-004 — Credenciais administrativas nunca vão ao cliente

Tokens, segredos e credenciais privilegiadas não podem estar expostos em:

- JavaScript público;
- HTML;
- variáveis públicas;
- payloads acessíveis ao navegador.

---

## ENG-005 — Leads devem ser persistidos no servidor

O registro do lead deve ocorrer em ambiente confiável.

O cliente envia a intenção.

O servidor:

- valida;
- normaliza;
- persiste;
- responde.

---

## ENG-006 — WhatsApp não é fonte única de verdade

A tentativa de abrir WhatsApp ocorre após a tentativa de registrar o lead.

A área administrativa mantém o registro interno da oportunidade.

---

## ENG-007 — Falha de persistência não deve impedir contato

Quando o banco ou camada de persistência estiver indisponível:

- preservar os dados do formulário na interface;
- informar falha;
- permitir retry;
- oferecer continuidade via WhatsApp.

Essa exceção deve ser visível para observabilidade.

---

## ENG-008 — Conteúdo editorial precisa ser gerenciável sem código

O responsável pela Fluorite Labs deve conseguir:

- criar;
- editar;
- publicar;
- despublicar;
- excluir;

artigos sem alterar arquivos do projeto.

---

## ENG-009 — Editor próximo do Notion

A experiência editorial deve ser visual e orientada a blocos.

O usuário não deve precisar conhecer Markdown ou HTML.

Deve ser possível trabalhar, conforme a evolução da V1, com blocos como:

- parágrafo;
- heading;
- lista;
- citação;
- imagem;
- separador;
- link;
- bloco de código quando necessário.

## Regra

A persistência deve evitar HTML livre desestruturado como única representação canônica.

Preferir conteúdo estruturado que:

- possa ser validado;
- possa ser renderizado de forma consistente;
- possa evoluir;
- possa ser migrado;
- reduza risco de marcação insegura.

A biblioteca específica será decidida pelo Tech Lead.

---

## ENG-010 — Mídia deve ser gerenciável

O admin deve permitir upload de imagem de capa do Journal.

O sistema precisa suportar:

- armazenamento;
- referência persistente;
- validação de tipo;
- limites;
- processamento;
- otimização;
- exclusão segura.

Imagens internas de artigos podem evoluir sobre a mesma base.

---

## ENG-011 — Performance é requisito arquitetural

O sistema deve suportar:

- cache;
- mídia otimizada;
- conteúdo público rápido;
- baixo JavaScript;
- entrega eficiente;
- Core Web Vitals em faixa adequada.

---

## ENG-012 — Transições não podem bloquear conteúdo

Motion e page transitions devem permanecer na camada de experiência.

Não podem criar dependência arquitetural que obrigue:

- delays artificiais;
- loading falso;
- espera por animação antes de navegação.

---

## ENG-013 — Analytics desacoplado de regra de negócio

Uma falha de analytics não pode impedir:

- lead;
- navegação;
- conteúdo;
- admin.

Eventos são observação, não requisito para concluir a operação.

---

## ENG-014 — Privacidade por minimização

Coletar apenas dados necessários.

Leads da V1 armazenam inicialmente:

- nome;
- necessidade;
- faixa de investimento;
- origem;
- UTMs;
- referrer;
- data/hora;
- status.

Não coletar telefone ou e-mail no microbriefing inicial.

---

## ENG-015 — Observabilidade sem vazamento de dados

Logs não devem registrar desnecessariamente:

- nome do lead;
- mensagens privadas;
- tokens;
- cookies;
- credenciais;
- payload completo sensível.

---

## ENG-016 — Backup e restore são requisitos

Dados de leads e conteúdo editorial não podem existir sem estratégia de recuperação.

---

## ENG-017 — Preview antes da produção

Alterações relevantes devem poder ser validadas em ambiente isolado antes da publicação final.

---

## ENG-018 — Código e dados possuem ciclos de publicação diferentes

Publicar um artigo não deve exigir novo deploy de código.

Atualizar código não deve apagar ou depender da recompilação manual do conteúdo editorial.

---

# 8. Atributos de qualidade

Prioridade relativa:

```text
1. Segurança
2. Correção
3. Simplicidade operacional
4. Performance
5. Manutenibilidade
6. Testabilidade
7. Observabilidade
8. Escalabilidade progressiva
```

Escalabilidade existe, mas não supera simplicidade na V1.

---

# 9. Modelo arquitetural

Direção aprovada:

> **aplicação modular com responsabilidades separadas, evitando arquitetura distribuída prematura.**

Não será adotada uma Clean Architecture cerimonial completa.

Serão preservadas apenas fronteiras úteis.

## Camadas conceituais

### Presentation

- páginas;
- componentes;
- formulários;
- admin;
- estados de UI.

### Application

- casos de uso;
- regras de fluxo;
- orquestração;
- validações de negócio.

### Data / Integrations

- persistência;
- auth provider;
- storage;
- analytics;
- WhatsApp;
- serviços externos.

---

# 10. Módulos

## Auth

Responsável por:

- login;
- logout;
- sessão;
- proteção do admin;
- identidade administrativa.

## Leads

Responsável por:

- validação;
- criação;
- status;
- origem;
- consulta;
- atualização.

## Journal

Responsável por:

- artigo;
- conteúdo estruturado;
- rascunho;
- publicação;
- slug;
- metadata;
- imagem;
- autoria.

## Categories

Responsável por:

- categorias;
- relacionamento com artigos;
- integridade de exclusão.

## Work

Na V1:

- conteúdo majoritariamente em código;
- páginas customizadas;
- sem CMS obrigatório.

## Analytics

Responsável por:

- emissão de eventos;
- integração;
- sem dependência de regras de negócio.

---

# 11. Work no código

Work não será gerenciado pelo admin na V1.

## Motivo

Cada projeto pode exigir:

- composição própria;
- interação própria;
- narrativa própria;
- assets específicos;
- layout customizado.

Transformar Work em CMS neste momento poderia:

- limitar direção visual;
- aumentar modelo de dados;
- introduzir abstrações antes da hora.

## Revisitar quando

- quantidade de projetos crescer;
- estrutura dos cases estabilizar;
- publicação frequente justificar CMS;
- edição sem código virar necessidade operacional.

---

# 12. Modelo de dados — Lead

Entidade conceitual:

```text
Lead
- id
- firstName
- need
- investmentRange
- status
- sourcePath
- referrer
- utmSource
- utmMedium
- utmCampaign
- utmContent
- utmTerm
- createdAt
- updatedAt
```

## Status

- NEW
- CONTACTED
- CONVERTED
- ARCHIVED

Nomes técnicos deverão seguir padrão em inglês.

---

# 13. Modelo de dados — Journal Article

```text
Article
- id
- title
- slug
- excerpt
- content
- status
- categoryId
- coverImage
- seoTitle
- seoDescription
- socialImage
- canonicalUrl? 
- publishedAt
- createdAt
- updatedAt
```

## Status

- DRAFT
- PUBLISHED
- UNPUBLISHED

Agendamento não é requisito da V1.

---

# 14. Conteúdo estruturado por blocos

O campo `content` deve representar estrutura editorial, não apenas uma string arbitrária.

Modelo conceitual:

```text
ArticleContent
  blocks[]
    - paragraph
    - heading
    - bulletList
    - numberedList
    - quote
    - image
    - divider
    - code
```

## Benefícios

- experiência parecida com Notion;
- renderização consistente;
- validação;
- sanitização;
- evolução;
- migração;
- melhor controle de estilo;
- redução de HTML imprevisível.

---

# 15. Modelo de dados — Category

```text
Category
- id
- name
- slug
- createdAt
- updatedAt
```

## Regra

Uma categoria em uso não deve ser excluída silenciosamente.

A interface deve exigir:

- reassociação;
- ou confirmação com comportamento explícito.

---

# 16. Mídia

O sistema deverá possuir abstração de mídia.

## V1

Obrigatório:

- capa do artigo.

## Evolução provável

- imagens em artigos;
- assets editoriais;
- thumbnails.

## Requisitos

- tipo permitido;
- tamanho máximo;
- segurança;
- nomes/IDs previsíveis;
- metadata;
- remoção;
- otimização;
- referências estáveis.

---

# 17. Autenticação

Na V1 haverá um único usuário administrativo principal.

## Não necessário inicialmente

- times;
- organizações;
- multi-tenant;
- permissões por módulo;
- RBAC complexo.

## Requisito de evolução

O modelo de autenticação não deve impedir múltiplos administradores futuramente.

---

# 18. Sessões

Sessões administrativas deverão:

- expirar;
- utilizar mecanismo seguro;
- ser revogáveis quando aplicável;
- não armazenar segredos em local inadequado;
- impedir acesso ao admin após logout.

A tecnologia será escolhida posteriormente.

---

# 19. Proteção contra abuso de login

O sistema deve permitir controles como:

- rate limiting;
- bloqueio temporário;
- proteção do provider;
- logs de falha relevantes.

Não criar sistema complexo próprio se a tecnologia escolhida já resolver adequadamente.

---

# 20. Segurança do endpoint de leads

O endpoint é público.

Portanto:

- toda entrada é não confiável;
- validar no servidor;
- limitar tamanho de payload;
- validar enums;
- normalizar strings;
- limitar frequência;
- implementar proteção anti-spam proporcional ao risco.

## CAPTCHA

Não é obrigatório no lançamento.

Pode ser adicionado caso:

- spam real apareça;
- rate limiting seja insuficiente;
- abuso gere custo ou poluição de dados.

Preferir proteção invisível ou de baixo atrito quando possível.

---

# 21. Validação

Validação deve existir nos dois lados quando útil:

## Cliente

Objetivo:

- feedback imediato;
- UX.

## Servidor

Objetivo:

- integridade;
- segurança;
- fonte de verdade.

A validação no cliente nunca substitui a validação no servidor.

---

# 22. Fluxo de criação de lead

```text
Microbriefing completo
       ↓
Cliente envia payload
       ↓
Servidor valida
       ↓
Servidor aplica proteção anti-abuso
       ↓
Persistência
       ↓
Retorno de sucesso
       ↓
Analytics: lead_created
       ↓
Tenta abrir WhatsApp
```

---

# 23. Falha ao persistir lead

```text
Persistência falha
       ↓
Registrar erro técnico seguro
       ↓
Preservar formulário
       ↓
Mostrar feedback curto
       ↓
Oferecer retry
       ↓
Permitir continuar no WhatsApp
```

## Regra

A operação comercial externa não deve ficar totalmente bloqueada por indisponibilidade interna.

---

# 24. WhatsApp

Na V1:

- link/contexto pré-preenchido;
- sem envio automático de mensagem;
- sem WhatsApp Business API obrigatória;
- sem automação de conversa.

## Motivo

Evitar:

- complexidade;
- custo;
- compliance adicional;
- dependência desnecessária.

Revisitar quando volume comercial justificar.

---

# 25. Journal — fluxo editorial

```text
Admin autenticado
       ↓
Criar artigo
       ↓
Editor visual em blocos
       ↓
Salvar rascunho
       ↓
Preview
       ↓
Revisar SEO
       ↓
Publicar
       ↓
Página pública
       ↓
Sitemap/indexação
```

---

# 26. Editor do Journal

A UX deve lembrar ferramentas como Notion em princípios, não necessariamente em cópia visual.

## Características

- edição visual;
- blocos;
- atalhos intuitivos;
- reorganização quando tecnicamente viável;
- headings fáceis;
- inserção de imagem;
- listas;
- links;
- quote;
- code block quando necessário;
- preview fiel ao site.

## Não exigir

- Markdown;
- HTML;
- shortcodes;
- edição manual de JSON.

---

# 27. Preview de conteúdo

Artigos em rascunho devem poder ser visualizados antes da publicação.

## Requisitos

- preview não indexável;
- acesso controlado;
- aparência próxima da página final;
- não depender de publicar para revisar.

---

# 28. Publicação

Publicar deve:

- validar campos obrigatórios;
- validar slug;
- validar metadata mínima;
- validar conteúdo;
- definir `publishedAt`;
- disponibilizar rota pública;
- permitir entrada no sitemap.

Despublicar deve retirar o conteúdo da superfície pública conforme política definida.

---

# 29. Agendamento

Não será implementado na V1.

Estados suficientes:

- Draft;
- Published;
- Unpublished.

Revisitar quando a cadência editorial justificar.

---

# 30. Ambientes

Obrigatórios:

```text
Local
  ↓
Preview / Staging
  ↓
Production
```

## Local

- desenvolvimento;
- testes;
- dados isolados.

## Preview/Staging

- revisão funcional;
- revisão visual;
- QA;
- validação antes de merge/deploy.

## Production

- ambiente público;
- dados reais;
- observabilidade ativa.

---

# 31. Deploy

Fluxo desejado:

```text
Alteração
  ↓
Lint / Typecheck / Testes / Build
  ↓
Preview
  ↓
Revisão
  ↓
Merge
  ↓
Produção
  ↓
Smoke check
```

## Regra

Não editar código diretamente em produção.

---

# 32. Conteúdo não depende de deploy

A publicação de um artigo pelo admin deve ser uma operação de conteúdo.

Não deve exigir:

- commit;
- pull request;
- build manual;
- redeploy obrigatório de aplicação.

O mecanismo técnico de atualização será definido pelo Tech Lead.

---

# 33. Backup

Dados críticos:

- leads;
- artigos;
- categorias;
- metadata;
- referências de mídia.

## Requisitos

- backup automático;
- retenção definida;
- restauração possível;
- procedimento documentado;
- restore testável.

## Regra

Backup não é considerado válido se nunca houver forma conhecida de restaurar.

---

# 34. Mídia e backup

Assets editoriais devem utilizar armazenamento compatível com:

- redundância adequada;
- acesso controlado quando necessário;
- referências persistentes.

A estratégia de backup/restauração de mídia será definida na infraestrutura.

---

# 35. Observabilidade

A V1 não exige stack enterprise.

Precisa responder:

- algo quebrou?
- onde?
- quando?
- qual fluxo foi afetado?
- qual severidade?

## Monitorar

- falha de lead;
- erro de autenticação relevante;
- falha de publicação;
- erro em rota pública;
- erro no admin;
- indisponibilidade crítica.

---

# 36. Logging

Logs técnicos devem ser:

- estruturados quando viável;
- úteis;
- pesquisáveis;
- sem PII desnecessária.

## Não logar

- credenciais;
- tokens;
- cookies;
- payload completo de lead;
- conteúdo privado desnecessário.

---

# 37. Alertas

Alertas devem focar falhas acionáveis.

Exemplos:

- criação de lead falhando repetidamente;
- erro de produção acima de limite;
- publicação quebrada;
- indisponibilidade.

Evitar alertas ruidosos sem ação possível.

---

# 38. Testes

A estratégia terá três níveis.

## 38.1. Unitários

Para:

- validações;
- regras puras;
- transformação de conteúdo;
- geração de mensagem;
- estado de lead;
- regras de publicação.

## 38.2. Integração

Para:

- lead → persistência;
- artigo → persistência;
- categoria → relacionamento;
- auth;
- upload;
- publicação.

## 38.3. E2E

Para jornadas críticas.

---

# 39. E2E obrigatório — Lead

Fluxo:

```text
Home
  ↓
Começar agora
  ↓
Nome
  ↓
Necessidade
  ↓
Investimento
  ↓
Enviar
  ↓
Lead persistido
  ↓
Tentativa de WhatsApp
```

Validar:

- sucesso;
- erro;
- retry;
- persistência de sessão;
- mobile.

---

# 40. E2E obrigatório — Journal

Fluxo:

```text
Admin
  ↓
Login
  ↓
Criar artigo
  ↓
Adicionar blocos
  ↓
Upload de capa
  ↓
Salvar rascunho
  ↓
Preview
  ↓
Publicar
  ↓
Artigo acessível publicamente
```

---

# 41. E2E obrigatório — Segurança básica do Admin

Validar:

- acesso sem autenticação negado;
- sessão válida permite acesso;
- logout invalida acesso;
- preview privado não é público.

---

# 42. Teste de regressão

Bug relevante corrigido deve deixar teste quando tecnicamente viável.

Exemplo:

Se ocorrer bug em que lead é perdido ao WhatsApp falhar, a correção deve ser acompanhada de teste que preserve a ordem correta do fluxo.

---

# 43. SEO como requisito arquitetural

A arquitetura deve suportar:

- metadata por página;
- canonical;
- sitemap;
- robots;
- Open Graph;
- structured data;
- conteúdo indexável;
- slugs;
- redirects;
- noindex;
- previews privados.

Sem exigir manipulação manual por página no código quando isso fizer parte do conteúdo editorial.

---

# 44. Rendering

Este documento não define tecnologia.

Define apenas o requisito:

> **conteúdo público principal deve estar disponível de forma adequada antes de depender de execução client-side.**

A Visão do Tech Lead deverá escolher a estratégia compatível com:

- SEO;
- performance;
- dinâmica de conteúdo;
- preview;
- publicação.

---

# 45. Cache

A arquitetura deve permitir cache de conteúdo público.

## Não cachear de forma incorreta

- admin autenticado;
- conteúdo privado;
- respostas personalizadas;
- mutações.

A estratégia exata será definida posteriormente.

---

# 46. Integrações

Integrações previstas:

- WhatsApp;
- Google Analytics;
- Search Console;
- storage de mídia;
- autenticação;
- observabilidade.

## Regra

Integrações externas devem ficar atrás de fronteiras claras.

A regra de negócio não deve depender diretamente de SDK específico espalhado pela aplicação.

---

# 47. Analytics

Analytics deve estar desacoplado.

Conceitualmente:

```text
Domínio / UI
    ↓
Evento interno
    ↓
Adapter de analytics
    ↓
Provider
```

A falha do provider deve ser tolerada.

---

# 48. Trust boundaries

## Navegador público

Não confiável.

Pode enviar:

- payload inválido;
- spam;
- automação;
- manipulação de campos.

## Servidor

Responsável por:

- validar;
- autorizar;
- persistir;
- esconder segredos.

## Admin

Usuário autenticado, mas ainda sujeito a:

- validação;
- autorização;
- proteção de sessão.

## Providers externos

Considerados dependências externas.

Falhas devem ser tratadas explicitamente.

---

# 49. Retenção de leads

Na V1:

> **não haverá exclusão automática por tempo.**

## Motivo

- baixo volume;
- operação inicial;
- necessidade de histórico comercial.

## Revisitar quando

- volume aumentar;
- política de privacidade exigir maior formalização;
- CRM evoluir;
- requisitos legais/operacionais mudarem.

A exclusão manual e os direitos do titular deverão ser respeitados quando aplicáveis.

---

# 50. Privacidade

Arquitetura deve permitir:

- localizar dados de lead;
- corrigir;
- excluir quando necessário;
- controlar acesso;
- limitar exposição.

## Regra

Não coletar “para talvez usar no futuro”.

---

# 51. Dados sensíveis

Na V1, o sistema não foi desenhado para armazenar:

- cartão;
- dados bancários;
- documentos pessoais;
- dados médicos;
- senhas de clientes;
- conteúdo altamente sensível.

Se escopo mudar, a arquitetura de segurança deverá ser revisada.

---

# 52. Availability e tolerância a falhas

Não há requisito de alta disponibilidade enterprise.

## Prioridade

Falhas devem degradar de forma segura.

Exemplos:

### Analytics fora

Site continua.

### WhatsApp fora

Lead continua registrado.

### Persistência de lead fora

Usuário recebe retry + opção WhatsApp.

### Journal admin fora

Site público deve permanecer funcional quando possível.

---

# 53. Realtime

Não existe requisito de realtime na V1.

Leads não precisam aparecer instantaneamente por websocket.

Atualização normal de página/polling simples quando necessário é suficiente.

---

# 54. Offline

Não existe requisito de operação offline.

Não implementar:

- sincronização;
- queue offline;
- conflict resolution;
- service worker complexo;

sem nova decisão de produto.

---

# 55. Filas e jobs

Não há requisito inicial para fila dedicada.

Processamentos pequenos podem ocorrer no fluxo normal ou por mecanismos simples da plataforma escolhida.

Revisitar se surgirem:

- processamento pesado;
- envio massivo;
- geração de mídia custosa;
- tarefas demoradas;
- retries complexos.

---

# 56. Cache distribuído

Não existe necessidade inicial de Redis ou equivalente.

Revisitar somente com:

- gargalo mensurável;
- necessidade de sessão distribuída;
- alto volume;
- cache com benefício demonstrável.

---

# 57. Microservices

## ADR-001 — Não adotar microservices na V1

**Status:** aceita.

### Contexto

- equipe pequena;
- baixo volume;
- domínio simples;
- forte acoplamento funcional entre site, conteúdo e admin.

### Decisão

Manter aplicação modular em repositório único.

### Motivos

- operação simples;
- deploy simples;
- debugging simples;
- testes simples;
- menor custo;
- menor superfície de falha.

### Revisitar quando

- módulos precisarem escala independente;
- múltiplas equipes existirem;
- deploy independente virar requisito real;
- isolamento regulatório exigir.

---

# 58. CMS externo

## ADR-002 — Não tornar CMS externo uma premissa arquitetural

**Status:** aceita.

### Contexto

O Journal precisa de edição visual e conteúdo estruturado.

### Decisão

A arquitetura define a capacidade de CMS interno mínimo, sem obrigar provider específico.

### Motivos

- admin já é necessário para leads;
- conteúdo tem requisitos próprios;
- experiência editorial precisa ser controlada;
- reduz dependência de terceiro por padrão.

### Observação

O Tech Lead ainda pode comparar soluções e concluir que um provider externo atende melhor, desde que preserve os requisitos canônicos.

---

# 59. Work em CMS

## ADR-003 — Work permanece em código na V1

**Status:** aceita.

### Motivos

- alta liberdade visual;
- somente três projetos iniciais;
- layouts potencialmente únicos;
- CMS criaria abstração prematura.

### Revisitar

Quando o padrão estabilizar e o volume justificar.

---

# 60. Editor visual

## ADR-004 — Editor visual estruturado, não Markdown obrigatório

**Status:** aceita.

### Contexto

O responsável pelo conteúdo quer experiência próxima do Notion.

### Decisão

O admin deve oferecer edição visual por blocos.

### Restrição

A representação persistida deve ser estruturada e validável.

### Rejeitado

- Markdown obrigatório para edição cotidiana;
- HTML livre como único modelo canônico.

---

# 61. Agendamento

## ADR-005 — Sem publicação agendada na V1

**Status:** aceita.

Estados iniciais:

- Draft;
- Published;
- Unpublished.

### Revisitar

Quando operação editorial justificar.

---

# 62. Ambientes

## ADR-006 — Local + Preview/Staging + Produção

**Status:** aceita.

Alterações relevantes não vão diretamente de máquina local para produção sem validação intermediária.

---

# 63. Necessidades para o Tech Lead

O próximo documento de Tech Lead deverá selecionar tecnologias que atendam:

### TL-NEED-001

Suportar conteúdo público indexável sem depender criticamente de client-side JS.

### TL-NEED-002

Suportar aplicação pública e admin no mesmo projeto com fronteiras claras.

### TL-NEED-003

Suportar autenticação segura.

### TL-NEED-004

Suportar persistência relacional ou equivalente adequada aos relacionamentos de Journal, categorias e leads.

### TL-NEED-005

Suportar editor visual por blocos semelhante ao Notion.

### TL-NEED-006

Suportar conteúdo estruturado e validável.

### TL-NEED-007

Suportar upload e otimização de mídia.

### TL-NEED-008

Suportar metadata dinâmica, sitemap, robots e schema.

### TL-NEED-009

Suportar testes unitários, integração e E2E.

### TL-NEED-010

Suportar validação compartilhável entre cliente/servidor sem confiar no cliente.

### TL-NEED-011

Suportar preview/staging.

### TL-NEED-012

Suportar analytics desacoplado.

### TL-NEED-013

Suportar Core Web Vitals e baixo JS.

### TL-NEED-014

Minimizar dependências e complexidade operacional.

### TL-NEED-015

Manter type safety forte quando a stack escolhida permitir.

---

# 64. Necessidades para Infraestrutura

### INF-NEED-001

Hosting público com CDN ou entrega global eficiente.

### INF-NEED-002

Runtime seguro para lógica de servidor.

### INF-NEED-003

Banco gerenciado ou persistência equivalente com backup.

### INF-NEED-004

Storage de mídia.

### INF-NEED-005

Ambiente de preview.

### INF-NEED-006

Ambiente de produção.

### INF-NEED-007

Gestão segura de secrets.

### INF-NEED-008

Logs e monitoramento.

### INF-NEED-009

Alertas básicos.

### INF-NEED-010

Backup e restore.

### INF-NEED-011

Pipeline de deploy.

### INF-NEED-012

Domínio, HTTPS e DNS.

---

# 65. Critérios de revisão arquitetural

A arquitetura deve ser revista se surgir:

- app mobile;
- múltiplos administradores com papéis distintos;
- CRM próprio;
- pagamento online;
- ecommerce;
- área de cliente;
- realtime;
- milhares de leads por dia;
- processamento pesado;
- integrações críticas;
- requisitos regulatórios novos;
- múltiplas equipes;
- Work gerenciado por CMS;
- conteúdo multilíngue em grande escala.

---

# 66. Decisões que não devem ser revertidas sem revisão explícita

1. arquitetura começa simples;
2. um único repositório é preferido na V1;
3. site, admin e server-side pertencem ao mesmo sistema lógico;
4. módulos devem possuir responsabilidades claras;
5. microservices não fazem parte da V1;
6. admin é autenticado;
7. segredos não chegam ao browser;
8. lead é validado e persistido no servidor;
9. WhatsApp não é fonte única de verdade;
10. falha do banco não bloqueia opção de contato;
11. endpoint de leads precisa de proteção anti-abuso;
12. não pedir e-mail ou telefone no microbriefing inicial;
13. leads não têm exclusão automática na V1;
14. Journal é administrável sem código;
15. editor do Journal deve ser visual e próximo do Notion;
16. conteúdo editorial deve ser estruturado por blocos;
17. upload de capa faz parte da V1;
18. Work fica no código na V1;
19. não há agendamento editorial na V1;
20. conteúdo público essencial não depende criticamente de client-side JS;
21. analytics é desacoplado;
22. Local + Preview/Staging + Produção são obrigatórios;
23. deploy passa por validações e preview;
24. backup e restore são requisitos;
25. logs não devem expor PII desnecessária;
26. testes unitários, integração e E2E fazem parte da arquitetura;
27. performance é requisito arquitetural;
28. realtime, offline, filas e cache distribuído não entram sem justificativa.

---

# 67. Pontos que pertencem às próximas etapas

Este documento não define:

- linguagem;
- framework;
- runtime;
- banco;
- ORM;
- biblioteca de editor;
- provider de auth;
- provider de storage;
- hosting;
- CDN;
- CI/CD específico;
- observabilidade específica;
- biblioteca de testes;
- serviço de analytics;
- biblioteca de motion.

Essas escolhas deverão respeitar os requisitos deste documento.

---

# 68. Critérios de aprovação

Este documento estará aprovado quando o responsável pelo produto confirmar:

- filosofia arquitetural;
- estrutura de sistema;
- módulos;
- admin;
- modelo de leads;
- Journal;
- editor visual;
- Work;
- dados;
- segurança;
- ambientes;
- deploy;
- backup;
- observabilidade;
- testes;
- decisões rejeitadas;
- necessidades para Tech Lead e Infraestrutura.

Após aprovação, o próximo documento será:

`07_Infraestrutura_Deploy_e_Observabilidade.md`

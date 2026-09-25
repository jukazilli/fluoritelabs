# Fluorite Labs — Infraestrutura, Deploy e Observabilidade

> **Documento:** 07  
> **Status:** EM REVISÃO — não canonizado  
> **Última atualização:** 2026-09-25  
> **Documentos anteriores:** `01_Briefing_e_Escopo.md`, `02_Visao_de_Produto_PO.md`, `03_Direcao_de_Marca_UI_e_Design_System.md`, `04_Experiencia_UX_e_Arquitetura_de_Informacao.md`, `05_SEO_Performance_e_Otimizacao.md`, `06_Arquitetura_e_Engenharia.md`

---

# 1. Objetivo

Este documento define os requisitos operacionais da infraestrutura da Fluorite Labs:

- orçamento;
- domínio;
- e-mail profissional;
- autenticação;
- ambientes;
- deploy;
- banco de dados;
- storage;
- backups;
- restore;
- observabilidade;
- logs;
- alertas;
- uptime;
- secrets;
- rollback;
- localização de dados;
- critérios para escolha dos provedores.

A pergunta central é:

> **Como colocar a Fluorite Labs em produção com baixo custo e baixa complexidade operacional, sem comprometer segurança, recuperação, performance ou capacidade de evolução?**

Este documento não escolhe a stack completa de implementação. O Documento 08 — Visão do Tech Lead — deverá reconciliar os provedores e capacidades aqui descritos com a stack concreta.

---

# 2. Perfil operacional

A Fluorite Labs inicia como:

- produto comercial;
- operação pequena;
- equipe reduzida;
- tráfego inicial baixo;
- usuários externos desde o lançamento;
- admin interno com um usuário principal;
- dados de leads;
- conteúdo editorial;
- mídia;
- necessidade de SEO e alta performance.

## Direção

Priorizar:

```text
serviços gerenciados
+
baixo custo
+
poucos provedores
+
automação
+
capacidade de crescimento
```

Evitar operação manual de servidores.

---

# 3. Orçamento inicial

## Limite mensal

> **R$ 50 por mês** como orçamento operacional inicial de infraestrutura.

## Regra

O orçamento é um limite de partida, não uma obrigação de gastar R$ 50.

Preferir:

- free tiers legítimos;
- cobrança por uso;
- planos de baixo custo;
- serviços que permitam crescimento gradual.

## Não fazer

Não escolher uma solução tecnicamente inadequada apenas por ser gratuita.

## Aprovação de custos

Qualquer novo recurso que:

- gere cobrança recorrente;
- altere plano;
- habilite overage;
- adicione serviço pago;

exige aprovação humana explícita antes da ativação.

---

# 4. Custos fora do orçamento mensal

O projeto ainda não possui domínio.

A compra de domínio é uma despesa necessária para o lançamento.

## Regra

O registro/renovação anual do domínio pode ser tratado separadamente do teto mensal de R$ 50, mas deve ser aprovado antes da compra.

O mesmo vale para despesas anuais não recorrentes mensalmente.

---

# 5. Domínio

A V1 deverá possuir domínio profissional próprio.

## Situação atual

> Nenhum domínio adquirido.

## Fundação deverá incluir

- verificar disponibilidade;
- escolher domínio;
- registrar;
- configurar DNS;
- HTTPS;
- redirects canônicos;
- domínio principal;
- domínio de preview/staging quando necessário.

## Direção

Dar preferência a um domínio coerente com:

> **Fluorite Labs**

A disponibilidade real deverá ser validada no momento da compra.

---

# 6. E-mail profissional

O lançamento deverá incluir e-mail no domínio da Fluorite Labs.

Exemplo conceitual:

- `contato@dominio`.

Outros endereços ou aliases podem ser criados conforme necessidade.

## Objetivo

- credibilidade;
- contato institucional;
- alertas de infraestrutura;
- recuperação de contas;
- comunicação operacional.

## Regra

E-mail profissional para pessoas e e-mail transacional da aplicação são responsabilidades diferentes.

O provedor será escolhido na Fundação/Tech Lead considerando custo, reputação e domínio próprio.

---

# 7. Serviços gerenciados

A infraestrutura deverá priorizar serviços gerenciados para:

- hosting;
- banco;
- autenticação;
- storage;
- observabilidade;
- backup quando aplicável.

## Motivo

A Fluorite Labs não deve gastar tempo inicial com:

- administração de servidor;
- aplicação manual de patches;
- banco autogerenciado;
- configuração de cluster;
- manutenção operacional desnecessária.

---

# 8. Quantidade de provedores

Direção:

> **usar o menor número de provedores que preserve qualidade e flexibilidade.**

Preferir 2–4 serviços bem definidos a uma coleção de integrações independentes.

## Regra

Não concentrar tudo em um único provedor apenas para reduzir a quantidade se isso:

- piorar custo;
- violar região de dados;
- limitar performance;
- criar lock-in excessivo;
- reduzir segurança.

---

# 9. Lock-in

A Fluorite Labs não buscará zero lock-in a qualquer custo.

## Preferência

Aceitar acoplamento operacional moderado quando ele:

- reduz significativamente esforço;
- remove infraestrutura própria;
- melhora confiabilidade;
- acelera operação.

## Limite

Dados e regras centrais devem possuir caminho razoável de exportação/migração.

---

# 10. Localização dos dados

## Preferência aprovada

> **Brasil.**

Dados persistentes relevantes ao negócio e aos leads devem priorizar infraestrutura em região brasileira quando uma opção adequada estiver disponível.

Região de referência:

> **São Paulo / South America**.

## O que deve ser priorizado em Brasil

- banco principal;
- leads;
- conteúdo editorial estruturado;
- dados operacionais persistentes.

## Exceções

Serviços SaaS especializados podem não oferecer residência regional.

Toda exceção deverá ser:

- conhecida;
- documentada;
- limitada;
- revisada conforme o tipo de dado armazenado.

---

# 11. Autenticação — direção Clerk

O responsável pelo produto sugeriu utilizar **Clerk** para autenticação administrativa.

Essa direção é coerente com uma solução já utilizada no projeto Oplib.

## Padrão observado no Oplib

O Oplib utiliza:

- Clerk como autenticação;
- middleware para proteger `/admin` e comandos administrativos;
- autorização adicional dentro da aplicação;
- `ADMIN_CLERK_USER_ID` como allowlist explícita do administrador.

## Direção para Fluorite Labs

Clerk é o **provedor preferencial de autenticação da V1**, sujeito à validação final de compatibilidade pelo Documento 08.

## Regra arquitetural

Autenticação não equivale automaticamente a autorização.

Fluxo:

```text
Clerk autentica identidade
        ↓
Aplicação verifica autorização administrativa
        ↓
Admin permitido
```

Um usuário autenticado pelo Clerk não deve obter acesso administrativo apenas por existir no provider.

---

# 12. Clerk — adequação atual

Pesquisa realizada em 2026-09-25.

O plano Hobby atual informa:

- custo base de US$ 0;
- até 3 seats de dashboard;
- até 50.000 monthly retained users por aplicação;
- custom domain;
- APIs e UIs de autenticação;
- logs de aplicação com retenção limitada.

Para a V1 com um administrador, a capacidade é muito superior à necessidade prevista.

## Limitação relevante

Clerk não oferece seleção de região nem residência regional.

A documentação atual informa hospedagem em infraestrutura nos Estados Unidos.

## Decisão proposta

Aceitar Clerk como uma exceção controlada à preferência de Brasil porque:

- será utilizado apenas para identidade administrativa;
- clientes públicos não criarão conta;
- dados de leads não serão armazenados no Clerk;
- conteúdo do Journal não será armazenado no Clerk.

## Reavaliar se

- clientes passarem a possuir contas;
- dados pessoais de clientes passarem pelo provider;
- requisito de residência brasileira se tornar absoluto;
- funcionalidades pagas necessárias ultrapassarem o orçamento.

---

# 13. Segurança adicional do Admin

Mesmo usando Clerk:

- admin exige autorização própria;
- rotas administrativas não são públicas;
- sessão deve ser validada no servidor;
- credenciais secretas permanecem fora do browser;
- secrets permanecem fora do Git;
- falhas de autorização não devem expor informação desnecessária.

## MFA

O plano gratuito atual do Clerk não inclui todas as capacidades avançadas disponíveis nos planos pagos.

Se MFA obrigatório se tornar requisito, deverá ser reavaliado:

- plano do Clerk;
- orçamento;
- ou provider alternativo.

---

# 14. Ambientes

A V1 deverá possuir:

```text
Local
  ↓
Preview / Staging
  ↓
Production
```

---

# 15. Local

Responsável por:

- desenvolvimento;
- testes;
- migrations controladas;
- dados locais ou de desenvolvimento;
- execução sem afetar produção.

Secrets locais ficam fora do repositório.

---

# 16. Preview / Staging

Objetivo:

- revisão visual;
- validação mobile;
- QA;
- testes de integração;
- testes de SEO;
- revisão de motion;
- validação de alterações antes de produção.

## Preferência

Cada pull request deverá gerar preview acessível por URL quando a plataforma escolhida suportar esse fluxo.

## Indexação

Preview/staging:

- não entra no sitemap;
- utiliza `noindex`;
- não deve competir com produção nos mecanismos de busca.

---

# 17. Isolamento de dados

Preview/staging não deve utilizar a base real de leads de produção.

## Regra

Ambientes não produtivos devem possuir:

- banco separado;
- branch de banco isolada;
- schema/base dedicada;
- ou mecanismo equivalente seguro.

## Proibido

Copiar dados pessoais reais para ambiente de desenvolvimento apenas por conveniência.

---

# 18. Production

Produção contém:

- domínio real;
- dados reais;
- admin real;
- leads reais;
- conteúdo publicado;
- analytics;
- observabilidade;
- backups.

Alterações não devem ocorrer manualmente fora dos fluxos aprovados.

---

# 19. Admin em produção

Na V1:

> **`/admin` no domínio principal.**

Não é necessário criar um subdomínio administrativo separado.

Exemplo conceitual:

`https://dominio/admin`

## Motivo

- menor configuração;
- mesma aplicação;
- autenticação central;
- menos complexidade operacional.

---

# 20. CI/CD

Fluxo desejado:

```text
branch
  ↓
pull request
  ↓
lint / typecheck / testes / build
  ↓
preview
  ↓
revisão
  ↓
merge na branch principal
  ↓
deploy automático de produção
  ↓
smoke check
```

---

# 21. GitHub

O repositório da Fluorite Labs já está hospedado no GitHub.

GitHub permanecerá como fonte canônica de:

- código;
- histórico;
- pull requests;
- documentação;
- workflows de CI/CD;
- revisão.

O provedor de CI poderá utilizar GitHub Actions quando adequado.

---

# 22. Deploy

Merge aprovado na branch principal deverá poder disparar deploy automaticamente.

## Requisitos

- build reproduzível;
- secrets do ambiente;
- gates de qualidade;
- deployment log;
- identificação da versão/commit.

---

# 23. Rollback

O hosting deverá permitir retorno rápido a uma versão anterior estável.

## Regra

Um deploy quebrado não deve exigir reconstrução manual complexa para restaurar o site.

Quando possível:

> versão anterior permanece disponível como referência operacional para rollback.

---

# 24. Hosting — restrições

O hosting escolhido deverá suportar:

- site comercial;
- domínio customizado;
- HTTPS;
- CDN;
- preview deployments;
- runtime da stack aprovada;
- server-side necessário;
- headers;
- redirects;
- cache;
- observabilidade;
- rollback.

## Orçamento

A opção inicial deve respeitar o teto de R$ 50/mês.

---

# 25. Pesquisa atual — hosting

Pesquisa realizada em 2026-09-25.

## Vercel

O plano Hobby atual é gratuito, porém os termos o limitam a uso pessoal/não comercial.

A Fluorite Labs é um projeto comercial.

O plano Pro começa em US$ 20/mês, acima do orçamento inicial de R$ 50/mês antes de impostos e variação cambial.

### Implicação

> **Vercel Hobby não será assumido como hosting de produção da Fluorite Labs.**

Vercel Pro pode ser reavaliado futuramente com orçamento maior.

## Cloudflare

Cloudflare Workers possui camada gratuita e plano pago com cobrança mínima atual de US$ 5/mês.

Pages/Workers oferecem infraestrutura de CDN e execução server-side conforme compatibilidade da stack.

### Implicação

Cloudflare é **candidato forte** de hosting dentro do orçamento, mas a decisão final depende do framework e runtime escolhidos pelo Tech Lead.

---

# 26. Banco de dados — requisitos

O banco precisa suportar:

- leads;
- Journal;
- categorias;
- metadata;
- migrations;
- backup;
- restore;
- acesso server-side;
- região Brasil preferencial.

## Preferência

Banco gerenciado.

Não operar PostgreSQL manualmente em VM na V1.

---

# 27. Pesquisa atual — banco em São Paulo

Pesquisa realizada em 2026-09-25.

## Supabase

Supabase oferece região específica:

> South America (São Paulo) — `sa-east-1`.

### Free

O plano gratuito atual:

- possui limites suficientes para pequena V1;
- pode ser pausado após período de baixa atividade;
- não oferece o mesmo nível de backup automático dos planos pagos.

### Pro

O plano atual inicia em US$ 25/mês.

Isso excede sozinho o teto inicial de R$ 50/mês.

### Implicação

Supabase permanece candidato técnico, porém:

> **o plano gratuito não deve ser assumido como solução definitiva de produção sem mitigação de pausa e backup.**

## Neon

A infraestrutura atual do Neon possui Postgres disponível em São Paulo (`sa-east-1`) e camada gratuita de entrada.

Neon é outro candidato forte para banco dentro do orçamento inicial.

### Decisão final

Documento 08 deverá comparar pelo menos:

- Supabase;
- Neon;
- outra alternativa relevante se houver.

Critérios:

- região;
- preço;
- backup;
- restore;
- branches/staging;
- conexão com hosting;
- maturidade;
- portabilidade.

---

# 28. Backup

Direção desejada:

> **backup diário com até 30 dias de retenção quando economicamente viável.**

## Problema de orçamento

Planos gratuitos podem não oferecer essa capacidade de forma nativa.

## Estratégia permitida

Se o provider escolhido não oferecer retenção suficiente dentro do orçamento:

- export automatizado;
- backup lógico;
- criptografia;
- storage separado;
- retenção controlada.

## Regra

A ausência de recurso nativo pago não elimina o requisito de backup.

---

# 29. Restore

Depois da Fundação, deverá existir ao menos um teste de restauração.

## Evidência mínima

Documentar:

- qual backup foi usado;
- como restaurar;
- duração aproximada;
- dependências;
- validação pós-restore.

## Regra

> **backup não testado não é considerado estratégia de recuperação concluída.**

---

# 30. Storage de mídia

Imagens do FLUOR JOURNAL não devem ser adicionadas ao Git a cada publicação.

Elas devem utilizar object storage ou serviço equivalente.

## Requisitos

- upload pelo admin;
- URL/referência estável;
- limite de tamanho;
- validação de MIME;
- otimização;
- possibilidade de remoção;
- CDN quando aplicável.

---

# 31. Pesquisa atual — object storage

Cloudflare R2 é candidato relevante.

Na pesquisa de 2026-09-25, a camada gratuita inclui:

- 10 GB-mês de storage;
- 1 milhão de operações Class A por mês;
- 10 milhões de operações Class B por mês;
- egress gratuito.

Esse volume é muito superior ao necessário para o Journal no lançamento.

## Alternativas

Se o banco/provider escolhido já incluir storage adequado, essa opção também deverá ser comparada.

## Regra

Não adicionar um novo provider se o ganho operacional não justificar.

---

# 32. Profissional e-mail — candidato de baixo custo

A infraestrutura deverá reservar parte do orçamento para e-mail profissional caso uma solução gratuita adequada não seja utilizada.

Pesquisa atual indica provedores empresariais de baixo custo disponíveis no Brasil.

Exemplo: Zoho Mail anuncia opções a partir de aproximadamente R$ 5 por usuário/mês mediante oferta comercial vigente.

## Regra

A escolha definitiva depende de:

- domínio;
- número de caixas;
- aliases;
- recuperação;
- antispam;
- custo.

---

# 33. E-mail transacional

A V1 não exige automação comercial por e-mail.

Mas serviços futuros podem precisar de:

- alertas;
- recuperação;
- notificações.

Se um provider transacional for necessário, deverá ser separado conceitualmente da caixa postal profissional.

Resend é um candidato futuro de baixo volume, mas não será ativado sem necessidade.

---

# 34. Secrets

Secrets incluem, entre outros:

- chave secreta do auth;
- conexão do banco;
- tokens de storage;
- chaves de analytics server-side quando aplicáveis;
- tokens de observabilidade.

## Regras

- nunca commitar;
- nunca colocar em variável pública;
- segregar por ambiente;
- rotacionar quando comprometidos;
- usar secret manager/configuração segura do provider.

---

# 35. Arquivo de exemplo

O repositório poderá conter:

`.env.example`

com nomes das variáveis necessárias.

Não conter valores reais.

---

# 36. Observabilidade

A V1 precisa saber quando algo relevante falha.

Monitorar:

- página pública;
- criação de leads;
- admin;
- autenticação;
- publicação;
- erros server-side;
- deploy.

Não é necessário adotar uma stack enterprise.

---

# 37. Logs

Requisitos:

- logs técnicos úteis;
- correlação mínima com operação;
- retenção suficiente para diagnóstico;
- sem dados pessoais desnecessários.

## Prioridade

Registrar:

- exceções;
- falha de persistência;
- falha de publicação;
- falha de integração;
- erro inesperado.

---

# 38. Alertas

Alertas devem representar eventos acionáveis.

## Exemplos

- múltiplas falhas consecutivas de lead;
- site indisponível;
- rota crítica retornando 5xx;
- falha contínua de deploy;
- erro grave no admin.

## Evitar

E-mail para todo erro isolado.

---

# 39. Canal de alertas

Na V1:

> **e-mail.**

Não será necessário criar:

- Slack;
- Discord;
- PagerDuty;
- canal especializado.

Revisitar quando a operação crescer.

---

# 40. Uptime

Implementar monitor simples para:

- Home;
- endpoint/health check quando aplicável.

## Objetivo

Detectar indisponibilidade sem depender de percepção manual.

---

# 41. Disponibilidade

Não existe requisito de SLA enterprise.

A estratégia será:

- provedores gerenciados;
- rollback rápido;
- backup;
- alertas;
- componentes simples.

## Regra

Não pagar antecipadamente por redundância extrema incompatível com o porte atual.

---

# 42. Pay as you grow

A infraestrutura deve crescer com uso real.

Preferir:

- free tier adequado;
- autoscaling;
- scale-to-zero quando saudável;
- cobrança incremental.

Evitar:

- VM superdimensionada;
- capacidade fixa ociosa;
- contratos grandes antes da demanda.

---

# 43. Staging e custo

Staging deve existir sem duplicar desnecessariamente todos os custos de produção.

Preferir:

- preview environments;
- branches;
- projetos gratuitos de desenvolvimento;
- recursos efêmeros;

quando seguros.

## Regra

Nunca reduzir isolamento de dados para economizar poucos reais.

---

# 44. Infraestrutura como código

Terraform ou IaC equivalente não é obrigatório na V1.

## Motivo

A infraestrutura deverá possuir poucos serviços gerenciados.

## Obrigatório mesmo sem IaC

- documentação;
- inventário de recursos;
- nomes dos ambientes;
- variáveis;
- procedimentos;
- backup;
- restore;
- DNS;
- ownership.

## Revisitar

Quando infraestrutura aumentar ou recriação automática virar necessidade.

---

# 45. Segurança de custos

Configurar, quando disponível:

- budget alerts;
- usage alerts;
- limites;
- prevenção de overage;
- notificações de cobrança.

## Regra

Pay-as-you-grow não significa permitir cobrança ilimitada sem visibilidade.

---

# 46. Inventário inicial de provedores — direção

A composição abaixo é **candidata**, não seleção completa de stack:

```text
Git / CI
→ GitHub

Auth
→ Clerk (preferencial)

Hosting
→ Cloudflare ou alternativa compatível com a stack

Database
→ Neon ou Supabase em São Paulo

Object storage
→ provider escolhido ou Cloudflare R2

Analytics
→ GA4 + Search Console

Professional email
→ provider de domínio/e-mail a selecionar

Monitoring
→ solução leve/provider-native a selecionar
```

O Documento 08 deverá confirmar compatibilidade ponta a ponta.

---

# 47. Compatibilidade antes de contratação

Nenhum provider pago deverá ser contratado antes de validar:

- framework;
- runtime;
- região;
- ambiente de preview;
- banco;
- conexão;
- storage;
- auth;
- custo total.

## Regra

Não otimizar um serviço isoladamente e acabar com uma arquitetura incompatível.

---

# 48. Matriz de decisão para o Documento 08

A stack/provedores deverão ser comparados por:

| Critério | Importância |
| --- | --- |
| custo dentro de R$ 50/mês | crítica |
| região Brasil para dados principais | alta |
| compatibilidade com rendering/SEO | crítica |
| preview deployments | alta |
| facilidade operacional | crítica |
| backup/restore | crítica |
| segurança | crítica |
| performance | alta |
| portabilidade | média |
| lock-in | média |
| observabilidade | alta |

---

# 49. Restrição importante — Vercel

A experiência anterior do Oplib utiliza recursos do ecossistema Vercel.

Isso pode servir como referência técnica, mas não deve ser copiado automaticamente para Fluorite Labs.

## Motivo

Na pesquisa atual:

- Hobby é restrito a uso pessoal/não comercial;
- Pro excede o orçamento inicial.

## Regra

Experiência anterior serve como aprendizado, não como obrigação de provider.

---

# 50. Restrição importante — Clerk e Brasil

Clerk é uma escolha particularmente conveniente para a autenticação do admin e já possui precedente no Oplib.

Porém:

> **Clerk não mantém os dados de autenticação em região brasileira.**

Esse trade-off deverá ser aprovado conscientemente.

## Mitigação

- somente admin usa auth;
- leads não passam pelo Clerk;
- Journal não é armazenado pelo Clerk;
- autorização continua controlada pela aplicação.

---

# 51. Plano de Fundação — infraestrutura

Antes da implementação funcional completa, a Fundação deverá produzir evidência dos seguintes itens:

### FND-INF-001 — Domínio

- domínio escolhido;
- DNS configurável;
- ownership documentado.

### FND-INF-002 — E-mail

- e-mail profissional ativo.

### FND-INF-003 — Ambientes

- local;
- preview/staging;
- produção.

### FND-INF-004 — Auth

- Clerk configurado;
- usuário admin autorizado;
- secrets separados por ambiente.

### FND-INF-005 — Banco

- provider aprovado;
- região São Paulo quando suportado;
- migrations executáveis.

### FND-INF-006 — Storage

- upload seguro;
- ambiente separado quando necessário.

### FND-INF-007 — CI

- lint;
- typecheck;
- testes;
- build.

### FND-INF-008 — Deploy

- preview automático;
- production automático após aprovação.

### FND-INF-009 — Backup

- rotina ativa.

### FND-INF-010 — Restore

- restauração testada.

### FND-INF-011 — Monitoring

- uptime;
- erros relevantes.

### FND-INF-012 — Alerts

- e-mail de alerta funcionando.

### FND-INF-013 — Secrets

- nenhum secret versionado.

### FND-INF-014 — SEO environments

- preview/staging noindex;
- produção indexável conforme Documento 05.

---

# 52. Decisões que não devem ser revertidas sem revisão explícita

1. teto operacional inicial de R$ 50/mês;
2. custos recorrentes novos exigem aprovação;
3. domínio profissional faz parte do lançamento;
4. e-mail profissional faz parte do lançamento;
5. serviços gerenciados são preferidos;
6. quantidade de provedores deve permanecer baixa;
7. zero lock-in não é objetivo absoluto;
8. dados principais devem priorizar Brasil;
9. Clerk é o provider preferencial de auth da V1;
10. autorização administrativa permanece na aplicação;
11. Clerk é exceção conhecida de residência de dados;
12. Local + Preview/Staging + Production são obrigatórios;
13. staging não usa dados reais de leads;
14. admin permanece em `/admin`;
15. merge aprovado pode disparar produção automaticamente;
16. rollback é requisito;
17. Vercel Hobby não será utilizado para produção comercial;
18. hosting final deve respeitar orçamento e compatibilidade;
19. banco gerenciado deve priorizar São Paulo;
20. backup diário e retenção próxima de 30 dias são desejados;
21. se backup nativo não couber no orçamento, backup lógico externo é permitido;
22. restore precisa ser testado;
23. mídia editorial não deve depender de commits/deploys;
24. secrets não entram no Git;
25. alertas iniciais são por e-mail;
26. uptime monitoring é requisito;
27. IaC é adiado enquanto a infraestrutura permanecer simples;
28. infraestrutura deve seguir pay-as-you-grow.

---

# 53. Pontos que o Documento 08 deve fechar

- linguagem;
- framework web;
- runtime;
- hosting definitivo;
- banco definitivo;
- acesso a dados;
- storage definitivo;
- SDK/configuração Clerk;
- editor de blocos;
- testes;
- package manager;
- CI;
- observabilidade;
- compatibilidade de regiões;
- custo mensal estimado completo.

---

# 54. Critérios de aprovação

Este documento estará aprovado quando o responsável pelo produto confirmar:

- orçamento;
- domínio;
- e-mail profissional;
- prioridade Brasil;
- trade-off Clerk/US;
- ambientes;
- isolamento;
- deploy;
- rollback;
- banco;
- storage;
- backup;
- restore;
- observabilidade;
- alertas;
- uptime;
- secrets;
- critérios para provedores.

Após aprovação, o próximo documento será:

`08_Visao_do_Tech_Lead_e_Stack.md`

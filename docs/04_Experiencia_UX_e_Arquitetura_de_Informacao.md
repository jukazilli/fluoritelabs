# Fluorite Labs — Experiência UX e Arquitetura de Informação

> **Documento:** 04  
> **Status:** APROVADO — documento canônico  
> **Última atualização:** 2026-09-25  
> **Documentos anteriores:** `01_Briefing_e_Escopo.md`, `02_Visao_de_Produto_PO.md`, `03_Direcao_de_Marca_UI_e_Design_System.md`

---

# 1. Objetivo

Este documento define como o visitante percorre, entende e conclui a experiência da Fluorite Labs.

Ele consolida:

- arquitetura de informação;
- sitemap;
- navegação;
- hierarquia da Home;
- páginas de serviço;
- Work;
- FLUOR JOURNAL;
- microbriefing;
- captura de leads;
- integração com WhatsApp;
- backoffice mínimo;
- estados;
- erros;
- retomadas;
- mobile;
- páginas legais;
- 404.

A pergunta central é:

> **Como permitir que o visitante avance da descoberta até o contato com o mínimo de atrito, sem que a interface precise explicar a si mesma?**

---


# 1.1. Fidelidade UX à referência visual

A experiência pública descrita neste documento deve ser implementada dentro da referência visual canônica definida no Documento 03.

A arquitetura de informação pode mudar conteúdos, labels e destinos aprovados, mas não pode transformar a experiência em outra linguagem de interface.

## Regra

A UX deve ser resolvida **dentro da composição da Fluorite Labs**, e não adicionando padrões visuais genéricos para tornar cada função mais óbvia.

Exemplos:

- Serviços podem ser navegáveis sem virar uma grade de cards padrão;
- Processo pode ser compreensível sem ícones clichês;
- Work pode ser explorável sem thumbnails com aparência de marketplace;
- microbriefing deve parecer parte da experiência, não um widget externo;
- navegação mobile deve preservar o mesmo caráter editorial e cinematográfico.

## Conflito entre referência e conteúdo aprovado

Elementos literais da imagem de referência, como textos em inglês ou itens antigos de navegação, não substituem as decisões de arquitetura já aprovadas.

Preservar:

- hierarquia;
- escala;
- ritmo;
- posição relativa;
- contraste;
- atmosfera;
- relação texto/imagem;
- densidade.

Adaptar:

- copy;
- labels;
- destinos;
- estados;
- acessibilidade;
- comportamento responsivo.

---

# 2. Princípios de UX

## UX-001 — A interface conduz

A navegação deve ser compreensível pelo próprio comportamento visual.

Evitar instruções como:

- clique aqui;
- role para continuar;
- veja este projeto;
- selecione para avançar;
- este item é clicável.

Se uma ação importante exigir explicação textual, a UI deve ser revista primeiro.

---

## UX-002 — Uma tarefa mental dominante

Cada seção ou superfície deve possuir uma tarefa principal reconhecível.

Exemplos:

- Hero → perceber a marca e iniciar contato;
- Serviços → identificar o tipo de solução;
- Work → avaliar qualidade;
- Processo → entender como é contratar;
- Journal → ler e aprofundar;
- Microbriefing → responder a próxima pergunta;
- Admin → executar uma ação operacional.

---

## UX-003 — Progressão de informação

A experiência começa com pouca informação e aprofunda conforme o interesse do visitante.

```text
Impacto
  ↓
Valor
  ↓
Serviços
  ↓
Prova
  ↓
Processo
  ↓
Conteúdo
  ↓
Conversão
```

---

## UX-004 — Continuidade

Mudanças de rota não devem transmitir sensação de site antigo ou fragmentado.

A experiência deve permanecer visual e comportamentalmente contínua entre:

- Home;
- serviços;
- Work;
- Journal;
- microbriefing;
- páginas legais.

---

## UX-005 — Conversão sem pressão

O visitante deve conseguir iniciar contato em momentos naturais.

Evitar:

- pop-ups promocionais;
- urgência artificial;
- excesso de CTAs;
- interrupções;
- WhatsApp visualmente invasivo.

---

# 3. Sitemap da V1

```text
/
├── /work
│   ├── /work/conceito-arquitetura
│   ├── /work/conceito-saude
│   └── /work/conceito-b2b
│
├── /servicos/site-institucional
├── /servicos/landing-page
├── /servicos/pagina-de-produto
├── /servicos/seo
│
├── /journal
│   └── /journal/[slug]
│
├── /privacidade
├── /cookies                  [se aplicável]
│
├── /admin
│   ├── /admin/leads
│   ├── /admin/journal
│   └── /admin/categorias
│
└── /404
```

## Observações

- a Home concentra a principal experiência institucional;
- não haverá página `/sobre` na V1;
- não haverá página `/contato` tradicional;
- hospedagem e implantação não terão páginas principais próprias inicialmente;
- páginas locais de SEO não fazem parte da navegação principal;
- qualquer expansão de rotas locais dependerá do Documento 05.

---

# 4. Navegação principal

## Itens

- Work;
- Serviços;
- Processo;
- Journal;
- Começar agora.

## Regra

Não incluir inicialmente:

- Sobre;
- Contato;
- Joinville;
- Curitiba;
- preços;
- links técnicos.

## Desktop

A navegação deve permanecer curta e integrada ao header.

## Mobile

Menu fullscreen ou quase fullscreen.

Deve conter:

- poucos itens;
- alta legibilidade;
- CTA visível;
- transição editorial;
- ausência de listas comprimidas.

---

# 5. Comportamento híbrido: Home + páginas próprias

A Home funcionará como experiência contínua.

Alguns itens de navegação poderão levar diretamente a seções da própria Home por scroll suave.

Ao mesmo tempo, conteúdos com profundidade suficiente terão URLs próprias.

## Exemplo

### Serviços

Na Home:

- visão resumida;
- identificação rápida da necessidade.

Na página própria:

- aprofundamento;
- contexto;
- SEO;
- Work relacionado;
- conversão.

### Work

Na Home:

- três projetos visualmente fortes.

Em `/work/[slug]`:

- narrativa completa.

### Journal

Na Home:

- 2 ou 3 artigos.

Em `/journal`:

- arquivo editorial.

---

# 6. Home — fluxo principal

A sequência aprovada é:

```text
Hero
  ↓
Por que Fluorite Labs
  ↓
Serviços
  ↓
Work
  ↓
Processo
  ↓
Reforços de confiança
  ↓
FLUOR JOURNAL
  ↓
CTA final + Footer
```

O visitante pode converter antes do final.

---

# 7. Hero

## Tarefa mental

> Entender rapidamente que a Fluorite Labs cria produtos digitais profissionais e perceber qualidade suficiente para querer continuar ou iniciar contato.

## Deve conter

- wordmark;
- navegação;
- headline curta;
- texto de apoio compacto;
- CTA principal;
- fluorita / mídia de marca;
- microelementos visuais quando necessários.

## CTA

Direção atual:

> **Começar agora**

## Não deve conter

- lista de benefícios;
- preço;
- cidades;
- FAQ;
- processo;
- texto longo;
- palavras-chave repetidas.

---

# 8. Por que Fluorite Labs

## Tarefa mental

> Entender, em poucos segundos, a filosofia que diferencia a forma como a Fluorite Labs pensa produtos digitais.

## Estrutura

Preferência:

- uma frase principal;
- um pequeno texto complementar.

## Ideia a transmitir

Um bom produto digital deve receber bem.

Assim como um local organizado e um anfitrião cuidadoso fazem uma pessoa querer voltar, um site deve:

- gerar valor ao negócio;
- facilitar a visita;
- gerar confiança;
- oferecer uma experiência agradável;
- tornar natural continuar a relação.

## Regra visual

Não utilizar:

- ícones clichês;
- cards genéricos;
- bullets na interface final;
- grade “6 motivos”;
- elementos típicos de templates gerados por IA;
- logos técnicos como React, Next etc. para decorar.

O conteúdo final deverá ser apresentado editorialmente.

---

# 9. Serviços

## Serviços principais

1. Site institucional;
2. Landing page;
3. Página de produto ou serviço;
4. SEO.

## Serviços complementares

- implantação;
- hospedagem.

Esses serviços complementares podem aparecer como parte da entrega sem ocupar a mesma hierarquia dos serviços principais.

## Regra

A estrutura de serviços ainda poderá ser revista após a primeira implementação visual.

Essa possibilidade de revisão não altera a arquitetura base da V1.

---

# 10. Página de serviço

## Tarefa mental

> Conseguir se imaginar utilizando aquela solução no próprio negócio e entender qual valor ela pode gerar.

## Estrutura editorial sugerida

```text
Abertura curta
   ↓
Problema / contexto
   ↓
Resultado esperado
   ↓
Como pensamos essa experiência
   ↓
Work relacionado
   ↓
Processo resumido
   ↓
Começar agora
```

## Regra

Evitar:

- mural de benefícios;
- dezenas de cards;
- FAQ excessiva;
- linguagem de landing page agressiva;
- blocos comerciais repetitivos.

A página deve trazer o visitante para dentro da experiência.

---

# 11. Work

## Página /work

Pode funcionar como arquivo visual dos projetos.

No lançamento:

- 3 projetos conceituais.

## Home

Os três trabalhos devem ter presença visual forte.

## Tarefa mental

> Ver evidência prática de capacidade.

---

# 12. Página individual de Work

Rota:

`/work/[slug]`

## Estrutura

```text
Abertura
  ↓
Contexto
  ↓
Conceito
  ↓
Telas grandes
  ↓
Detalhes
  ↓
Responsivo
  ↓
Próximo trabalho
```

## Copy

Baixa densidade.

A maior parte da narrativa deve acontecer por:

- composição;
- tela;
- imagem;
- ritmo;
- sequência.

## Conceitos

Projetos conceituais não serão apresentados como clientes reais.

Quando necessário, usar o rótulo discreto:

> **Conceito**

---

# 13. Navegação contínua entre trabalhos

No final de cada Work, oferecer continuidade direta para outro projeto.

Direção:

> **Próximo trabalho →**

## Regra

Evitar obrigar o visitante a retornar à listagem para continuar explorando.

A listagem continua disponível pela navegação.

---

# 14. Processo comercial

A seção Processo deve explicar como funciona contratar a Fluorite Labs.

Ela não deve expor o processo técnico interno de desenvolvimento.

## Fluxo de negócio

```text
Contato
  ↓
Entendimento da necessidade
  ↓
Levantamento e alinhamento
  ↓
Orçamento
  ↓
Aprovação
  ↓
Pagamento acordado
  ↓
Planejamento
  ↓
Prazo final comunicado
  ↓
Desenvolvimento
  ↓
Publicação
```

## Tradução para linguagem do cliente

A interface poderá resumir esse fluxo em aproximadamente 4 ou 5 momentos.

Direção conceitual:

1. Conversamos;
2. Entendemos;
3. Planejamos;
4. Criamos;
5. Publicamos.

A copy final será definida posteriormente.

## Regra

A experiência deve transmitir:

> **“Parece simples trabalhar com eles.”**

Não:

> “Esse processo parece burocrático ou tecnicamente complexo.”

---

# 15. Microbriefing

## Entrada

Acionado pelo CTA principal e demais CTAs contextuais.

## Formato

Modal ou painel em três passos.

## Perguntas

### Passo 1

> Qual é o seu primeiro nome?

### Passo 2

> O que você precisa?

Opções iniciais:

- Site institucional;
- Landing page;
- Página de produto ou serviço;
- SEO;
- Melhorar meu site atual;
- Ainda não sei.

### Passo 3

> Quanto você pretende investir?

Faixas:

- até R$ 1.500;
- R$ 1.500–3.000;
- R$ 3.000–5.000;
- acima de R$ 5.000;
- ainda não defini.

## CTA final

> **Continuar no WhatsApp**

---

# 16. Persistência do microbriefing

As respostas devem ser preservadas durante a sessão do visitante.

## Comportamento

Se o visitante:

- responder parcialmente;
- fechar o painel;
- continuar navegando;
- abrir novamente durante a mesma sessão;

as respostas já fornecidas devem permanecer preenchidas.

## Limite

A persistência de longo prazo não é requisito deste documento.

---

# 17. Captura do lead antes do WhatsApp

Esta é uma regra crítica.

> **A Fluorite Labs não pode depender do sucesso da abertura do WhatsApp para registrar o lead.**

## Fluxo

```text
Usuário conclui pergunta 3
        ↓
Usuário aciona "Continuar no WhatsApp"
        ↓
Sistema registra o lead
        ↓
Confirma registro
        ↓
Tenta abrir WhatsApp
```

## Resultado

Mesmo que:

- WhatsApp não abra;
- aplicativo não esteja instalado;
- navegador bloqueie a ação;
- usuário feche a nova aba;
- link externo falhe;

o lead já deverá estar registrado.

## Dados mínimos

- primeiro nome;
- necessidade;
- faixa de investimento;
- data/hora;
- origem da página;
- UTM/referrer quando disponível e permitido;
- status inicial.

A definição técnica e de privacidade será feita posteriormente.

---

# 18. Mensagem para WhatsApp

A mensagem deverá ser gerada automaticamente com contexto.

Estrutura conceitual:

```text
Olá, sou [nome].

Tenho interesse em [necessidade].
Faixa de investimento: [faixa].
```

A copy final deverá permanecer curta e natural.

---

# 19. Comportamento WhatsApp por dispositivo

## Mobile

Quando disponível:

- abrir aplicativo ou handler apropriado.

## Desktop

- abrir WhatsApp Web ou experiência equivalente no navegador.

## Regra

O registro interno do lead acontece antes da tentativa de abertura em ambos os casos.

---

# 20. Área administrativa mínima

A V1 terá um backoffice simples.

Isso não representa um CRM completo.

## Objetivos

1. não perder leads;
2. visualizar contatos recebidos;
3. administrar o FLUOR JOURNAL.

---

# 21. Admin — Leads

Rota conceitual:

`/admin/leads`

## Tarefa mental

> Ver rapidamente quem demonstrou interesse e qual era sua necessidade.

## Dados mínimos por lead

- nome;
- necessidade;
- faixa de investimento;
- data/hora;
- origem;
- status.

## Status iniciais sugeridos

- Novo;
- Contatado;
- Convertido;
- Arquivado.

Essa lista poderá ser simplificada durante implementação.

## Ações mínimas

- visualizar;
- alterar status;
- acessar contato/contexto;
- ordenar por data.

## Fora da V1

- pipeline complexo;
- automações de CRM;
- forecasting;
- propostas;
- financeiro;
- gestão completa de relacionamento;
- dashboards avançados.

---

# 22. Admin — FLUOR JOURNAL

Rota conceitual:

`/admin/journal`

## Objetivo

Permitir manutenção editorial sem alteração manual de código.

## Ações mínimas

- criar publicação;
- editar;
- salvar rascunho;
- publicar;
- despublicar;
- excluir;
- definir slug;
- definir título;
- definir resumo;
- definir categoria;
- definir imagem;
- definir conteúdo;
- configurar metadados essenciais de SEO.

A especificação técnica do CMS/backoffice pertence aos documentos posteriores.

---

# 23. Admin — Categorias

Rota conceitual:

`/admin/categorias`

## Ações mínimas

- criar;
- editar;
- ordenar quando necessário;
- excluir quando não estiver em uso ou após confirmação adequada.

## Categorias iniciais sugeridas

- Sites;
- SEO;
- Experiência;
- Negócios.

A quantidade inicial deve permanecer pequena.

---

# 24. Admin — UX

A área administrativa não precisa replicar a experiência cinematográfica da Home.

## Prioridades

```text
clareza
>
velocidade
>
legibilidade
>
consistência
>
efeito visual
```

## Ainda deve preservar

- tipografia;
- cores;
- qualidade;
- espaçamento;
- identidade básica.

## Regra

O admin é uma ferramenta de trabalho.

Ele deve ser eficiente antes de ser impressionante.

---

# 25. FLUOR JOURNAL

## Página /journal

Tarefa mental:

> Encontrar rapidamente algo relevante para ler.

## Estrutura inicial

- abertura editorial;
- lista de publicações;
- categoria discreta;
- título;
- resumo;
- imagem quando aplicável;
- data.

## Home

Exibir:

- até 3 conteúdos.

Preferência por:

- mais relevantes;
- recentes;
- estratégicos.

---

# 26. Artigo

Rota:

`/journal/[slug]`

## Tarefa mental

> Ler com conforto.

## Deve priorizar

- legibilidade;
- hierarquia;
- ritmo;
- largura adequada;
- headings;
- imagens;
- respiro.

## Navegação complementar

Ao final:

- próximo conteúdo;
- conteúdo relacionado quando houver massa crítica;
- CTA comercial discreto quando fizer sentido.

---

# 27. Busca e filtros no Journal

## V1

Não implementar:

- busca;
- filtros complexos;
- múltiplos níveis de taxonomia.

## Evolução

Adicionar apenas quando o volume de conteúdo justificar.

---

# 28. SEO local e UX

Joinville e Curitiba:

- não aparecem no menu;
- não aparecem como posicionamento central da marca;
- não devem ser usadas como slogans;
- não devem restringir percepção de atuação nacional.

## Regra

O Documento 05 decidirá como trabalhar relevância regional.

Não utilizar conteúdo oculto ou qualquer mecanismo que mostre informação apenas ao mecanismo de busca.

Se páginas locais forem aprovadas, elas deverão possuir valor real para quem chegar por aquela busca.

---

# 29. Footer

O footer funciona como seção final da experiência.

## Estrutura sugerida

### Bloco principal

- fechamento de marca;
- CTA “Começar agora”.

### Bloco utilitário

- Work;
- Serviços;
- Processo;
- Journal;
- contato;
- privacidade;
- cookies quando aplicável.

## Localização

Não destacar Joinville ou Curitiba como limitação de atuação.

## Regra

Evitar grade extensa de links.

---

# 30. Página Sobre

Não existirá na V1.

## Motivo

A marca ainda não possui:

- equipe ampla;
- longa história;
- estrutura institucional que justifique uma página dedicada.

## Onde a filosofia aparece

- Por que Fluorite Labs;
- Processo;
- footer;
- Work;
- Journal.

A página poderá surgir no futuro quando houver história real para contar.

---

# 31. Páginas legais

## Obrigatória

`/privacidade`

## Condicional

`/cookies`

conforme tecnologias utilizadas.

## Conteúdo

Deverá explicar de maneira compreensível:

- quais dados são coletados;
- por que são coletados;
- como são utilizados;
- como são armazenados;
- com quem podem ser compartilhados;
- período de retenção quando aplicável;
- direitos do titular;
- forma de contato.

A versão jurídica final deverá ser revisada conforme legislação e ferramentas efetivamente utilizadas.

---

# 32. Consentimento

O consentimento não deve ser implementado como elemento visual intrusivo sem necessidade.

Sua forma dependerá de:

- analytics;
- cookies;
- publicidade;
- integrações.

O Documento 05 e os documentos técnicos definirão necessidade e comportamento.

---

# 33. 404

## Objetivo

Ajudar o visitante a retomar a navegação.

## Deve conter

- mensagem curta;
- identidade Fluorite;
- caminho claro para Home;
- opcionalmente Work ou Journal.

## Evitar

- espetáculo;
- piadas longas;
- animação pesada;
- excesso de conteúdo.

---

# 34. Erros de formulário

Erros devem ser tratados inline.

## Exemplo

- campo incompleto;
- valor inválido;
- falha temporária de registro.

## Regras

- indicar o campo;
- explicar brevemente;
- preservar respostas;
- não apagar o formulário;
- não direcionar para página de erro.

---

# 35. Falha no registro do lead

Como o registro interno é obrigatório antes do WhatsApp, uma falha real de persistência precisa ser tratada.

## Comportamento

Se o lead não puder ser registrado:

- preservar respostas;
- informar problema de forma curta;
- permitir nova tentativa;
- não fingir sucesso.

A decisão sobre permitir WhatsApp mesmo assim será definida na arquitetura técnica considerando risco e disponibilidade.

---

# 36. Sucesso do registro

O visitante não precisa receber uma tela de sucesso longa.

A transição pode ser:

```text
registro concluído
       ↓
feedback mínimo
       ↓
WhatsApp
```

Exemplo de feedback:

> Pronto.

seguido imediatamente pela continuidade.

A microcopy final será validada em UX/UI.

---

# 37. Loading

Utilizar apenas quando existir espera real.

## Regras

- preservar contexto;
- evitar loaders longos;
- não bloquear a interface sem necessidade;
- não criar loading artificial;
- preferir feedback local.

---

# 38. Navegação mobile

## Menu

Fullscreen ou quase fullscreen.

## Deve conter

- Work;
- Serviços;
- Processo;
- Journal;
- Começar agora.

## Comportamento

- abertura suave;
- fechamento intuitivo;
- foco de teclado quando aplicável;
- scroll controlado;
- sem densidade desnecessária.

---

# 39. Continuidade entre páginas

O visitante deve perceber que ainda está dentro da mesma experiência.

## Preservar

- header;
- tipografia;
- ritmo;
- backgrounds coerentes;
- motion;
- posicionamento.

## Evitar

- flashes;
- blank states;
- recarregamento aparente;
- mudanças bruscas.

A implementação será decidida posteriormente.

---

# 40. User stories principais

## Visitante — descobrir

Como decisor de uma empresa,  
quero entender rapidamente a qualidade e o tipo de trabalho da Fluorite Labs,  
para decidir se vale continuar explorando.

## Visitante — serviços

Como potencial cliente,  
quero identificar qual solução atende minha necessidade,  
para entender se a Fluorite Labs pode me ajudar.

## Visitante — Work

Como potencial cliente,  
quero ver exemplos de trabalho,  
para avaliar a capacidade visual e técnica da empresa.

## Visitante — processo

Como potencial cliente,  
quero entender como funciona contratar a Fluorite Labs,  
para reduzir incerteza antes de entrar em contato.

## Visitante — contato

Como potencial cliente,  
quero responder poucas perguntas e continuar pelo WhatsApp,  
para iniciar uma conversa sem preencher um formulário longo.

## Operação — lead

Como responsável comercial,  
quero que todo microbriefing concluído seja registrado antes do WhatsApp,  
para não perder oportunidades por falha na abertura do canal externo.

## Operação — conteúdo

Como responsável pela Fluorite Labs,  
quero publicar e editar conteúdos do Journal pelo admin,  
para manter a estratégia editorial sem depender de alteração de código.

---

# 41. Eventos de UX relevantes para analytics

Sem escolher ferramenta, a experiência deve permitir medir ao menos:

- visualização da Home;
- clique em Começar agora;
- abertura do microbriefing;
- conclusão do passo 1;
- conclusão do passo 2;
- conclusão do passo 3;
- lead registrado;
- tentativa de abertura do WhatsApp;
- clique em serviço;
- abertura de Work;
- avanço para próximo Work;
- abertura de artigo;
- CTA final.

A definição de eventos, consentimento e ferramenta será feita nos documentos posteriores.

---

# 42. Decisões que não devem ser revertidas sem revisão

1. menu principal curto;
2. Home como experiência principal;
3. páginas de serviço próprias podem coexistir com scroll da Home;
4. 4 serviços principais na estrutura inicial;
5. hospedagem e implantação são complementares;
6. página de serviço deve ser editorial;
7. Work é altamente visual;
8. Work possui navegação contínua para próximo projeto;
9. Por que Fluorite Labs não utiliza cards/ícones clichês;
10. Processo fala a linguagem do cliente;
11. microbriefing possui 3 passos;
12. respostas persistem na sessão;
13. lead deve ser registrado antes da tentativa de abrir WhatsApp;
14. admin mínimo faz parte da V1;
15. admin gerencia leads e Journal;
16. WhatsApp continua sendo canal de conversa, não banco único de leads;
17. Journal não possui busca/filtros avançados na V1;
18. Joinville e Curitiba não aparecem no posicionamento principal;
19. não existe página Sobre na V1;
20. páginas legais ficam no footer;
21. erros de formulário são inline;
22. mobile usa menu amplo e editorial.

---

# 43. Pontos pendentes para etapas posteriores

Não são decisões deste documento:

- tecnologia do admin;
- autenticação;
- banco de dados;
- modelo de persistência;
- CMS próprio ou biblioteca;
- integração exata com WhatsApp;
- analytics escolhido;
- consent manager;
- estratégia SEO local definitiva;
- schema;
- SSR/SSG/ISR ou equivalente;
- cache;
- infraestrutura;
- segurança técnica;
- backups.

---

# 44. Aprovação da Experiência UX e Arquitetura de Informação

O responsável pelo produto aprovou este documento em 2026-09-24.

Ficam canonizados neste documento:

- sitemap da V1;
- navegação principal curta;
- Home como experiência central;
- páginas individuais de serviço;
- arquitetura de Work e navegação contínua entre projetos;
- processo comercial em linguagem simples;
- microbriefing em três etapas;
- persistência das respostas durante a sessão;
- registro interno do lead antes da tentativa de abrir o WhatsApp;
- backoffice mínimo para leads, Journal e categorias;
- status simples de lead: Novo, Contatado, Convertido e Arquivado;
- estrutura inicial do FLUOR JOURNAL;
- ausência de busca e filtros avançados na V1;
- uso de Joinville e Curitiba apenas como estratégia orgânica, não como posicionamento visível da marca;
- ausência de página Sobre na V1;
- páginas legais no footer;
- tratamento inline de erros;
- menu mobile amplo e editorial;
- continuidade visual entre páginas.

O próximo documento será:

`05_SEO_Performance_e_Otimizacao.md`

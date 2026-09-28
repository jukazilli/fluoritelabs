export interface ServiceItem {
  slug: string;
  num: string;
  title: string;
  badge: string;
  summary: string;
  headline: string;
  problemContext: {
    title: string;
    description: string;
    frictionPoints: string[];
  };
  expectedResult: {
    title: string;
    description: string;
    outcomes: string[];
  };
  howWeBuild: {
    title: string;
    description: string;
    pillars: { title: string; desc: string }[];
  };
  relatedWorkSlug: string;
  relatedWorkTitle: string;
  seoTitle: string;
  seoDescription: string;
}

export const CANONICAL_SERVICES: Record<string, ServiceItem> = {
  "site-institucional": {
    slug: "site-institucional",
    num: "01",
    title: "Site institucional",
    badge: "Presença & Autoridade",
    summary:
      "Posicione sua marca com autoridade inquestionável, arquitetura moderna e experiência imersiva que gera confiança imediata e capta oportunidades comerciais de alto valor.",
    headline: "A principal porta de entrada da sua empresa não pode parecer um modelo genérico.",
    problemContext: {
      title: "O problema dos sites institucionais comuns",
      description:
        "Muitas empresas investem anos desenvolvendo produtos e serviços extraordinários, mas apresentam sua marca ao mundo através de templates lentos, inflados com scripts desnecessários e cópias clichês que soam vazias. O visitante nota o descompasso em menos de três segundos.",
      frictionPoints: [
        "Templates pré-fabricados com centenas de dependências ocultas e lentidão.",
        "Ausência de identidade autêntica e sensação de produto amador.",
        "Estrutura confusa que não guia o visitante a uma decisão clara.",
      ],
    },
    expectedResult: {
      title: "O impacto de um anfitrião digital de excelência",
      description:
        "Construímos sites institucionais que funcionam como o melhor anfitrião da sua empresa. Cada detalhe — do contraste tipográfico à velocidade instantânea de carregamento — transmite solidez inegável e qualifica o visitante logo no primeiro contato.",
      outcomes: [
        "Percepção imediata de sofisticação e solidez corporativa.",
        "Carregamento sub-100ms via arquitetura global Cloudflare Edge.",
        "Redução do ciclo de venda para clientes high-ticket.",
      ],
    },
    howWeBuild: {
      title: "Como pensamos essa experiência",
      description:
        "Unimos rigor técnico de engenharia de software com sensibilidade editorial minimalista. Sem carrosséis genéricos, sem efeitos invasivos, apenas comunicação cristalina e tipografia imersiva.",
      pillars: [
        {
          title: "Arquitetura Monolítica Limpa",
          desc: "React Router SSR sem dependências desnecessárias, entregando HTML puro e sem atritos ao navegador.",
        },
        {
          title: "Estética Dark Luxury Tech",
          desc: "Fundos de obsidiana profunda, iluminação refratada inspirada em cristais de fluorita e espaçamento generoso.",
        },
        {
          title: "Acessibilidade Universal",
          desc: "Navegação completa por teclado, contraste rigoroso e conformidade integral com normas WCAG.",
        },
      ],
    },
    relatedWorkSlug: "aethel-architecture",
    relatedWorkTitle: "Aethel Architecture Studio",
    seoTitle: "Criação de Site Institucional de Alta Performance | Fluorite Labs",
    seoDescription:
      "Desenvolvimento de sites institucionais com arquitetura moderna, design editorial de precisão e performance extrema para marcas exigentes.",
  },

  "landing-page": {
    slug: "landing-page",
    num: "02",
    title: "Landing page",
    badge: "Conversão Direta",
    summary:
      "Página cirurgicamente focada em uma campanha ou objetivo específico de conversão, combinando velocidade de carregamento, persuasão visual e ausência de ruído.",
    headline: "Uma única mensagem. Uma ação evidente. Sem ruídos ou distrações dispersivas.",
    problemContext: {
      title: "Por que tantas landing pages falham em converter",
      description:
        "Páginas de captura comuns costumam recorrer a táticas agressivas e gatilhos artificiais que geram desconfiança. Além disso, o excesso de scripts de tracking externos destrói a performance no celular, fazendo o cliente abandonar a página antes mesmo de vê-la.",
      frictionPoints: [
        "Carregamento lento que perde até 40% do tráfego pago na abertura.",
        "Aparência duvidosa com pop-ups invasivos e contadores regressivos falsos.",
        "Falta de coerência estética com a promessa do anúncio.",
      ],
    },
    expectedResult: {
      title: "Conversão refinada por clareza e velocidade",
      description:
        "Projetamos landing pages com foco total na clareza da proposta de valor e eliminação de fricção cognitiva. O usuário entende instantaneamente o diferencial, se sente respeitado e avança com convicção.",
      outcomes: [
        "Tempo de renderização quase instantâneo em redes 4G/5G.",
        "Aumento expressivo na taxa de conversão qualificada.",
        "Integração contínua e segura com captura direta no WhatsApp.",
      ],
    },
    howWeBuild: {
      title: "Engenharia orientada à conversão",
      description:
        "Cada milissegundo e cada linha de texto são balanceados. Não inventamos prova social nem apelamos para truques visuais que enfraquecem o posicionamento da sua marca.",
      pillars: [
        {
          title: "Foco Cirúrgico na Decisão",
          desc: "Hierarquia visual linear que conduz os olhos do visitante direto à ação pretendida.",
        },
        {
          title: "Telemetria e Privacidade",
          desc: "Métricas de conversão canônicas respeitando integralmente a LGPD e a privacidade do usuário.",
        },
        {
          title: "Microbriefing Integrado",
          desc: "Captura qualificada em 3 passos com handoff direto ao WhatsApp sem perder o lead.",
        },
      ],
    },
    relatedWorkSlug: "lumena-health",
    relatedWorkTitle: "Lumena Integrative Health",
    seoTitle: "Criação de Landing Pages de Alta Conversão | Fluorite Labs",
    seoDescription:
      "Landing pages de alta performance, velocidade sub-100ms e design editorial concebidas para transformar visitantes em oportunidades comerciais reais.",
  },

  "pagina-de-produto": {
    slug: "pagina-de-produto",
    num: "03",
    title: "Página de produto ou serviço",
    badge: "Aprofundamento",
    summary:
      "Apresentação envolvente e detalhada de ofertas de alta complexidade, traduzindo diferenciais técnicos em valor tangível para o cliente.",
    headline: "Traduza diferenciais técnicos sofisticados em valor comercial tangível.",
    problemContext: {
      title: "A barreira de comunicação em produtos complexos",
      description:
        "Soluções de engenharia, software corporativo, saúde avançada ou serviços especializados muitas vezes tropeçam na hora de comunicar seu valor. O cliente final não quer ler manuais técnicos áridos nem slogans vazios de marketing.",
      frictionPoints: [
        "Textos longos e maçantes que dispersam a atenção do decisor.",
        "Impossibilidade de visualizar o funcionamento prático da solução.",
        "Falta de conexão entre capacidade técnica e benefício financeiro ou operacional.",
      ],
    },
    expectedResult: {
      title: "Clareza que acelera o entendimento e a compra",
      description:
        "Criamos páginas dedicadas que estruturam a narrativa do produto como uma jornada de descoberta: do problema crítico às evidências visuais de execução e aos diferenciais exclusivos.",
      outcomes: [
        "Decisores entendem a proposta de valor sem demandar reuniões explicativas preliminares.",
        "Demonstração visual do produto com gráficos e diagramas refinados.",
        "Qualificação espontânea dos clientes que realmente possuem fit.",
      ],
    },
    howWeBuild: {
      title: "Arquitetura de informação aprofundada",
      description:
        "Construímos a narrativa do produto com seções modulares de alta densidade informativa, balanceadas por espaço negativo amplo e tipografia fluida.",
      pillars: [
        {
          title: "Storytelling Estruturado",
          desc: "Abertura, caso de uso, anatomia técnica, diferenciais e integração em uma só leitura fluida.",
        },
        {
          title: "Visual Telemetry & Assets",
          desc: "Imagens WebP ultraleves e diagramas que ilustram a entrega técnica com fidelidade estética.",
        },
        {
          title: "Respostas às Objeções Críticas",
          desc: "Abordagem antecipada de segurança, escalabilidade, suporte e integração sem criar FAQs quilométricas.",
        },
      ],
    },
    relatedWorkSlug: "vektor-robotics",
    relatedWorkTitle: "Vektor Precision Robotics",
    seoTitle: "Páginas de Produto & Soluções Especializadas | Fluorite Labs",
    seoDescription:
      "Apresente seus produtos e serviços de alta complexidade com clareza incomparável, design editorial e autoridade técnica comprovada.",
  },

  seo: {
    slug: "seo",
    num: "04",
    title: "SEO",
    badge: "Relevância Técnica",
    summary:
      "Otimização técnica aprofundada, dados estruturados JSON-LD, Core Web Vitals impecáveis e arquitetura de conteúdo para indexação e relevância orgânica consistente.",
    headline:
      "Visibilidade orgânica conquistada por mérito de engenharia e autoridade de conteúdo.",
    problemContext: {
      title: "O mito do SEO superficial e táticas ultrapassadas",
      description:
        "O mercado está saturado de 'otimizações' mágicas que consistem em encher páginas de palavras-chave repetitivas e criar backlinks artificiais. Hoje os mecanismos de busca priorizam experiência real, velocidade, semântica e conteúdo genuinamente útil.",
      frictionPoints: [
        "Sites penalizados por práticas agressivas ou código semântico incorreto.",
        "Métricas de Core Web Vitals desastrosas causadas por frameworks pesados.",
        "Conteúdo duplicado ou sem hierarquia lógica de cabeçalhos e metadados.",
      ],
    },
    expectedResult: {
      title: "Autoridade técnica e relevância sustentável",
      description:
        "Estruturamos seu projeto para ser a melhor resposta técnica para as buscas do seu setor. Sem atalhos, com semântica perfeita, dados estruturados Schema.org e performance que o Google ama indexar.",
      outcomes: [
        "Scores máximos em Core Web Vitals (LCP, INP, CLS).",
        "Indexação completa com Rich Snippets e dados Schema.org estruturados.",
        "Crescimento orgânico sustentável de clientes que buscam exatamente o que você oferece.",
      ],
    },
    howWeBuild: {
      title: "Nossos pilares de SEO de precisão",
      description:
        "SEO não é um plugin que se ativa no final. É um pilar fundamental da arquitetura desde a primeira linha de código.",
      pillars: [
        {
          title: "HTML5 Semântico Estrito",
          desc: "Uso correto de tags semânticas, um único h1 por página e hierarquia lógica impecável.",
        },
        {
          title: "Core Web Vitals Impecáveis",
          desc: "Zero layout shifts, sub-100ms LCP e interatividade instantânea com edge server-side rendering.",
        },
        {
          title: "Schema.org & Metadados Vivos",
          desc: "JSON-LD enriquecido com informações da organização, serviços, breadcrumbs e artigos editoriais.",
        },
      ],
    },
    relatedWorkSlug: "aethel-architecture",
    relatedWorkTitle: "Aethel Architecture Studio",
    seoTitle: "SEO Técnico & Performance Web de Elite | Fluorite Labs",
    seoDescription:
      "Otimização técnica aprofundada para mecanismos de busca, Core Web Vitals perfeitos e arquitetura de conteúdo semântica.",
  },
};

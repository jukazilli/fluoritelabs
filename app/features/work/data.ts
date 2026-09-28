export interface WorkCase {
  slug: string;
  num: string;
  title: string;
  category: string;
  year: string;
  badge: "CONCEITO";
  summary: string;
  headline: string;
  clientContext: {
    overview: string;
    challenge: string;
  };
  designConcept: {
    philosophy: string;
    visualDirection: string;
    palette: { name: string; hex: string; role: string }[];
  };
  engineeringDetails: {
    techStack: string[];
    performanceHighlights: string[];
  };
  image: string;
  demoUrl?: string;
  nextSlug: string;
  nextTitle: string;
  seoTitle: string;
  seoDescription: string;
}

export const CANONICAL_WORK_CASES: Record<string, WorkCase> = {
  "aethel-architecture": {
    slug: "aethel-architecture",
    num: "01",
    title: "Aethel Architecture Studio",
    category: "Arquitetura & Design Espacial",
    year: "2026",
    badge: "CONCEITO",
    summary:
      "Posicionamento monolítico e experiência editorial imersiva para prática de arquitetura contemporânea e engenharia de precisão.",
    headline: "Monolitismo, espaço negativo e luz refratada em uma presença digital inconfundível.",
    clientContext: {
      overview:
        "O Aethel Architecture Studio é um conceito de escritório de arquitetura de alta sofisticação que atende clientes institucionais e residenciais de alto padrão no Brasil e no exterior.",
      challenge:
        "O desafio era afastar o estúdio dos portfólios padronizados em carrosséis com fundos brancos sem alma. Era essencial que o próprio site fosse uma obra arquitetônica: proporções harmoniosas, ritmo visual pausado e impacto estético monolítico.",
    },
    designConcept: {
      philosophy:
        "Tratamos cada viewport como um cômodo escultural. A tipografia display dialoga diretamente com as fotografias monumentais de concreto aparente e vidro estrutural.",
      visualDirection:
        "Fotografia de alta escala em formato 16:9 e 3:2, tipografia serifada contemporânea para títulos e sans-serif geométrica para anotações técnicas de planta e projeto.",
      palette: [
        { name: "Obsidian Deep", hex: "#08090a", role: "Fundo estrutural e contraste" },
        { name: "Raw Concrete", hex: "#8c8e96", role: "Tipografia de apoio e cotas" },
        { name: "Nordic Soft Light", hex: "#f5f5f7", role: "Títulos principais e destaque" },
      ],
    },
    engineeringDetails: {
      techStack: [
        "React Router SSR no Cloudflare Workers",
        "Imagens WebP responsivas de alta resolução",
        "Transições CSS puras sem JavaScript pesado",
        "Semântica HTML5 estrita e sem layout shifts (CLS = 0.0)",
      ],
      performanceHighlights: [
        "First Contentful Paint: 0.28s",
        "Largest Contentful Paint: 0.62s",
        "Zero dependências externas de analytics invasivo",
      ],
    },
    image: "/images/work-aethel.webp",
    nextSlug: "lumena-health",
    nextTitle: "Lumena Integrative Health",
    seoTitle: "Aethel Architecture Studio — Estudo de Caso | Fluorite Labs",
    seoDescription:
      "Estudo conceitual de presença digital para escritório de arquitetura contemporânea com design monolítico e engenharia de precisão.",
  },

  "lumena-health": {
    slug: "lumena-health",
    num: "02",
    title: "Lumena Integrative Health",
    category: "Saúde & Biotecnologia",
    year: "2026",
    badge: "CONCEITO",
    summary:
      "Interface acolhedora com refração fluida, transmitindo rigor clínico e tranquilidade para medicina diagnóstica de alta complexidade.",
    headline:
      "Acolhimento humano e rigor biotecnológico expressos através da luz e da fluidez digital.",
    clientContext: {
      overview:
        "A Lumena Integrative Health é um conceito de clínica de medicina diagnóstica preventiva e genômica personalizada voltada para longevidade e bem-estar integral.",
      challenge:
        "A maioria dos sites de clínicas oscila entre o frio asséptico dos hospitais tradicionais e a artificialidade das clínicas de estética populares. A Lumena precisava transmitir autoridade científica inquestionável combinada com serenidade profunda e acolhimento.",
    },
    designConcept: {
      philosophy:
        "Inspiramo-nos na refração da luz em prismas naturais: a luz que revela clareza diagnóstica. Tons sutis de lilás e ciano transmitem calma sem perder a seriedade médica.",
      visualDirection:
        "Composição ampla, espaçamento generoso, micro-interações serenas e ausência total de jargões clínicos alarmistas ou formulários burocráticos.",
      palette: [
        { name: "Deep Amethyst", hex: "#0b0c10", role: "Ambiente e serenidade" },
        { name: "Fluorite Lilac", hex: "#c4b5fd", role: "Destaques sutis e halos" },
        { name: "Crystal Cyan", hex: "#67e8f9", role: "Indicadores de dados e telemetria" },
      ],
    },
    engineeringDetails: {
      techStack: [
        "Arquitetura Edge com carregamento instantâneo",
        "Agendamento direto integrado com validação segura",
        "Contrastes em total conformidade WCAG AAA",
        "Privacidade nativa (LGPD) sem envio de PII a terceiros",
      ],
      performanceHighlights: [
        "Tempo de resposta do primeiro byte: 24ms",
        "Acessibilidade por teclado completa (100/100)",
        "Tamanho total da página otimizado para < 180KB",
      ],
    },
    image: "/images/work-lumena.webp",
    nextSlug: "vektor-robotics",
    nextTitle: "Vektor Precision Robotics",
    seoTitle: "Lumena Integrative Health — Estudo de Caso | Fluorite Labs",
    seoDescription:
      "Estudo conceitual para clínica de medicina integrativa e diagnóstica combinando rigor científico, design acolhedor e performance extrema.",
  },

  "vektor-robotics": {
    slug: "vektor-robotics",
    num: "03",
    title: "Vektor Precision Robotics",
    category: "Robótica & Indústria B2B",
    year: "2026",
    badge: "CONCEITO",
    summary:
      "Autoridade técnica inquestionável e telemetria visual precisa para fabricante líder em atuadores robóticos industriais.",
    headline: "Engenharia pura, telemetria em tempo real e autoridade industrial inegável.",
    clientContext: {
      overview:
        "A Vektor Precision Robotics é um conceito de indústria de tecnologia avançada especializada em sistemas de posicionamento mecatrônico e atuadores robóticos para montadoras e plantas aeroespaciais.",
      challenge:
        "Vendas B2B industriais possuem ciclos longos e envolvem engenheiros e diretores de operações extremamente céticos. O site precisava comprovar tolerâncias micrométricas e confiabilidade técnica sem parecer um mero catálogo em PDF disfarçado de site.",
    },
    designConcept: {
      philosophy:
        "Precisão milimétrica em cada elemento: grades estruturais finas, tipografia monoespaçada calibrada e diagramas explicativos que respeitam a inteligência do engenheiro comprador.",
      visualDirection:
        "Estética industrial de luxo: escuro metálico, linhas guias nítidas em 1px, tabelas de especificações condensadas e renderizações 3D de alta fidelidade dos componentes mecânicos.",
      palette: [
        { name: "Titanium Black", hex: "#060709", role: "Chassi estrutural da interface" },
        { name: "Technical Steel", hex: "#71717a", role: "Linhas de grade e telemetria" },
        {
          name: "Electric Amber",
          hex: "#f59e0b",
          role: "Status operacional e alertas de precisão",
        },
      ],
    },
    engineeringDetails: {
      techStack: [
        "Tabelas de tolerância e telemetria sem dependências externas",
        "Renderização otimizada com WebP e SVG vetoriais puros",
        "Calculadora de ROI e especificação de atuadores em tempo real",
        "CDN global Cloudflare para resposta uniforme em qualquer continente",
      ],
      performanceHighlights: [
        "Interação para Próxima Pintura (INP): < 15ms",
        "Indexação completa de especificações no Google Scholar e Search",
        "Consumo de dados mobile 80% menor que média do setor",
      ],
    },
    image: "/images/work-vektor.webp",
    nextSlug: "vertice-materiais",
    nextTitle: "Vértice Materiais & Acabamentos",
    seoTitle: "Vektor Precision Robotics — Estudo de Caso | Fluorite Labs",
    seoDescription:
      "Estudo conceitual para fabricante de sistemas mecatrônicos industriais com visual telemetry, autoridade técnica e performance de elite.",
  },

  "vertice-materiais": {
    slug: "vertice-materiais",
    num: "04",
    title: "Vértice Materiais & Acabamentos",
    category: "Materiais de Construção & Varejo Técnico",
    year: "2026",
    badge: "CONCEITO",
    summary:
      "Catálogo de alta velocidade para 30.000+ SKUs com carrinho de cotação direta e handoff estruturado para WhatsApp comercial.",
    headline:
      "Busca instantânea em 30 mil itens, cotação por volume sem atrito e fechamento direto no WhatsApp.",
    clientContext: {
      overview:
        "A Vértice é um conceito de distribuidora e home center técnico de materiais de construção, elétricos, hidráulicos e acabamentos com catálogo de milhares de produtos para construtoras, empreiteiros e consumidor final.",
      challenge:
        "Lojas de materiais de construção perdem centenas de horas em balcão e WhatsApp respondendo cotações manuais. E-commerces tradicionais com checkout por cartão falham no setor da construção, onde preços dependem de volume, frete por caminhão e faturamento faturado para obra. A Vértice precisava de uma ferramenta rápida onde o cliente monta sua lista completa com SKUs e a envia pronta ao vendedor.",
    },
    designConcept: {
      philosophy:
        "Densidade técnica com clareza brutalista: tipografia monoespaçada para códigos de produto, contraste de alta visibilidade em obra sob sol forte e navegação por etapas de construção.",
      visualDirection:
        "Estética técnica inspirada em pranchetas de engenharia: fundo obsidiana profunda, acentos em verde esmeralda para disponibilidade de estoque e cards com informações dimensionais completas.",
      palette: [
        { name: "Basalt Obsidian", hex: "#07080a", role: "Fundo estrutural e contraste" },
        { name: "Emerald Signal", hex: "#10b981", role: "Indicadores de estoque e cotação" },
        { name: "Technical Gray", hex: "#94a3b8", role: "Especificações e códigos SKU" },
      ],
    },
    engineeringDetails: {
      techStack: [
        "Indexação em memória de catálogo com busca instantânea (< 25ms)",
        "Suporte a ingestão de planilhas ERP (Excel/CSV) em lote assíncrono",
        "Carrinho client-side com persistência local sem necessidade de login prévio",
        "Formatador inteligente de mensagens para API do WhatsApp com SKUs e quantidades",
      ],
      performanceHighlights: [
        "Filtragem instantânea de milhares de itens no celular sem travamentos",
        "Tamanho do payload inicial de catálogo: < 45KB comprimido",
        "Aumento estimado de 3.2x na conversão de cotações em relação a formulários tradicionais",
      ],
    },
    image: "/images/work-vertice.webp",
    demoUrl: "/demo/materiais-construcao",
    nextSlug: "aethel-architecture",
    nextTitle: "Aethel Architecture Studio",
    seoTitle: "Vértice Materiais & Acabamentos — Estudo de Caso & Demonstração | Fluorite Labs",
    seoDescription:
      "Catálogo de alta velocidade para materiais de construção com suporte a 30.000 SKUs, busca instantânea e cotação direta para WhatsApp.",
  },
};

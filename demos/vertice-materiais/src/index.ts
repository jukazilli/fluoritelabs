// demos/vertice-materiais/src/index.ts

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Serve robots.txt
    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nAllow: /\n", {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Serve HTML
    const html = getHtml();
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};

function getHtml(): string {
  return `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vértice Materiais & Engenharia — Catálogo B2B & Cotação Direta</title>
  <meta name="description" content="Distribuidora de materiais de construção, elétricos, hidráulicos e acabamentos. Catálogo técnico com cotação direta para o WhatsApp.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #07080a;
      --bg-card: #0d0f14;
      --bg-card-hover: #12151d;
      --border-color: rgba(255, 255, 255, 0.1);
      --border-accent: rgba(16, 185, 129, 0.4);
      --emerald: #10b981;
      --emerald-dark: #059669;
      --text-white: #f8fafc;
      --text-muted: #94a3b8;
      --font-display: 'Outfit', sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-dark);
      color: var(--text-white);
      font-family: var(--font-body);
      min-height: 100vh;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .font-display { font-family: var(--font-display); }
    .font-mono { font-family: var(--font-mono); }
    
    /* Layout */
    .container {
      max-width: 1360px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    /* Navbar */
    header {
      background: rgba(7, 8, 10, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
    }
    .logo-badge {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #10b981, #047857);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: black;
      font-size: 1.1rem;
    }
    .logo-text {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: 0.08em;
    }
    .logo-sub {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--emerald);
      letter-spacing: 0.2em;
    }
    
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .btn {
      padding: 0.6rem 1.2rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }
    .btn-cart {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border-color);
      color: var(--text-white);
    }
    .btn-cart:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .cart-badge {
      background: var(--emerald);
      color: black;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.7rem;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
    }
    .btn-sim {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--emerald);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }
    .btn-sim:hover {
      background: rgba(16, 185, 129, 0.2);
    }

    /* Hero */
    .hero {
      padding: 4rem 0 3rem;
      border-bottom: 1px solid var(--border-color);
      background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.06) 0%, transparent 60%);
    }
    .hero-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      color: var(--emerald);
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .hero-title {
      font-family: var(--font-display);
      font-size: 2.75rem;
      font-weight: 600;
      line-height: 1.15;
      letter-spacing: -0.02em;
      max-width: 820px;
      margin-bottom: 1rem;
    }
    .hero-desc {
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 720px;
      margin-bottom: 2rem;
      font-weight: 300;
    }

    /* Search & Categories */
    .search-box {
      position: relative;
      margin-bottom: 1.5rem;
    }
    .search-input {
      width: 100%;
      background: #0f1218;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 1.1rem 1.4rem;
      font-size: 0.95rem;
      color: var(--text-white);
      outline: none;
      transition: all 0.2s;
    }
    .search-input:focus {
      border-color: var(--emerald);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    }
    .categories {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding-bottom: 0.75rem;
      scrollbar-width: none;
    }
    .cat-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }
    .cat-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-white);
    }
    .cat-btn.active {
      background: var(--emerald);
      color: black;
      font-weight: 600;
      border-color: var(--emerald);
    }

    /* Product Grid */
    .catalog-section {
      padding: 3rem 0 6rem;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s;
    }
    .card:hover {
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      background: var(--bg-card-hover);
    }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .card-category {
      background: rgba(255, 255, 255, 0.06);
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      color: var(--text-muted);
    }
    .card-sku {
      color: var(--emerald);
      font-weight: 600;
    }
    .card-brand {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
    }
    .card-name {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.35;
      margin-bottom: 0.5rem;
    }
    .card-specs {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 1.5rem;
      font-weight: 300;
    }
    .card-bottom {
      border-top: 1px solid var(--border-color);
      padding-top: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .price-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      font-family: var(--font-mono);
    }
    .price-label { font-size: 0.75rem; color: var(--text-muted); }
    .price-value { font-size: 1.15rem; font-weight: 700; color: var(--text-white); }
    .price-unit { font-size: 0.75rem; color: var(--text-muted); margin-left: 0.25rem; }

    .action-row {
      display: flex;
      gap: 0.5rem;
    }
    .qty-controls {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 0.2rem 0.5rem;
    }
    .qty-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1rem;
      width: 24px;
      height: 28px;
    }
    .qty-btn:hover { color: white; }
    .qty-input {
      width: 44px;
      background: transparent;
      border: none;
      color: white;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      outline: none;
    }
    .btn-add {
      flex: 1;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--border-color);
      color: white;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-add:hover {
      background: var(--emerald);
      color: black;
      font-weight: 600;
      border-color: var(--emerald);
    }

    /* Floating Cart Indicator */
    .floating-bar {
      position: fixed;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(18, 21, 29, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 18px;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
      z-index: 40;
    }
    .floating-info {
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }
    .btn-checkout {
      background: var(--emerald);
      color: black;
      font-weight: 600;
      padding: 0.6rem 1.25rem;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .btn-checkout:hover {
      background: #34d399;
    }

    /* Modal / Drawer */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .modal-overlay.active { display: flex; }
    .modal-content {
      background: #0d1016;
      border: 1px solid var(--border-color);
      border-radius: 20px;
      width: 100%;
      max-width: 580px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-title { font-family: var(--font-display); font-size: 1.25rem; }
    .close-btn { background: none; border: none; color: var(--text-muted); font-size: 1.25rem; cursor: pointer; }
    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }
    .modal-footer {
      padding: 1.25rem 1.5rem;
      border-top: 1px solid var(--border-color);
      background: #090b10;
    }

    .form-group { margin-bottom: 1rem; }
    .form-label { display: block; font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 0.4rem; }
    .form-control {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 0.75rem 1rem;
      color: white;
      font-size: 0.85rem;
      outline: none;
    }
    .form-control:focus { border-color: var(--emerald); }

    .btn-whatsapp {
      width: 100%;
      background: #25D366;
      color: black;
      border: none;
      padding: 1rem;
      border-radius: 14px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    .btn-whatsapp:hover { background: #20ba5a; }

    /* Footer */
    footer {
      border-top: 1px solid var(--border-color);
      background: #040507;
      padding: 4rem 0 2rem;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    .footer-inner {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .footer-top {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    @media(min-width: 768px) {
      .footer-top {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
    .footer-sub {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 0.75rem;
      font-family: var(--font-mono);
    }
    @media(min-width: 768px) {
      .footer-sub {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
    .footer-sub a { color: var(--emerald); text-decoration: none; }
    .footer-sub a:hover { text-decoration: underline; }
  </style>
</head>
<body>

  <!-- Top Navbar -->
  <header>
    <div class="container nav-inner">
      <a href="/" class="logo">
        <div class="logo-badge">V</div>
        <div>
          <div class="logo-text">VÉRTICE</div>
          <div class="logo-sub">MATERIAIS & ENGENHARIA</div>
        </div>
      </a>

      <div class="nav-actions">
        <button type="button" class="btn btn-sim" onclick="openImportModal()">
          <span>📊</span>
          <span>Importar Planilha (30k SKUs)</span>
        </button>

        <button type="button" class="btn btn-cart" onclick="openCartModal()">
          <span>📋 Cesta</span>
          <span class="cart-badge" id="cart-count">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="hero">
    <div class="container">
      <div class="hero-tag">
        <span>● DISTRIBUIDORA B2B DE ALTA PERFORMANCE</span>
        <span>•</span>
        <span>ENTREGAS EM SÃO PAULO E REGIÃO</span>
      </div>
      <h1 class="hero-title">Materiais de Construção com Cotação Direta no WhatsApp</h1>
      <p class="hero-desc">
        Selecione cimentos, aços, tubos e acabamentos para sua obra. Monte sua lista e receba o orçamento formalizado com prazos de entrega e condições de faturamento direto no WhatsApp do vendedor.
      </p>

      <!-- Search & Filters -->
      <div class="search-box">
        <input 
          type="text" 
          id="search-input" 
          class="search-input" 
          placeholder="Busque por produto, código SKU ou marca (ex: Votoran, Tigre, 25mm, AC-III, Deca)..."
          oninput="handleSearch(this.value)"
        >
      </div>

      <div class="categories" id="categories-container">
        <!-- Rendered via JS -->
      </div>
    </div>
  </section>

  <!-- Products Section -->
  <main class="catalog-section container">
    <div class="section-header">
      <span id="results-count">Exibindo catálogo técnico homologado</span>
      <span>ATUALIZAÇÃO EM TEMPO REAL</span>
    </div>

    <div class="grid" id="products-grid">
      <!-- Rendered via JS -->
    </div>
  </main>

  <!-- Floating Cart Bar -->
  <div class="floating-bar" id="floating-bar" style="display: none;">
    <div class="floating-info">
      <div style="color: var(--emerald); font-weight: 600;" id="floating-items-text">0 itens na cesta</div>
      <div style="font-weight: 700; color: white;" id="floating-total-text">Subtotal Ref: R$ 0,00</div>
    </div>
    <button type="button" class="btn-checkout" onclick="openCartModal()">Revisar & Gerar WhatsApp →</button>
  </div>

  <!-- Cart Modal -->
  <div class="modal-overlay" id="cart-modal">
    <div class="modal-content">
      <div class="modal-header">
        <div>
          <div class="modal-title">Cesta de Cotação</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);" id="cart-modal-subtitle">0 itens selecionados</div>
        </div>
        <button type="button" class="close-btn" onclick="closeCartModal()">✕</button>
      </div>

      <div class="modal-body">
        <div id="cart-items-list" style="margin-bottom: 1.5rem;">
          <!-- Rendered via JS -->
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--emerald); margin-bottom: 0.75rem;">
            DADOS DE ENTREGA & FATURAMENTO
          </div>
          <div class="form-group">
            <label class="form-label">NOME OU RAZÃO SOCIAL</label>
            <input type="text" id="client-name" class="form-control" placeholder="Ex: Construtora Alfa / Eng. Marcos">
          </div>
          <div class="form-group">
            <label class="form-label">BAIRRO E CIDADE DE ENTREGA</label>
            <input type="text" id="client-location" class="form-control" placeholder="Ex: Cambuí, Campinas - SP">
          </div>
          <div class="form-group">
            <label class="form-label">CONDIÇÕES DE FATURAMENTO / OBSERVAÇÕES</label>
            <input type="text" id="client-notes" class="form-control" placeholder="Ex: Faturamento 28 dias, entrega em caminhão basculante...">
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem; font-family: var(--font-mono);">
          <span style="font-size: 0.8rem; color: var(--text-muted);">Total de Referência:</span>
          <span style="font-size: 1.25rem; font-weight: 700; color: white;" id="modal-total-text">R$ 0,00</span>
        </div>
        <button type="button" class="btn-whatsapp" onclick="sendWhatsAppQuote()">
          <span>💬 Enviar Cotação para o WhatsApp</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Planilha Import Simulator Modal -->
  <div class="modal-overlay" id="import-modal">
    <div class="modal-content">
      <div class="modal-header">
        <div>
          <div class="modal-title">Simulador de Ingestão de Planilha (ERP)</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">Arquitetura de Borda para 30.000+ SKUs</div>
        </div>
        <button type="button" class="close-btn" onclick="closeImportModal()">✕</button>
      </div>

      <div class="modal-body">
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.6;">
          Lojas e distribuidoras de materiais possuem catálogos extensos em sistemas de gestão (Totvs, Sankhya, Cigam). Em vez de cadastros manuais, nossa arquitetura processa arquivos CSV em lote e indexa os dados na borda da Cloudflare em milissegundos.
        </p>

        <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.75rem 1rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">
          <span style="color: var(--emerald); font-weight: 600;">Colunas Mapeadas:</span> SKU, Descrição, Marca, Categoria, Unidade, Preço Base, Estoque.
        </div>

        <div style="background: rgba(255, 255, 255, 0.05); border-radius: 999px; height: 10px; overflow: hidden; margin-bottom: 0.5rem;">
          <div id="import-bar" style="background: var(--emerald); height: 100%; width: 0%; transition: width 0.1s linear;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">
          <span id="import-status">Pronto para teste de ingestão</span>
          <span id="import-stats">0 / 30.480 SKUs</span>
        </div>

        <div id="import-success" style="display: none; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; padding: 0.75rem 1rem; color: var(--emerald); font-size: 0.8rem; font-family: var(--font-mono);">
          ✓ 30.480 SKUs sincronizados com sucesso na Edge CDN em 1.14s!
        </div>
      </div>

      <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button type="button" class="btn" style="background: rgba(255, 255, 255, 0.08); color: white;" onclick="closeImportModal()">Fechar</button>
        <button type="button" id="btn-start-import" class="btn" style="background: var(--emerald); color: black; font-weight: 600;" onclick="startImportSimulation()">Iniciar Simulação</button>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <div class="container footer-inner">
      <div class="footer-top">
        <div>
          <div style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: white;">VÉRTICE MATERIAIS & ENGENHARIA LTDA</div>
          <p style="margin-top: 0.5rem; max-width: 480px; font-size: 0.85rem;">
            Depósito Central & Logística B2B. Atendimento exclusivo para construtoras, engenharias e profissionais da construção civil com faturamento faturado.
          </p>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.8rem;">
          <div>📍 Rodovia Santos Dumont, km 68 — Campinas/SP</div>
          <div style="margin-top: 0.25rem;">📞 Televendas / WhatsApp: (19) 3880-9000</div>
          <div style="margin-top: 0.25rem;">⏰ Seg a Sex: 07h às 18h | Sáb: 07h às 12h</div>
        </div>
      </div>

      <div class="footer-sub">
        <span>© 2026 Vértice Materiais. Todos os direitos reservados.</span>
        <span>
          ⚡ Arquitetura digital e catálogo B2B de alta performance desenvolvido por 
          <a href="https://fluoritelabs.seekin-web.workers.dev" target="_blank" rel="noopener">Fluorite Labs</a>
        </span>
      </div>
    </div>
  </footer>

  <!-- Catalog Data & Logic -->
  <script>
    const CATALOG = [
      { id: "mat-001", sku: "ALV-1049", name: "Cimento Votoran Todas as Obras CP-II F 32 50kg", category: "Básico & Alvenaria", brand: "Votoran", unit: "saco 50kg", refPrice: 34.90, minQty: 10, specs: "Resistência 32 MPa, cura rápida, indicado para fundações e alvenaria estrutural." },
      { id: "mat-002", sku: "ALV-1082", name: "Argamassa AC-III Cinza Flexível 20kg Quartzolit", category: "Básico & Alvenaria", brand: "Quartzolit", unit: "saco 20kg", refPrice: 38.50, minQty: 5, specs: "Alta aderência para porcelanatos internos e externos até 120x120cm e fachadas." },
      { id: "mat-003", sku: "ALV-2103", name: "Vergalhão Aço CA-50 Nervurado 10mm (3/8\\") Barra 12m Gerdau", category: "Básico & Alvenaria", brand: "Gerdau", unit: "barra 12m", refPrice: 52.80, minQty: 5, specs: "Aço certificado NBR 7480, superfície nervurada para máxima aderência ao concreto." },
      { id: "mat-004", sku: "ALV-3015", name: "Tijolo Cerâmico 8 Furos 9x19x19cm (Milheiro)", category: "Básico & Alvenaria", brand: "Cerâmica Regional", unit: "milheiro", refPrice: 790.00, minQty: 1, specs: "Cerâmica vermelha cozida a 950°C, isolamento térmico e acústico superior." },
      { id: "mat-005", sku: "ALV-4050", name: "Cal Hidratada Itaú CH-I 20kg para Reboco", category: "Básico & Alvenaria", brand: "Itaú", unit: "saco 20kg", refPrice: 15.90, minQty: 10, specs: "Proporciona plasticidade extrema à massa de assentamento e reboco fino." },
      { id: "mat-006", sku: "ALV-5099", name: "Areia Média Lavada Rio (Metro Cúbico m³)", category: "Básico & Alvenaria", brand: "Areal Certificado", unit: "m³", refPrice: 145.00, minQty: 2, specs: "Granulometria 0,42 a 1,2mm, isenta de matéria orgânica e argila." },
      { id: "mat-007", sku: "HID-1025", name: "Tubo PVC Esgoto Série Normal 100mm (4\\") Barra 6m Tigre", category: "Tubos & Hidráulica", brand: "Tigre", unit: "barra 6m", refPrice: 68.90, minQty: 2, specs: "Norma NBR 5688, junta elástica soldável para condução de efluentes sanitários." },
      { id: "mat-008", sku: "HID-1050", name: "Tubo PVC Soldável Água Fria 25mm (3/4\\") Barra 6m Amanco", category: "Tubos & Hidráulica", brand: "Amanco", unit: "barra 6m", refPrice: 22.40, minQty: 4, specs: "Pressão nominal PN 750 kPa, conexões por solda fria com adesivo plástico." },
      { id: "mat-009", sku: "HID-2005", name: "Caixa d'Água Polietileno 1.000 Litros com Tampa Rosca Fortlev", category: "Tubos & Hidráulica", brand: "Fortlev", unit: "unidade", refPrice: 389.00, minQty: 1, specs: "Fechamento hermético 1/4 de volta, proteção UV e camada antibacteriana." },
      { id: "mat-010", sku: "HID-3040", name: "Registro de Gaveta 3/4\\" Bruto Docol Base com Canopla", category: "Tubos & Hidráulica", brand: "Docol", unit: "unidade", refPrice: 54.90, minQty: 1, specs: "Liga de cobre latão de alta durabilidade, passagem plena conforme NBR 15705." },
      { id: "mat-011", sku: "HID-4090", name: "Ralo Linear Oculto 70cm Tampa Inox 304 com Sifão Tigre", category: "Tubos & Hidráulica", brand: "Tigre", unit: "unidade", refPrice: 119.00, minQty: 1, specs: "Design invisível com encaixe do revestimento, retentor de odores." },
      { id: "mat-012", sku: "ELE-1025", name: "Cabo Flexível 2,5mm² 750V Rolo 100 Metros Sil Fios", category: "Elétrica & Infra", brand: "Sil Fios", unit: "rolo 100m", refPrice: 189.90, minQty: 1, specs: "Cobre eletrolítico 99.9%, isolamento PVC antichama BWF-B, Inmetro." },
      { id: "mat-013", sku: "ELE-2032", name: "Disjuntor Termomagnético Bipolar 32A Curva C Schneider", category: "Elétrica & Infra", brand: "Schneider", unit: "unidade", refPrice: 42.50, minQty: 2, specs: "Capacidade de interrupção 3kA / 220V, padrão DIN, proteção de sobrecarga." },
      { id: "mat-014", sku: "ELE-3012", name: "Quadro de Distribuição Embutir 12/16 Disjuntores Tigre", category: "Elétrica & Infra", brand: "Tigre", unit: "unidade", refPrice: 84.90, minQty: 1, specs: "Porta fumê reversível, barramento neutro e terra inclusos, padrão DIN." },
      { id: "mat-015", sku: "ELE-4050", name: "Eletroduto Corrugado Flexível 3/4\\" Rolo 50 Metros Krona", category: "Elétrica & Infra", brand: "Krona", unit: "rolo 50m", refPrice: 58.00, minQty: 1, specs: "Fabricado em PVC reciclado estabilizado, resistente ao esmagamento." },
      { id: "mat-016", sku: "PIS-8484", name: "Porcelanato Retificado Polido Bianco Covelano 84x84cm Portobello", category: "Pisos & Porcelanatos", brand: "Portobello", unit: "m²", refPrice: 129.90, minQty: 10, specs: "Borda retificada junta 1.5mm, acabamento super gloss espelhado." },
      { id: "mat-017", sku: "PIS-6012", name: "Porcelanato Acetinado Cimento Cinza Urbano 60x120cm Eliane", category: "Pisos & Porcelanatos", brand: "Eliane", unit: "m²", refPrice: 98.00, minQty: 10, specs: "Efeito cimento queimado, coeficiente de atrito resistente ao escorregamento." },
      { id: "mat-018", sku: "PIS-3001", name: "Rejunte Epóxi Bicomponente Antimofo Cinza 1kg Quartzolit", category: "Pisos & Porcelanatos", brand: "Quartzolit", unit: "pote 1kg", refPrice: 47.90, minQty: 2, specs: "100% impermeável, acabamento extra liso, não mancha nem acumula sujeira." },
      { id: "mat-019", sku: "TIN-1801", name: "Tinta Acrílica Fosca Premium Rende Muito Branco 18L Coral", category: "Tintas & Vedação", brand: "Coral", unit: "lata 18L", refPrice: 349.90, minQty: 1, specs: "Rendimento até 500m² por demão, baixo odor, ultra lavável e antimofo." },
      { id: "mat-020", sku: "TIN-2018", name: "Impermeabilizante Vedapren Branco Balde 18kg Vedacit", category: "Tintas & Vedação", brand: "Vedacit", unit: "balde 18kg", refPrice: 198.00, minQty: 1, specs: "Membrana elástica impermeabilizante para lajes expostas e calhas." },
      { id: "mat-021", sku: "TIN-3010", name: "Fita Asfáltica Autoadesiva Alumínio 20cm x 10m Sika MultiSeal", category: "Tintas & Vedação", brand: "Sika", unit: "rolo 10m", refPrice: 79.90, minQty: 1, specs: "Vedação imediata para trincas em telhas, rufos, dutos e calhas." },
      { id: "mat-022", sku: "FER-1001", name: "Colher de Pedreiro Forjada Canto Reto 8\\" Tramontina", category: "Ferramentas & EPIs", brand: "Tramontina", unit: "unidade", refPrice: 32.90, minQty: 1, specs: "Lâmina forjada em aço carbono especial, cabo de madeira envernizada." },
      { id: "mat-023", sku: "FER-2050", name: "Disco de Corte Diamantado Turbo 110mm Bosch para Porcelanato", category: "Ferramentas & EPIs", brand: "Bosch", unit: "unidade", refPrice: 39.90, minQty: 2, specs: "Corte seco e refrigerado, alta precisão sem lascar bordas de pisos." },
      { id: "mat-024", sku: "FER-3020", name: "Nível a Laser Autonivelante Linhas Cruzadas 15m Dewalt", category: "Ferramentas & EPIs", brand: "Dewalt", unit: "unidade", refPrice: 589.00, minQty: 1, specs: "Precisão +/- 0,3mm/m, alcance 15m, laser vermelho de alta visibilidade." }
    ];

    const CATEGORIES = ["Todas", "Básico & Alvenaria", "Tubos & Hidráulica", "Elétrica & Infra", "Pisos & Porcelanatos", "Tintas & Vedação", "Ferramentas & EPIs"];

    let selectedCategory = "Todas";
    let searchQuery = "";
    let cart = [];

    // Initialize Categories
    function initCategories() {
      const container = document.getElementById("categories-container");
      container.innerHTML = CATEGORIES.map(cat => 
        \`<button type="button" class="cat-btn \${cat === selectedCategory ? 'active' : ''}" onclick="selectCategory('\${cat}')">\${cat}</button>\`
      ).join("");
    }

    function selectCategory(cat) {
      selectedCategory = cat;
      initCategories();
      renderProducts();
    }

    function handleSearch(q) {
      searchQuery = q.toLowerCase().trim();
      renderProducts();
    }

    function renderProducts() {
      const grid = document.getElementById("products-grid");
      const filtered = CATALOG.filter(item => {
        const matchesCat = selectedCategory === "Todas" || item.category === selectedCategory;
        if (!searchQuery) return matchesCat;
        const matchesText = item.name.toLowerCase().includes(searchQuery) ||
                            item.sku.toLowerCase().includes(searchQuery) ||
                            item.brand.toLowerCase().includes(searchQuery) ||
                            item.specs.toLowerCase().includes(searchQuery);
        return matchesCat && matchesText;
      });

      document.getElementById("results-count").innerText = \`Exibindo \${filtered.length} materiais homologados\`;

      if (filtered.length === 0) {
        grid.innerHTML = \`<div style="grid-column: 1/-1; padding: 3rem; text-align: center; color: var(--text-muted);">Nenhum material encontrado para esta busca. Tente palavras mais simples.</div>\`;
        return;
      }

      grid.innerHTML = filtered.map(item => \`
        <div class="card">
          <div>
            <div class="card-top">
              <span class="card-category">\${item.category}</span>
              <span class="card-sku">\${item.sku}</span>
            </div>
            <div class="card-brand">\${item.brand}</div>
            <h3 class="card-name">\${item.name}</h3>
            <p class="card-specs">\${item.specs}</p>
          </div>

          <div class="card-bottom">
            <div class="price-row">
              <span class="price-label">Ref. Unitária:</span>
              <div>
                <span class="price-value">R$ \${item.refPrice.toFixed(2)}</span>
                <span class="price-unit">/ \${item.unit}</span>
              </div>
            </div>

            <div class="action-row">
              <div class="qty-controls">
                <button type="button" class="qty-btn" onclick="stepQty('\${item.id}', -1)">-</button>
                <input type="number" id="qty-\${item.id}" class="qty-input" value="\${item.minQty}" min="1">
                <button type="button" class="qty-btn" onclick="stepQty('\${item.id}', 1)">+</button>
              </div>
              <button type="button" class="btn-add" onclick="addToCart('\${item.id}')">+ Cotação</button>
            </div>
          </div>
        </div>
      \`).join("");
    }

    function stepQty(id, delta) {
      const input = document.getElementById("qty-" + id);
      if (!input) return;
      let val = parseInt(input.value) || 1;
      val = Math.max(1, val + delta);
      input.value = val;
    }

    function addToCart(id) {
      const product = CATALOG.find(p => p.id === id);
      if (!product) return;
      const input = document.getElementById("qty-" + id);
      const qty = parseInt(input.value) || 1;

      const existing = cart.find(i => i.product.id === id);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({ product, quantity: qty });
      }

      updateCartUI();
    }

    function updateCartUI() {
      const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
      const totalPrice = cart.reduce((acc, i) => acc + (i.product.refPrice * i.quantity), 0);

      document.getElementById("cart-count").innerText = totalItems;

      const floatingBar = document.getElementById("floating-bar");
      if (totalItems > 0) {
        floatingBar.style.display = "flex";
        document.getElementById("floating-items-text").innerText = \`\${totalItems} itens na cesta\`;
        document.getElementById("floating-total-text").innerText = \`Subtotal Ref: R$ \${totalPrice.toFixed(2)}\`;
      } else {
        floatingBar.style.display = "none";
      }

      // Update Modal content
      document.getElementById("cart-modal-subtitle").innerText = \`\${totalItems} produtos listados\`;
      document.getElementById("modal-total-text").innerText = \`R$ \${totalPrice.toFixed(2)}\`;

      const listContainer = document.getElementById("cart-items-list");
      if (cart.length === 0) {
        listContainer.innerHTML = '<div style="padding: 2rem 0; text-align: center; color: var(--text-muted);">Sua cesta de cotação está vazia.</div>';
      } else {
        listContainer.innerHTML = cart.map((item, idx) => \`
          <div style="padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center;">
            <div style="max-width: 70%;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--emerald);">\${item.product.sku} • \${item.product.brand}</div>
              <div style="font-size: 0.85rem; font-weight: 500;">\${item.product.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">Qtd: \${item.quantity} \${item.product.unit} (R$ \${(item.product.refPrice * item.quantity).toFixed(2)})</div>
            </div>
            <button type="button" style="background: none; border: none; color: #f87171; font-size: 0.75rem; cursor: pointer; font-family: var(--font-mono);" onclick="removeCartItem(\${idx})">Remover</button>
          </div>
        \`).join("");
      }
    }

    function removeCartItem(idx) {
      cart.splice(idx, 1);
      updateCartUI();
    }

    function openCartModal() {
      document.getElementById("cart-modal").classList.add("active");
    }
    function closeCartModal() {
      document.getElementById("cart-modal").classList.remove("active");
    }

    function sendWhatsAppQuote() {
      if (cart.length === 0) return;
      const name = document.getElementById("client-name").value.trim() || "Cliente via Catálogo Online";
      const loc = document.getElementById("client-location").value.trim();
      const notes = document.getElementById("client-notes").value.trim();

      let msg = "*SOLICITAÇÃO DE COTAÇÃO — VÉRTICE MATERIAIS & ENGENHARIA*\\n";
      msg += \`*Cliente / Empresa:* \${name}\\n\`;
      if (loc) msg += \`*Local de Entrega:* \${loc}\\n\`;
      if (notes) msg += \`*Condições:* \${notes}\\n\`;
      msg += "\\n*ITENS SELECIONADOS:*\\n";

      let total = 0;
      cart.forEach((item, idx) => {
        const sub = item.product.refPrice * item.quantity;
        total += sub;
        msg += \`\${idx + 1}. [\${item.product.sku}] \${item.product.name}\\n   └ Quantidade: *\${item.quantity} \${item.product.unit}* (Ref: R$ \${sub.toFixed(2)})\\n\\n\`;
      });

      msg += \`*Valor Total de Referência:* R$ \${total.toFixed(2)}\\n\`;
      msg += "_Favor confirmar disponibilidade em estoque, frete e faturamento para obra._";

      const url = "https://wa.me/5511999999999?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    }

    // Spreadsheet Simulation
    function openImportModal() {
      document.getElementById("import-modal").classList.add("active");
    }
    function closeImportModal() {
      document.getElementById("import-modal").classList.remove("active");
    }

    function startImportSimulation() {
      const btn = document.getElementById("btn-start-import");
      const bar = document.getElementById("import-bar");
      const status = document.getElementById("import-status");
      const stats = document.getElementById("import-stats");
      const success = document.getElementById("import-success");

      btn.disabled = true;
      success.style.display = "none";
      status.innerText = "Processando lote CSV...";

      let current = 0;
      const total = 30480;
      const interval = setInterval(() => {
        current += 2540;
        if (current >= total) {
          current = total;
          bar.style.width = "100%";
          stats.innerText = total + " / " + total + " SKUs";
          status.innerText = "Concluído";
          success.style.display = "block";
          btn.disabled = false;
          clearInterval(interval);
        } else {
          const pct = Math.round((current / total) * 100);
          bar.style.width = pct + "%";
          stats.innerText = current + " / " + total + " SKUs";
        }
      }, 70);
    }

    // Init
    initCategories();
    renderProducts();
  </script>
</body>
</html>`;
}

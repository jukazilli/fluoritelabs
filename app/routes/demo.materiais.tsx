// app/routes/demo.materiais.tsx
import { useState, useMemo } from "react";
import type { Route } from "./+types/demo.materiais";
import {
  CANONICAL_MATERIALS_CATALOG,
  MATERIAL_CATEGORIES,
  type MaterialProduct,
  type MaterialCategory,
} from "../data/materials-catalog.ts";
import { buildSeoMeta } from "../features/seo/metadata.ts";

export function meta(_args?: Route.MetaArgs) {
  return buildSeoMeta({
    title: "Vértice Materiais — Catálogo & Cotação Direta WhatsApp | Demonstração Fluorite Labs",
    description:
      "Protótipo funcional de catálogo de materiais de construção com busca em borda, suporte a 30.000 SKUs e cotação direta para WhatsApp.",
    path: "/demo/materiais-construcao",
  });
}

interface CartItem {
  product: MaterialProduct;
  quantity: number;
}

export default function DemoMateriaisPage() {
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | "Todas">("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Lead fields for WhatsApp message
  const [clientName, setClientName] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [projectNotes, setProjectNotes] = useState("");

  // Planilha Import Simulator state
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importTotalCount, setImportTotalCount] = useState(30480);
  const [importFinished, setImportFinished] = useState(false);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return CANONICAL_MATERIALS_CATALOG.filter((item) => {
      const matchesCategory =
        selectedCategory === "Todas" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText =
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesText;
    });
  }, [selectedCategory, searchQuery]);

  // Cart operations
  const addToCart = (product: MaterialProduct, qtyToAdd = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item,
        );
      }
      return [...prev, { product, quantity: qtyToAdd }];
    });
  };

  const updateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartRefPrice = cart.reduce(
    (acc, item) => acc + item.product.refPrice * item.quantity,
    0,
  );

  // Build formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    const header = `*SOLICITAÇÃO DE COTAÇÃO — VÉRTICE MATERIAIS & ENGENHARIA*\n`;
    const client = clientName.trim()
      ? `*Cliente / Empresa:* ${clientName.trim()}\n`
      : `*Cliente:* Solicitação via Catálogo Online\n`;
    const loc = deliveryLocation.trim()
      ? `*Local de Entrega:* ${deliveryLocation.trim()}\n`
      : ``;
    const notes = projectNotes.trim()
      ? `*Observações:* ${projectNotes.trim()}\n`
      : ``;

    const itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. [${item.product.sku}] ${item.product.name}\n   └ Quantidade: *${item.quantity} ${item.product.unit}* (Ref: R$ ${(item.product.refPrice * item.quantity).toFixed(2)})`,
      )
      .join("\n\n");

    const totalText = `\n\n*Valor Total de Referência:* R$ ${totalCartRefPrice.toFixed(2)}\n_Favor confirmar disponibilidade em estoque, frete para a região e faturamento para obra._`;

    return `${header}${client}${loc}${notes}\n*ITENS SELECIONADOS PARA COTAÇÃO:*\n\n${itemsText}${totalText}`;
  };

  const handleSendToWhatsApp = () => {
    const rawMsg = generateWhatsAppMessage();
    const encoded = encodeURIComponent(rawMsg);
    // WhatsApp URL (simulation uses generic wa.me or demo number)
    const targetUrl = `https://wa.me/5511999999999?text=${encoded}`;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  // Run Spreadsheet batch import simulation
  const handleSimulateBatchImport = () => {
    setIsImporting(true);
    setImportProgress(0);
    setImportFinished(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 2540;
      if (current >= importTotalCount) {
        current = importTotalCount;
        setImportProgress(100);
        setIsImporting(false);
        setImportFinished(true);
        clearInterval(interval);
      } else {
        setImportProgress(Math.round((current / importTotalCount) * 100));
      }
    }, 70);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f5f5f7] font-body selection:bg-crystal-lilac/30 selection:text-white">
      {/* Top Protocol Bar: Fluorite Labs Back-link & Architecture Badge */}
      <header className="border-b border-white/10 bg-[#040405]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/work/vertice-materiais"
              className="text-xs font-mono text-muted-silver hover:text-soft-white flex items-center gap-1 transition-colors"
            >
              <span>←</span>
              <span>Estudo de Caso</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              PROTÓTIPO FUNCIONAL AO VIVO
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="hidden sm:flex items-center gap-2 text-xs font-mono text-crystal-lilac hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer"
            >
              <span>📊</span>
              <span>Importador de Planilha (30k SKUs)</span>
            </button>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-xs font-medium cursor-pointer"
              aria-label="Abrir Cesta de Cotação"
            >
              <span>📋 Cesta de Cotação</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-emerald-500 text-black">
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Storefront Banner */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#0b0d11] to-[#07080a] py-12 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-silver mb-2">
                <span>VÉRTICE ENGENHARIA DE MATERIAIS</span>
                <span>•</span>
                <span className="text-emerald-400">HUB DE COTAÇÃO RÁPIDA B2B</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-soft-white tracking-tight">
                Cotação Direta de Materiais de Construção
              </h1>
              <p className="mt-3 text-sm sm:text-base text-muted-silver max-w-2xl font-light leading-relaxed">
                Monte sua lista com produtos homologados, cimentos, tubulações e acabamentos. Sem
                necessidade de pagamento com cartão: receba o orçamento formalizado com prazos de
                entrega e condições de faturamento direto no WhatsApp do vendedor.
              </p>
            </div>

            {/* Live Metrics Pill */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col gap-2 min-w-[260px]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-silver">Latência de Busca:</span>
                <span className="text-emerald-400 font-bold">~18ms (Edge CDN)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-silver">Capacidade Indexada:</span>
                <span className="text-soft-white">30.000+ SKUs</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-silver">Despacho Comercial:</span>
                <span className="text-crystal-lilac">WhatsApp Estruturado</span>
              </div>
            </div>
          </div>

          {/* Search Bar & Fast Filters */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque por código SKU, nome do produto, marca (ex: Votoran, Tigre, 25mm, AC-III)..."
                className="w-full bg-[#0d1017] border border-white/15 focus:border-crystal-lilac/70 rounded-xl px-5 py-4 text-sm text-soft-white placeholder:text-white/30 focus:outline-none transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-silver hover:text-white"
                >
                  LIMPAR ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory("Todas")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "Todas"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/5 hover:bg-white/10 text-muted-silver border border-white/10"
                }`}
              >
                Todas as Categorias
              </button>
              {MATERIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-crystal-lilac text-black font-semibold shadow-sm"
                      : "bg-white/5 hover:bg-white/10 text-muted-silver border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-mono text-muted-silver">
            Mostrando <span className="text-soft-white font-bold">{filteredProducts.length}</span>{" "}
            produtos disponíveis para cotação imediata
          </p>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-mono text-crystal-lilac hover:underline sm:hidden cursor-pointer"
          >
            Ver Cesta ({totalCartItems}) →
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-base text-soft-white font-medium">Nenhum material encontrado.</p>
            <p className="text-xs text-muted-silver mt-1">
              Tente buscar por termos genéricos como "cimento", "tubo", "fio" ou limpe o filtro de
              categoria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todas");
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg text-white"
            >
              Redefinir Busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </main>

      {/* Floating Bottom Quote Bar when items exist */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 animate-bounce-subtle">
          <div className="bg-[#12151d]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-emerald-400 font-semibold">
                {totalCartItems} {totalCartItems === 1 ? "item selecionado" : "itens selecionados"}
              </p>
              <p className="text-sm font-display font-medium text-white">
                Subtotal Referencial: R$ {totalCartRefPrice.toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
            >
              Revisar & Gerar WhatsApp →
            </button>
          </div>
        </div>
      )}

      {/* Quote Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#0b0d12] border-l border-white/15 h-full flex flex-col justify-between p-6 overflow-y-auto">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-display font-semibold text-white">
                    Cesta de Cotação
                  </h3>
                  <p className="text-xs text-muted-silver">
                    {totalCartItems} {totalCartItems === 1 ? "produto" : "produtos"} listados
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs text-muted-silver hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-silver">Sua cesta de cotação está vazia.</p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-4 py-2 text-xs bg-white/10 rounded-lg text-white"
                  >
                    Voltar ao Catálogo
                  </button>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-white/10 max-h-[40vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-3 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400">
                            {item.product.sku} • {item.product.brand}
                          </span>
                          <h4 className="text-xs font-medium text-white leading-snug">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[10px] font-mono text-red-400 hover:text-red-300"
                        >
                          Remover
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs text-soft-white font-medium px-1">
                            {item.quantity} {item.product.unit}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-mono text-muted-silver">
                          R$ {(item.product.refPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Client Details Form for WhatsApp */}
              {cart.length > 0 && (
                <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-3">
                  <p className="text-xs font-mono text-muted-silver tracking-wider">
                    DADOS PARA A COTAÇÃO (OPCIONAL)
                  </p>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Seu nome ou Razão Social"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-crystal-lilac"
                  />
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Bairro / Cidade para entrega (ex: Campinas/SP)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-crystal-lilac"
                  />
                  <textarea
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Observações (ex: faturamento para 28 dias, descarga com guincho...)"
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-crystal-lilac resize-none"
                  />
                </div>
              )}
            </div>

            {/* Drawer Footer & WhatsApp Action */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-silver">Subtotal Estimado:</span>
                  <span className="text-base font-mono font-bold text-white">
                    R$ {totalCartRefPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#25D366]/20 cursor-pointer"
                >
                  <span>💬 Enviar Cotação para o WhatsApp</span>
                </button>
                <p className="text-[10px] text-muted-silver text-center mt-2 font-mono">
                  Abre uma mensagem formatada com todos os SKUs e quantidades prontas para o
                  atendente.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spreadsheet / Catalog Import Simulator Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0e1117] border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <h3 className="text-base font-display font-semibold text-white">
                  Simulador de Carga em Lote (Excel / ERP)
                </h3>
                <p className="text-xs text-muted-silver">
                  Demonstração da arquitetura de ingestão de grandes catálogos
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="text-muted-silver hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-muted-silver leading-relaxed mb-4">
              Lojas de materiais de construção costumam ter entre 10.000 e 50.000 itens cadastrados
              no ERP (Totvs, Sankhya, Cigam ou planilhas Excel). Em vez de cadastrar manualmente,
              nosso sistema processa a planilha inteira em segundo plano sem travar o site:
            </p>

            {/* Mapped columns preview */}
            <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-[11px] font-mono text-muted-silver mb-4">
              <span className="text-emerald-400 font-bold">Colunas Mapeadas:</span> SKU, Descrição,
              Marca, Categoria, Unidade, Preço Base, Estoque.
            </div>

            {/* Progress Bar */}
            <div className="bg-white/5 rounded-full h-3 w-full overflow-hidden border border-white/10 mb-2">
              <div
                className="bg-emerald-500 h-full transition-all duration-150"
                style={{ width: `${importProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-muted-silver mb-6">
              <span>{isImporting ? "Processando lote..." : "Pronto para teste"}</span>
              <span className="text-white font-bold">{importProgress}% ({Math.round((importProgress / 100) * importTotalCount)} / {importTotalCount} SKUs)</span>
            </div>

            {importFinished && (
              <div className="p-3 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                ✓ 30.480 SKUs sincronizados com sucesso na CDN Edge em 1.18 segundos!
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-muted-silver hover:text-white"
              >
                Fechar
              </button>
              <button
                type="button"
                disabled={isImporting}
                onClick={handleSimulateBatchImport}
                className="px-4 py-2 rounded-lg bg-crystal-lilac hover:bg-crystal-lilac/90 text-black font-semibold text-xs disabled:opacity-50 cursor-pointer"
              >
                {isImporting ? "Importando Planilha..." : "Simular Carga de 30.000 Itens"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Strategic Footer / Conversion CTA for Fluorite Labs */}
      <footer className="border-t border-white/10 bg-[#040405] py-12 px-4 sm:px-6 md:px-12 mt-16">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
              ARQUITETURA SOB MEDIDA • FLUORITE LABS
            </span>
            <h3 className="text-xl font-display font-medium text-white mt-1">
              Deseja um catálogo funcional com cotação direta para o seu negócio?
            </h3>
            <p className="text-xs text-muted-silver mt-1 max-w-xl">
              Desenvolvemos catálogos de alta performance para distribuidores, indústrias e lojas de
              materiais integrados ao seu ERP ou planilhas.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/work/vertice-materiais"
              className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium text-white hover:bg-white/10 transition-colors"
            >
              Ler Estudo de Caso
            </a>
            <a
              href="/#briefing"
              className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors"
            >
              Iniciar Projeto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: MaterialProduct;
  onAddToCart: (p: MaterialProduct, qty: number) => void;
}) {
  const [qty, setQty] = useState(product.minQty);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="bg-[#0c0e14] border border-white/10 hover:border-white/25 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group">
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
          <span className="px-2 py-0.5 rounded bg-white/5 text-muted-silver border border-white/5">
            {product.category}
          </span>
          <span className="text-emerald-400 font-bold">{product.sku}</span>
        </div>

        <div className="text-xs font-mono text-muted-silver/70 mb-1">{product.brand}</div>
        <h3 className="text-sm font-medium text-soft-white group-hover:text-white leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-muted-silver/90 mt-2 font-light line-clamp-2">
          {product.specs}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] text-muted-silver font-mono">Ref. Unitária:</span>
          <div className="text-right">
            <span className="text-sm font-mono font-bold text-white">
              R$ {product.refPrice.toFixed(2)}
            </span>
            <span className="text-[10px] text-muted-silver ml-1 font-mono">/ {product.unit}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quantity Selector */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-2 py-1.5">
            <button
              type="button"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="w-5 text-xs text-muted-silver hover:text-white"
            >
              -
            </button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-10 text-center text-xs font-mono bg-transparent text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setQty((prev) => prev + 1)}
              className="w-5 text-xs text-muted-silver hover:text-white"
            >
              +
            </button>
          </div>

          {/* Add to Quote Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              justAdded
                ? "bg-emerald-500 text-black font-bold"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            {justAdded ? "Adicionado ✓" : "+ Cotação"}
          </button>
        </div>
      </div>
    </div>
  );
}

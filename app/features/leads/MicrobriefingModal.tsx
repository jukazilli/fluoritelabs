import { useState, useEffect, useRef, useCallback } from "react";
import {
  NEED_OPTIONS,
  INVESTMENT_OPTIONS,
  type NeedOption,
  type InvestmentOption,
  type MicrobriefingState,
} from "./schema.ts";
import { buildWhatsappUrl } from "./whatsapp.ts";
import { trackEvent, CANONICAL_EVENTS } from "../analytics/events.ts";

const SESSION_STORAGE_KEY = "fluorite_briefing_session_v1";

interface MicrobriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourcePath?: string;
}

interface LeadApiResponse {
  ok?: boolean;
  leadId?: string;
  whatsappUrl?: string;
  error?: string;
  message?: string;
  canFallbackToWhatsapp?: boolean;
}

export function MicrobriefingModal({ isOpen, onClose, sourcePath = "/" }: MicrobriefingModalProps) {
  // Session-persisted state (LEAD-002)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [firstName, setFirstName] = useState("");
  const [need, setNeed] = useState<NeedOption | null>(null);
  const [budget, setBudget] = useState<InvestmentOption | null>(null);

  // Submission & Degradation state (LEAD-006)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [fallbackWhatsappUrl, setFallbackWhatsappUrl] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Restore saved draft from sessionStorage on mount/open (LEAD-002)
  useEffect(() => {
    if (typeof window === "undefined" || !isOpen) return;

    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed: Partial<MicrobriefingState> = JSON.parse(saved);
        if (parsed.firstName) setFirstName(parsed.firstName);
        if (parsed.need && NEED_OPTIONS.includes(parsed.need as NeedOption)) {
          setNeed(parsed.need as NeedOption);
        }
        if (parsed.budget && INVESTMENT_OPTIONS.includes(parsed.budget as InvestmentOption)) {
          setBudget(parsed.budget as InvestmentOption);
        }
        if (parsed.step && [1, 2, 3].includes(parsed.step)) {
          setStep(parsed.step as 1 | 2 | 3);
        }
      }
    } catch {
      // Storage unavailable or parsing error - graceful ignore
    }

    trackEvent(CANONICAL_EVENTS.START_BRIEFING, {
      page_path: sourcePath,
      source_position: "modal",
    });
  }, [isOpen, sourcePath]);

  // Persist state to sessionStorage whenever values change (LEAD-002)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stateToSave: MicrobriefingState = {
        step,
        firstName,
        need,
        budget,
        sourcePath,
        completed: false,
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Storage full or quota exceeded - graceful ignore
    }
  }, [step, firstName, need, budget, sourcePath]);

  // Focus management and keyboard escape handler
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (step === 1 && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 80);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, step, onClose]);

  // Step 1 Validation & Next
  const handleNextFromStep1 = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanName = firstName.trim();
    if (cleanName.length < 2) {
      setInputError("Por favor, informe ao menos 2 caracteres para seu primeiro nome.");
      return;
    }
    setInputError(null);
    setStep(2);
    trackEvent(CANONICAL_EVENTS.BRIEFING_STEP_1, { page_path: sourcePath });
  };

  // Step 2 Selection & Next
  const handleSelectNeed = (selectedNeed: NeedOption) => {
    setNeed(selectedNeed);
    setErrorFeedback(null);
    setStep(3);
    trackEvent(CANONICAL_EVENTS.BRIEFING_STEP_2, {
      need_category: selectedNeed,
      page_path: sourcePath,
    });
  };

  // Step 3 Selection & Final Submission (LEAD-003, LEAD-004, LEAD-005, LEAD-006)
  const handleSubmitLead = useCallback(
    async (selectedBudget: InvestmentOption) => {
      setBudget(selectedBudget);
      setErrorFeedback(null);
      setFallbackWhatsappUrl(null);
      setIsSubmitting(true);

      trackEvent(CANONICAL_EVENTS.BRIEFING_STEP_3, {
        investment_tier: selectedBudget,
        page_path: sourcePath,
      });

      const payload = {
        firstName: firstName.trim(),
        need: need as string,
        budget: selectedBudget,
        sourcePath,
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
      };

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = (await response.json().catch(() => ({}))) as LeadApiResponse;

        if (response.ok && data.ok) {
          // Success: LEAD-004 & LEAD-005
          trackEvent(CANONICAL_EVENTS.LEAD_CREATED, {
            lead_id: data.leadId,
            need_category: payload.need,
            investment_tier: payload.budget,
            page_path: sourcePath,
          });

          // Open WhatsApp
          const targetUrl = data.whatsappUrl;
          if (targetUrl) {
            trackEvent(CANONICAL_EVENTS.WHATSAPP_OPEN, {
              lead_id: data.leadId,
              page_path: sourcePath,
            });

            // If mobile, direct navigate; desktop: open new tab
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              window.location.href = targetUrl;
            } else {
              window.open(targetUrl, "_blank", "noopener,noreferrer");
            }
          }

          // Clear draft and close
          try {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
          } catch {
            // ignore
          }
          setIsSubmitting(false);
          onClose();
        } else {
          // Failure: Safe Degradation (LEAD-006)
          // Preserve form state, allow retry, offer direct WhatsApp handoff
          const fallbackUrl =
            data.whatsappUrl ||
            buildWhatsappUrl({
              firstName: payload.firstName,
              need: payload.need,
              budget: payload.budget,
            });

          setFallbackWhatsappUrl(fallbackUrl);
          setErrorFeedback(
            data.message ||
              "Não foi possível salvar os dados neste momento. Você pode tentar novamente ou falar diretamente conosco no WhatsApp.",
          );
          setIsSubmitting(false);
        }
      } catch {
        // Network or fetch failure: Safe Degradation (LEAD-006)
        const fallbackUrl = buildWhatsappUrl({
          firstName: payload.firstName,
          need: payload.need,
          budget: payload.budget,
        });

        setFallbackWhatsappUrl(fallbackUrl);
        setErrorFeedback(
          "Houve uma instabilidade temporária na conexão. Você pode tentar novamente ou continuar diretamente pelo WhatsApp.",
        );
        setIsSubmitting(false);
      }
    },
    [firstName, need, sourcePath, onClose],
  );

  // Direct WhatsApp continuation in case of failure fallback (LEAD-006)
  const handleFallbackWhatsappClick = () => {
    if (!fallbackWhatsappUrl) return;
    trackEvent(CANONICAL_EVENTS.WHATSAPP_OPEN, {
      fallback: true,
      page_path: sourcePath,
    });
    window.open(fallbackWhatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl transition-all duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="briefing-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#08090a] p-6 sm:p-10 shadow-2xl shadow-black/80 transition-all text-[#f5f5f7]"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 80px rgba(255, 255, 255, 0.03)",
        }}
      >
        {/* Subtle Fluorite glow backdrop */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(160, 200, 255, 0.12) 0%, rgba(180, 140, 255, 0.05) 50%, transparent 80%)",
          }}
        />

        {/* Header: Progress & Close Button */}
        <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#86868b]">
              Passo 0{step} / 03
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    s === step ? "w-6 bg-white" : s < step ? "w-2 bg-white/40" : "w-2 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar microbriefing"
            className="rounded-full p-2 text-[#86868b] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="relative z-10 pt-8 pb-4">
          {/* STEP 1: First Name */}
          {step === 1 && (
            <form
              onSubmit={handleNextFromStep1}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#a0a5b5]">
                  Apresentação
                </span>
                <h2
                  id="briefing-title"
                  className="text-2xl sm:text-3xl font-display font-light text-[#f5f5f7] tracking-tight leading-snug"
                >
                  Qual é o seu primeiro nome?
                </h2>
                <p className="text-sm text-[#86868b] font-normal">
                  Para sabermos como nos dirigir a você em nossa conversa.
                </p>
              </div>

              <div className="space-y-2">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (inputError) setInputError(null);
                  }}
                  placeholder="Seu primeiro nome"
                  maxLength={100}
                  className="w-full bg-[#121316] border border-white/15 rounded-xl px-5 py-3.5 text-base text-white placeholder-[#50525a] focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all font-sans"
                />
                {inputError && (
                  <p className="text-xs text-rose-400 font-sans tracking-wide">{inputError}</p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!firstName.trim()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium transition-all hover:bg-[#e0e0e5] disabled:opacity-40 disabled:hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Continuar
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Need Selection */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-[#86868b] hover:text-white transition-colors"
                  >
                    ← Voltar
                  </button>
                  <span className="text-[#333]">•</span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#a0a5b5]">
                    Necessidade
                  </span>
                </div>
                <h2
                  id="briefing-title"
                  className="text-2xl sm:text-3xl font-display font-light text-[#f5f5f7] tracking-tight leading-snug"
                >
                  O que você precisa, {firstName.trim()}?
                </h2>
                <p className="text-sm text-[#86868b] font-normal">
                  Selecione a opção que melhor descreve o objetivo do seu projeto.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {NEED_OPTIONS.map((opt) => {
                  const isSelected = need === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectNeed(opt)}
                      className={`text-left px-5 py-4 rounded-xl border text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                        isSelected
                          ? "bg-white text-black font-medium border-white shadow-lg shadow-white/5"
                          : "bg-[#111215] text-[#d1d1d6] border-white/10 hover:border-white/25 hover:bg-[#16171b]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Investment Range & Final Submission */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-mono text-[#86868b] hover:text-white transition-colors"
                  >
                    ← Voltar
                  </button>
                  <span className="text-[#333]">•</span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#a0a5b5]">
                    Investimento
                  </span>
                </div>
                <h2
                  id="briefing-title"
                  className="text-2xl sm:text-3xl font-display font-light text-[#f5f5f7] tracking-tight leading-snug"
                >
                  Quanto você pretende investir?
                </h2>
                <p className="text-sm text-[#86868b] font-normal">
                  Para calibrarmos a arquitetura técnica e o cronograma à sua expectativa.
                </p>
              </div>

              {/* Degradation error alert if failure occurred (LEAD-006) */}
              {errorFeedback && (
                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-200 text-xs sm:text-sm space-y-3">
                  <p>{errorFeedback}</p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {budget && (
                      <button
                        type="button"
                        onClick={() => handleSubmitLead(budget)}
                        disabled={isSubmitting}
                        className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      >
                        {isSubmitting ? "Tentando novamente..." : "Tentar novamente"}
                      </button>
                    )}
                    {fallbackWhatsappUrl && (
                      <button
                        type="button"
                        onClick={handleFallbackWhatsappClick}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
                      >
                        Continuar no WhatsApp mesmo assim →
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-1">
                {INVESTMENT_OPTIONS.map((tier) => {
                  const isSelected = budget === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSubmitLead(tier)}
                      className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl border text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:opacity-50 ${
                        isSelected
                          ? "bg-white text-black font-medium border-white"
                          : "bg-[#111215] text-[#d1d1d6] border-white/10 hover:border-white/25 hover:bg-[#16171b]"
                      }`}
                    >
                      <span>{tier}</span>
                      <span className="font-mono text-xs opacity-60">
                        {isSubmitting && isSelected ? "Gravando..." : "Selecionar →"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#86868b]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Contato direto no WhatsApp
                </span>
                <span>Sem spam ou formulários longos</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

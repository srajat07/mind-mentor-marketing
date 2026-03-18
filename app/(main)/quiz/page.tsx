"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getQuizData } from "@/app/actions/quizActions";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  RefreshCcw,
  CheckCircle2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

// ─── Ease curve shared by slide transitions ──────────────────────────────────
const EASE = [0.23, 1, 0.32, 1] as const;

// ─── Smart Image component (handles base64, URL, or nothing) ─────────────────
function SlideImage({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className ?? "w-full h-full object-cover"}
    />
  );
}

export default function PublicQuizPlayer() {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<{ nodes: any[]; edges: any[] } | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // ── 1. Fetch on load ────────────────────────────────────────────────────────
  useEffect(() => {
    async function loadQuiz() {
      const resp = await getQuizData("PUBLISHED");
      if (resp && resp.nodes.length > 0) {
        setQuizData(resp);
        const startNode = resp.nodes.find((n: any) => n.data?.isStart);
        if (startNode) setCurrentNodeId(startNode.id);
      }
      setLoading(false);
    }
    loadQuiz();
  }, []);

  // ── 2. Derived values ───────────────────────────────────────────────────────
  const currentNode = useMemo(() => {
    if (!quizData || !currentNodeId) return null;
    return quizData.nodes.find((n) => n.id === currentNodeId);
  }, [quizData, currentNodeId]);

  /** Step index = how many nodes we've navigated through (≈ history length) */
  const stepIndex = history.length;

  const progress = useMemo(() => {
    if (!quizData || !currentNodeId) return 0;
    const bfsLongest = (nodeId: string): number => {
      const queue: { id: string; depth: number }[] = [{ id: nodeId, depth: 0 }];
      let maxDepth = 0;
      const visited = new Set<string>();
      while (queue.length > 0) {
        const { id, depth } = queue.shift()!;
        if (visited.has(id)) continue;
        visited.add(id);
        const outgoing = quizData.edges.filter((e) => e.source === id);
        if (outgoing.length === 0) {
          maxDepth = Math.max(maxDepth, depth);
        } else {
          outgoing.forEach((e) => queue.push({ id: e.target, depth: depth + 1 }));
        }
      }
      return maxDepth;
    };
    const remaining = bfsLongest(currentNodeId);
    const total = history.length + remaining;
    if (total === 0) return 0;
    return Math.min(Math.round((history.length / total) * 100), 99);
  }, [history, currentNodeId, quizData]);

  // ── 3. Navigation ───────────────────────────────────────────────────────────
  const handleNavigate = (targetId: string) => {
    if (!currentNodeId) return;
    setDirection(1);
    setHistory((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(targetId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    setDirection(-1);
    const prevId = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentNodeId(prevId);
  };

  const handleReset = () => {
    if (!quizData) return;
    const startNode = quizData.nodes.find((n: any) => n.data?.isStart);
    if (startNode) {
      setDirection(-1);
      setHistory([]);
      setCurrentNodeId(startNode.id);
    }
  };

  const handleOptionClick = (index: number) => {
    if (!quizData || !currentNodeId) return;
    const handleId = `handle-${index}`;
    const edge = quizData.edges.find(
      (e) => e.source === currentNodeId && e.sourceHandle === handleId
    );
    if (edge) handleNavigate(edge.target);
  };

  const handleContinue = () => {
    if (!quizData || !currentNodeId) return;
    const edge = quizData.edges.find(
      (e) =>
        e.source === currentNodeId &&
        (e.sourceHandle === null || e.sourceHandle === "multi-source")
    );
    if (edge) handleNavigate(edge.target);
  };

  // ── Loading / Error states ──────────────────────────────────────────────────
  if (loading)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-slate-500">
        <Loader2 size={40} className="animate-spin text-[#5A4FCF] mb-4" />
        <p className="font-semibold text-lg text-[#5A4FCF]">
          Curating your AI diagnostic…
        </p>
      </div>
    );

  if (!quizData || !currentNode)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Quiz currently unavailable
        </h2>
        <p className="text-slate-500 mb-6 max-w-sm">
          The quiz builder is currently offline or has no published content.
          Please check back later.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#5A4FCF] text-white rounded-full font-bold hover:scale-105 transition-all"
        >
          Back to Home
        </Link>
      </div>
    );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[85vh] bg-[#F9FAFB] selection:bg-[#5A4FCF]/10">
      {/* ── Top Progress Bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          {/* Back / brand */}
          <div className="flex items-center gap-3 shrink-0">
            {history.length > 0 && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-[#5A4FCF] transition-all active:scale-90"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <span className="text-xs font-black uppercase tracking-widest text-[#5A4FCF] hidden sm:block">
              AI Diagnostic
            </span>
          </div>

          {/* Progress track */}
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#5A4FCF] to-[#7C72F0]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            />
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="shrink-0 px-3 py-1.5 rounded-full hover:bg-slate-100 text-xs font-bold text-slate-400 hover:text-[#5A4FCF] transition-all flex items-center gap-1.5 active:scale-95"
          >
            <RefreshCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* ── Animated Slide Area ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } }}
          exit={{ opacity: 0, x: direction * -60, transition: { duration: 0.3, ease: EASE } }}
          className="w-full"
        >
          {/* ════════════════════════════════════════════════════════════════════
              1.  STATEMENT SLIDE — split-screen, alternating layout
          ════════════════════════════════════════════════════════════════════ */}
          {currentNode.type === "statement" && (() => {
            const { title, desc, image } = currentNode.data ?? {};
            const hasImage = !!image;
            // even index → image left; odd → image right
            const imageOnLeft = stepIndex % 2 === 0;

            // Content block
            const TextBlock = (
              <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-8 py-12 lg:py-0">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
                  {title || "Great progress!"}
                </h1>
                {desc && (
                  <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                    {desc}
                  </p>
                )}
                <button
                  onClick={handleContinue}
                  className="mt-10 w-full max-w-xs py-4 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-base tracking-widest shadow-xl shadow-[#5A4FCF]/25 hover:scale-105 active:scale-95 transition-all"
                >
                  CONTINUE
                </button>
              </div>
            );

            // Image block
            const ImageBlock = hasImage ? (
              <div className="relative w-full h-64 lg:h-full overflow-hidden">
                <SlideImage
                  src={image}
                  alt={title || "Slide illustration"}
                  className="w-full h-full object-cover"
                />
                {/* subtle gradient overlay for polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>
            ) : null;

            return (
              <div
                className={`
                  max-w-5xl mx-auto min-h-[75vh]
                  ${hasImage
                    ? "grid grid-cols-1 lg:grid-cols-2"
                    : "flex items-center justify-center py-16 px-4"
                  }
                `}
              >
                {hasImage ? (
                  <>
                    {/* Mobile: always image on top */}
                    <div className="lg:hidden">{ImageBlock}</div>
                    {/* Desktop: alternate */}
                    {imageOnLeft ? (
                      <>
                        <div className="hidden lg:block">{ImageBlock}</div>
                        {TextBlock}
                      </>
                    ) : (
                      <>
                        {TextBlock}
                        <div className="hidden lg:block">{ImageBlock}</div>
                      </>
                    )}
                    {/* Mobile text below image */}
                    <div className="lg:hidden">{TextBlock}</div>
                  </>
                ) : (
                  <div className="text-center max-w-lg mx-auto px-4">
                    <div className="mx-auto w-16 h-16 bg-[#5A4FCF]/10 rounded-3xl flex items-center justify-center text-[#5A4FCF] mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
                      {title || "Great progress!"}
                    </h1>
                    {desc && (
                      <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
                        {desc}
                      </p>
                    )}
                    <button
                      onClick={handleContinue}
                      className="mt-10 w-full py-4 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-base tracking-widest shadow-xl shadow-[#5A4FCF]/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      CONTINUE
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ════════════════════════════════════════════════════════════════════
              2.  QUESTION SLIDE — card-style answers with optional icons
          ════════════════════════════════════════════════════════════════════ */}
          {currentNode.type === "question" && (
            <div className="max-w-2xl mx-auto py-12 px-4">
              {/* Question header */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {currentNode.data?.label || "Select your preference"}
                </h1>
                <p className="text-slate-400 font-medium mt-2 text-sm">
                  Choose the option that best describes your situation.
                </p>
              </div>

              {/* Answer cards */}
              <div className="grid gap-3">
                {(currentNode.data?.options || []).map(
                  (opt: string, i: number) => {
                    const iconSrc = currentNode.data?.optionImages?.[i];
                    const hasIcon = !!iconSrc;

                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleOptionClick(i)}
                        className="group w-full flex items-center gap-4 p-4 text-left bg-white border-2 border-slate-100 rounded-2xl hover:border-[#5A4FCF]/60 hover:shadow-lg hover:shadow-[#5A4FCF]/8 transition-all"
                      >
                        {/* Option icon — image or lettered placeholder */}
                        {hasIcon ? (
                          <div className="shrink-0 w-8 h-8 rounded-xl overflow-hidden border border-slate-100">
                            <SlideImage
                              src={iconSrc}
                              alt={opt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="shrink-0 w-8 h-8 rounded-xl bg-[#5A4FCF]/8 flex items-center justify-center text-[#5A4FCF] font-black text-sm">
                            {String.fromCharCode(65 + i)}
                          </div>
                        )}

                        {/* Label */}
                        <span className="flex-1 text-base font-semibold text-slate-700 group-hover:text-[#5A4FCF] transition-colors">
                          {opt}
                        </span>

                        {/* Arrow */}
                        <div className="shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#5A4FCF] transition-all">
                          <ChevronRight
                            size={17}
                            className="text-slate-300 group-hover:text-white"
                          />
                        </div>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              3.  TERMINAL SLIDE — result with prominent image
          ════════════════════════════════════════════════════════════════════ */}
          {currentNode.type === "terminal" && (
            <div className="max-w-lg mx-auto py-12 px-4 text-center">
              {/* Result image */}
              {currentNode.data?.image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="mb-8 relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 aspect-video w-full"
                >
                  <SlideImage
                    src={currentNode.data.image}
                    alt={currentNode.data?.resultTitle || "Result"}
                    className="w-full h-full object-cover"
                  />
                  {/* emerald success badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                    <CheckCircle2 size={14} />
                    Analysis Complete
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="relative mx-auto w-24 h-24 mb-8"
                >
                  <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full" />
                  <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl">
                    <CheckCircle2 size={48} />
                  </div>
                </motion.div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-3">
                {currentNode.data?.resultTitle || "Analysis Complete"}
              </h1>
              <p className="text-base text-slate-500 font-medium max-w-sm mx-auto leading-relaxed mb-8">
                We&apos;ve curated a personalized AI learning path based on your
                responses.
              </p>

              {/* CTA */}
              <Link
                href={currentNode.data?.url || "/plans"}
                className="block w-full py-5 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-xl shadow-2xl shadow-[#5A4FCF]/30 hover:scale-105 active:scale-95 transition-all text-center"
              >
                VIEW MY PLAN
              </Link>
              <p className="mt-6 text-xs text-slate-400 font-bold uppercase tracking-widest">
                Available for a limited time
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div className="py-10 text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
          Powered by MindMentor AI
        </p>
      </div>
    </div>
  );
}

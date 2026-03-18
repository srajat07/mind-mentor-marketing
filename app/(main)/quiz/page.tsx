"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getQuizData } from "@/app/actions/quizActions";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Loader2,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

// ─── Shared ease curve ────────────────────────────────────────────────────────
const EASE = [0.23, 1, 0.32, 1] as const;

// ─── SlideImage — handles URL or base64, renders nothing if empty ─────────────
function SlideImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className ?? "w-full h-full object-cover"} />;
}

export default function PublicQuizPlayer() {
  const [loading, setLoading]       = useState(true);
  const [quizData, setQuizData]     = useState<{ nodes: any[]; edges: any[] } | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [history, setHistory]       = useState<string[]>([]);
  const [direction, setDirection]   = useState(1); // 1 = forward, -1 = backward

  // ── 1. Fetch on load ──────────────────────────────────────────────────────
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

  // ── 2. Derived values ─────────────────────────────────────────────────────
  const currentNode = useMemo(() => {
    if (!quizData || !currentNodeId) return null;
    return quizData.nodes.find((n) => n.id === currentNodeId);
  }, [quizData, currentNodeId]);

  /** How many nodes we have already visited */
  const stepIndex = history.length;

  /** How many questions the user has answered so far */
  const questionsAnswered = useMemo(() => {
    if (!quizData) return 0;
    return history.filter((id) => {
      const node = quizData.nodes.find((n) => n.id === id);
      return node?.type === "question";
    }).length;
  }, [history, quizData]);

  /** The maximum possible questions in any single path */
  const maxQuestions = useMemo(() => {
    if (!quizData || quizData.nodes.length === 0) return 1;
    const startNode = quizData.nodes.find((n) => n.data?.isStart);
    if (!startNode) return 1;

    const memo = new Map<string, number>();
    const solve = (nodeId: string): number => {
      if (memo.has(nodeId)) return memo.get(nodeId)!;
      const node = quizData.nodes.find((n) => n.id === nodeId);
      if (!node) return 0;

      const weight = node.type === "question" ? 1 : 0;
      const outgoing = quizData.edges.filter((e) => e.source === nodeId);
      let maxFuture = 0;
      for (const edge of outgoing) {
        maxFuture = Math.max(maxFuture, solve(edge.target));
      }
      const res = weight + maxFuture;
      memo.set(nodeId, res);
      return res;
    };
    return Math.max(solve(startNode.id), 1);
  }, [quizData]);

  const progress = useMemo(() => {
    if (currentNode?.type === "terminal") return 100;
    if (questionsAnswered === 0) return 0;
    return (questionsAnswered / maxQuestions) * 100;
  }, [questionsAnswered, maxQuestions, currentNode]);

  // ── 3. Navigation handlers ────────────────────────────────────────────────
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

  // ── Loading / empty states ────────────────────────────────────────────────
  if (loading)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
        <Loader2 size={38} className="animate-spin text-[#5A4FCF] mb-4" />
        <p className="font-semibold text-base text-[#5A4FCF]">
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
        <p className="text-slate-500 mb-6 max-w-sm text-sm">
          No published content found. Please check back later.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#5A4FCF] text-white rounded-full font-bold hover:scale-105 transition-all"
        >
          Back to Home
        </Link>
      </div>
    );

  const isStatement = currentNode.type === "statement";
  const isTerminal  = currentNode.type === "terminal";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9FAFB] selection:bg-[#5A4FCF]/10">
      {/* Quiz Sub-Header Navigation */}
      {!isStatement && (
        <div className="sticky top-20 w-full h-14 bg-white border-b border-gray-100 flex items-center px-4 gap-4 z-40">
          {/* Left: Back */}
          <button
            onClick={handleBack}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-[#5A4FCF] transition-all active:scale-95 ${
              history.length === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>

          {/* Center: Progress */}
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#5A4FCF]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Right: Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-[#5A4FCF] transition-all active:scale-95"
          >
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          ANIMATED SLIDE CONTENT
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.35, ease: EASE },
          }}
          exit={{
            opacity: 0,
            x: direction * -40,
            transition: { duration: 0.25, ease: EASE },
          }}
          className="w-full"
        >

          {/* ──────────────────────────────────────────────────────────────────
              1. STATEMENT SLIDE — full-bleed split screen, alternating sides
          ────────────────────────────────────────────────────────────────── */}
          {isStatement && (() => {
            const { title, desc, image } = currentNode.data ?? {};
            const hasImage  = !!image;
            const imgOnLeft = stepIndex % 2 === 0;

            const TextBlock = (
              <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-10 py-14 lg:py-20">
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
                  className="mt-10 w-full max-w-xs py-4 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-sm tracking-widest shadow-lg shadow-[#5A4FCF]/20 hover:scale-[1.03] active:scale-95 transition-all"
                >
                  CONTINUE
                </button>
              </div>
            );

            const ImageBlock = hasImage ? (
              <div className="relative flex items-center justify-center px-8 py-10 lg:py-16">
                <div
                  className="w-full overflow-hidden rounded-2xl shadow-lg"
                  style={{ maxHeight: 500 }}
                >
                  <SlideImage
                    src={image}
                    alt={title || "Slide illustration"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : null;

            return (
              <div
                className={
                  hasImage
                    ? "max-w-5xl mx-auto pt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 min-h-[80vh]"
                    : "max-w-5xl mx-auto pt-20 flex items-center justify-center min-h-[80vh] px-4"
                }
              >
                {hasImage ? (
                  <>
                    {/* Mobile — always image on top, text below */}
                    <div className="lg:hidden">{ImageBlock}</div>
                    <div className="lg:hidden">{TextBlock}</div>

                    {/* Desktop — alternate sides */}
                    {imgOnLeft ? (
                      <>
                        <div className="hidden lg:flex">{ImageBlock}</div>
                        <div className="hidden lg:flex">{TextBlock}</div>
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:flex">{TextBlock}</div>
                        <div className="hidden lg:flex">{ImageBlock}</div>
                      </>
                    )}
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
                      className="mt-10 w-full py-4 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-sm tracking-widest shadow-lg shadow-[#5A4FCF]/20 hover:scale-[1.03] active:scale-95 transition-all"
                    >
                      CONTINUE
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ──────────────────────────────────────────────────────────────────
              2. QUESTION SLIDE — polished answer cards with icons
          ────────────────────────────────────────────────────────────────── */}
          {currentNode.type === "question" && (
            <div className="max-w-xl mx-auto pt-16 pb-16 px-4">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {currentNode.data?.label || "Select your preference"}
                </h1>
                <p className="text-slate-400 font-medium mt-2 text-sm">
                  Choose the option that best describes your situation.
                </p>
              </div>

              {/* Answer cards */}
              <div className="flex flex-col gap-3">
                {(currentNode.data?.options || []).map(
                  (opt: string, i: number) => {
                    const iconSrc = currentNode.data?.optionImages?.[i];
                    const hasIcon = !!iconSrc;

                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.012 }}
                        whileTap={{ scale: 0.988 }}
                        onClick={() => handleOptionClick(i)}
                        className="group w-full flex items-center gap-4 px-5 text-left bg-white border-2 border-slate-100 rounded-2xl hover:border-[#5A4FCF] hover:bg-purple-50/40 transition-all"
                        style={{ minHeight: 80 }}
                      >
                        {/* Icon */}
                        {hasIcon ? (
                          <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                            <SlideImage
                              src={iconSrc}
                              alt={opt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="shrink-0 w-12 h-12 rounded-xl bg-[#5A4FCF]/8 border border-slate-100 flex items-center justify-center text-[#5A4FCF] font-black text-base">
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
                            size={16}
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

          {/* ──────────────────────────────────────────────────────────────────
              3. TERMINAL SLIDE — prominent result image + CTA
          ────────────────────────────────────────────────────────────────── */}
          {isTerminal && (
            <div className="max-w-md mx-auto pt-16 pb-16 px-4 text-center">
              {/* Result image or fallback icon */}
              {currentNode.data?.image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="mb-8 relative rounded-2xl overflow-hidden shadow-xl shadow-slate-200/80 aspect-video w-full"
                >
                  <SlideImage
                    src={currentNode.data.image}
                    alt={currentNode.data?.resultTitle || "Result"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                    <CheckCircle2 size={12} />
                    Complete
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative mx-auto w-24 h-24 mb-8"
                >
                  <div className="absolute -inset-4 bg-emerald-500/15 blur-2xl rounded-full" />
                  <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <CheckCircle2 size={46} />
                  </div>
                </motion.div>
              )}

              {/* Title + description */}
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-3">
                {currentNode.data?.resultTitle || "Analysis Complete"}
              </h1>
              <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto leading-relaxed mb-8">
                We&apos;ve curated a personalized AI learning path based on
                your responses.
              </p>

              {/* CTA */}
              <Link
                href={currentNode.data?.url || "/plans"}
                className="block w-full py-4 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#5A4FCF]/25 hover:scale-[1.03] active:scale-95 transition-all text-center"
              >
                VIEW MY PLAN
              </Link>
              <p className="mt-5 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
                Available for a limited time
              </p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER — always at bottom
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="pb-10 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.22em]">
          Powered by MindMentor AI
        </p>
      </div>
    </div>
  );
}

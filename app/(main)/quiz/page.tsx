"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getQuizData } from "@/app/actions/quizActions";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCcw, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PublicQuizPlayer() {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<{ nodes: any[]; edges: any[] } | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // 1. Fetch data on load
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

  // 2. Computed values
  const currentNode = useMemo(() => {
    if (!quizData || !currentNodeId) return null;
    return quizData.nodes.find((n) => n.id === currentNodeId);
  }, [quizData, currentNodeId]);

  const progress = useMemo(() => {
    if (!quizData || !currentNodeId) return 0;
    
    const bfsLongest = (nodeId: string): number => {
      const queue: { id: string; depth: number }[] = [{ id: nodeId, depth: 0 }];
      let maxDepth = 0;
      const visited = new Set();
      
      while (queue.length > 0) {
        const { id, depth } = queue.shift()!;
        if (visited.has(id)) continue;
        visited.add(id);
        
        const outgoing = quizData.edges.filter(e => e.source === id);
        if (outgoing.length === 0) {
          maxDepth = Math.max(maxDepth, depth);
        } else {
          outgoing.forEach(e => queue.push({ id: e.target, depth: depth + 1 }));
        }
      }
      return maxDepth;
    };

    const remaining = bfsLongest(currentNodeId);
    const totalEstimated = history.length + remaining;
    if (totalEstimated === 0) return 0;
    return Math.min(Math.round((history.length / totalEstimated) * 100), 99);
  }, [history, currentNodeId, quizData]);

  // 3. Navigation handlers
  const handleNavigate = (targetId: string) => {
    if (!currentNodeId) return;
    setDirection(1);
    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(targetId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    setDirection(-1);
    const prevId = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
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
    const edge = quizData.edges.find(e => e.source === currentNodeId && e.sourceHandle === handleId);
    if (edge) handleNavigate(edge.target);
  };

  const handleContinue = () => {
    if (!quizData || !currentNodeId) return;
    // For Statements / Multi-Select (single exit), sourceHandle is null
    const edge = quizData.edges.find(e => e.source === currentNodeId && (e.sourceHandle === null || e.sourceHandle === "multi-source"));
    if (edge) handleNavigate(edge.target);
  };

  // 4. Content renderers
  if (loading) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-slate-500">
      <Loader2 size={40} className="animate-spin text-[#5A4FCF] mb-4" />
      <p className="font-semibold text-lg text-[#5A4FCF]">Curating your AI diagnostic...</p>
    </div>
  );

  if (!quizData || !currentNode) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz currently unavailable</h2>
      <p className="text-slate-500 mb-6 max-w-sm">The quiz builder is currently offline or has no published content. Please check back later.</p>
      <Link href="/" className="px-6 py-3 bg-[#5A4FCF] text-white rounded-full font-bold hover:scale-105 transition-all">
        Back to Home
      </Link>
    </div>
  );

  return (
    <div className="min-h-[85vh] bg-[#F9FAFB] py-12 px-4 selection:bg-[#5A4FCF]/10">
      <div className="max-w-xl mx-auto">
        
        {/* Progress System */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <button 
                  onClick={handleBack}
                  className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-[#5A4FCF] transition-all shadow-sm active:scale-90"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                AI Diagnostic Test
              </span>
            </div>
            <button 
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full hover:bg-white text-xs font-bold text-slate-400 hover:text-[#5A4FCF] transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <RefreshCcw size={13} /> Reset
            </button>
          </div>
          
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-[#5A4FCF]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            />
          </div>
        </div>

        {/* Node Content Deck */}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentNodeId}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col min-h-[400px]"
          >
            
            {/* 1. Question Slide */}
            {currentNode.type === "question" && (
              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {currentNode.data?.label || "Select your preference"}
                  </h1>
                  <p className="text-slate-500 font-medium font-sans">
                    Choose the option that best describes your situation.
                  </p>
                </div>

                <div className="grid gap-3">
                  {(currentNode.data?.options || []).map((opt: string, i: number) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015, backgroundColor: "#fff" }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleOptionClick(i)}
                      className="group w-full p-5 text-left bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-between transition-all hover:border-[#5A4FCF]/30 hover:shadow-xl hover:shadow-[#5A4FCF]/5"
                    >
                      <span className="text-lg font-bold text-slate-700 group-hover:text-[#5A4FCF] transition-colors">{opt}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#5A4FCF] transition-all">
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-white" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Statement Slide */}
            {currentNode.type === "statement" && (
              <div className="space-y-10 flex-1 flex flex-col justify-center text-center">
                <div className="space-y-6">
                  <div className="mx-auto w-16 h-16 bg-[#5A4FCF]/10 rounded-3xl flex items-center justify-center text-[#5A4FCF] mb-2">
                   <CheckCircle2 size={32} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {currentNode.data?.title || "Great progress!"}
                  </h1>
                  <p className="text-xl text-slate-500 font-medium max-w-md mx-auto leading-relaxed font-sans">
                    {currentNode.data?.desc || "You're doing great. Let's move to the next part of your assessment."}
                  </p>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={handleContinue}
                    className="w-full max-w-xs mx-auto py-4 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#5A4FCF]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    CONTINUE <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            )}

            {/* 3. Terminal Node - Result */}
            {currentNode.type === "terminal" && (
              <div className="space-y-10 flex-1 flex flex-col items-center justify-center text-center">
                 <div className="relative">
                   <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full" />
                   <motion.div 
                     initial={{ scale: 0.8 }}
                     animate={{ scale: 1 }}
                     className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white"
                   >
                     <CheckCircle2 size={48} />
                   </motion.div>
                 </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-black text-slate-900 leading-tight">
                    {currentNode.data?.resultTitle || "Analysis Complete"}
                  </h1>
                  <p className="text-lg text-slate-500 font-medium max-w-sm font-sans">
                    We've curated a personalized AI learning path based on your responses.
                  </p>
                </div>

                <div className="pt-6 w-full">
                  <Link 
                    href={currentNode.data?.url || "/plans"}
                    className="block w-full py-5 px-8 bg-[#5A4FCF] text-white rounded-2xl font-black text-xl shadow-2xl shadow-[#5A4FCF]/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    VIEW MY PLAN
                  </Link>
                  <p className="mt-6 text-sm text-slate-400 font-semibold uppercase tracking-widest tracking-widest font-sans">
                    Available for a limited time
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Branding Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
            Powered by MindMentor AI
          </p>
        </div>
      </div>
    </div>
  );
}

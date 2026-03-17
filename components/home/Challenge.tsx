"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, CheckCircle2 } from "lucide-react";

export function Challenge() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold tracking-wide text-sm mb-6">
              GAMIFIED LEARNING
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The 28-Day AI Mastery Challenge
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Don't just watch videos—build real habits. Our signature 28-Day Challenge guides you step-by-step from beginner to AI proficient in less than a month.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                <span className="text-foreground font-medium">Daily micro-lessons (5-10 mins)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                <span className="text-foreground font-medium">Hands-on prompts and exercises</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                <span className="text-foreground font-medium">Progress tracking and streak bonuses</span>
              </li>
            </ul>
            
            <button className="px-8 py-4 rounded-full bg-foreground text-white font-semibold text-lg hover:bg-foreground/90 transition-all shadow-lg hover:-translate-y-1">
              Join the Challenge
            </button>
          </div>
          
          <div className="bg-offwhite rounded-[2.5rem] p-8 md:p-10 border border-border shadow-inner relative overflow-hidden">
            <h3 className="font-bold text-xl text-center mb-8 text-foreground">Your Journey</h3>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-7 gap-2 md:gap-3"
            >
              {[...Array(28)].map((_, i) => {
                const isCompleted = i < 7;
                const isCurrent = i === 7;
                
                return (
                  <motion.div
                    key={i}
                    variants={item}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                      isCompleted 
                        ? "bg-success text-white shadow-sm" 
                        : isCurrent 
                          ? "bg-primary text-white scale-110 shadow-md ring-4 ring-primary/20 z-10"
                          : "bg-white border text-muted border-border"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Unlock size={16} />
                    ) : (
                      <Lock size={14} className="opacity-40" />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
            
            <div className="mt-8 flex justify-between items-center text-sm font-medium text-muted px-2">
              <span>Week 1 Completed!</span>
              <span className="text-primary">Keep going!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

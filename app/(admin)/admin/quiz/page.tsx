"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowRight, Settings2, GripVertical, ChevronDown } from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: "single-select" | "multi-select" | "text-input";
  options: string[];
  logic: { [key: string]: string }; // Map answer to next question ID
  required: boolean;
}

export default function QuestionnaireBuilder() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      text: "What is your primary goal for using AI?",
      type: "single-select",
      options: ["Career Growth", "Business Efficiency", "Personal Projects", "Research"],
      logic: { "Career Growth": "q2", "Business Efficiency": "q3" },
      required: true
    }
  ]);

  const addQuestion = () => {
    const newId = `q${questions.length + 1}`;
    setQuestions([...questions, {
      id: newId,
      text: "",
      type: "single-select",
      options: [""],
      logic: {},
      required: false
    }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, text } : q));
  };

  const updateOptionText = (qId: string, optIndex: number, text: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        const oldText = newOptions[optIndex];
        newOptions[optIndex] = text;
        // Also update logic keys if they existed for the old text
        const newLogic = { ...q.logic };
        if (newLogic[oldText]) {
          newLogic[text] = newLogic[oldText];
          delete newLogic[oldText];
        }
        return { ...q, options: newOptions, logic: newLogic };
      }
      return q;
    }));
  };

  const addOption = (qId: string) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, options: [...q.options, ""] } : q));
  };

  const removeOption = (qId: string, optIndex: number) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOptions = q.options.filter((_, i) => i !== optIndex);
        const optText = q.options[optIndex];
        const newLogic = { ...q.logic };
        delete newLogic[optText];
        return { ...q, options: newOptions, logic: newLogic };
      }
      return q;
    }));
  };

  const updateLogic = (qId: string, optText: string, nextId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return { ...q, logic: { ...q.logic, [optText]: nextId } };
      }
      return q;
    }));
  };

  const toggleRequired = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, required: !q.required } : q));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quiz: Personalized AI Roadmap</h2>
          <p className="text-slate-500 mt-1">Design the logic flow for user onboarding and personalized recommendations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all flex items-center gap-2">
            <Settings2 size={18} />
            Quiz Settings
          </button>
          <button 
            onClick={() => console.log(JSON.stringify(questions, null, 2))}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="text-slate-300 cursor-grab" size={20} />
                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                  Question {index + 1}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {q.id}</span>
              </div>
              <button 
                onClick={() => removeQuestion(q.id)}
                className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Question Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Question Text</label>
                    <input 
                      type="text" 
                      value={q.text}
                      onChange={(e) => updateQuestionText(q.id, e.target.value)}
                      className="w-full text-lg px-0 py-2 border-b-2 border-slate-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="e.g., What is your current role?" 
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Options & Branching Logic</label>
                    <div className="space-y-3">
                      {q.options.map((opt, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-3">
                          <input 
                            type="text" 
                            value={opt}
                            onChange={(e) => updateOptionText(q.id, optIndex, e.target.value)}
                            placeholder={`Option ${optIndex + 1}`}
                            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-300 transition-all"
                          />
                          <ArrowRight className="text-slate-300" size={18} />
                          <div className="relative w-48">
                            <select 
                              value={q.logic[opt] || "End Quiz"}
                              onChange={(e) => updateLogic(q.id, opt, e.target.value)}
                              className="w-full appearance-none px-4 py-2 pr-10 bg-white border border-slate-200 rounded-lg outline-none text-sm text-slate-600 cursor-pointer hover:border-slate-300"
                            >
                              <option value="End Quiz">End Quiz</option>
                              {questions.filter(otherQ => otherQ.id !== q.id).map(otherQ => (
                                <option key={otherQ.id} value={otherQ.id}>Go to {otherQ.id}</option>
                              ))}
                              <option value="Hidden Branch">+ Add Hidden Branch</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                          </div>
                          <button 
                            onClick={() => removeOption(q.id, optIndex)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => addOption(q.id)}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 pt-2"
                      >
                        <Plus size={16} />
                        Add Option
                      </button>
                    </div>
                  </div>
                </div>

                {/* Question Settings */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Input Type</label>
                    <div className="grid grid-cols-1 gap-2">
                      {["single-select", "multi-select", "text-input"].map((type) => (
                        <button 
                          key={type}
                          onClick={() => {
                            const newQs = [...questions];
                            newQs[index].type = type as any;
                            setQuestions(newQs);
                          }}
                          className={`px-4 py-2 text-left text-sm rounded-lg border transition-all ${
                            q.type === type 
                            ? "bg-white border-blue-500 text-blue-700 font-bold shadow-sm" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={q.required}
                        onChange={() => toggleRequired(q.id)}
                        className="rounded text-blue-500 focus:ring-blue-500" 
                      />
                      <span className="text-sm font-medium text-slate-700">Required field</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addQuestion}
          className="w-full py-8 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <div className="p-2 rounded-full bg-slate-100 group-hover:bg-blue-100 transition-all">
            <Plus size={24} />
          </div>
          <span className="font-bold">Add Another Question</span>
        </button>
      </div>

      <div className="bg-[#1e293b] text-white p-8 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Ready to publish?</h3>
          <p className="text-slate-400 mt-1">Updates to the logic flow will be live immediately for new users.</p>
        </div>
        <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl">
          Deploy Changes
        </button>
      </div>
    </div>
  );
}

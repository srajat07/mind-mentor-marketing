"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaPickerModalProps {
  isOpen: boolean;
  initialValue?: string;
  onSelect: (url: string) => void;
  onClose: () => void;
  title?: string;
}

export default function MediaPickerModal({ isOpen, initialValue, onSelect, onClose, title = "Select Media" }: MediaPickerModalProps) {
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [url, setUrl] = useState(initialValue || "");
  const [preview, setPreview] = useState(initialValue || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Scroll Locking Logic
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    setPreview(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setUrl(base64);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    onSelect(url);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* 2. Full-Screen Backdrop Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
      />

      {/* 3. Responsive Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        onMouseDown={(e) => e.stopPropagation()} // Stop propagation to React Flow
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90vw] max-w-[500px] max-h-[85vh] bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/20"
      >
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5A4FCF]">
              <ImageIcon size={18} />
            </div>
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-600 active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-50/50 p-1.5 mx-8 mt-6 rounded-[20px] border border-slate-100">
          <button 
            onClick={() => setTab("upload")}
            className={`flex-1 py-3 text-sm font-bold rounded-[14px] transition-all flex items-center justify-center gap-2 ${tab === "upload" ? "bg-white text-[#5A4FCF] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <Upload size={16} /> Upload
          </button>
          <button 
            onClick={() => setTab("url")}
            className={`flex-1 py-3 text-sm font-bold rounded-[14px] transition-all flex items-center justify-center gap-2 ${tab === "url" ? "bg-white text-[#5A4FCF] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <LinkIcon size={16} /> Link
          </button>
        </div>

        {/* Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col gap-8">
            
            {tab === "upload" ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative aspect-video w-full border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#5A4FCF] hover:bg-indigo-50/20 transition-all"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                
                {preview && (preview.startsWith("data:image") || preview.startsWith("http")) ? (
                  <div className="w-full h-full relative z-10 rounded-xl overflow-hidden shadow-sm bg-white border border-white">
                    <img src={preview} alt="Upload Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-[#5A4FCF]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all text-white gap-2">
                       <Upload size={32} />
                       <span className="font-bold text-xs uppercase tracking-widest">Replace File</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5A4FCF] mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {isUploading ? <Loader2 className="animate-spin" /> : <Upload size={28} />}
                    </div>
                    <p className="font-bold text-slate-800 text-base">Drop your image here</p>
                    <p className="text-sm text-slate-400 mt-1">or click to browse from device</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Paste Link</label>
                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#5A4FCF] transition-colors">
                      <LinkIcon size={18} />
                    </div>
                    <input 
                      type="text"
                      value={url}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-[#5A4FCF] focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="aspect-video w-full flex items-center justify-center border border-slate-100 rounded-[24px] bg-slate-50 relative overflow-hidden ring-4 ring-slate-50/50">
                  {preview ? (
                    <div className="w-full h-full bg-white">
                      <img src={preview} alt="URL Preview" className="w-full h-full object-contain p-2" />
                    </div>
                  ) : (
                    <div className="text-center opacity-40">
                      <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
                        <ImageIcon size={24} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Waiting for URL...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium px-2">
              <span className="font-bold text-[#5A4FCF]">Tip:</span> Use high-quality PNG or SVG for best results. Images are stored as optimized strings to ensure your questionnaire remains fast and snappy.
            </p>
          </div>
        </div>

        {/* Footer (Pinned) */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center gap-4 sticky bottom-0 z-10">
          <button 
            onClick={onClose}
            className="flex-1 py-4 px-6 rounded-2xl text-[15px] font-bold text-slate-500 hover:bg-slate-200/60 transition-all active:scale-95"
          >
            Close
          </button>
          <button 
            onClick={handleConfirm}
            disabled={!url || isUploading}
            className="flex-[2] py-4 px-6 bg-[#5A4FCF] text-white rounded-2xl text-[15px] font-bold shadow-[0_12px_24px_-8_rgba(90,79,207,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2.5"
          >
            <Check size={20} strokeWidth={2.5} /> Use This Media
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

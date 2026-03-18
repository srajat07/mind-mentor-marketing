import { Handle, Position, useEdges, useNodeId } from "reactflow";
import { Plus, Trash2, X, Image as ImageIcon, ExternalLink, Settings2, Trash } from "lucide-react";
import React, { useState } from "react";
import MediaPickerModal from "./MediaPickerModal";

// ── Delete button — outside the box (overflow: visible ensures clickability)
function DeleteBtn({ onDelete }: { onDelete?: () => void }) {
  return (
    <button
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
      style={{
        position: "absolute", top: -8, right: -8,
        width: 14, height: 14, borderRadius: "50%",
        background: "#fff", border: "1px solid #e2e8f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#5A4FCF", cursor: "pointer", zIndex: 20,
        padding: 0, lineHeight: 1,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
      }}
      className="opacity-0 group-hover/node:opacity-100 hover:!text-red-500 hover:!border-red-300 transition-all cursor-pointer"
    >
      <X size={7} />
    </button>
  );
}

// ── Handle styles — 10×10 so they're clickable on a small node ────────────
const TOP_H: React.CSSProperties = { backgroundColor: "#5A4FCF", width: 10, height: 10, top: -4 };
const BOTTOM_H: React.CSSProperties = { backgroundColor: "#5A4FCF", width: 10, height: 10, bottom: -4 };
const WHITE_H: React.CSSProperties = { backgroundColor: "#fff", width: 10, height: 10, top: -4 };

// ── Base container — overflow:visible so handles/delete sit on the border ─
const base = (sel: boolean, bg = "#fff", bdr?: string): React.CSSProperties => ({
  width: 140, minHeight: 80, padding: 6,
  boxSizing: "border-box", background: bg,
  border: `2px solid ${bdr ?? (sel ? "#5A4FCF" : "#e2e8f0")}`,
  borderRadius: 7, position: "relative",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  overflow: "visible",          // ← CRITICAL — never clip handles/delete icon
});

// ── Typography helpers ────────────────────────────────────────────────────
const tagStyle: React.CSSProperties = {
  fontSize: 8, fontWeight: 700, textTransform: "uppercase",
  letterSpacing: "0.07em", color: "#5A4FCF", marginBottom: 3,
};
const mainInput = (color = "#1e293b"): React.CSSProperties => ({
  fontSize: 10, lineHeight: 1.2, fontWeight: 600, width: "100%",
  background: "transparent", border: "none", outline: "none",
  padding: 0, color, boxSizing: "border-box",
});
const subInput = (color = "#64748b"): React.CSSProperties => ({
  fontSize: 9, width: "100%", background: "transparent",
  border: "none", outline: "none", padding: 0,
  color, boxSizing: "border-box",
});

// ── Image Preview Helper ──────────────────────────────────────────────────
function ImagePreview({ url }: { url?: string }) {
  if (!url) return null;
  // Basic validation for common image extensions or base64
  const isValid = /\.(jpg|jpeg|png|gif|webp|svg)$|i|^data:image\/[a-z]+;base64,/.test(url);
  if (!isValid) return null;

  return (
    <div className="relative group/img inline-block ml-1 align-middle">
      <span style={{ fontSize: 10, cursor: "help", filter: "grayscale(1)" }} className="hover:filter-none transition-all">🖼️</span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-1.5 bg-white border border-slate-200 rounded-lg shadow-2xl opacity-0 group-hover/img:opacity-100 pointer-events-none transition-all z-[999] scale-95 group-hover/img:scale-100 origin-bottom" style={{ width: 150 }}>
        <img src={url} alt="Preview" style={{ width: "100%", height: "auto", borderRadius: 4, display: "block" }} />
        <div style={{ fontSize: 7, color: "#94a3b8", marginTop: 4, wordBreak: "break-all", textAlign: "center" }}>Preview</div>
      </div>
    </div>
  );
}

// ── Media Toggle Input ────────────────────────────────────────────────────
function MediaInput({ label, value, onChange }: { label: string, value?: string, onChange: (val: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setShow(!show); }}
          style={{
            fontSize: 8, fontWeight: 700, color: value ? "#5A4FCF" : "#94a3b8",
            background: show ? "#f1f5f9" : "none", border: "1px solid #e2e8f0",
            borderRadius: 4, padding: "1px 4px", cursor: "pointer", display: "flex", alignItems: "center", gap: 2
          }}
          className="hover:!border-[#5A4FCF] transition-all cursor-pointer"
        >
          <ImageIcon size={8} /> {label} {value && <ImagePreview url={value} />}
        </button>
      </div>
      {show && (
        <input
          type="text"
          value={value || ""}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => { e.stopPropagation(); onChange(e.target.value); }}
          placeholder="Image URL…"
          style={{
            ...subInput("#475569"), background: "#f8fafc",
            border: "1px solid #e2e8f0", borderRadius: 3, padding: "2px 4px",
            marginTop: 2, boxSizing: "border-box", fontSize: 8
          }}
        />
      )}
    </div>
  );
}

// ── Media Trigger Helper ──────────────────────────────────────────────────
function MediaTrigger({ value, onClick, onClear }: { value?: string, onClick: () => void, onClear: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        style={{
          width: 24, height: 24, borderRadius: 5, border: "2px solid #e2e8f0",
          background: value ? "#fff" : "#f8fafc", cursor: "pointer",
          display: "flex", alignItems: "center", justifyItems: "center",
          padding: 0, overflow: "hidden", position: "relative"
        }}
        className="group/trigger hover:border-[#5A4FCF] transition-all cursor-pointer"
      >
        {value ? (
          <>
            <img src={value} className="w-full h-full object-cover" alt="Thumb" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/trigger:opacity-100 flex items-center justify-center transition-opacity text-white">
              <ImageIcon size={10} />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 group-hover/trigger:text-[#5A4FCF]">
            <ImageIcon size={12} />
          </div>
        )}
        {value && <ImagePreview url={value} />}
      </button>

      {value && (
        <button
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          className="p-1 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded transition-all cursor-pointer active:scale-90"
          title="Remove Media"
        >
          <Trash size={10} />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 1. Question Node
// ─────────────────────────────────────────────────────────────────────────
export function QuestionNode({ data, selected }: any) {
  const id = useNodeId();
  const edges = useEdges();
  const { onUpdate, onDelete, label, options = [], qtype } = data;
  const isMulti = qtype === "MULTI_SELECT";

  const [activeMediaIdx, setActiveMediaIdx] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const addOption = () => onUpdate?.({
    options: [...options, ""],
    optionImages: [...(data.optionImages || []), ""]
  });
  const changeOption = (i: number, val: string) => {
    const next = [...options]; next[i] = val; onUpdate?.({ options: next });
  };
  const changeOptionImage = (i: number, val: string) => {
    const next = data.optionImages ? [...data.optionImages] : new Array(options.length).fill("");
    next[i] = val;
    onUpdate?.({ optionImages: next });
  };
  const removeOption = (i: number) => {
    onUpdate?.({
      options: options.filter((_: string, j: number) => j !== i),
      optionImages: (data.optionImages || []).filter((_: string, j: number) => j !== i)
    });
  };

  // Function to check if a specific source handle has an outgoing connection
  const handleConnected = (handleId: string | null) =>
    edges.some(e => e.source === id && e.sourceHandle === (handleId === "multi-source" ? null : handleId));

  const isConnected = edges.some(e => e.source === id);

  return (
    <div style={base(selected)} className="group/node">
      {/* Target (input) handle — always top-center */}
      <Handle type="target" position={Position.Top} style={TOP_H} onMouseDown={(e) => e.stopPropagation()} />
      <DeleteBtn onDelete={onDelete} />

      {/* ── Header row ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={tagStyle}>Question</span>
        <select
          value={qtype || "SINGLE_SELECT"}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            // isTypeSwitch = true clears connections for this node in parent state
            onUpdate?.({ qtype: e.target.value }, true);
          }}
          style={{ fontSize: 8, background: "#f8fafc", border: "none", outline: "none", color: "#64748b", cursor: "pointer", maxWidth: 52 }}
        >
          <option value="SINGLE_SELECT">Single</option>
          <option value="MULTI_SELECT">Multi</option>
        </select>
      </div>

      {/* ── Question label ─────────────────────────────────────────── */}
      <input
        type="text"
        value={label || ""}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => { e.stopPropagation(); onUpdate?.({ label: e.target.value }); }}
        placeholder="Question…"
        style={{ ...mainInput(), borderBottom: "1px dashed #e2e8f0", paddingBottom: 2, marginBottom: 4 }}
      />

      {/* ── Options ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>
            Options
          </div>
          {/* Mode badge so user knows current branching behaviour */}
          <div style={{
            fontSize: 7, fontWeight: 700, borderRadius: 4, padding: "1px 4px",
            background: isMulti ? "#f0fdf4" : "#eef2ff",
            color: isMulti ? "#16a34a" : "#5A4FCF",
            border: `1px solid ${isMulti ? "#bbf7d0" : "#c7d2fe"}`,
          }}>
            {isMulti ? "→ 1 exit" : "→ N exits"}
          </div>
        </div>

        {options.map((opt: string, i: number) => {
          const handleId = `handle-${i}`;
          const isConnected = handleConnected(handleId);

          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 2, position: "relative", paddingRight: 14 }}
              className="group/opt"
            >
              <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, gap: 1 }}>
                <input
                  type="text"
                  value={opt}
                  onMouseDown={(e) => e.stopPropagation()}
                  onChange={(e) => { e.stopPropagation(); changeOption(i, e.target.value); }}
                  placeholder={`Option ${i + 1}`}
                  style={{
                    fontSize: 9, padding: "1px 4px",
                    background: "#f8fafc", border: "1px solid #e2e8f0",
                    borderRadius: 3, outline: "none", color: "#475569",
                    minWidth: 0, boxSizing: "border-box", width: "100%"
                  }}
                />
                <MediaTrigger
                  value={data.optionImages?.[i]}
                  onClick={() => { setActiveMediaIdx(i); setModalOpen(true); }}
                  onClear={() => changeOptionImage(i, "")}
                />
              </div>

              <MediaPickerModal
                isOpen={modalOpen}
                initialValue={activeMediaIdx !== null ? data.optionImages?.[activeMediaIdx] : ""}
                onSelect={(url) => { if (activeMediaIdx !== null) changeOptionImage(activeMediaIdx, url); }}
                onClose={() => { setModalOpen(false); setActiveMediaIdx(null); }}
                title={activeMediaIdx !== null ? `Media for Option ${activeMediaIdx + 1}` : "Select Media"}
              />
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); removeOption(i); }}
                style={{ padding: 0, background: "none", border: "none", cursor: "pointer", color: "#cbd5e1", flexShrink: 0, alignSelf: "flex-start", marginTop: 4 }}
                className="opacity-0 group-hover/opt:opacity-100 hover:!text-red-500 transition-all cursor-pointer"
              >
                <Trash2 size={10} />
              </button>

              {/*
                SINGLE-SELECT: One source handle per option row.
                VANISHES if an edge already originates from it (handle-specific).
              */}
              {!isMulti && !isConnected && (
                <Handle
                  type="source"
                  position={Position.Right}
                  id={handleId}
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: "#5A4FCF", width: 10, height: 10,
                    position: "absolute", right: -10, top: "50%",
                    transform: "translateY(-50%)",
                    border: "2px solid #fff",
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Add Option */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); addOption(); }}
          style={{
            width: "100%", padding: "4px 8px",
            background: "none", border: "1px dashed #e2e8f0",
            borderRadius: 3, fontSize: 10, fontWeight: 600,
            color: "#94a3b8", cursor: "pointer", marginTop: 2,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 2,
          }}
          className="hover:!text-[#5A4FCF] hover:!border-[#5A4FCF] hover:!bg-indigo-50 transition-all cursor-pointer"
        >
          <Plus size={8} /> Add Option
        </button>
      </div>

      {/*
        MULTI-SELECT: Single bottom exit.
        VANISHES if node already has an outgoing connection.
      */}
      {isMulti && !isConnected && (
        <Handle
          type="source"
          position={Position.Bottom}
          onMouseDown={(e) => e.stopPropagation()}
          style={{ ...BOTTOM_H, backgroundColor: "#5A4FCF" }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Statement Node
// ─────────────────────────────────────────────────────────────────────────
export function StatementNode({ data, selected }: any) {
  const id = useNodeId();
  const edges = useEdges();
  const { onUpdate, onDelete, title, desc, isStart } = data;
  const [modalOpen, setModalOpen] = useState(false);

  // Check for outgoing connection (source = this node)
  const isConnected = edges.some(e => e.source === id);

  const borderColor = isStart
    ? "#22c55e"
    : selected ? "#5A4FCF" : "#e2e8f0";

  return (
    <div
      style={{ ...base(selected), border: `2px solid ${borderColor}` }}
      className="group/node"
    >
      {/* Hide Top handle if START point */}
      {!isStart && <Handle type="target" position={Position.Top} style={TOP_H} onMouseDown={(e) => e.stopPropagation()} />}
      {!isStart && <DeleteBtn onDelete={onDelete} />}

      {isStart && (
        <div style={{
          position: "absolute", top: -8, left: 6,
          background: "#22c55e", color: "#fff",
          fontSize: 7, fontWeight: 800,
          padding: "1px 5px", borderRadius: 4,
          textTransform: "uppercase", letterSpacing: "0.06em",
          boxShadow: "0 1px 3px rgba(34,197,94,0.4)",
        }}>
          START
        </div>
      )}

      <div style={{ ...tagStyle, color: isStart ? "#16a34a" : "#5A4FCF", marginTop: isStart ? 6 : 0 }}>
        Statement
      </div>

      <input
        type="text" value={title || ""}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => { e.stopPropagation(); onUpdate?.({ title: e.target.value }); }}
        placeholder="Title"
        style={{ ...mainInput(), marginBottom: 2 }}
      />
      <textarea
        value={desc || ""} onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => { e.stopPropagation(); onUpdate?.({ desc: e.target.value }); }}
        placeholder="Description…" rows={2}
        style={{ ...subInput(), resize: "none", lineHeight: 1.4, marginBottom: 4 }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Illustration</span>
        <MediaTrigger
          value={data.image}
          onClick={() => setModalOpen(true)}
          onClear={() => onUpdate?.({ image: "" })}
        />
      </div>

      <MediaPickerModal
        isOpen={modalOpen}
        initialValue={data.image}
        onSelect={(url) => onUpdate?.({ image: url })}
        onClose={() => setModalOpen(false)}
        title="Slide Illustration"
      />

      {/* Hide Source Handle if already connected */}
      {!isConnected && <Handle type="source" position={Position.Bottom} onMouseDown={(e) => e.stopPropagation()} style={BOTTOM_H} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Terminal Node
// ─────────────────────────────────────────────────────────────────────────
export function TerminalNode({ data, selected }: any) {
  const { onUpdate, onDelete, resultTitle, url } = data;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      style={{
        ...base(selected, "#fef2f2", selected ? "#ef4444" : "#ef4444"),
        border: `2px solid ${selected ? "#ef4444" : "#ef4444"}`
      }}
      className="group/node"
    >
      <Handle type="target" position={Position.Top} style={{ ...TOP_H, backgroundColor: "#ef4444" }} onMouseDown={(e) => e.stopPropagation()} />
      <DeleteBtn onDelete={onDelete} />

      <div style={{
        position: "absolute", top: -8, left: 6,
        background: "#ef4444", color: "#fff",
        fontSize: 7, fontWeight: 800,
        padding: "1px 5px", borderRadius: 4,
        textTransform: "uppercase", letterSpacing: "0.06em",
        boxShadow: "0 1px 3px rgba(239,68,68,0.4)",
      }}>
        FINAL RESULT
      </div>

      <div style={{ ...tagStyle, color: "#ef4444", marginTop: 6 }}>Result</div>

      <input
        type="text" value={resultTitle || ""}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => { e.stopPropagation(); onUpdate?.({ resultTitle: e.target.value }); }}
        placeholder="Result title…"
        style={{ ...mainInput("#1e293b"), marginBottom: 4 }}
      />

      <div style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 2 }}>
        Result URL *
      </div>
      <input
        type="text" value={url || ""}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => { e.stopPropagation(); onUpdate?.({ url: e.target.value }); }}
        placeholder="/plans or https://…"
        style={{
          ...subInput("#475569"), background: "#fff",
          border: "1px solid #fca5a5", borderRadius: 3, padding: "2px 4px",
          boxSizing: "border-box", marginBottom: 6
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Main Result Image</span>
        <MediaTrigger
          value={data.image}
          onClick={() => setModalOpen(true)}
          onClear={() => onUpdate?.({ image: "" })}
        />
      </div>

      <MediaPickerModal
        isOpen={modalOpen}
        initialValue={data.image}
        onSelect={(url) => onUpdate?.({ image: url })}
        onClose={() => setModalOpen(false)}
        title="Result Image"
      />
      {/* Zero outgoing handles (no source handles) */}
    </div>
  );
}

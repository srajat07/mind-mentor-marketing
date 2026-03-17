"use client";

import { HelpCircle, AlignLeft, Flag } from "lucide-react";

interface EditorToolbarProps {
  onAdd: (type: string) => void;
}

export default function EditorToolbar({ onAdd }: EditorToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 60,
        padding: "0 20px",
        background: "#f8f9fa",
        borderBottom: "1px solid #ddd",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginRight: 4,
        }}
      >
        Add Node:
      </span>

      {/* Question */}
      <button
        onClick={() => onAdd("question")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
          color: "#5A4FCF",
          cursor: "pointer",
          height: 36,
        }}
      >
        <HelpCircle size={13} />
        Question
      </button>

      {/* Statement */}
      <button
        onClick={() => onAdd("statement")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
          color: "#2563eb",
          cursor: "pointer",
          height: 36,
        }}
      >
        <AlignLeft size={13} />
        Statement
      </button>

      {/* Terminal / Result */}
      <button
        onClick={() => onAdd("terminal")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
          color: "#16a34a",
          cursor: "pointer",
          height: 36,
        }}
      >
        <Flag size={13} />
        Result
      </button>

      <span style={{ marginLeft: "auto", fontSize: 10, color: "#94a3b8" }}>
        Drag handles to connect · Select + Delete to remove
      </span>
    </div>
  );
}

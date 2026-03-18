"use client";

import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { QuestionNode, StatementNode, TerminalNode } from "@/components/admin/quiz/CustomNodes";
import EditorToolbar from "@/components/admin/quiz/EditorToolbar";
import { getQuestionnaire, saveDraft, publishQuestionnaire } from "@/app/actions/quizActions";
import { Save, Send } from "lucide-react";

const nodeTypes = {
  question: QuestionNode,
  statement: StatementNode,
  terminal: TerminalNode,
};

const initialNodes: any[] = [
  {
    id: "node-1",
    type: "statement",
    position: { x: 100, y: 100 },
    data: { title: "Welcome to Mind Mentor", desc: "Let's find your AI path." },
  },
];

const initialEdges: any[] = [];

function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // ── useReactFlow gives screenToFlowPosition + fitView ─────────────────────
  const { screenToFlowPosition, fitView } = useReactFlow();

  // ── Stable callbacks ───────────────────────────────────────────────────────
  const onUpdateNode = useCallback(
    (id: string, newData: any) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...newData } } : n))
      );
    },
    [setNodes]
  );

  const onDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    },
    [setNodes, setEdges]
  );

  // ── Load from DB ───────────────────────────────────────────────────────────
  useEffect(() => {
    async function loadData() {
      const data = await getQuestionnaire();
      if (data?.nodes?.length) {
        const hydrated = data.nodes.map((node: any) => ({
          ...node,
          data: {
            ...node.data,
            onUpdate: (d: any) => onUpdateNode(node.id, d),
            onDelete: () => onDeleteNode(node.id),
          },
        }));
        setNodes(hydrated);
        setEdges(data.edges || []);
        setTimeout(() => fitView({ padding: 0.6, duration: 200 }), 150);
      }
    }
    loadData();
  }, [setNodes, setEdges, fitView, onUpdateNode, onDeleteNode]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodesDelete = useCallback(
    (deleted: any[]) => {
      const ids = deleted.map((n) => n.id);
      setEdges((eds) =>
        eds.filter((e) => !ids.includes(e.source) && !ids.includes(e.target))
      );
    },
    [setEdges]
  );

  // ── Save ──────────────────────────────────────────────────────────────────
  const onSave = async () => {
    setSaving(true);
    try {
      const clean = nodes.map(({ data, ...node }: any) => {
        const { onUpdate, onDelete, ...rest } = data;
        return { ...node, data: rest };
      });
      await saveDraft(clean, edges);
      alert("Draft saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save draft.");
    } finally {
      setSaving(false);
    }
  };

  // ── Publish ────────────────────────────────────────────────────────────────
  const onPublish = async () => {
    setPublishing(true);
    try {
      await publishQuestionnaire();
      alert("Questionnaire published live!");
    } catch (e) {
      console.error(e);
      alert("Failed to publish.");
    } finally {
      setPublishing(false);
    }
  };

  // ── Add node: screenToFlowPosition with window center ─────────────────────
  // Spawns EXACTLY where the user's eyes are per the spec
  const addNode = (type: string) => {
    const newNodeId = Math.random().toString();

    const center = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const newNode = {
      id: newNodeId,
      type,
      position: center,
      selected: true,
      data: {
        label: type === "question" ? "New Question" : "",
        title: type === "statement" ? "New Statement" : "",
        desc: type === "statement" ? "Enter description here" : "",
        options: type === "question" ? ["Option 1", "Option 2"] : [],
        type: type === "question" ? "SINGLE_SELECT" : undefined,
        resultTitle: type === "terminal" ? "Final Result" : "",
        url: type === "terminal" ? "/plans" : "",
        onUpdate: (d: any) => onUpdateNode(newNodeId, d),
        onDelete: () => onDeleteNode(newNodeId),
      },
    };

    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })).concat(newNode));

    // Zoom camera way out so new node appears small and centered
    setTimeout(() => {
      fitView({ padding: 2.0, duration: 500 });
    }, 80);
  };

  return (
    <div
      className="-m-8"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {/* ── Title Bar ──────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: 0 }}>
            Flow Editor
          </h2>
          <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>
            Design your questionnaire logic
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onSave}
            disabled={saving}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", background: "#fff",
              border: "1px solid #e2e8f0", borderRadius: 8,
              fontSize: 12, fontWeight: 600, color: "#334155", cursor: "pointer",
            }}
          >
            <Save size={13} />
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={onPublish}
            disabled={publishing}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", background: "#5A4FCF",
              border: "none", borderRadius: 8,
              fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer",
            }}
          >
            <Send size={13} />
            {publishing ? "Publishing…" : "Publish Live"}
          </button>
        </div>
      </div>

      {/* ── EditorToolbar (exactly 60px tall, no sidebar) ─────────────────── */}
      <EditorToolbar onAdd={addNode} />

      {/* ── React Flow Canvas — 75vh with inline style as specified ──────── */}
      <div style={{ height: "75vh", width: "100%", border: "1px solid #e2e8f0" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.6 }}
          deleteKeyCode={["Backspace", "Delete"]}
          style={{ width: "100%", height: "100%" }}
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(n) =>
              n.type === "terminal" ? "#5A4FCF" : n.type === "question" ? "#e0e7ff" : "#f1f5f9"
            }
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}

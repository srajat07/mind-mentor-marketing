"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { QuestionNode, StatementNode, TerminalNode } from "@/components/admin/quiz/CustomNodes";
import { getQuizData, saveQuizDraft, publishQuizLive } from "@/app/actions/quizActions";
import { Save, Send, Plus, AlertCircle } from "lucide-react";

const nodeTypes = {
  question: QuestionNode,
  statement: StatementNode,
  terminal: TerminalNode,
};

// The default starting node — flagged isStart: true so it cannot be deleted
const initialNodes: any[] = [
  {
    id: "node-start",
    type: "statement",
    position: { x: 250, y: 80 },
    data: {
      isStart: true,
      title: "Welcome to MindMentor",
      desc: "Let's find your AI learning path.",
    },
  },
];

const initialEdges: any[] = [];

// ── BFS: check if a terminal node is reachable from the start node ───────────
function hasPathToTerminal(nodes: any[], edges: any[]): boolean {
  const startNode = nodes.find((n) => n.data?.isStart);
  if (!startNode) return false;

  const terminalIds = new Set(nodes.filter((n) => n.type === "terminal").map((n) => n.id));
  if (terminalIds.size === 0) return false;

  const visited = new Set<string>();
  const queue = [startNode.id];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    if (terminalIds.has(current)) return true;
    edges
      .filter((e) => e.source === current)
      .forEach((e) => queue.push(e.target));
  }
  return false;
}

function FlowEditor() {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const { screenToFlowPosition, fitView } = useReactFlow();

  // ── Derived state ─────────────────────────────────────────────────────────
  const hasTerminal = nodes.some((n) => n.type === "terminal");

  // ── Stable callbacks ──────────────────────────────────────────────────────
  const onUpdateNode = useCallback((id: string, newData: any, isTypeSwitch = false) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...newData } } : n))
    );

    // If qtype changes, clear all outgoing edges for this node and alert user
    if (isTypeSwitch && newData.qtype) {
      setEdges((eds) => eds.filter((e) => e.source !== id));
      setTimeout(() => {
        alert("Changing question type has reset your connections for this node.");
      }, 10);
    }
  }, [setNodes, setEdges]);

  const onDeleteNode = useCallback((id: string) => {
    setNodes((nds) => {
      const node = nds.find((n) => n.id === id);
      if (node?.data?.isStart) return nds; // START node: never delete
      return nds.filter((n) => n.id !== id);
    });
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  }, [setNodes, setEdges]);

  // ── Load from DB, inject callbacks + preserve isStart flag ───────────────
  useEffect(() => {
    async function loadData() {
      // 1. Try to load DRAFT first
      let resp = await getQuizData("DRAFT");
      console.log("Attempting to load DRAFT:", resp);

      // 2. Fallback to PUBLISHED if DRAFT is empty
      if (!resp || !resp.nodes || resp.nodes.length === 0) {
        resp = await getQuizData("PUBLISHED");
        console.log("DRAFT missing, attempting to load PUBLISHED:", resp);
      }

      if (resp?.nodes?.length) {
        const hydrated = resp.nodes.map((node: any) => ({
          ...node,
          data: {
            ...node.data,
            onUpdate: (d: any, s?: boolean) => onUpdateNode(node.id, d, s),
            onDelete: () => onDeleteNode(node.id),
          },
        }));
        setNodes(hydrated);
        
        // Migrate legacy 'opt-' handle IDs to 'handle-' format
        const migratedEdges = (resp.edges || []).map((edge: any) => {
          if (edge.sourceHandle && edge.sourceHandle.startsWith("opt-")) {
            return { ...edge, sourceHandle: edge.sourceHandle.replace("opt-", "handle-") };
          }
          return edge;
        });
        
        // Delay setting edges to ensure nodes (and their handles) are rendered first
        setTimeout(() => {
          setEdges(migratedEdges);
        }, 100);
      }
    }
    loadData();
  }, [setNodes, setEdges, onUpdateNode, onDeleteNode]);

  const onConnect = useCallback(
    (params: any) => {
      if (params.source === params.target) return;

      // Feature: Automatic Edge Replacement
      // If a line is drawn from an occupied handle, remove the old one first.
      setEdges((eds) => {
        const filtered = eds.filter(
          (e) => !(e.source === params.source && e.sourceHandle === params.sourceHandle)
        );
        return addEdge(params, filtered);
      });
    },
    [setEdges]
  );

  // Real-time validation: strictly enforce one outgoing connection per handle
  const isValidConnection = useCallback((connection: any) => {
    if (connection.source === connection.target) return false;

    // Rule 1: A sourceHandle can only have ONE outgoing edge
    const alreadyConnected = edges.some(
      (e) => e.source === connection.source && e.sourceHandle === connection.sourceHandle
    );

    // Rule 2: A targetHandle CAN accept multiple incoming edges 
    // (This is default behavior, so we just focus on preventing Rule 1 violations)
    if (alreadyConnected) return false;

    return true;
  }, [edges]);

  // ── Save — strips function refs before persisting ─────────────────────────
  const onSave = async () => {
    setSaving(true);
    try {
      const cleanNodes = nodes.map(({ data, ...node }: any) => {
        const { onUpdate, onDelete, ...rest } = data;
        return { ...node, data: rest };
      });
      const res = await saveQuizDraft(cleanNodes, edges);
      if (res.success) {
        setLastSaved(new Date());
        alert("Draft saved successfully!");
      } else {
        alert("Failed to save draft: " + res.error);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  // ── Publish — validates path from START → TERMINAL before saving ──────────
  const onPublish = async () => {
    // 1. Is there a START node connected?
    const startNode = nodes.find(n => n.data?.isStart);
    const startConnected = edges.some(e => e.source === startNode?.id);
    if (!startConnected) {
      alert("Your START node must be connected to a next step before publishing.");
      return;
    }

    // 2. Is there a TERMINAL node connected?
    const terminalNode = nodes.find(n => n.type === "terminal");
    const terminalConnected = edges.some(e => e.target === terminalNode?.id);
    if (!terminalConnected) {
      alert("Your FINAL RESULT node must have an incoming connection before publishing.");
      return;
    }

    // 3. Is there a path from START to TERMINAL?
    if (!hasPathToTerminal(nodes, edges)) {
      alert("Your questionnaire must have a complete path from START to a FINAL RESULT node.");
      return;
    }

    setPublishing(true);
    try {
      // Sanitize nodes before sending to server
      const cleanNodes = nodes.map(({ data, ...node }: any) => {
        const { onUpdate, onDelete, ...rest } = data;
        return { ...node, data: rest };
      });

      const res = await publishQuizLive(cleanNodes, edges);
      if (res.success) {
        alert("Quiz is now LIVE!");
        // Refresh editor to reflect published state
        window.location.reload();
      } else {
        alert("Failed to publish: " + res.error);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred while publishing.");
    } finally {
      setPublishing(false);
    }
  };

  // ── Edge deletion ─────────────────────────────────────────────────────────
  const onNodesDelete = useCallback(
    (deleted: any[]) => {
      const ids = deleted.filter((n) => !n.data?.isStart).map((n) => n.id);
      setEdges((eds) => eds.filter((e) => !ids.includes(e.source) && !ids.includes(e.target)));
    },
    [setEdges]
  );

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: any) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const onEdgesDelete = useCallback(
    (deleted: any[]) => {
      const ids = new Set(deleted.map((e) => e.id));
      setEdges((eds) => eds.filter((e) => !ids.has(e.id)));
    },
    [setEdges]
  );

  // ── Add node — center of current viewport ────────────────────────────────
  const addNode = (type: string) => {
    // Guard: only one terminal allowed
    if (type === "terminal" && hasTerminal) {
      alert("A Final Result node already exists. Only one terminal is allowed.");
      return;
    }

    const newNodeId = `node-${Date.now()}`;
    const position = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const newNode: any = {
      id: newNodeId,
      type,
      position,
      data: {
        label: type === "question" ? "New Question" : "",
        title: type === "statement" ? "New Statement" : "",
        desc: type === "statement" ? "Enter description here" : "",
        options: type === "question" ? ["Option 1", "Option 2"] : [],
        qtype: type === "question" ? "SINGLE_SELECT" : undefined,
        resultTitle: type === "terminal" ? "Final Result" : "",
        url: type === "terminal" ? "/plans" : "",
        isStart: false,
        onUpdate: (d: any, s?: boolean) => onUpdateNode(newNodeId, d, s),
        onDelete: () => onDeleteNode(newNodeId),
      },
    };

    setNodes((nds) => [...nds.map((n) => ({ ...n, selected: false })), newNode]);
    setTimeout(() => fitView({ padding: 2.5, duration: 400 }), 80);
  };

  return (
    <div className="-m-8 flex flex-col">

      {/* ── Combined toolbar ───────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex", flexDirection: "row",
          alignItems: "center", gap: "0.75rem",
          padding: "0 1rem", height: 52,
          background: "#ffffff", borderBottom: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginRight: 4 }}>
          Flow Editor
        </span>
        {lastSaved && (
          <span style={{ fontSize: 10, color: "#94a3b8" }}>
            Last saved: {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
        <div style={{ width: 1, height: 20, background: "#e2e8f0" }} />

        {/* Question */}
        <button
          onClick={() => addNode("question")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", background: "#eef2ff",
            border: "1px solid #c7d2fe", borderRadius: 7,
            fontSize: 12, fontWeight: 600, color: "#5A4FCF", cursor: "pointer",
          }}
        >
          <Plus size={12} /> Question
        </button>

        {/* Statement */}
        <button
          onClick={() => addNode("statement")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", background: "#eff6ff",
            border: "1px solid #bfdbfe", borderRadius: 7,
            fontSize: 12, fontWeight: 600, color: "#2563eb", cursor: "pointer",
          }}
        >
          <Plus size={12} /> Statement
        </button>

        {/* Result — disabled when terminal already exists */}
        <button
          onClick={() => addNode("terminal")}
          disabled={hasTerminal}
          title={hasTerminal ? "A Final Result node already exists" : "Add Result node"}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px",
            background: hasTerminal ? "#f1f5f9" : "#f0fdf4",
            border: `1px solid ${hasTerminal ? "#e2e8f0" : "#bbf7d0"}`,
            borderRadius: 7, fontSize: 12, fontWeight: 600,
            color: hasTerminal ? "#94a3b8" : "#16a34a",
            cursor: hasTerminal ? "not-allowed" : "pointer",
            opacity: hasTerminal ? 0.6 : 1,
          }}
        >
          {hasTerminal
            ? <><AlertCircle size={12} /> Result (Added)</>
            : <><Plus size={12} /> Result</>
          }
        </button>

        {/* Save / Publish */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={onSave}
            disabled={saving}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 14px", background: "#fff",
              border: "1px solid #e2e8f0", borderRadius: 7,
              fontSize: 12, fontWeight: 600, color: "#334155",
              cursor: "pointer", opacity: saving ? 0.5 : 1,
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
              padding: "5px 14px", background: "#5A4FCF", border: "none",
              borderRadius: 7, fontSize: 12, fontWeight: 600,
              color: "#fff", cursor: "pointer", opacity: publishing ? 0.5 : 1,
            }}
          >
            <Send size={13} />
            {publishing ? "Publishing…" : "Publish Live"}
          </button>
        </div>
      </div>

      {/* ── React Flow Canvas ──────────────────────────────────────────────── */}
      <div
        ref={reactFlowWrapper}
        style={{ height: "calc(100vh - 120px)", width: "100%", position: "relative" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          onEdgeClick={onEdgeClick}
          isValidConnection={isValidConnection}
          nodeTypes={nodeTypes}
          deleteKeyCode={["Backspace", "Delete"]}
          fitView
          fitViewOptions={{ padding: 1.5 }}
          style={{ width: "100%", height: "100%" }}
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: "#94a3b8" },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
          }}
          edgesFocusable={true}
        >
          <Background color="#cbd5e1" gap={16} />
          <Controls />
          <MiniMap
            nodeColor={(n) =>
              n.data?.isStart ? "#22c55e"
                : n.type === "terminal" ? "#ef4444"
                  : n.type === "question" ? "#5A4FCF"
                    : "#94a3b8"
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

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import SendMessageNode from "./components/SendMessageNode";
import Sidebar from "./components/Sidebar";

const nodeTypes = {
  sendMessage: SendMessageNode,
};

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null); // 'error' | 'success' | null

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => {
      const hasEdge = edges.find((e) => e.source === connection.source);
      if (!hasEdge) {
        setEdges((eds) => addEdge({ ...connection, type: "smoothstep" }, eds));
      }
    },
    [edges]
  );

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const handleSave = () => {
    const targetMap = {};
    edges.forEach((e) => {
      targetMap[e.target] = true;
    });

    const unconnected = nodes.filter((n) => !targetMap[n.id]);

    if (nodes.length > 1 && unconnected.length > 1) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("success");
    setTimeout(() => setSaveStatus(null), 3000); // hide message after 3 sec
  };

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen w-full font-sans">
        <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
          {saveStatus === "error" && (
            <div className="text-red-600 bg-red-100 px-4 py-1 rounded">
              ❌ Cannot save Flow
            </div>
          )}
          {saveStatus === "success" && (
            <div className="text-green-700 bg-green-100 px-4 py-1 rounded">
              ✅ Flow Saved Successfully
            </div>
          )}
         
          <button
            onClick={handleSave}
            className="ml-auto px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            Save Changes
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
              className="bg-white"
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>

          <Sidebar
            nodes={nodes}
            setNodes={setNodes}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

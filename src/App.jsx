import React, { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./index.css";

/** Custom "Send Message" node */
const SendMessageNode = ({ data }) => (
  <div className="px-4 py-2 bg-green-200 rounded-lg border border-green-300 min-w-[120px]">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs">✓</span>
      </div>
      <span className="font-medium text-gray-800">Send Message</span>
    </div>
    <div className="text-sm text-gray-600 mt-1">{data?.message ?? ""}</div>

    {/* Handle points */}
    <Handle
      type="source"
      position={Position.Right}
      id="source"
      className="w-3 h-3 bg-gray-400 border-2 border-white"
    />
    <Handle
      type="target"
      position={Position.Left}
      id="target"
      className="w-3 h-3 bg-gray-400 border-2 border-white"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      id="bottom"
      className="w-3 h-3 bg-gray-400 border-2 border-white"
    />
  </div>
);

/** Custom "Text" node */
const TextNode = ({ data }) => (
  <div className="px-3 py-2 bg-white rounded border border-gray-300 text-sm text-gray-700">
    {data.label}
    <Handle
      type="target"
      position={Position.Top}
      id="target"
      className="w-3 h-3 bg-gray-400 border-2 border-white"
    />
  </div>
);

/** Custom curved edge with label */
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
  const edgePath = `M ${sourceX} ${sourceY} Q ${(sourceX + targetX) / 2} ${
    (sourceY + targetY) / 2 - 50
  } ${targetX} ${targetY}`;
  return (
    <g>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        fill="none"
        stroke="#374151"
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
      />
      {data?.label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 25}
          textAnchor="middle"
          className="text-sm font-medium fill-gray-700"
        >
          {data.label}
        </text>
      )}
    </g>
  );
};

/** Node and edge type maps */
const nodeTypes = {
  sendMessage: SendMessageNode,
  textNode: TextNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

/** Initial chatbot flow */
const initialNodes = [
  {
    id: "1",
    type: "sendMessage",
    position: { x: 50, y: 100 },
    data: { message: "Welcome to the bot!" },
  },
  {
    id: "2",
    type: "sendMessage",
    position: { x: 400, y: 50 },
    data: { message: "How can I help you today?" },
  },
  {
    id: "3",
    type: "textNode",
    position: { x: 70, y: 200 },
    data: { label: "Info node" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "source",
    targetHandle: "target",
    type: "custom",
    data: { label: "Next" },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    sourceHandle: "bottom",
    targetHandle: "target",
    type: "smoothstep",
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  /** Dynamically add a new node */
  const addNode = () => {
    const newId = `${nodes.length + 1}`;
    const newNode = {
      id: newId,
      type: "sendMessage",
      data: { message: `New message ${newId}` },
      position: {
        x: Math.random() * 400,
        y: Math.random() * 300,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  /** Add edge when connecting two nodes */
  const onConnect = (connection) => {
    setEdges((eds) => addEdge({ ...connection, type: "custom" }, eds));
  };

  return (
    <div className="w-full h-screen bg-gray-100 relative">
      {/* Add Node Button */}
      <button
        onClick={addNode}
        className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        + Add Node
      </button>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-white"
      >
        <Background />
        <Controls />

        {/* Arrow definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
          </marker>
        </defs>
      </ReactFlow>
    </div>
  );
}

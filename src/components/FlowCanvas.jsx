import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import TextNode from "./TextNode";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  textNode: TextNode,
};

export default function FlowCanvas({ nodes, setNodes, edges, setEdges }) {
  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((es) => addEdge(params, es)),
    [setEdges]
  );

  return (
    <div className="h-[80vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

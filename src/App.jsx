import React, { useState } from 'react';
import FlowCanvas from './components/FlowCanvas';
import NodePanel from './components/NodePanel';
import SettingsPanel from './components/SettingsPanel';
import './index.css';

const initialNodes = [
  {
    id: '1',
    type: 'textNode',
    data: { label: 'Start' },
    position: { x: 100, y: 100 }
  }
];

const initialEdges = [];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const addNode = () => {
    const newId = `${nodes.length + 1}`;
    setNodes([
      ...nodes,
      {
        id: newId,
        type: 'textNode',
        data: { label: `Node ${newId}` },
        position: {
          x: Math.random() * 400,
          y: Math.random() * 300
        }
      }
    ]);
  };

  const validateAndSave = () => {
    if (nodes.length <= 1) {
      alert('Not enough nodes to validate.');
      return;
    }

    const targetCounts = nodes.map((node) =>
      edges.filter((e) => e.target === node.id).length
    );

    const nodesWithNoInput = targetCounts.filter((count) => count === 0);

    if (nodesWithNoInput.length > 1) {
      alert('❌ More than one node has no incoming edge.');
    } else {
      alert('✅ Flow saved successfully!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NodePanel onAdd={addNode} />
      <FlowCanvas nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
      <SettingsPanel onSave={validateAndSave} />
    </div>
  );
}

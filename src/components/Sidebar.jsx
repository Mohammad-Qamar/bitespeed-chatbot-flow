import React from 'react';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

export default function Sidebar({ nodes, setNodes, selectedNode, setSelectedNode }) {
  return (
    <div className="w-[260px] border-l p-4 bg-white">
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          nodes={nodes}
          setNodes={setNodes}
          setSelectedNode={setSelectedNode}
        />
      ) : (
        <NodesPanel setNodes={setNodes} />
      )}
    </div>
  );
}

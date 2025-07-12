import React from 'react';

const NodesPanel = ({ onAddNode }) => (
  <>
    <h2 className="text-lg font-bold mb-4">Nodes Panel</h2>
    <button
      onClick={onAddNode}
      className="w-full py-2 px-4 mb-4 bg-blue-500 text-white rounded shadow"
    >
      + Add Text Node
    </button>
  </>
);

export default NodesPanel;
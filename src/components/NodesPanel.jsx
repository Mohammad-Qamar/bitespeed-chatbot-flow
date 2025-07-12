import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

export default function NodesPanel({ setNodes }) {
  const handleAddNode = () => {
    const id = `${+new Date()}`;
    setNodes((prev) => [
      ...prev,
      {
        id,
        type: 'sendMessage',
        position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 300 },
        data: { message: 'New Message' },
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">Nodes</h2>
      <button
        onClick={handleAddNode}
        className="flex items-center justify-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded w-full hover:bg-blue-50"
      >
        <FiMessageCircle />
        Message
      </button>
    </div>
  );
}

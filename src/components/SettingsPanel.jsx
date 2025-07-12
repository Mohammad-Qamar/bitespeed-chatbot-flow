import React from "react";

export default function SettingsPanel({
  selectedNode,
  nodes,
  setNodes,
  setSelectedNode,
}) {
  if (!selectedNode || !selectedNode.data) {
    return <div className="text-sm text-gray-500">No node selected</div>;
  }

  const handleChange = (e) => {
    const updatedMessage = e.target.value;

    const updated = nodes.map((node) =>
      node.id === selectedNode.id
        ? { ...node, data: { ...node.data, message: updatedMessage } }
        : node
    );

    setNodes(updated);
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, message: updatedMessage },
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setSelectedNode(null)}
        className="text-blue-600 text-sm mb-2 hover:underline"
      >
        ← Back
      </button>
      <h3 className="text-lg font-semibold mb-2">Message</h3>
      <label className="text-sm text-gray-700 mb-1">Text</label>
      <textarea
        rows={3}
        className="w-full border rounded p-2 text-sm resize-none focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Type your message here..."
        value={selectedNode?.data?.message || ""}
        onChange={handleChange}
      />
    </div>
  );
}

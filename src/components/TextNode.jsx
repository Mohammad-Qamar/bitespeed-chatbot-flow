import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TextNode = ({ data }) => (
  <div className="p-3 bg-white rounded border border-gray-300 text-sm text-gray-800">
    {data.label || 'Text Node'}
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-400 border-white border-2" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-400 border-white border-2" />
  </div>
);

export default TextNode;

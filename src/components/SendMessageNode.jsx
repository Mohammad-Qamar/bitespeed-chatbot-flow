import React from "react";
import { Handle, Position } from "@xyflow/react";
import { FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function SendMessageNode({ data }) {
  return (
    <div className="rounded-md shadow-md bg-white border border-teal-200 w-[220px]">
      <div className="flex items-center justify-between px-3 py-1.5 bg-teal-100 border-b">
        <div className="flex items-center gap-2 font-semibold text-sm text-gray-800">
          <FiMessageCircle className="text-teal-600" />
          Send Message
        </div>
        <FaWhatsapp className="text-green-500 text-lg" />
      </div>
      <div className="text-sm text-gray-700 px-3 py-2 break-words min-h-[40px]">
        {data.message?.trim() ? (
          data.message
        ) : (
          <span className="italic text-gray-400">
            Type your message here...
          </span>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-500 rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-500 rounded-full"
      />
    </div>
  );
}

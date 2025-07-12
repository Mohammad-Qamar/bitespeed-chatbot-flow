
import React from 'react';
const SettingsPanel = ({ onSave }) => (
  <>
    <h2 className="text-lg font-bold mb-2 mt-6">Settings Panel</h2>
    <button
      onClick={onSave}
      className="w-full py-2 px-4 bg-green-600 text-white rounded shadow"
    >
      💾 Save Flow
    </button>
  </>
);

export default SettingsPanel;

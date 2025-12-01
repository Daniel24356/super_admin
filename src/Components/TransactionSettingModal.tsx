import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TransactionSettingModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-xl shadow-xl w-[420px] p-8 z-50 animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Transaction Setting
        </h2>

        {/* Form */}
        <div className="space-y-5">
          {/* Management Fee */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Management Fee (Percentage)</label>
            <input
              type="text"
              defaultValue="15%"
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-1 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* VAT */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">VAT</label>
            <input
              type="text"
              defaultValue="7.5%"
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-1 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          className="mt-8 w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full text-md font-medium transition"
        >
          Save
        </button>

      </div>
    </div>
  );
};

export default TransactionSettingModal;

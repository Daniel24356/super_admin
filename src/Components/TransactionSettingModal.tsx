import React, { useState } from "react";
import SuccessModal from "./SuccessModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TransactionSettingModal: React.FC<Props> = ({ open, onClose }) => {
  const [successOpen, setSuccessOpen] = useState(false); // ✅ success popup inside

  if (!open) return null;

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-xl shadow-xl w-[420px] p-8 pb-16 z-50 animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Transaction Setting
          </h2>

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">Management Fee (Percentage)</label>
              <input
                type="text"
                defaultValue="15%"
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>

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
            className="mt-8 w-full bg-[rgba(242,124,74,1)] hover:bg-orange-500 text-white py-3 rounded-full text-md font-medium transition"
            onClick={() => setSuccessOpen(true)} // ✅ SUCCESS POPUP
          >
            Save
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL INSIDE */}
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Fee Updated"
        message="You have successfully updated your fee."
        icon="😊"
      />
    </>
  );
};

export default TransactionSettingModal;

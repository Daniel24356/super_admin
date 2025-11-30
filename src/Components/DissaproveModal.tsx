import React, { useState } from "react";

interface DisapproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, message: string) => void;
}

const DisapproveModal: React.FC<DisapproveModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-[500px] max-w-[90%] rounded-xl shadow-xl p-6 animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Disapprove Verification Request</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">

          {/* REASON */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Reason for Disapproval
            </label>

            <div className="mt-1 relative">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-orange-400 outline-none appearance-none"
              >
                <option value="">Select option</option>
                <option value="Incomplete Documents">Incomplete Documents</option>
                <option value="Invalid Details">Invalid Details</option>
                <option value="Failed Verification">Failed Verification</option>
              </select>

              {/* dropdown icon */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                ▼
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description (Optional)
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message here..."
              className="w-full border rounded-lg px-4 py-3 text-sm h-28 resize-none mt-1 focus:ring-1 focus:ring-orange-400 outline-none"
            ></textarea>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => onSubmit(reason, message)}
          className="w-full mt-6 py-3 bg-[#F27C4A] text-white rounded-full font-medium hover:opacity-90 transition"
        >
          Submit
        </button>

      </div>
    </div>
  );
};

export default DisapproveModal;

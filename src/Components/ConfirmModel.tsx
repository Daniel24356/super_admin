import React from "react";
import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmColor?: string;   // e.g "bg-orange-500"
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  icon,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  confirmColor = "bg-[#F27C4A]",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        px-4
      "
    >
      {/* Modal Box */}
      <div
        className="
          bg-white w-full max-w-md rounded-2xl shadow-xl
          p-8 text-center relative
        "
      >
        {/* Optional Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onCancel}
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#FEE9DE] flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        {/* Message */}
        <p className="text-gray-500 text-sm mb-8">{message}</p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Cancel */}
          <button
            onClick={onCancel}
            className="
              px-8 py-2 rounded-full border border-gray-400
              text-gray-700 font-medium hover:bg-gray-100
            "
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className={`
              px-8 py-2 rounded-full text-white font-medium shadow-md
              hover:opacity-90
              ${confirmColor}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

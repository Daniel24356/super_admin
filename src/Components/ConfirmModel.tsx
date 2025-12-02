import React, { useState } from "react";
import { X } from "lucide-react";
import SuccessModal from "./SuccessModal";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmColor?: string;
  iconBgColor?: string;

  // ⭐ NEW OPTIONAL SUCCESS PROPS
  successTitle?: string;
  successMessage?: React.ReactNode;
  successIcon?: string;
  successButtonText?: string;
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
  iconBgColor = "bg-[rgba(242,124,74,1)]",

  // NEW SUCCESS PROPS
  successTitle = "User Suspended",
  successMessage = (
    <>
      You have suspended{" "}
      <span className="font-semibold text-orange-500">CityWide Hospital</span>
    </>
  ),
  successIcon = "😄",
  successButtonText = "Continue",
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {/* MAIN CONFIRM MODAL */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/40 backdrop-blur-sm
            px-4
          "
        >
          <div
            className="
              bg-white w-full max-w-md rounded-2xl shadow-xl
              p-8 text-center relative
            "
          >
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={onCancel}
            >
              <X size={20} />
            </button>

            {/* ICON */}
            <div className="flex justify-center mb-4">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${iconBgColor}`}
              >
                {icon}
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-2">{title}</h2>

            {/* MESSAGE */}
            <p className="text-gray-500 text-sm mb-8">{message}</p>

            {/* BUTTONS */}
            <div className="flex items-center justify-center gap-4">
              {/* CANCEL */}
              <button
                onClick={onCancel}
                className="
                  px-8 py-2 text-base rounded-full border border-gray-400
                  text-gray-700 font-medium hover:bg-gray-100
                "
              >
                {cancelText}
              </button>

              {/* CONFIRM */}
              <button
                onClick={() => {
                  onConfirm && onConfirm();
                  setShowSuccess(true);
                }}
                className={`
                  px-8 py-2 rounded-full text-base text-white font-medium shadow-md
                  hover:opacity-90
                  ${confirmColor}
                `}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ SUCCESS MODAL — NOW FULLY DYNAMIC */}
      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={successIcon}
        title={successTitle}
        message={successMessage}
        buttonText={successButtonText}
      />
    </>
  );
};

export default ConfirmModal;

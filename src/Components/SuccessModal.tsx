import { X } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  icon?: string; 
  title: string;
  message: React.ReactNode;
  buttonText?: string;
  buttonColor?: string; 
}

export default function SuccessModal({
  open,
  onClose,
  icon = "😊",
  title,
  message,
  buttonText = "Continue",
  buttonColor = "bg-orange-500 hover:bg-orange-600"
}: SuccessModalProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

      <div className="bg-white w-[420px] rounded-xl shadow-lg p-8 text-center relative animate-fadeIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* EMOJI / ICON */}
        <div className="text-5xl mb-4">{icon}</div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-2">
          {title}
        </h2>

        {/* MESSAGE */}
        <p className="text-sm text-gray-600 leading-relaxed px-4">
          {message}
        </p>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className={`w-full mt-6 py-2 rounded-full text-white font-medium transition ${buttonColor}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

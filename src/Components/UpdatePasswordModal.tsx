import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UpdatePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-[480px] rounded-xl shadow-xl p-6 relative">
        
        {/* Close button */}
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Update Password
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Old Password</label>
            <div className="relative mt-1">
              <input
                type={showOld ? "text" : "password"}
                placeholder="Enter old password"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <div className="relative mt-1">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-3 rounded-full transition">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;

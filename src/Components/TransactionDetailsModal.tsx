import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TransactionDetailsModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Card */}
      <div className="bg-white w-[650px] max-w-[90%] rounded-2xl shadow-xl p-8 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-8">Transaction Details</h2>

        {/* GRID SECTION */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Left */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="text-[15px] font-semibold text-orange-600">
              ABEG-TRX-092145
            </p>
          </div>

          {/* Right */}
          <div></div>

          {/* Hospital Name */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Hospital Name</p>
            <div className="flex items-center gap-2 font-medium">
              <span className="w-[22px] h-[22px] bg-gray-100 rounded flex items-center justify-center">
                🏥
              </span>
              General Hospital
            </div>
          </div>

          {/* Arrow + Operator */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Hospital Operator</p>
            <div className="flex items-center gap-2 font-medium">
              <span className="w-[22px] h-[22px] bg-gray-100 rounded flex items-center justify-center">
                🚑
              </span>
              CityWide Ambulance
            </div>
          </div>
        </div>

        {/* Arrow between columns */}
        <div className="w-full flex justify-center -mt-5 mb-4">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6bbf59"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </div>

        {/* Description Block */}
        <div className="mb-8">
          <p className="font-semibold text-[15px] mb-1">
            Emergency Transport – General Hospital
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            This transaction covers the emergency dispatch and patient transport
            from the pickup location to General Hospital, managed through the
            ABEG Ambulance System. Details include trip distance, response time,
            assigned driver and ambulance unit, and total service cost.
          </p>
        </div>

        {/* Payment Status + Date */}
        <div className="grid grid-cols-2 gap-6">
          {/* Payment Status */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="text-green-600 font-semibold text-[15px]">
              Successful
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-[15px]">12th October, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

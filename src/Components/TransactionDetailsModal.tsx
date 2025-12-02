import { X, Truck,
    Building2 } from "lucide-react";
import { PiArrowsLeftRightLight } from "react-icons/pi"; 

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
        <h2 className="text-lg font-semibold mb-8">Transaction Details</h2>

        {/* GRID SECTION */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Left */}
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Transaction ID</p>
            <p className="text-[12px] font-semibold text-[rgba(242,124,74,1)]">
              ABEG-TRX-092145
            </p>
          </div>

          {/* Right */}
          <div></div>

          <div
  className="
    w-full 
    lg:w-[590px]            /* Keep EXACT 590px at screen ≥ 1200/1280 */
    flex flex-col xl:flex-row
    items-center justify-between
    gap-4 xl:gap-0
    pb-5 border-b border-[rgba(229,231,235,1)]
  "
>

  {/* Hospital Name */}
  <div className="flex flex-col gap-1 text-center xl:text-left">
    <p className="text-xs text-gray-500">Hospital Name</p>
    <div className="flex items-center gap-2 text-xs font-medium justify-center xl:justify-start">
      <span className="w-[22px] h-[22px] bg-white rounded flex items-center justify-center">
        <Building2 size={14} />
      </span>
      General Hospital
    </div>
  </div>

  {/* Arrow */}
  <div className="w-full xl:w-[100px] flex justify-center">
    <PiArrowsLeftRightLight size={35} color="rgba(11,134,0,1)" />
  </div>

  {/* Hospital Operator */}
  <div className="flex flex-col gap-1 text-center xl:text-left">
    <p className="text-xs text-gray-500">Hospital Operator</p>
    <div className="flex items-center gap-2 text-xs font-medium justify-center xl:justify-start">
      <span className="w-[22px] h-[22px] bg-white rounded flex items-center justify-center">
        <Truck size={14} />
      </span>
      CityWide Ambulance
    </div>
  </div>

</div>


</div>
        

        {/* Description Block */}
        <div className="mb-8">
          <p className="font-semibold text-[12px] mb-1">
            Emergency Transport – General Hospital
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            This transaction covers the emergency dispatch and patient transport
            from the pickup location to General Hospital, managed through the
            ABEG Ambulance System. Details include trip distance, response time,
            assigned driver and ambulance unit, and total service cost.
          </p>
        </div>

        {/* Payment Status + Date */}
        <div className="flex items-center justify-between">
          {/* Payment Status */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="text-green-600 font-semibold text-[14px]">
              Successful
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-[14px]">12th October, 2025</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

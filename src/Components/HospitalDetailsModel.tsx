import { X, Contact, IdCard, Smile } from "lucide-react";
import { useState } from "react";
import DisapproveModal from "./DissaproveModal";

interface Props {
  open: boolean;
  onClose: () => void;
  data: any;
}

import img1 from "../assets/img-1.png";
import img2 from "../assets/img-2.png";
import img3 from "../assets/img-3.png";
import SuccessModal from "./SuccessModal";

export default function HospitalDetailsModal({ open, onClose, data }: Props) {
  const [openDisapprove, setOpenDisapprove] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedName] = useState("CityWide Hospital");
  const [successType, setSuccessType] = useState<"approved" | "disapproved" | null>(null);


  if (!open || !data) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
        <div className="bg-white w-[650px] rounded-xl shadow-xl p-6 relative animate-fadeIn">

          {/* CLOSE BUTTON */}
          <button onClick={onClose} className="absolute top-5 right-5">
            <X size={22} className="text-gray-500 hover:text-gray-700" />
          </button>

          {/* TITLE */}
          <h2 className="text-lg font-semibold mb-5">Hospital Details</h2>

          {/* TOP SECTION */}
          <div className="flex items-start justify-between border-b pb-5">
            <div className="flex gap-4">
              <img
                src={img3}
                className="w-16 h-16 rounded-md object-cover"
              />

              <div>
                <h3 className="font-semibold text-base">Metro Hospital</h3>
                <p className="text-gray-600 text-xs">info.metrohospital@gmail.com</p>
                <p className="text-gray-600 text-xs">Cadastral Zone, Abuja</p>
              </div>
            </div>

            <div className="text-right pr-4">
              <span className="text-[11px] text-[rgba(254,188,47,1)] bg-[rgba(254,188,47,0.08)] px-3 py-1 rounded-full">
                Pending
              </span>
              <p className="text-gray-700 mt-2 text-xs font-medium">
                Hospital Admin
              </p>
              <p className="text-xs text-[rgba(0,0,0,1)]">Dr. Sarah Wilson</p>
            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div className="py-5 space-y-3 text-sm">
            <p className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-medium text-xs"><Contact size={14} />Contact Number:</span>
              <span className="text-[rgba(242,124,74,1)] text-[14px]">09045678342</span>
            </p>

            <p className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-medium text-xs"><IdCard size={14} /> License Number:</span>
              <span className="text-[rgba(242,124,74,1)] text-[14px]">Dr. Sarah Wilson</span>
            </p>
          </div>

          {/* DOCUMENTS */}
          <div className="grid grid-cols-2 gap-4 border rounded-lg p-4">

            <div className="border rounded-lg p-3">
              <img src={img1} className="w-full h-32 object-contain" />
              <div className="mt-2 flex justify-between text-sm">
                <span className="font-medium text-[14px]">Certification</span>
                <span className="text-gray-500 text-[14px]">JPEG</span>
              </div>
            </div>

            <div className="border rounded-lg p-3">
              <img src={img2} className="w-full h-32 object-contain" />
              <div className="mt-2 flex justify-between text-sm">
                <span className="font-medium text-[14px]">Logo</span>
                <span className="text-gray-500 text-[14px]">JPEG</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setOpenDisapprove(true)}
              className="px-6 py-2 border text-[16px] border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
            >
              Disapprove
            </button>

            <button
              onClick={() => {
                setOpenApprove(true);
                setSuccessType("approved");
              }}
              className="px-6 py-2 rounded-full text-[16px] bg-[rgba(242,124,74,1)] text-white hover:bg-orange-600">
              Approve
            </button>
          </div>

        </div>
      </div>

      {/* DISAPPROVE MODAL */}
      <DisapproveModal
        isOpen={openDisapprove}
        onClose={() => setOpenDisapprove(false)}
        onSubmit={(reason, message) => {
          console.log("reason:", reason);
          console.log("message:", message);

          setOpenDisapprove(false);     // close disapprove modal
          setTimeout(() => setShowSuccess(true), 150); // open success modal
        }}
      />

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon="😊"
        title="Verification Disapproved"
        message={
          <>
            You have successfully disapproved{" "}
            <span className="text-[rgba(242,124,74,1)] font-semibold">{selectedName}</span>
            ’s verification.
          </>
        }
        buttonText="Continue"
      />

      <SuccessModal
        open={openApprove}
        onClose={() => setOpenApprove(false)}
        icon="😁"
        title="Verification Approved"
        message={
          <>
            You have successfully approved{" "}
            <span className="text-[rgba(242,124,74,1)] font-semibold">{selectedName}</span>
            ’s verification.
          </>
        }
        buttonText="Continue"
      />
    </>
  );
}

import { useState } from "react";
import {
  EllipsisVerticalIcon,
  FunnelIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { Eye, UserMinus, Ban, AlertTriangle } from "lucide-react";

import HospitalDetailsModal from "../../Components/HospitalDetailsModel";
import ConfirmModal from "../../Components/ConfirmModel";

interface Driver {
  name: string;
  email: string;
  operator: string;
  date: string;
  trips: number;
}

const drivers: Driver[] = [
  { name: "Amanda Kings", email: "amanda22@gmail.com", operator: "CityHill Ambulance", date: "12/10/2025 3:00 PM", trips: 3 },
  { name: "Stanley Holmes", email: "amanda22@gmail.com", operator: "24/7 Emergency Service", date: "12/10/2025 3:00 PM", trips: 5 },
  { name: "Duke Raymond", email: "amanda22@gmail.com", operator: "CityHill Ambulance", date: "12/10/2025 3:00 PM", trips: 3 },
  { name: "Smith Fred", email: "amanda22@gmail.com", operator: "Round-clock Ambulance", date: "12/10/2025 3:00 PM", trips: 2 },
  { name: "Smith Fred", email: "amanda22@gmail.com", operator: "Round-clock Ambulance", date: "12/10/2025 3:00 PM", trips: 6 },
  { name: "Smith Fred", email: "amanda22@gmail.com", operator: "Round-clock Ambulance", date: "12/10/2025 3:00 PM", trips: 4 },
];

const tabs = ["All Operators", "Pending", "Approved", "Disapproved", "Drivers"];

export default function HospitalsPage() {
  const [activeTab, setActiveTab] = useState("Drivers");
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [selectedHospital, setSelectedHospital] = useState<Driver | null>(null);

  // ✅ NEW STATES FOR SUSPEND MODAL
  const [openSuspendModal, setOpenSuspendModal] = useState(false);
  const [driverToSuspend, setDriverToSuspend] = useState<Driver | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* PAGE HEADER */}
      <h1 className="text-2xl font-semibold">Hospitals</h1>
      <p className="text-gray-600 mb-6">View and manage all hospitals here</p>

      {/* TABS */}
    <div className="mb-6">
  <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-row sm:items-center sm:gap-3">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 rounded-md border text-sm w-full sm:w-auto
          ${activeTab === tab
            ? "bg-orange-100 border-orange-400 text-orange-600"
            : "bg-white border-gray-300 text-gray-600"
          }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>


      {/* TABLE CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Drivers</h2>
          <span className="text-sm text-gray-500">Last Updated, Sept 20, 2025</span>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center px-4 py-2 border rounded-lg flex-1 bg-gray-50">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            <input
              placeholder="Search by hospitals, operators or drivers..."
              className="ml-2 w-full bg-transparent outline-none"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-50">
            <CalendarDaysIcon className="w-5 h-5" />
            Date Range
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-50">
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-orange-50 text-gray-600 text-sm">
                <th className="py-3 px-4">Driver Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4">Total Trips</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {drivers.map((d, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{d.name}</td>
                  <td className="py-3 px-4">{d.email}</td>
                  <td className="py-3 px-4">{d.operator}</td>
                  <td className="py-3 px-4">{d.date}</td>
                  <td className="py-3 px-4">{d.trips}</td>

                  {/* ACTION MENU */}
                  <td className="relative py-3 px-4">
                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                    >
                      <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                    </button>

                    {openMenuIndex === index && (
                      <div className="absolute right-10 top-6 w-44 bg-white shadow-lg rounded-xl border z-20 py-2">
                        <button
                          onClick={() => {
                            setSelectedHospital(d);
                            setOpenMenuIndex(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 text-gray-600" /> View Details
                        </button>

                        {/* 🔥 SUSPEND USER ACTION */}
                        <button
                          onClick={() => {
                            setDriverToSuspend(d);
                            setOpenMenuIndex(null);
                            setOpenSuspendModal(true);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <Ban className="w-4 h-4 text-yellow-600" /> Suspend User
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                          <UserMinus className="w-4 h-4 text-red-600" /> Remove User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 border rounded-lg bg-gray-50">Previous</button>
          <p className="text-gray-600 text-sm">Page 1 of 10</p>
          <button className="px-4 py-2 border rounded-lg bg-gray-50">Next</button>
        </div>
      </div>

      {/* DETAILS MODAL */}
      <HospitalDetailsModal
        open={!!selectedHospital}
        data={selectedHospital}
        onClose={() => setSelectedHospital(null)}
      />

      {/* 🔥 SUSPEND CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={openSuspendModal}
        onCancel={() => setOpenSuspendModal(false)}
        onConfirm={() => {
          console.log("Suspending:", driverToSuspend?.name);
          setOpenSuspendModal(false);
        }}
        title="Suspend User?"
        message={`Are you sure you want to suspend ${driverToSuspend?.name}? This action cannot be reversed.`}
        icon={<AlertTriangle className="text-orange-500" size={32} />}
        confirmText="Yes, Suspend"
        cancelText="No"
        confirmColor="bg-[#F27C4A]"
      />
    </div>
  );
}

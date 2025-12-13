import { useState, useEffect } from "react";
import {
  EllipsisVerticalIcon,
  FunnelIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Eye, UserMinus, Ban, AlertTriangle, X } from "lucide-react";
import axios from "axios";
import { ApiUrl } from "../../api";
import HospitalDetailsModal from "../../Components/HospitalDetailsModel";
import ConfirmModal from "../../Components/ConfirmModel";

interface Hospital {
  id: string;
  name?: string;
  organizationName?: string;
  email: string;
  phone?: string;
  verified: boolean;
  createdAt: string;
  userType: string;
}

interface HospitalsResponse {
  success: boolean;
  data: Hospital[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    breakdown: {
      drivers: number;
      hospitals: number;
      operators: number;
    };
  };
}

const statusOptions = ["All", "Pending", "Approved", "Disapproved"];

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState("All");
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [openSuspendModal, setOpenSuspendModal] = useState(false);
  const [driverToSuspend, setDriverToSuspend] = useState<Hospital | null>(null);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [driverToRemove, setDriverToRemove] = useState<Hospital | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDateRange, setOpenDateRange] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const response = await axios.get<HospitalsResponse>(
        `${ApiUrl}admin/users?userType=hospital&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data.success) {
        setHospitals(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setError("Failed to load hospitals");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getHospitalName = (hospital: Hospital | null | undefined) => {
    if (!hospital) return "Unknown";
    return hospital.name || hospital.organizationName || "Unknown";
  };

  const getHospitalStatus = (hospital: Hospital) => {
    if (hospital.verified) return "Approved";
    return "Pending";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-600 border border-green-600";
      case "Pending":
        return "bg-[rgb(253,245,234)] text-yellow-600 border border-yellow-600";
      case "Disapproved":
        return "bg-[rgb(249,229,229)] text-[rgb(203,32,32)] border";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-600";
    }
  };

  const filterHospitals = () => {
    return hospitals.filter((hospital) => {
      // Search filter
      const searchMatch =
        getHospitalName(hospital)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        hospital.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Date range filter
      let dateMatch = true;
      if (startDate || endDate) {
        const hospitalDate = new Date(hospital.createdAt).getTime();
        if (startDate) {
          const start = new Date(startDate).getTime();
          dateMatch = dateMatch && hospitalDate >= start;
        }
        if (endDate) {
          const end = new Date(endDate).getTime();
          dateMatch = dateMatch && hospitalDate <= end;
        }
      }

      // Status filter
      let statusMatch = true;
      const hospitalStatus = getHospitalStatus(hospital);
      if (activeTab !== "All") {
        statusMatch = hospitalStatus === activeTab;
      }

      return searchMatch && dateMatch && statusMatch;
    });
  };

  const filteredHospitals = filterHospitals();
  const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);
  const paginatedHospitals = filteredHospitals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // clearFilters removed (not referenced)

  const [, setRemoving] = useState(false);
  const [, setSuspending] = useState(false);

  const suspendHospital = async () => {
    if (!driverToSuspend) return;
    try {
      setSuspending(true);
      const body = { type: "hospital", id: driverToSuspend.id, suspend: true };
      console.log("suspendHospital body:", body);

      const resp = await axios.post(`${ApiUrl}admin/suspend-entity`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Suspend response:", resp.data);

      const updated = resp.data?.data;
      setHospitals((prev) =>
        prev.map((h) =>
          h.id === driverToSuspend.id
            ? { ...h, suspended: updated?.suspended ?? true, suspensionReason: updated?.suspensionReason ?? null, suspendedAt: updated?.suspendedAt }
            : h
        )
      );

      setDriverToSuspend(null);
      setOpenSuspendModal(false);
    } catch (err: any) {
      console.error("Error suspending hospital:", err);
      setError(err.response?.data?.message || err.message || "Failed to suspend hospital");
    } finally {
      setSuspending(false);
    }
  };

  const removeHospital = async () => {
    if (!driverToRemove) return;
    try {
      setRemoving(true);
      const body = { type: "hospital", id: driverToRemove.id };
      console.log("removeHospital body:", body);
      const resp = await axios.delete(`${ApiUrl}admin/remove-entity`, {
        data: body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Remove response:", resp.data);
      setHospitals((prev) => prev.filter((h) => h.id !== driverToRemove.id));
      setDriverToRemove(null);
      setOpenRemoveModal(false);
    } catch (err: any) {
      console.error("Error removing hospital:", err);
      console.error("response.status:", err.response?.status);
      console.error("response.data:", err.response?.data);
      setError(err.response?.data?.message || err.message || "Failed to remove hospital");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="p-3 min-h-screen">
      {/* PAGE HEADER */}
      <h1 className="text-2xl font-semibold ">Hospitals</h1>
      <p className="text-gray-600 text-sm mb-6">
        View and manage all hospitals here
      </p>

      {/* TABS */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-3 bg-white w-fit py-1 px-1 rounded-md sm:flex sm:flex-row sm:items-center sm:gap-3">
          {statusOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm w-full sm:w-auto
                ${activeTab === tab
                  ? "bg-[rgb(254,242,237)] border-orange-400 text-orange-600"
                  : "bg-transparent text-gray-600"
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
          <h2 className="text-lg font-semibold">Hospitals</h2>
          <span className="text-sm text-[rgba(0, 0, 0, 1)]">
            Total: {filteredHospitals.length}
          </span>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center px-4 py-2 border rounded-lg flex-1 bg-white">
            <MagnifyingGlassIcon className="w-5 h-5 text-black" />
            <input
              placeholder="Search by hospitals or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="ml-2 w-full text-[14px] placeholder-black bg-transparent outline-none"
            />
          </div>

          {/* Date Range Button */}
          <div className="relative">
            <button
              onClick={() => setOpenDateRange(!openDateRange)}
              className="flex items-center text-[14px] gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Date Range
            </button>

            {/* Date Range Dropdown */}
            {openDateRange && (
              <div className="absolute right-0 top-12 w-72 bg-white shadow-lg rounded-xl border z-50 p-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <button
                    onClick={() => setOpenDateRange(false)}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filters Button */}
          <button
            onClick={() => setOpenFilterMenu(!openFilterMenu)}
            className="flex items-center text-[14px] gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50"
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>

          <button className="flex items-center text-[14px] gap-2 px-4 py-2 text-[rgb(244,148,108)] border border-[rgb(244,148,108)] rounded-lg bg-white">
            Send Bulk Emails
            <FunnelIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || startDate || endDate) && (
          <div className="mb-4 flex flex-wrap gap-2 items-center pb-3 border-b">
            <span className="text-xs text-gray-600">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium flex items-center gap-1">
                Search: "{searchQuery}"
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="ml-1 hover:text-orange-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {startDate && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                From: {startDate}
                <button
                  onClick={() => {
                    setStartDate("");
                    setCurrentPage(1);
                  }}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {endDate && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                To: {endDate}
                <button
                  onClick={() => {
                    setEndDate("");
                    setCurrentPage(1);
                  }}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin">
              <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full"></div>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && paginatedHospitals.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">No hospitals found</p>
          </div>
        )}

        {/* TABLE */}
        {!loading && paginatedHospitals.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-[rgb(254,242,237)] text-gray-600 text-[13px]">
                  <th className="py-3 px-4">Hospital Name</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Date Added</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>

              <tbody className="text-gray-800">
                {paginatedHospitals.map((hospital, index) => (
                  <tr key={hospital.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-[14px]">{getHospitalName(hospital)}</td>
                    <td className="py-3 px-4 text-[14px]">{hospital.email}</td>
                    <td className="py-3 px-4 text-[14px]">{hospital.phone || "-"}</td>
                    <td className="py-3 px-4 text-[14px]">{formatDate(hospital.createdAt)}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          getHospitalStatus(hospital)
                        )}`}
                      >
                        {getHospitalStatus(hospital)}
                      </span>
                    </td>

                    {/* ACTION MENU */}
                    <td className="relative py-3 px-4">
                      <button
                        onClick={() =>
                          setOpenMenuIndex(
                            openMenuIndex === index ? null : index
                          )
                        }
                      >
                        <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                      </button>

                      {openMenuIndex === index && (
                        <div className="absolute right-12 top-6 w-44 bg-white shadow-lg rounded-xl border z-20 py-2">
                          <button
                            onClick={() => {
                              setSelectedHospital(hospital);
                              setOpenMenuIndex(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4 text-gray-600" /> View Details
                          </button>
                          <button
                            onClick={() => {
                              setDriverToSuspend(hospital);
                              setOpenMenuIndex(null);
                              setOpenSuspendModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Ban className="w-4 h-4 text-yellow-600" /> Suspend User
                          </button>
                          <button
                            onClick={() => {
                              setDriverToRemove(hospital);
                              setOpenMenuIndex(null);
                              setOpenRemoveModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          >
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
        )}

        {/* PAGINATION */}
        {!loading && paginatedHospitals.length > 0 && (
          <div className="flex justify-between mt-4 items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-[14px] border rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <p className="text-gray-600 text-sm">
              Page {currentPage} of {totalPages} ({filteredHospitals.length} total)
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-[14px] border rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      <HospitalDetailsModal
        open={!!selectedHospital}
        data={selectedHospital}
        onClose={() => setSelectedHospital(null)}
      />

      {/* SUSPEND CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={openSuspendModal}
        onCancel={() => setOpenSuspendModal(false)}
        onConfirm={() => suspendHospital()}
          title="Suspend User?"
          message={`Are you sure you want to suspend ${getHospitalName(driverToSuspend)}? This action cannot be reversed.`}
        icon={<AlertTriangle className="text-white" size={22} />}
        iconBgColor="bg-[rgba(242,124,74,1)]"
        confirmText="Yes, Suspend"
        cancelText="No"
        confirmColor="bg-[rgba(242,124,74,1)]"
      />

      {/* REMOVE USER CONFIRM MODAL */}
      <ConfirmModal
        isOpen={openRemoveModal}
        onCancel={() => setOpenRemoveModal(false)}
        onConfirm={() => removeHospital()}
        title="Remove User?"
        message="Are you sure you want to remove this user? This action cannot be reversed."
        icon={<UserMinus className="text-white" size={22} />}
        iconBgColor="bg-[rgba(196,0,0,1)]"
        confirmText="Yes, Remove"
        cancelText="No"
        confirmColor="bg-[rgba(196,0,0,1)]"
        successTitle="User Removed"
        successMessage="You have removed the hospital from the platform."
        successIcon="😄"
        successButtonText="Continue"
      />
    </div>
  );
}

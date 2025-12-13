import { useState, useEffect } from "react";
import { MoreVertical, Eye, UserMinus, Ban, Search, ChevronDown, Users, X } from "lucide-react";
import axios from "axios";
import { ApiUrl } from "../api";

interface User {
  id: string;
  name: string;
  fullName?: string;
  organizationName?: string;
  email: string;
  phone?: string;
  status?: string;
  verified: boolean;
  licenseNumber?: string;
  createdAt: string;
  userType: string;
}

interface UsersResponse {
  success: boolean;
  data: User[];
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

const UsersTable = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDateRange, setOpenDateRange] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([]);
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers(6);
  }, []);

  const fetchUsers = async (limit = 20) => {
    try {
      setLoading(true);
      const url = `${ApiUrl}admin/users?userType=hospital` + (limit ? `&limit=${limit}` : "");
      const response = await axios.get<UsersResponse>(
        url,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getUserType = (userType: string) => {
    const typeMap: { [key: string]: string } = {
      driver: "Ambulance Driver",
      hospital: "Hospital",
      operator: "Ambulance Operator",
    };
    return typeMap[userType] || userType;
  };

  const getDisplayName = (user: User) => {
    return user.name || user.fullName || user.organizationName || "Unknown";
  };

  const filterUsers = () => {
    return users.filter((user) => {
      // Search filter
      const searchMatch =
        getDisplayName(user).toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Date range filter
      let dateMatch = true;
      if (startDate || endDate) {
        const userDate = new Date(user.createdAt).getTime();
        if (startDate) {
          const start = new Date(startDate).getTime();
          dateMatch = dateMatch && userDate >= start;
        }
        if (endDate) {
          const end = new Date(endDate).getTime();
          dateMatch = dateMatch && userDate <= end;
        }
      }

      // User type filter
      let typeMatch = true;
      if (selectedUserTypes.length > 0) {
        typeMatch = selectedUserTypes.includes(user.userType);
      }

      // Verification status filter
      let verificationMatch = true;
      if (selectedVerificationStatus !== null) {
        verificationMatch =
          user.verified === (selectedVerificationStatus === "verified");
      }

      return searchMatch && dateMatch && typeMatch && verificationMatch;
    });
  };

  const toggleUserType = (type: string) => {
    setSelectedUserTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setSelectedUserTypes([]);
    setSelectedVerificationStatus(null);
  };

  const filteredUsers = filterUsers();

  const hasActiveFilters =
    searchQuery ||
    startDate ||
    endDate ||
    selectedUserTypes.length > 0 ||
    selectedVerificationStatus !== null;

  return (
    <div className="px-6 py-6 mt-5 bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Header - becomes vertical on mobile */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">All Users</h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search - full width on mobile */}
          <div className="w-full sm:w-[320px] bg-white border rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospitals, operators or driver.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Buttons - stack on small screens */}
          <div className="flex gap-3 relative">
            {/* Date Range Button */}
            <div className="relative">
              <button
                onClick={() => setOpenDateRange(!openDateRange)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white shadow-sm whitespace-nowrap hover:bg-gray-50"
              >
                Date Range <ChevronDown className="w-4 h-4" />
              </button>

              {/* Date Range Dropdown */}
              {openDateRange && (
                <div className="absolute right-0 top-12 w-72 bg-white shadow-lg rounded-xl border z-50 p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
            <div className="relative">
              <button
                onClick={() => setOpenFilterMenu(!openFilterMenu)}
                className="px-4 py-2 border rounded-lg text-sm bg-white shadow-sm whitespace-nowrap hover:bg-gray-50 flex items-center gap-2"
              >
                Filters {hasActiveFilters && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
              </button>

              {/* Filters Dropdown */}
              {openFilterMenu && (
                <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-xl border z-50 p-4">
                  <div className="space-y-4">
                    {/* User Type Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">User Type</h3>
                      <div className="space-y-2">
                        {["driver", "hospital", "operator"].map((type) => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedUserTypes.includes(type)}
                              onChange={() => toggleUserType(type)}
                              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-700">{getUserType(type)}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Verification Status Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">Verification Status</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="verification"
                            checked={selectedVerificationStatus === null}
                            onChange={() => setSelectedVerificationStatus(null)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm text-gray-700">All</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="verification"
                            checked={selectedVerificationStatus === "verified"}
                            onChange={() => setSelectedVerificationStatus("verified")}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm text-gray-700">Verified</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="verification"
                            checked={selectedVerificationStatus === "pending"}
                            onChange={() => setSelectedVerificationStatus("pending")}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm text-gray-700">Pending</span>
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t">
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-3 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setOpenFilterMenu(false)}
                        className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-600">Active filters:</span>
          {searchQuery && (
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium flex items-center gap-1">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-orange-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {startDate && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
              From: {startDate}
              <button onClick={() => setStartDate("")} className="ml-1 hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {endDate && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
              To: {endDate}
              <button onClick={() => setEndDate("")} className="ml-1 hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedUserTypes.map((type) => (
            <span key={type} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
              {getUserType(type)}
              <button
                onClick={() => toggleUserType(type)}
                className="ml-1 hover:text-purple-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedVerificationStatus && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
              {selectedVerificationStatus === "verified" ? "Verified" : "Pending"}
              <button
                onClick={() => setSelectedVerificationStatus(null)}
                className="ml-1 hover:text-green-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Users className="w-12 h-12 text-gray-300" />
          <p className="text-lg font-medium text-gray-600">No users in the platform</p>
          <p className="text-sm text-gray-400">All users would appear here</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-12">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Table - now truly responsive */}
      {!loading && filteredUsers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="bg-[rgb(254,242,237)] text-left text-gray-700">
                <th className="py-3 px-4 font-medium">Date Added</th>
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Email Address</th>
                <th className="py-3 px-4 font-medium">Phone</th>
                <th className="py-3 px-4 font-medium">User Type</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b last:border-none">
                  <td className="px-4 py-4 text-[14px] text-gray-700">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-4 text-[14px] text-gray-700">
                    {getDisplayName(user)}
                  </td>
                  <td className="px-4 py-4 text-[14px] text-gray-700">{user.email}</td>
                  <td className="px-4 py-4 text-[14px] text-gray-700">
                    {user.phone || "-"}
                  </td>
                  <td className="px-4 py-4 text-[14px] text-gray-700">
                    {getUserType(user.userType)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.verified
                          ? "bg-green-100 text-green-600 border border-green-600"
                          : "bg-[rgb(253,245,234)] text-yellow-600 border border-yellow-600"
                      }`}
                    >
                      {user.verified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-4 relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Dropdown - unchanged */}
                    {openMenu === index && (
                      <div className="absolute right-10 top-6 w-44 bg-white shadow-lg rounded-xl border z-20 py-2">
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100">
                          <Eye className="w-4 h-4 text-gray-600" /> View Details
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100">
                          <Ban className="w-4 h-4 text-yellow-600" /> Suspend
                          User
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                          <UserMinus className="w-4 h-4 text-red-600" /> Remove
                          User
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

      {!loading && filteredUsers.length > 0 && (
        <div className="flex justify-center mt-4">
            {!showAll ? (
              <button
                onClick={async () => {
                  await fetchUsers(0); // no limit param -> fetch full list
                  setShowAll(true);
                }}
                className="text-orange-500 font-medium flex items-center justify-center gap-2 text-sm"
              >
                See All Users →
              </button>
            ) : (
              <span className="text-sm text-gray-500">Showing all users</span>
            )}
        </div>
      )}
    </div>
  );
};

export default UsersTable;
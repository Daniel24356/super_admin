import { useState } from "react";
import { MoreVertical, Eye, UserMinus, Ban, Search, ChevronDown } from "lucide-react";

const UsersTable = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const users = [
    {
      date: "12/10/2025 3:00 PM",
      name: "CityHill Ambulance",
      email: "cityhillambulance@gmail.com",
      admin: "Amanda Kings",
      type: "Ambulance Operator",
      status: "Approved",
      statusColor: "bg-green-100 text-green-600 border border-green-600",
    },
    {
      date: "12/10/2025 3:00 PM",
      name: "Metro Hospital",
      email: "metrohospital@gmail.com",
      admin: "Stanley Holmes",
      type: "Hospital",
      status: "Approved",
      statusColor: "bg-green-100 text-green-600 border border-green-600",
    },
    {
      date: "12/10/2025 3:00 PM",
      name: "Ambulance PD",
      email: "ambulancepd@gmail.com",
      admin: "Duke Raymond",
      type: "Ambulance Operator",
      status: "Pending",
      statusColor: "bg-[rgb(253,245,234)] text-yellow-600 border border-yellow-600",
    },
  ];
   
  return (
    <div className="px-6 py-6 mt-5 bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">All Users</h2>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="w-[320px] bg-white border rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospitals, operators or driver.."
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Date Range */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white shadow-sm">
            Date Range <ChevronDown className="w-4 h-4" />
          </button>

          {/* Filters */}
          <button className="px-4 py-2 border rounded-lg text-sm bg-white shadow-sm">
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[rgb(254,242,237)] text-left text-gray-700">
              <th className="py-3 px-4 font-medium">Date Added</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Email Address</th>
              <th className="py-3 px-4 font-medium">Admin</th>
              <th className="py-3 px-4 font-medium">User Type</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="px-4 py-4 text-[14px] text-gray-700">{user.date}</td>
                <td className="px-4 py-4 text-[14px] text-gray-700">{user.name}</td>
                <td className="px-4 py-4 text-[14px] text-gray-700">{user.email}</td>
                <td className="px-4 py-4 text-[14px] text-gray-700">{user.admin}</td>
                <td className="px-4 py-4 text-[14px] text-gray-700">{user.type}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${user.statusColor}`}
                  >
                    {user.status}
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

                  {/* Dropdown Menu */}
                  {openMenu === index && (
                    <div className="absolute right-10 top-6 w-44 bg-white shadow-lg rounded-xl border z-20 py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-gray-600" /> View Details
                      </button>

                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100">
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

      <div className="flex justify-center mt-4">
        <button className="text-orange-500 font-medium flex items-center justify-center gap-2 text-sm">
          See All Users →
        </button>
      </div>
    </div>
  );
};

export default UsersTable;

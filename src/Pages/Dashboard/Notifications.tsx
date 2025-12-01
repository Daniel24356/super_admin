import { ArrowLeft, Search, Trash2, Bell } from "lucide-react";

export default function Notifications() {
  const notifications = new Array(9).fill(null).map(() => ({
    title: "Driver at Destination",
    message:
      "Lorem ipsum dolor sit amet consectetur. Eget viverra nunc sapien tortor rte dignissim pellentesque dignissim quis at.",
    time: "11:00 AM"
  }));

  return (
    <div className="w-full min-h-screen bg-[#F8F6F4] p-3">
      {/* Back */}
      <button className="flex items-center text-[14px] text-gray-600 hover:text-gray-800 mb-4">
        <ArrowLeft size={14} className="mr-1" />
        Back
      </button>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
      <p className="text-gray-500 text-[14px] mt-1">
        View and manage your notifications here
      </p>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm mt-6 border">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-base font-medium">Notifications</h2>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center bg-white border border-[rgba(232,234,237,1)] rounded-xl px-4 py-2 w-72">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-xs"
              />
            </div>

            {/* Mark all read */}
            <button className=" transition px-4 py-2 border border-[rgba(232,234,237,1)] rounded-xl text-xs text-[rgba(134,140,152,1)] flex items-center gap-2">
              Mark All As Read
              <span className="text-[rgba(134,140,152,1)] text-lg">✓</span>
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="divide-y">
          {notifications.map((_, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between px-6 py-5 hover:bg-gray-50 transition"
            >
              <div className="flex items-start gap-4">
                {/* Avatar Icon */}
                <div className="w-10 h-10 rounded-full bg-[rgb(254,242,237)] flex items-center justify-center">
                  <Bell className="text-orange-500" size={18} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-[14px] text-gray-800">
                    Driver at Destination
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Lorem ipsum dolor sit amet consectetur. Eget viverra nunc
                    sapien tortor rte dignissim pellentesque dignissim quis at.
                  </p>
                </div>
              </div>

              {/* Time + Buttons */}
              <div className="flex items-center gap-6">
                <p className="text-gray-500 text-xs w-20 text-right">11:00 AM</p>

                <button className="text-orange-500 text-xs hover:underline">
                  View Details
                </button>

                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

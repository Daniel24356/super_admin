import { MapPin, AlertTriangle, Navigation, Clock, Truck } from "lucide-react";

export default function MonitoringPage() {
  return (
    <div className="w-full min-h-screen bg-[#f6f4f3] p-3 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Monitoring</h1>
        <p className="text-gray-500 -mt-1">
          View activities across all hospitals, operators, and drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        {/* LEFT : MAP CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Title */}
          <div className="flex items-center gap-2 text-[rgb(34, 49, 80)] text-[15px] font-medium mb-4">
            <MapPin color="#f36932" size={18} />
            <span>Live Map View</span>
          </div>

          {/* Map container */}
          <div className="relative border-2 border-[rgb(247,181,153)] rounded-xl overflow-hidden h-[520px]">
            {/* MAP PLACEHOLDER (Replace with Google Maps / Leaflet later) */}
            <div className="absolute inset-0  flex items-center justify-center text-gray-500">
              <span>Map Placeholder (Google Maps)</span>
            </div>

            {/* Floating ambulance marker */}
            <div className="absolute left-[45%] top-[45%] bg-white shadow-xl rounded-xl px-4 py-2 flex items-center gap-3 border border-gray-100">
              <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
                <Truck />
              </div>
              <div>
                <p className="font-semibold text-sm">AMB-2025002</p>
                <p className="text-gray-500 text-xs">Darrell Steward</p>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-lg p-3 text-sm">
              <p className="font-semibold mb-2">Legend</p>

              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
                <span className="text-gray-600">En Route to Pickup</span>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                <span className="text-gray-600">En Route to Destination</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-gray-600">At Destination</span>
              </div>
            </div>

            {/* Map Action Buttons */}
            <button className="absolute bottom-4 right-4 bg-[#f36932] text-white p-3 rounded-full shadow-md">
              <Navigation size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-4">

          {/* Tabs */}
          <div className="flex items-center bg-white rounded-md px-1 w-max shadow-sm">
            <button className="px-16 py-1 bg-[#ffece7] text-[14px] text-[#f36932] rounded-md font-medium">
              Active
            </button>
            <button className="px-6 py-2 text-gray-500 text-[14px] rounded-lg">
              Scheduled
            </button>
          </div>

          {/* Ambulance Info Card */}
          <div className="bg-white rounded-2xl shadow-sm py-4 px-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm text-[rgb(176,176,176)] font-semibold">Ambulance ID</h2>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                Arrived at Destination
              </span>
            </div>

            <p className="font-semibold text-lg mb-1">AMB-2025002</p>
            <p className="text-gray-500 text-[14px] mb-4 flex items-center gap-2">
              Routine Transfer
              <span className="flex items-center gap-1 p-1 rounded-full  bg-[rgba(196,0,0,0.08)] text-red-500 text-[10px]"><AlertTriangle size={10} className="text-red-500" /> High</span>
            </p>

            {/* Hospitals */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-[rgb(232,249,238)] rounded-full mt-1">
                  <div className="w-3 h-3 bg-[rgb(14,188,147)] rounded-full"></div>
                </span>
                <div>
                  <p className="font-semibold text-base">National Hospital</p>
                  <p className="text-gray-500 text-sm">Cadastral Zone</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-[rgb(254,242,237)] rounded-full mt-1">
                  <MapPin size={18} color="rgba(242,124,74,1)" />
                </span>
                <div>
                  <p className="font-semibold text-base">Federal Medical Centre</p>
                  <p className="text-gray-500 text-sm">Crescent 3rd Ave</p>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="mb-4">
              <h3 className="font-semibold mb-3 text-[14px]">Trip Details</h3>

              <div className="space-y-1 text-sm">
                <p className="flex items-center justify-between">
                  <span className="flex text-[12px] items-center gap-2">
                    <Clock size={14} />
                    ETA Pickup:
                  </span>
                  <span className="font-medium text-[14px]">Completed</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="flex text-[12px] items-center gap-2">
                    <Clock size={14} />
                    ETA Destination:
                  </span>
                  <span className="font-medium text-[14px]">12 min</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="flex text-[12px] items-center gap-2">
                    <MapPin size={14} />
                    Current Location:
                  </span>
                  <span className="text-[#f36932] text-[14px] font-medium">
                    Main St & 5th Ave
                  </span>
                </p>
              </div>
            </div>

            {/* Driver */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="w-[37px] h-[37px] rounded-full"
              />
              <div>
                <p className="text-gray-500 text-sm">Driver</p>
                <p className="font-semibold text-sm">Darrell Steward</p>
              </div>
            </div>
          </div>

          {/* Bottom Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm px-5 py-2 flex items-center justify-between">
            <div>

              <div className="flex items-center gap-4 mt-2">
                <p className="font-semibold text-[14px] text-[rgba(176,176,176,1)]">Ambulance ID</p>
                <span className="px-2 py-[2px] bg-orange-100 text-orange-500 text-[6px] rounded-full">
                  En route to Destination
                </span>
              </div>

              <div className="flex items-end gap-5">
                <div>
                  <p className="text-lg font-semibold">AMB-2025002</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    Routine Transfer
                    <span className="flex items-center gap-1 p-1 rounded-full  bg-[rgba(196,0,0,0.08)] text-red-500 text-[10px]"><AlertTriangle size={10} className="text-red-500" /> High</span>
                  </p>
                </div>

                <button className="text-[#f36932] text-xs mb-2 font-medium underline">
                  View Route
                </button>
              </div>


            </div>


          </div>

        </div>
      </div>
    </div>
  );
}

import { MapPin, AlertTriangle, Navigation, Clock } from "lucide-react";

export default function MonitoringPage() {
  return (
    <div className="w-full min-h-screen bg-[#f6f4f3] p-8 flex flex-col gap-8">
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
          <div className="flex items-center gap-2 text-[#f36932] font-medium mb-4">
            <MapPin size={18} />
            <span>Live Map View</span>
          </div>

          {/* Map container */}
          <div className="relative border border-[#f6c9b7] rounded-xl overflow-hidden h-[520px]">
            {/* MAP PLACEHOLDER (Replace with Google Maps / Leaflet later) */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
              <span>Map Placeholder (Google Maps)</span>
            </div>

            {/* Floating ambulance marker */}
            <div className="absolute left-[45%] top-[45%] bg-white shadow-xl rounded-xl px-4 py-2 flex items-center gap-3 border border-gray-100">
              <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
                🚑
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
        <div className="flex flex-col gap-6">

          {/* Tabs */}
          <div className="flex items-center bg-white rounded-xl p-1 w-max shadow-sm">
            <button className="px-6 py-2 bg-[#ffece7] text-[#f36932] rounded-lg font-medium">
              Active
            </button>
            <button className="px-6 py-2 text-gray-500 rounded-lg">
              Scheduled
            </button>
          </div>

          {/* Ambulance Info Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Ambulance ID</h2>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                Arrived at Destination
              </span>
            </div>

            <p className="font-semibold text-xl mb-1">AMB-2025002</p>
            <p className="text-gray-500 mb-4 flex items-center gap-2">
              Routine Transfer <AlertTriangle size={14} className="text-red-500" />
              <span className="text-red-500 text-xs">High</span>
            </p>

            {/* Hospitals */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 bg-green-600 rounded-full mt-1"></span>
                <div>
                  <p className="font-semibold">National Hospital</p>
                  <p className="text-gray-500 text-sm">Cadastral Zone</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-3 h-3 bg-orange-400 rounded-full mt-1"></span>
                <div>
                  <p className="font-semibold">Federal Medical Centre</p>
                  <p className="text-gray-500 text-sm">Crescent 3rd Ave</p>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Trip Details</h3>

              <div className="space-y-3 text-sm">
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    ETA Pickup:
                  </span>
                  <span className="font-medium">Completed</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    ETA Destination:
                  </span>
                  <span className="font-medium">12 min</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    Current Location:
                  </span>
                  <span className="text-[#f36932] font-medium">
                    Main St & 5th Ave
                  </span>
                </p>
              </div>
            </div>

            {/* Driver */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-gray-500 text-sm">Driver</p>
                <p className="font-semibold">Darrell Steward</p>
              </div>
            </div>
          </div>

          {/* Bottom Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold">Ambulance ID</p>
              <p className="text-xl font-semibold mb-1">AMB-2025002</p>

              <p className="text-sm text-gray-600 flex items-center gap-2">
                Routine Transfer
                <span className="text-red-500 text-xs flex items-center gap-1">
                  <AlertTriangle size={12} /> High
                </span>
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-[2px] bg-orange-100 text-orange-500 text-xs rounded-full">
                  En route to Destination
                </span>
              </div>
            </div>

            <button className="text-[#f36932] text-sm font-medium hover:underline">
              View Route
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

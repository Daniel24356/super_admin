import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 6.5244,
  lng: 3.3792,
};

const ambulanceLocations = [
  { lat: 6.5244, lng: 3.3792, status: "en-route" },
  { lat: 6.6018, lng: 3.3515, status: "confirmed" },
  { lat: 6.4654, lng: 3.4068, status: "en-route" },
];

export const LiveTrackingMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyArGGPXUzgv_bQWV8wmDx8k9RhR3CowGmE", // ← Replace with your real key
  });

  // Show loading state while map loads
  if (!isLoaded) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border w-full h-[420px] flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border w-full h-[420px] flex flex-col">
      <div className="flex items-center gap-2 text-black font-semibold mb-3">
        <MapPin className="w-5 h-5 text-orange-500" />
        Live Tracking
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border-2 border-orange-200 relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: true,
          }}
        >
          {ambulanceLocations.map((loc, index) => (
            <Marker
              key={index}
              position={{ lat: loc.lat, lng: loc.lng }}
              icon={{
                // These built-in icons are safe and always work
                url:
                  loc.status === "en-route"
                    ? "https://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                    : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                scaledSize: new google.maps.Size(40, 40),
              }}
              title={loc.status === "en-route" ? "En Route" : "Confirmed"}
            />
          ))}
        </GoogleMap>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 text-sm z-10">
          <p className="font-medium mb-2">Legend</p>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>En Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span>Confirmed</span>
          </div>
        </div>

        {/* Floating Button */}
        {/* <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-orange-500 shadow-lg flex items-center justify-center hover:bg-orange-600 transition z-10">
          <MapPin className="w-6 h-6 text-white" />
        </button> */}
      </div>

      <div className="w-full text-center mt-3">
        <button className="text-orange-500 font-medium text-sm hover:underline">
          View Full Map →
        </button>
      </div>
    </div>
  );
};
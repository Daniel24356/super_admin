import { MapPin } from "lucide-react";
import map from "../assets/map.png"

export const LiveTrackingMap = () => {
return (
<div className="bg-white p-6 rounded-2xl shadow-sm border w-full h-[420px]">
<div className="flex items-center gap-2 text-blue-800 font-semibold mb-3">
<MapPin className="w-5 h-5 text-orange-500" /> Live Tracking
</div>


{/* Map Box */}
<div className="border-2 border-orange-200 rounded-xl overflow-hidden relative h-[300px]">
<img
src={map}
alt="map"
className="w-full h-full object-cover opacity-90"
/>


{/* Legend */}
<div className="absolute bottom-6 left-6 bg-white rounded-xl shadow px-4 py-3 text-sm">
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


{/* Floating Icon */}
<button className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-orange-500 shadow-lg flex items-center justify-center">
<MapPin className="w-6 h-6 text-white" />
</button>
</div>


<div className="w-full text-center mt-3">
<button className="text-orange-500 font-medium text-sm">View Map →</button>
</div>
</div>
);
};
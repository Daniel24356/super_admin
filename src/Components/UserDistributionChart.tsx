import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
{ name: "CityWide Ambulance", value: 50, color: "#4CAF50" },
{ name: "Metro Ambulance", value: 30, color: "#FF7043" },
{ name: "NEMA", value: 9, color: "#FFC107" },
{ name: "QuickCare Ambulance", value: 11, color: "#E53935" },
];


export const UserDistributionChart = () => {
return (
<div className="bg-white p-6 rounded-2xl shadow-sm border w-full h-[420px]">
<h2 className="text-lg font-semibold">User Distribution</h2>
<p className="text-gray-500 text-sm mb-4">Representation of total users</p>


<div className="flex flex-col gap-4 md:flex-row md:gap-6">
{/* Pie Chart */}
<div className="w-full md:w-1/2 h-[160px] md:h-[260px] flex items-center justify-center relative">
<ResponsiveContainer width="100%" height="100%">
<PieChart>
<Pie
data={data}
innerRadius={70}
outerRadius={100}
paddingAngle={2}
dataKey="value"
>
{data.map((entry, index) => (
<Cell key={index} fill={entry.color} />
))}
</Pie>
</PieChart>
</ResponsiveContainer>
</div>


{/* Legend */}
<div className="flex flex-col justify-center text-sm gap-3">
{data.map((item, index) => (
<div key={index} className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
<span>{item.name}</span>
</div>
))}
</div>
</div>
</div>
);
};
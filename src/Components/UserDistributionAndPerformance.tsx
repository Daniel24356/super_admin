import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const pieData = [
  { name: "CityWide Ambulance", value: 30, color: "#F28A37" },
  { name: "Metro Ambulance", value: 11, color: "#F2C037" },
  {
    name: "National Emergency Management Agency (NEMA)",
    value: 50,
    color: "#2ECC71",
  },
  { name: "QuickCare Ambulance", value: 9, color: "#E74C3C" },
];

const operatorData = [
  {
    name: "CityWide Ambulance",
    percent: 35,
    color: "#F28A37",
    requests: 28,
  },
  {
    name: "Metro Ambulance",
    percent: 27.5,
    color: "#F2C037",
    requests: 22,
  },
  {
    name: "National Emergency Management Agency (NEMA)",
    percent: 22.5,
    color: "#2ECC71",
    requests: 18,
  },
  {
    name: "QuickCare Ambulance",
    percent: 15,
    color: "#E74C3C",
    requests: 12,
  },
];

export default function UserDistributionAndPerformance() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT SIDE — DONUT CHART */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-800">
          User Distribution
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Representation of total users
        </p>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                }}
              />

              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="left"
                iconSize={10}
                wrapperStyle={{ paddingTop: 10 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RIGHT SIDE — OPERATOR PERFORMANCE */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-800">
          Operator Performance
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Request volume by operator
        </p>

        <div className="space-y-5">
          {operatorData.map((item, idx) => (
            <div key={idx}>
              {/* Title + Percentage */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-xs text-gray-500">
                  {item.percent}%
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              {/* Requests */}
              <div className="text-right text-xs mt-1">
                <span
                  className="font-semibold"
                  style={{ color: item.color }}
                >
                  {item.requests} Requests
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

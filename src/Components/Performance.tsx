import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const responseData = [
  { month: "Jan", avg: 120, target: 80 },
  { month: "Feb", avg: 160, target: 90 },
  { month: "Mar", avg: 40, target: 60 },
  { month: "Apr", avg: 170, target: 100 },
  { month: "May", avg: 90, target: 70 },
  { month: "Jun", avg: 210, target: 110 },
  { month: "Jul", avg: 50, target: 60 },
  { month: "Aug", avg: 120, target: 90 },
  { month: "Sept", avg: 90, target: 60 },
  { month: "Oct", avg: 180, target: 110 },
  { month: "Nov", avg: 30, target: 50 },
  { month: "Dec", avg: 70, target: 60 },
];

const urgencyData = [
  { name: "Scheduled", value: 50, color: "#47C97C" },
  { name: "Urgent", value: 30, color: "#F28F45" },
  { name: "Routine", value: 9, color: "#F7C843" },
  { name: "Emergency", value: 11, color: "#ED5A5A" },
];

const Performance = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* ========= LEFT CHART ========= */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold">Response Time Trends</h2>
        <div className="flex items-center gap-3 text-xs mt-2 mb-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-200" />
            Average response time
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ff6b37]" />
            Target over time
          </div>
        </div>

        <div className="w-full h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="avg" fill="#FFD7C7" barSize={22} />
              <Bar dataKey="target" fill="#FF6B37" barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ========= RIGHT DONUT CHART ========= */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold">Request Urgency Breakdown</h2>
        <p className="text-xs text-gray-500 -mt-1 mb-4">
          Distribution of request types
        </p>

        <div className="flex items-center justify-center w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={urgencyData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={2}
                dataKey="value"
              >
                {urgencyData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {urgencyData.map((x, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: x.color }}
              />
              {x.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;

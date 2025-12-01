import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", completed: 120, cancelled: 100 },
  { month: "Feb", completed: 100, cancelled: 170 },
  { month: "Mar", completed: 60, cancelled: 40 },
  { month: "Apr", completed: 160, cancelled: 175 },
  { month: "May", completed: 95, cancelled: 90 },
  { month: "Jun", completed: 200, cancelled: 220 },
  { month: "Jul", completed: 45, cancelled: 60 },
  { month: "Aug", completed: 120, cancelled: 130 },
  { month: "Sept", completed: 110, cancelled: 100 },
  { month: "Oct", completed: 45, cancelled: 55 },
  { month: "Nov", completed: 175, cancelled: 190 },
  { month: "Dec", completed: 70, cancelled: 85 },
];

export default function RequestVolumeChart() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-medium text-gray-700 mb-4">
        Request Volume Over Time
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />

            <XAxis
              dataKey="month"
              tick={{ fill: "#999", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#999", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip cursor={{ opacity: 0.1 }} />

            <Legend
              align="right"
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: 20 }}
            />

            <Bar
              dataKey="completed"
              name="Completed requests"
              fill="#FCEFEB"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="cancelled"
              name="Cancelled requests"
              fill="#F28A37"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

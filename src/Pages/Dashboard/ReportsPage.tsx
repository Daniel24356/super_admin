import { useState } from "react";
import { Building2, Users2, Wallet, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Performance from "../../Components/Performance";
import RequestVolumeChart from "../../Components/RequestVolumeChart";
import UserDistributionAndPerformance from "../../Components/UserDistributionAndPerformance";

// ==== YOUR FINANCIAL CHART DATA ====
const data = [
  { month: "Jan", value: 90 },
  { month: "Feb", value: 110 },
  { month: "Mar", value: 170 },
  { month: "Apr", value: 190 },
  { month: "May", value: 150 },
  { month: "Jun", value: 100 },
  { month: "Jul", value: 240 },
  { month: "Aug", value: 180 },
  { month: "Sept", value: 210 },
  { month: "Oct", value: 160 },
  { month: "Nov", value: 250 },
  { month: "Dec", value: 220 },
];

// ==== IMPORT PERFORMANCE CHART (FROM performance.tsx YOU ALREADY MADE) ====
// Example: 
// import PerformanceChart from "./PerformanceChart";

// For now I'll create a placeholder (replace with your exact file)
const PerformanceChart = () => (
  <Performance/>
);

// Placeholder — you will give me UI later
const VolumeChart = () => (
  <RequestVolumeChart/>
);

// Placeholder — you will give me UI later
const UsersChart = () => (
  <UserDistributionAndPerformance/>
);


const ReportsPage = () => {
  // === NEW: TOGGLE STATE ===
  const [activeTab, setActiveTab] = useState<"Performance" | "Volume" | "Financial" | "Users">(
    "Performance"
  );

  return (
    <>
      <div className="w-full h-full px-3 py-3">

        {/* Welcome Section */}
        <div className="mb-7">
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-gray-600 text-sm mt-1">
            Comprehensive insights into your ambulance dispatch operations
          </p>
        </div>

        {/* ======= STATS CARDS ======= */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >
          <div className="bg-white h-[155px] py-4 px-6 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Users2 className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Total Requests</span>
            <span className="text-2xl font-bold">50</span>
            <span className="text-[rgba(196,0,0,1)] text-[12px] font-medium">14.0% from last month</span>
          </div>

          <div className="bg-white h-[155px] py-4 px-6 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-gray-600 text-sm">Average Response Time</span>
            <span className="text-2xl font-bold">6.9 min</span>
            <span className="text-[rgba(11,134,0,1)] text-[12px] font-medium">31.0% better than target</span>
          </div>

          <div className="bg-white h-[155px] py-4 px-6 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-gray-600 text-sm">Total Income</span>
            <span className="text-2xl font-bold">$7,560</span>
            <span className="text-[rgba(196,0,0,1)] text-[12px] font-medium">23.6% decr from last month</span>
          </div>

          <div className="bg-white h-[155px] py-4 px-6 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Completion Rate</span>
            <span className="text-2xl font-bold">97.7%</span>
            <span className="text-[rgba(11,134,0,1)] text-[12px] font-medium">42 of 43 requests completed</span>
          </div>
        </div>

        {/* ======= CHART TABS ======= */}
        <div className="flex items-center gap-2 my-5 bg-white w-max p-2 rounded-sm shadow-sm">
          {["Performance", "Volume", "Financial", "Users"].map((tab) => {
            const isActive = tab === activeTab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={
                  isActive
                    ? "px-5 py-2 rounded-sm text-sm bg-[#ffece7] text-[#f36932] font-medium"
                    : "px-5 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                }
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ======= CHARTS SWITCHER (REQUIRED) ======= */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold">
            {activeTab === "Financial" && "Monthly Spending Trends"}
            {activeTab === "Volume" && "Request Volume Trends"}
          </h2>

          <p className="text-sm text-gray-500 -mt-1 mb-4">
            {activeTab === "Financial" &&
              "Total ambulance service costs over time"}
            {activeTab === "Volume" &&
              "Monthly request volume performance"}
          </p>

          {/* MAIN CHART */}
          <div className="w-full h-[450px]">
            {activeTab === "Financial" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f36932" stopOpacity={0.3} />
                      <stop
                        offset="100%"
                        stopColor="#f36932"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#f36932"
                    strokeWidth={3}
                    fill="url(#colorFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeTab === "Performance" && <PerformanceChart />}
            {activeTab === "Volume" && <VolumeChart />}
            {activeTab === "Users" && <UsersChart />}
          </div>
        </div>

        {/* ======= INSIGHTS ======= */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-5">
          <h2 className="text-lg font-semibold">Key Insights & Recommendations</h2>
          <p className="text-sm text-gray-500 mb-6">
            Average response time vs target over time
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CARD 1 */}
            <div className="border border-[#d6eed9] bg-[#f3fcf4] rounded-xl p-5">
              <h3 className="text-[#38a169] font-semibold mb-1">
                Excellent Response Times
              </h3>
              <p className="text-sm text-gray-600">
                Your average response time of 6.9 minutes is 31% better than the
                target of 10 minutes. This indicates strong operator performance.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="border border-[#e7d5fa] bg-[#fbf5ff] rounded-xl p-5">
              <h3 className="text-[#b072f1] font-semibold mb-1">
                Cost Optimization
              </h3>
              <p className="text-sm text-gray-600">
                Monthly spending decreased by 23.6% compared to last month.
                Consider negotiating volume discounts with top operators.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="border border-[#f8dcb3] bg-[#fff8ee] rounded-xl p-5">
              <h3 className="text-[#d78b2a] font-semibold mb-1">
                Operator Diversification
              </h3>
              <p className="text-sm text-gray-600">
                CityWide Ambulance handles 35% of requests. Consider building
                relationships with additional operators for redundancy.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="border border-[#f5b7b7] bg-[#fff4f4] rounded-xl p-5">
              <h3 className="text-[#d64550] font-semibold mb-1">
                Request Patterns
              </h3>
              <p className="text-sm text-gray-600">
                Emergency requests account for 25% of volume. Ensure preferred
                operators have adequate emergency response capabilities.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ReportsPage;

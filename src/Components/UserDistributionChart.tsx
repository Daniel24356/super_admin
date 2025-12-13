import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../api";

interface ChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface UsersResponse {
  success: boolean;
  data: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    breakdown: {
      drivers: number;
      hospitals: number;
      operators: number;
    };
  };
}

export const UserDistributionChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDistribution();
  }, []);

  const fetchUserDistribution = async () => {
    try {
      setLoading(true);
      const response = await axios.get<UsersResponse>(
        `${ApiUrl}admin/users?limit=100`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data.success && response.data.meta.breakdown) {
        const { drivers, hospitals, operators } = response.data.meta.breakdown;
        const distributionData: ChartData[] = [
          { name: "Drivers", value: drivers, color: "#4CAF50" },
          { name: "Hospitals", value: hospitals, color: "#FF7043" },
          { name: "Operators", value: operators, color: "#FFC107" },
        ].filter((item) => item.value > 0);

        setChartData(distributionData);
      }
    } catch (error) {
      console.error("Error fetching user distribution:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border w-full h-[440px] flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border w-full h-[440px]">
      <h2 className="text-lg font-semibold">User Distribution</h2>
      <p className="text-gray-500 text-sm mb-4">Representation of total users</p>

      {chartData.length === 0 ? (
        <div className="w-full h-[300px] flex items-center justify-center text-gray-400">
          No user distribution data available
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Pie Chart */}
          <div className="w-full md:w-1/2 h-[200px] md:h-[260px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col justify-center text-sm gap-3">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                />
                <span>
                  {item.name}: <strong>{item.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
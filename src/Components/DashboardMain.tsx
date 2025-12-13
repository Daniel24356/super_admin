import { Building2, Users2, Wallet, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UserTable";
import { UserDistributionChart } from "./UserDistributionChart";
import { LiveTrackingMap } from "./LiveTrackingMap";
import { ApiUrl } from "../api";

interface DashboardMetrics {
  totalDrivers: number;
  totalHospitals: number;
  totalOperators: number;
  totalIncome: number;
}

const DashboardMain = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalDrivers: 0,
    totalHospitals: 0,
    totalOperators: 0,
    totalIncome: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}admin/metrics/summary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        
        if (response.data.success) {
          setMetrics(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <>

      <div className="w-full h-full px-3 py-3">

        {/* Welcome Section */}
        <div className="mb-7">
          <h1 className="text-2xl font-semibold">Welcome, Admin</h1>
          <p className="text-gray-600 text-sm mt-1">
            View your overview details here
          </p>
        </div>

        {/* ======= STATS CARDS (RESPONSIVE) ======= */}
        <div
          className="
            grid
            grid-cols-1        /* MOBILE = 2 */
            sm:grid-cols-2     /* SMALL = 2 */
            lg:grid-cols-3     /* LARGE = 4 */
            xl:grid-cols-4
            gap-6
          "
        >
          {/* Total Users */}
          <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Users2 className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Total Users</span>
            <span className="text-2xl font-bold">{loading ? "-" : metrics.totalDrivers}</span>
          </div>

          {/* Total Hospitals */}
          <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-gray-600 text-sm">Total Hospitals</span>
            <span className="text-2xl font-bold">{loading ? "-" : metrics.totalHospitals}</span>
          </div>

          {/* Total Operators */}
          <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-gray-600 text-sm">Total Operators</span>
            <span className="text-2xl font-bold">{loading ? "-" : metrics.totalOperators}</span>
          </div>

          {/* Total Income */}
          <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Total Income</span>
            <span className="text-2xl font-bold">{loading ? "-" : formatCurrency(metrics.totalIncome)}</span>
          </div>
        </div>

        {/* ======= CHART + MAP (RESPONSIVE GRID) ======= */}
        <div
          className="
            grid
            grid-cols-1 
            lg:grid-cols-2
            gap-6
            mt-6
          "
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">User Distribution</h3>
            <UserDistributionChart />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Live Ambulance Tracking</h3>
            <LiveTrackingMap />
          </div>
        </div>

        {/* ======= TABLE (RESPONSIVE) ======= */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mt-6 overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
          <div className="overflow-x-auto">
            <UsersTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMain;

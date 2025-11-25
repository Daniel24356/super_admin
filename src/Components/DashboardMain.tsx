import {Building2, Users2, Wallet, Activity } from "lucide-react";
import Header from "./Header";
import UsersTable from "./UserTable";
import { UserDistributionChart } from "./UserDistributionChart";
import { LiveTrackingMap } from "./LiveTrackingMap";

const DashboardMain = () => {
  return (
    <>
    <Header/>
    <div className="w-full h-full bg-[#F5F2F0] px-6 py-7">
      {/* Welcome Section */}
      <div className="mb-7">
        <h1 className="text-2xl font-semibold">Welcome, Admin</h1>
        <p className="text-gray-600 text-sm mt-1">View your overview details here</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Users2 className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-gray-600 text-sm">Total Users</span>
          <span className="text-2xl font-bold">100</span>
        </div>

        {/* Total Hospitals */}
        <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-orange-500" />
          </div>
          <span className="text-gray-600 text-sm">Total Hospitals</span>
          <span className="text-2xl font-bold">60</span>
        </div>

        {/* Total Operators */}
        <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-gray-600 text-sm">Total Operators</span>
          <span className="text-2xl font-bold">30</span>
        </div>

        {/* Total Income */}
        <div className="bg-white h-[155px] p-6 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-gray-600 text-sm">Total Income</span>
          <span className="text-2xl font-bold">$100,000</span>
        </div>
      </div>
       
       <div className="flex gap-4 mt-4">
        <UserDistributionChart/>
        <LiveTrackingMap/>
       </div>
    
      <UsersTable/>
    </div>
     </>
  );
};

export default DashboardMain;

import Sidebar from "../../Components/Sidebar";
import DashboardMain from "../../Components/DashboardMain";

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen flex bg-[#F5F2F0] overflow-hidden">

      {/* Sidebar (Left) */}
      <div className="w-[255px] h-full bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Section (Right) */}
      <div className="flex-1 h-full overflow-y-auto">
        <DashboardMain />
      </div>

    </div>
  );
};

export default DashboardLayout;

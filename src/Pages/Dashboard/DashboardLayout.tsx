import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen 
        bg-[rgb(247,244,243)]
      "
    >
      {/* Sidebar (fixed on mobile but static on desktop) */}
          <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
     

      {/* Right side = Header + Main content */}
      <div className="md:ml-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-2 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-fit flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-6">
          <Outlet />     {/* <-- THIS SHOWS DashboardMain */}
        </main>

      </div>
    </div>
  );
}

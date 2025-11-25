import React from "react";
import {
  LayoutGrid,
  Truck,
  Building2,
  MapPin,
  CreditCard,
  FileText,
  Headphones,
  Settings,
  LogOut,
} from "lucide-react";
import logo from '../assets/logo.png'

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-[rgb(247,235,230)] flex flex-col justify-between py-6 px-4">
      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="ABEG EMS"
          className="h-[65px] w-[120px] mb-4 mx-auto object-cover"
        />

        {/* Menu List */}
        <nav className="flex flex-col space-y-1 text-sm font-medium">
          {/* ACTIVE ITEM */}
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm text-orange-500">
            <LayoutGrid size={20} />
            <span>Overview</span>
          </div>

          {/* Other Menu Items */}
          <MenuItem icon={<Truck size={20} />} label="Ambulance Operators" />
          <MenuItem icon={<Building2 size={20} />} label="Hospitals" />
          <MenuItem icon={<MapPin size={20} />} label="Monitoring" />
          <MenuItem icon={<CreditCard size={20} />} label="Transactions" />
          <MenuItem icon={<FileText size={20} />} label="Reports" />
          <MenuItem icon={<Headphones size={20} />} label="Support" />
          <MenuItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-3 text-red-500 font-medium px-4 py-3">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
}

function MenuItem({ icon, label }: MenuItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-black hover:bg-white/60 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}

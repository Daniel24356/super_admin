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
    X
} from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";


interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
<aside
  className={`
    fixed top-0 left-0 h-screen w-64 
    bg-[rgb(247,235,230)] 
    flex flex-col justify-between py-6 px-4 z-40
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>


                {/* Mobile Close Button */}
                <button
                    className="md:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-white"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                {/* Logo */}
                <div>
                    <img
                        src={logo}
                        alt="ABEG EMS"
                        className="h-[65px] w-[120px] mb-4 mx-auto object-cover"
                    />

                    <nav className="flex flex-col space-y-1 text-sm font-medium">
                        <Link to="/admin">
                           <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm text-orange-500">
                            <LayoutGrid size={20} />
                            <span>Overview</span>
                        </div>
                        </Link>
                       
                     
                     <Link to="/admin/operators">
                      <MenuItem icon={<Truck size={20} />} label="Ambulance Operators" />
                     </Link>
                      <Link to="/admin/hospitals">
                      <MenuItem icon={<Building2 size={20} />} label="Hospitals" />
                      </Link> 
                      <Link to="/admin/monitoring">
                         <MenuItem icon={<MapPin size={20} />} label="Monitoring" />
                      </Link>  
                      <Link to="/admin/transactions">
                        <MenuItem icon={<CreditCard size={20} />} label="Transactions" />
                      </Link>
                        <Link to="/admin/reports">
                         <MenuItem icon={<FileText size={20} />} label="Reports" />
                        </Link>
                       
                        <Link to="/admin/support">
                           <MenuItem icon={<Headphones size={20} />} label="Support" />
                        </Link>
                       
                        <Link to="/admin/settings">
                        <MenuItem icon={<Settings size={20} />} label="Settings" />
                        </Link>
                        
                    </nav>
                </div>

                <button className="flex items-center gap-3 text-red-500 font-medium px-4 py-3">
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>
        </>
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

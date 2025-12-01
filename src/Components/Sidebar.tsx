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
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();

    // Close sidebar ONLY on mobile
    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 
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

                <div>
                    <img
                        src={logo}
                        alt="ABEG EMS"
                        className="h-[65px] w-[120px] mb-4 mx-auto object-cover"
                    />

                    <nav className="flex flex-col space-y-1 text-sm font-medium">

                        <Link to="/admin" onClick={handleNavClick}>
                            <MenuItem
                                icon={<LayoutGrid size={20} />}
                                label="Overview"
                                active={location.pathname === "/admin"}
                            />
                        </Link>

                        <Link to="/admin/operators" onClick={handleNavClick}>
                            <MenuItem
                                icon={<Truck size={20} />}
                                label="Ambulance Operators"
                                active={location.pathname === "/admin/operators"}
                            />
                        </Link>

                        <Link to="/admin/hospitals" onClick={handleNavClick}>
                            <MenuItem
                                icon={<Building2 size={20} />}
                                label="Hospitals"
                                active={location.pathname === "/admin/hospitals"}
                            />
                        </Link>

                        <Link to="/admin/monitoring" onClick={handleNavClick}>
                            <MenuItem
                                icon={<MapPin size={20} />}
                                label="Monitoring"
                                active={location.pathname === "/admin/monitoring"}
                            />
                        </Link>

                        <Link to="/admin/transactions" onClick={handleNavClick}>
                            <MenuItem
                                icon={<CreditCard size={20} />}
                                label="Transactions"
                                active={location.pathname === "/admin/transactions"}
                            />
                        </Link>

                        <Link to="/admin/reports" onClick={handleNavClick}>
                            <MenuItem
                                icon={<FileText size={20} />}
                                label="Reports"
                                active={location.pathname === "/admin/reports"}
                            />
                        </Link>

                        <Link to="/admin/support" onClick={handleNavClick}>
                            <MenuItem
                                icon={<Headphones size={20} />}
                                label="Support"
                                active={location.pathname === "/admin/support"}
                            />
                        </Link>

                        <Link to="/admin/settings" onClick={handleNavClick}>
                            <MenuItem
                                icon={<Settings size={20} />}
                                label="Settings"
                                active={location.pathname === "/admin/settings"}
                            />
                        </Link>
                    </nav>
                </div>
                <Link to="/">
                   <button className="flex items-center gap-3 text-red-500 font-medium px-4 py-3">
                    <LogOut size={20} />
                    Logout
                </button>
                </Link>
               
            </aside>
        </>
    );
}

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

function MenuItem({ icon, label, active }: MenuItemProps) {
    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                ${
                    active
                        ? "bg-white text-orange-500 shadow-sm font-medium"
                        : "text-black hover:bg-white/60"
                }
            `}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}

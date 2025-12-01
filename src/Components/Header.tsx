import { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="w-full px-8 py-4 h-[70px] flex bg-white items-center justify-between shadow-sm relative">

            {/* Mobile Menu */}
            <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={onMenuClick}
            >
                <Menu size={24} />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex w-[250px] sm:w-[300px] md:w-[400px] h-[39px] bg-white rounded-full px-5 py-3 items-center gap-3 border border-gray-200">
                <Search className="w-5 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full outline-none text-sm"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 sm:gap-6 ml-auto">

                {/* Bell Icon + Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="w-[39px] h-[39px] rounded-full bg-[rgb(254,242,237)] shadow flex items-center justify-center"
                        onClick={() => setOpen(!open)}
                    >
                        <Bell className="w-5 h-4 fill-[rgb(242,124,74)] text-[rgb(242,124,74)]" />
                    </button>

                    {/* DROPDOWN */}
                    {open && (
                        <div
                            className="
                                absolute mt-3 
                                w-[280px] right-[-20px] 
                                sm:w-[350px] sm:right-0
                                bg-white rounded-xl shadow-lg border border-gray-100
                                z-50 animate-fadeIn
                            "
                        >
                            {/* Arrow */}
                            <div
                                className="
                                    absolute -top-2 right-8 
                                    sm:right-5 
                                    w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100
                                "
                            ></div>

                            {/* Header */}
                            <div className="flex items-center gap-3 px-4 py-4 border-b">
                                <div className="w-10 h-10 rounded-full bg-[rgb(254,242,237)] flex items-center justify-center">
                                    <Bell className="text-orange-500" size={18} />
                                </div>
                                <h2 className="text-base font-semibold">Notifications (6)</h2>
                            </div>

                            {/* Notification List */}
                            <div className="max-h-[260px] overflow-y-auto">
                                {[
                                    { title: "Driver at Destination", desc: "Your driver, Fred Johnson has arri...", time: "Just Now" },
                                    { title: "Payment Sent", desc: "You have a new message from Sm...", time: "12:00 PM" },
                                    { title: "New Message from Operator", desc: "You have a new message from Sm...", time: "12:00 PM" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[rgb(254,242,237)] flex items-center justify-center">
                                                <Bell className="text-orange-500" size={16} />
                                            </div>

                                            <div className="flex flex-col">
                                                <p className="font-medium text-sm text-gray-900">{item.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>

                                        <span className="text-xs text-gray-500">{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="border-t py-3 text-right px-4">
                                <Link to="/admin/notifications" className="text-sm text-orange-500 font-medium underline">
                                    See all notifications
                                </Link>
                            </div>

                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <div className="relative w-[39px] h-[39px] rounded-full bg-[rgb(254,242,237)] flex items-center justify-center font-semibold text-orange-600">
                        SA
                        <div className="absolute right-0 bottom-0 w-[9px] h-[9px] rounded-full bg-green-400"></div>
                    </div>

                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm font-medium">Super Admin</span>
                    </div>
                </div>

            </div>

        </header>
    );
};

export default Header;

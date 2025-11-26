import { Search, Bell, Menu } from "lucide-react";

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className="w-full px-8 py-4 h-[70px] flex bg-white items-center justify-between shadow-sm">

            {/* Mobile Menu Button */}
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

                {/* Bell Icon */}
                <div className="w-[39px] h-[39px] rounded-full bg-[rgb(254,242,237)] shadow flex items-center justify-center">
                    <Bell className="w-5 h-4 fill-[rgb(242,124,74)] text-[rgb(242,124,74)]" />
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <div className="relative w-[39px] h-[39px] rounded-full bg-[rgb(254,242,237)] flex items-center justify-center font-semibold text-orange-600">
                        SA
                        <div className="absolute right-0 bottom-0 w-[9px] h-[9px] rounded-full bg-green-400"></div>
                    </div>

                    {/* Hide name on very small screens */}
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm font-medium">Super Admin</span>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;

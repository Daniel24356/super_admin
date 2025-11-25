import { Search, Bell } from "lucide-react";

const Header = () => {
    return(
        <>
         <div className="w-full px-4 py-4 h-[70px] flex bg-white items-center justify-between">
        {/* Search */}
        <div className="w-[400px] h-[39px] bg-white rounded-full px-5 py-3 flex items-center gap-3 border border-gray-200">
          <Search className="w-5 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <div className="w-[39px] h-[39px] rounded-full bg-[rgb(254,242,237)] shadow flex items-center justify-center">
            <Bell className="w-5 h-4 fill-[rgb(242,124,74)] text-[rgb(242,124,74)]" /> 
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-[39px] h-[39px] rounded-full bg-[rgb(254,242,237)] flex items-center justify-center font-semibold text-orange-600">
              SA
            <div className="absolute right-0 bottom-0 w-[9px] h-[9px] rounded-full bg-green-400"></div>
            </div>
          
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">Super Admin</span>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Header
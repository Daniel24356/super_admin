import { Building2, Users2, Wallet, Activity, Eye } from "lucide-react";
import {
  EllipsisVerticalIcon,
  FunnelIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import TransactionDetailsModal from "../../Components/TransactionDetailsModal";


interface Driver {
  name: string;
  services: string;
  amount: number;
  operator: string;
  date: string;
  description: string;
}

const drivers: Driver[] = [
  { name: "Metro Hospital", services: "Cardiac Emergency Transfer", amount: 200, operator: "24/7 Emergency", date: "12/10/2025 3:00 PM", description: "Emergency transport - Metro Hospital, assigned driver and a..." },
  { name: "Metro Hospital", services: "Cardiac Emergency Transfer", amount: 200, operator: "24/7 Emergency", date: "12/10/2025 3:00 PM", description: "Emergency transport - Metro Hospital, assigned driver and a..." },
  { name: "Metro Hospital", services: "Cardiac Emergency Transfer", amount: 200, operator: "24/7 Emergency", date: "12/10/2025 3:00 PM", description: "Emergency transport - Metro Hospital, assigned driver and a..." },
  { name: "Metro Hospital", services: "Cardiac Emergency Transfer", amount: 200, operator: "24/7 Emergency", date: "12/10/2025 3:00 PM", description: "Emergency transport - Metro Hospital, assigned driver and a..." },
  { name: "Metro Hospital", services: "Cardiac Emergency Transfer", amount: 200, operator: "24/7 Emergency", date: "12/10/2025 3:00 PM", description: "Emergency transport - Metro Hospital, assigned driver and a..." },
  { name: "Metro Hospital", services: "Cardiac Emergency Transfer", amount: 200, operator: "24/7 Emergency", date: "12/10/2025 3:00 PM", description: "Emergency transport - Metro Hospital, assigned driver and a..." },
];

const TransactionsPage = () => {

       const [openMenu, setOpenMenu] = useState<number | null>(null);

  // NEW — controls modal open
  const [openModal, setOpenModal] = useState(false);
    
      //  const [driverToSuspend, setDriverToSuspend] = useState<Driver | null>(null);

    return(
        <>
         <div className="w-full h-full px-3 py-3">

        {/* Welcome Section */}
        <div className="mb-7">
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-gray-600 text-sm mt-1">
           View and manage all transactions here
          </p>
        </div>

        {/* ======= STATS CARDS (RESPONSIVE) ======= */}
        <div
          className="
            grid
            grid-cols-1        /* MOBILE = 2 */
            sm:grid-cols-2     /* SMALL = 2 */
            lg:grid-cols-3     /* LARGE = 4 */
            xl:grid-cols-5
            gap-6
          "
        >
          {/* Total Users */}
          <div className="bg-white h-[115px] px-6 py-2 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Users2 className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-[12px]">Total Transactions</span>
            <span className="text-xl font-bold">50</span>
          </div>

          {/* Total Hospitals */}
          <div className="bg-white h-[115px] px-6 py-2 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-gray-600 text-[12px]">Pending Transactions</span>
            <span className="text-xl font-bold">5</span>
          </div>

          {/* Total Operators */}
          <div className="bg-white h-[115px] px-6 py-2 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-gray-600 text-[12px]">Total Approved</span>
            <span className="text-xl  font-bold">45</span>
          </div>

          {/* Total Income */}
          <div className="bg-white h-[115px] px-6 py-2 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-[12px]">Total Rejected</span>
            <span className="text-xl  font-bold">5</span>
          </div>

             <div className="bg-white h-[115px] px-6 py-2 rounded-2xl shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-[12px]">Total Transaction Fee</span>
            <span className="text-xl  font-bold">₦100,000</span>
          </div>
        </div>

         {/* TABLE CARD */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">All Requests</h2>
          <span className="text-sm text-[rgba(0, 0, 0, 1)]">
            Last Updated, Sept 20, 2025
          </span>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center px-4 py-2 border rounded-lg flex-1 bg-white">
            <MagnifyingGlassIcon className="w-5 h-5 text-black" />
            <input
              placeholder="Search by hospitals, operators or drivers..."
              className="ml-2 w-full text-[14px] placeholder-black bg-transparent outline-none"
            />
          </div>

          <button className="flex items-center text-[14px] gap-2 px-4 py-2 border rounded-lg bg-white">
            <CalendarDaysIcon className="w-5 h-5" />
            Date Range
          </button>

          <button className="flex items-center text-[14px] gap-2 px-4 py-2 border rounded-lg bg-white">
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>

          <button className="flex items-center text-[14px] gap-2 px-4 py-2 text-[rgb(244,148,108)] border border-[rgb(244,148,108)] rounded-lg bg-white">
            Send Bulk Emails
            <FunnelIcon className="w-5 h-5" />
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-[rgb(254,242,237)] text-gray-600 text-[13px]">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Hospital Name</th>
                <th className="py-2 px-4">Ambulance Operator</th>
                <th className="py-2 px-4">Amount and Services</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {drivers.map((d, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-[14px]">{d.date}</td>
                  <td className="py-3 px-4 text-[14px]">{d.name}</td>
                  <td className="py-3 px-4 text-[14px]">{d.operator}</td>
                  <td className="py-3 px-4 text-[14px]"> <span className="pr-2 font-bold text-[rgba(242,124,74,1)] text-[14px]">${d.amount}</span>{d.services}</td>
                  <td className="py-3 px-4 text-[14px]">{d.description}</td>

                  {/* ACTION MENU */}
                  <td className="relative py-3 px-4">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === index ? null : index
                        )
                      }
                    >
                      <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                    </button>

                    {openMenu === index && (
                    <div className="absolute right-12 top-6 w-44 bg-white shadow-lg rounded-xl border z-20 py-2">
                      <button
                        onClick={() => {
                          setOpenModal(true); 
                          setOpenMenu(null);
                        }}
                       className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-gray-600" /> View Details
                      </button>
                  
                    </div>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 text-[14px] border rounded-lg bg-white">
            Previous
          </button>
          <p className="text-gray-600 text-sm">Page 1 of 10</p>
          <button className="px-4 py-2 text-[14px] border rounded-lg bg-white">Next</button>
        </div>
      </div>
     
     <TransactionDetailsModal
             open={openModal}
             onClose={() => setOpenModal(false)}
           />
      </div>
        </>
    )
}

export default TransactionsPage
import { useState } from "react";
import { Clock } from 'lucide-react';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: "Pending" | "Resolved";
  priority: "Low" | "Medium";
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border rounded-xl p-5 relative bg-white shadow-sm">
      {/* Three-dots menu */}
      <div
        className="absolute top-3.5 right-4 cursor-pointer p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setMenuOpen((s) => !s)}
      >
        <div className="w-1 h-1 bg-gray-600 rounded-full mb-0.5"></div>
        <div className="w-1 h-1 bg-gray-600 rounded-full mb-0.5"></div>
        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-4 top-10 bg-white border shadow-md rounded-lg py-2 w-32 z-20">
          <button className="flex w-full px-4 py-2 hover:bg-gray-100 text-[14px] text-left">
            ✓ Resolve
          </button>
          <button className="flex w-full px-4 py-2 hover:bg-gray-100 text-[14px] text-left">
            ✕ Close
          </button>
        </div>
      )}

      {/* Title + ID */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
        <span className="text-sm font-medium text-gray-500 mr-6">{ticket.id}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-[14px] mt-1">{ticket.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        {/* Date */}
        <div className="flex items-center text-gray-500 text-xs">
          <span><Clock size={12}/></span>
          <span className="ml-2">Date Created: {ticket.createdAt}</span>
        </div>

        {/* Status + Priority */}
        <div className="flex items-center gap-2">
          {ticket.status === "Pending" && (
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
              Pending
            </span>
          )}
          {ticket.status === "Resolved" && (
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
              Resolved
            </span>
          )}

          <span
            className={`px-3 py-1 text-xs rounded-full ${
              ticket.priority === "Medium"
                ? "bg-orange-100 text-orange-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {ticket.priority}
          </span>
        </div>
      </div>
    </div>
  );
}

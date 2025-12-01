import { useState } from "react";
import TicketCard, { type Ticket } from "../../Components/TicketCard";

const tabs = ["All Tickets", "Pending", "Resolved"] as const;
type Tab = (typeof tabs)[number];

const sampleTickets: Ticket[] = [
  {
    id: "TICKET-003",
    title: "Payment processing issue",
    description:
      "Unable to process payment for invoice INV-2024-001. Card keeps getting declined.",
    createdAt: "2024-01-15, 14:30",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "TICKET-002",
    title: "Driver contact information missing",
    description:
      "Request AMB-002 shows no driver contact information in the tracking page.",
    createdAt: "2024-01-15, 14:30",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "TICKET-002",
    title: "Feature request: Bulk request creation",
    description:
      "Would like ability to create multiple ambulance requests at once for scheduled transports.",
    createdAt: "2024-01-15, 14:30",
    status: "Resolved",
    priority: "Low",
  },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All Tickets");

  return (
    <div className="p-3 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">Support</h1>
      <p className="text-gray-500 mb-6">
        View and manage Support tickets from users here
      </p>

      {/* Tabs */}
      <div className="mb-6">
  <div className="grid grid-cols-3 gap-3 bg-white w-fit py-1 px-1 rounded-md sm:flex sm:flex-row sm:items-center sm:gap-3">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 rounded-md text-sm w-full sm:w-auto
          ${activeTab === tab
            ? "bg-[rgb(254,242,237)] border-orange-400 text-orange-600"
            : "bg-transparent text-gray-600"
          }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-1">Support Tickets</h2>
        <p className="text-gray-500 text-[14px] mb-4">Track all support requests</p>

        {/* Ticket List */}
        <div className="flex flex-col gap-4">
          {sampleTickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}

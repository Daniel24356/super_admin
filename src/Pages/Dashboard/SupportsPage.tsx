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
    <div className="p-6 bg-[#f7f5f3] min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">Support</h1>
      <p className="text-gray-500 mb-6">
        View and manage Support tickets from users here
      </p>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === tab
                ? "bg-[#fbeee7] text-black shadow-sm"
                : "bg-white text-gray-600 border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-1">Support Tickets</h2>
        <p className="text-gray-500 mb-4">Track all support requests</p>

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

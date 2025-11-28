import { useState } from "react";

const togglesInitial = {
  email: false,
  sms: true,
  support: false,
  payment: true,
  emergency: false,
  weekly: false,
};

export default function SettingsPage() {
  const [toggles, setToggles] = useState(togglesInitial);

  const handleToggle = (key: keyof typeof togglesInitial) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] p-10 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500">View and manage your account settings here</p>
        </div>

        <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
          Save All Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2 mb-6">
        <button className="text-orange-500 border-b-2 border-orange-500 pb-2 font-medium">
          Notifications
        </button>
        <button className="text-gray-500 hover:text-gray-700 transition">Security</button>
        <button className="text-gray-500 hover:text-gray-700 transition">Transaction</button>
      </div>

      {/* Card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="font-semibold text-lg mb-6">Notification Preferences</h2>

        <p className="text-sm text-gray-600 mb-4">
          Choose how you want to receive updates and alerts
        </p>

        {/* Toggle List */}
        <div className="space-y-4 mb-10">
          {[
            { key: "email", title: "Email Alerts", desc: "Receive notifications via email" },
            { key: "sms", title: "SMS Alerts", desc: "Receive urgent notifications via SMS" },
            { key: "support", title: "Support alerts", desc: "Receive alerts when a user contacts support" },
            { key: "payment", title: "Payment Notifications", desc: "Invoice and payment confirmations" },
            { key: "emergency", title: "Emergency Alerts", desc: "Critical updates for emergency requests" },
            { key: "weekly", title: "Weekly Reports", desc: "Summary of your weekly activity" },
          ].map(({ key, title, desc }) => (
            <ToggleRow
              key={key}
              label={title}
              description={desc}
              value={toggles[key as keyof typeof togglesInitial]}
              onChange={() => handleToggle(key as keyof typeof togglesInitial)}
            />
          ))}
        </div>

        {/* Notification Schedule */}
        <h2 className="font-semibold text-lg mb-4">Notification Schedule</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Quiet Hours Start</label>
            <select className="w-full border rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400">
              <option>10:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quiet Hours End</label>
            <select className="w-full border rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400">
              <option>6:00 AM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Toggle Component ---------------- */

interface ToggleProps {
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
}

function ToggleRow({ label, description, value, onChange }: ToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          value ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

import { useState } from "react";
import UpdatePasswordModal from "../../Components/UpdatePasswordModal";
import TransactionSettingModal from "../../Components/TransactionSettingModal";

/* -------------------------------------------------
   NOTIFICATION TOGGLES
--------------------------------------------------- */
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
  const [activeTab, setActiveTab] = useState<
    "Notifications" | "Security" | "Transaction"
  >("Notifications");

  /* -------------------------------------
      NEW STATE FOR MODALS
  -------------------------------------- */
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const handleToggle = (key: keyof typeof togglesInitial) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };


  return (
    <div className="min-h-screen p-3 text-gray-800">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500">
            View and manage your account settings here
          </p>
        </div>

        <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
          Save All Changes
        </button>
      </div>

      <div className="flex items-center gap-2 my-5 bg-white w-max p-1 rounded-md shadow-sm">
        {["Notifications", "Security", "Transaction"].map((tab) => {
          const isActive = tab === activeTab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={
                isActive
                  ? "px-5 py-2 rounded-md text-sm bg-[rgb(254,242,237)] text-[#f36932] font-medium"
                  : "px-5 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
              }
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ---------------- TAB CONTENT ---------------- */}
      {activeTab === "Notifications" && (
        <NotificationsSection toggles={toggles} handleToggle={handleToggle} />
      )}

      {activeTab === "Security" && (
        <SecuritySection
          openPasswordModal={() => setOpenPasswordModal(true)}
        />
      )}

      {activeTab === "Transaction" && (
        <TransactionSection
          openTransactionModal={() => setOpenTransactionModal(true)}
        />
      )}

      {/* ---------------- MODALS ---------------- */}
      <UpdatePasswordModal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
      />

      <TransactionSettingModal
        open={openTransactionModal}
        onClose={() => setOpenTransactionModal(false)}
      />
    </div>
  );
}

/* -------------------------------------------------
   NOTIFICATIONS SECTION
--------------------------------------------------- */
function NotificationsSection({
  toggles,
  handleToggle,
}: {
  toggles: any;
  handleToggle: (key: keyof typeof togglesInitial) => void;
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="font-semibold text-base mb-6">Notification Preferences</h2>

      <p className="text-sm text-gray-600 mb-4">
        Choose how you want to receive updates and alerts
      </p>

      <div className="space-y-4 mb-10">
        {[
          { key: "email", title: "Email Alerts", desc: "Receive notifications via email" },
          { key: "sms", title: "SMS Alerts", desc: "Urgent notifications via SMS" },
          { key: "support", title: "Support Alerts", desc: "Alerts when users contact support" },
          { key: "payment", title: "Payment Notifications", desc: "Payment confirmations" },
          { key: "emergency", title: "Emergency Alerts", desc: "Critical emergencies" },
          { key: "weekly", title: "Weekly Reports", desc: "Weekly account summary" },
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

      <h2 className="font-semibold text-base mb-4">Notification Schedule</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Quiet Hours Start" defaultValue="10:00 PM" />
        <SelectField label="Quiet Hours End" defaultValue="6:00 AM" />
      </div>
    </div>
  );
}

/* -------------------------------------------------
   SECURITY SECTION — now opens password modal
--------------------------------------------------- */
function SecuritySection({
  openPasswordModal,
}: {
  openPasswordModal: () => void;
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border space-y-10">

      {/* -------- Security Settings -------- */}
      <div>
        <h2 className="text-base font-semibold mb-4">Security Settings</h2>

        <div className="border rounded-xl p-6 space-y-6">

          {/* Change Password */}
          <SecurityRow
            title="Change Password"
            desc="Last changed 3 months ago"
            btn="Update"
            onClick={openPasswordModal}  // <-- ADDED
          />

          {/* Two-Factor */}
          <SecurityToggleRow
            title="Two-Factor Authentication"
            desc="Add an extra layer of security"
          />
        </div>
      </div>

      {/* -------- Login Activity -------- */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Login Activity</h2>

        <div className="space-y-4">
          <LoginRow device="Chrome on Windows" location="New York, NY" time="1 hour ago" current />
          <LoginRow device="Safari on iPhone" location="New York, NY" time="1 hour ago" />
          <LoginRow device="Chrome on Windows" location="New York, NY" time="2 days ago" />
        </div>
      </div>

      {/* -------- Data & Privacy -------- */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Data & Privacy</h2>

        <div className="border rounded-xl p-6 space-y-6">

          <SecurityRow
            title="Export Account Data"
            desc="Download a copy of your account data"
            btn="Export"
          />

          <SecurityRow
            title="Delete Account"
            desc="Permanently delete your account and data"
            btn="Delete"
            danger
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   TRANSACTION SECTION — now opens modal
--------------------------------------------------- */
function TransactionSection({
  openTransactionModal,
}: {
  openTransactionModal: () => void;
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">

      <h2 className="text-base font-semibold mb-6">Fees Settings</h2>

      <div className="border rounded-xl p-6">

        {/* Management Fee */}
        <div className="flex justify-between items-center pb-5 border-b">
          <div>
            <p className="font-medium text-[14px]">Management Fee</p>
            <p className="text-xs text-gray-500">15%</p>
          </div>

          <button
            className="px-4 py-1.5 border rounded-lg text-xs text-gray-600 hover:bg-gray-50"
            onClick={openTransactionModal}   // <-- ADDED
          >
            Update
          </button>
        </div>

        {/* VAT */}
        <div className="flex justify-between items-center pt-5">
          <div>
            <p className="font-medium text-[14px]">VAT</p>
            <p className="text-xs text-gray-500">7.5%</p>
          </div>

          <button
            className="px-4 py-1.5 border rounded-lg text-xs text-gray-600 hover:bg-gray-50"
            onClick={openTransactionModal}   // <-- ADDED
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}

/* -------------------------------------------------
   SMALL COMPONENTS (unchanged UI)
--------------------------------------------------- */

// ToggleRow, SelectField, SecurityRow, SecurityToggleRow, LoginRow remain the same
// except SecurityRow now accepts onClick which is optional

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium text-[14px]">{label}</p>
        <p className="text-[12px] text-gray-500">{description}</p>
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

function SelectField({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select className="w-full text-sm border rounded-lg p-2.5 focus:ring-orange-400 focus:border-orange-400">
        <option>{defaultValue}</option>
      </select>
    </div>
  );
}

function SecurityRow({
  title,
  desc,
  btn,
  danger,
  onClick,
}: {
  title: string;
  desc: string;
  btn: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className={`font-medium text-[14px] ${danger ? "text-red-600" : ""}`}>
          {title}
        </p>
        <p className={`text-xs ${danger ? "text-red-500" : "text-gray-500"}`}>
          {desc}
        </p>
      </div>

      <button
        onClick={onClick}
        className={`px-4 py-1.5 border rounded-lg text-xs ${
          danger
            ? "border-red-500 text-red-500 hover:bg-red-50"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        {btn}
      </button>
    </div>
  );
}

function SecurityToggleRow({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium text-[14px]">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-orange-500 transition"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition"></div>
      </label>
    </div>
  );
}

function LoginRow({
  device,
  location,
  time,
  current,
}: {
  device: string;
  location: string;
  time: string;
  current?: boolean;
}) {
  return (
    <div className="border p-5 rounded-xl flex justify-between items-center">
      <div>
        <p className="font-medium text-[14px]">{device}</p>
        <p className="text-xs text-gray-500">
          {location} • {time}
        </p>
      </div>

      {current ? (
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
          Current
        </span>
      ) : (
        <button className="px-4 py-1.5 text-red-500 border border-red-400 rounded-lg text-xs hover:bg-red-50">
          Revoke
        </button>
      )}
    </div>
  );
}

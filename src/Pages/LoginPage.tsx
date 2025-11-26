import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF6F3] flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm h-[75px] flex items-center px-6 sm:px-10">
        <img
          src={logo}
          alt="ABEG EMS"
          className="h-[58px] w-auto object-contain"
        />
      </header>

      {/* Main Content - Perfect Center */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
              Admin Login
            </h2>

            {/* Email */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition mb-5"
            />

            {/* Password */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <a
                href="#"
                className="text-sm text-orange-500 hover:text-orange-600 font-medium transition"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Link to="/admin">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3.5 rounded-full transition duration-200 transform hover:scale-[1.02] active:scale-100">
                Login
              </button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full min-h-screen bg-[#FCF6F3] relative">
            <header className="w-full bg-white shadow-sm h-[75px] flex items-center px-10">
                <img
                    src={logo}
                    alt="ABEG EMS"
                    className="h-[63px] w-[96px] object-cover"
                />
            </header>

            {/* Background faint pattern */}
            {/* <div className="absolute inset-0 pointer-events-none opacity-10">
        <img
          src="/pattern.png"
          alt="background pattern"
          className="w-full h-full object-cover"
        />
      </div> */}

            {/* Login Card */}
            <div className="w-full h-[446px] flex justify-center mt-10 px-4">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-10 z-10">
                    <h2 className="text-center text-[30px] text-[rgba(19, 23, 14, 1)] font-semibold mb-8">
                        Admin Login
                    </h2>

                    {/* Email */}
                    <label className="text-sm font-medium block mb-1">
                        Admin Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter email address"
                        className="w-full border rounded-lg px-4 py-2 mb-5 outline-none focus:ring-1 focus:ring-orange-400"
                    />

                    {/* Password */}
                    <label className="text-sm font-medium block mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-orange-400"
                            defaultValue="password"
                        />

                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <div className="flex justify-end mt-1 mb-6">
                        <a href="#" className="text-sm text-orange-500 hover:underline">
                            Forgot Password
                        </a>
                    </div>

                    {/* Login Button */}
                    <Link to="admin">
                        <button className="w-full bg-orange-500 text-white py-3 rounded-full text-center font-medium hover:bg-orange-600 transition">
                            Login
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

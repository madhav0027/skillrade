import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

// Assuming you have lucide-react installed → npm install lucide-react
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Chrome,          // we'll use this as Google placeholder
  Github 
} from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Optional: track confirm password separately (recommended)
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side check (you can expand this)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await API.post("/auth/register/", {
        username,
        email,
        password,
      });

      console.log(res.status);

      if (res.status === 200) {
        navigate("/verifyemail", { replace: true });
      }
    } catch (err) {
      console.error("Registration error:", err);
      // You can show toast/notification here later
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-black px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl shadow-black/40 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600/20">
              <UserPlus className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-gray-400">
              Join thousands of learners today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-green-900/30 flex items-center justify-center gap-2 group"
            >
              <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google */}
            <button
              type="button"
              onClick={() => {
                // window.location.href = "/auth/google";  ← your backend Google OAuth route
                console.log("Redirect to Google OAuth");
              }}
              className="flex items-center justify-center gap-3 py-3 px-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-all duration-200"
            >
              <Chrome className="h-5 w-5 text-red-400" />
              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => {
                // window.location.href = "/auth/github";
                console.log("Redirect to GitHub OAuth");
              }}
              className="flex items-center justify-center gap-3 py-3 px-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-all duration-200"
            >
              <Github className="h-5 w-5" />
              GitHub
            </button>
          </div>

          {/* Login link */}
          <p className="mt-8 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
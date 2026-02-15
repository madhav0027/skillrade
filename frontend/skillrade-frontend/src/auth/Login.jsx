import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../authcontext/AuthContext";

// lucide-react icons (npm install lucide-react)
import {
  LogIn,
  Mail,
  Lock,
  Chrome, // placeholder for Google (no official Google icon in lucide)
  Github,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    try {
      const res = await API.post("/auth/login/", {
        email,
        password,
      });

      login(res.data);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.response);

      const code = err.response?.data?.code;

      switch (code) {
        case "EMAIL_NOT_VERIFIED":
          navigate("/verify", { replace: true });
          break;
        default:
          setError("Invalid Email or Password");
          break;
      }
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
              <LogIn className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-400">
              Log in to continue your learning journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-950/60 border border-red-800/60 p-3 text-red-300 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-green-900/30 flex items-center justify-center gap-2 group"
            >
              <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google */}
            <button
              type="button"
              onClick={() => {
                // Usually: window.location.href = "/auth/google";
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

          {/* Register link */}
          <p className="mt-8 text-center text-gray-400 text-sm">
            Don&#39;t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Create one now
            </button>
          </p>

          {/* Optional: Forgot password */}
          <p className="mt-4 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-gray-400 hover:text-green-400 text-sm transition-colors"
            >
              Forgot password?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}


import { Chrome , Github} from "lucide-react";
import React, { useState } from "react";
import API from "../api/api";
import { useAuth } from "../authcontext/AuthContext";


const AuthDialog = ({ open, onClose }) => {
  const [mode, setMode] = useState("login");
  const {login} = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;


  const SocialLogin = () => (
    <div className="flex gap-3 justify-center">
      
      <button
        className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition"
        title="Continue with Google"
        onClick={() => console.log("Google login")}
      >
        <Chrome className="w-5 h-5" />
      </button>

      <button
        className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition"
        title="Continue with GitHub"
        onClick={() => console.log("GitHub login")}
      >
        <Github className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-full max-w-lg bg-black/85 text-white border border-border rounded-2xl p-8 shadow-2xl animate-fade-in">

        {/* //Loading */}
        {loading && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Please wait...</p>
          </div>
        </div>
      )}

      {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === "login" && "Welcome back"}
            {mode === "register" && "Create your account"}
            {mode === "verify" && "Verify your email"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" && "Login to continue your Learning journey"}
            {mode === "register" && "Start building Your Skill Today"}
            {mode === "verify" && "Almost there 🚀"}
          </p>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <button
              className="w-full bg-red-600/80 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              onClick={async () => {
                try {
                  setLoading(true);
                  setError("");

                  const res = await API.post("api/auth/login", loginData);
                  
                  await login();
                  onClose();
                } catch (err) {
                  setError(err?.response?.data?.message || err?.response?.data?.msg);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Login
            </button>

            <SocialLogin />

            <div className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("register")}
                className="text-accent font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>
          </div>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={registerData.fullName}
              onChange={(e) =>
                setRegisterData({ ...registerData, fullName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Repeat password"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={registerData.repeatPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  repeatPassword: e.target.value,
                })
              }
            />

            <button
              className="w-full bg-red-600/80 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              onClick={async () => {
                if (registerData.password !== registerData.repeatPassword) {
                  alert("Passwords do not match");
                  return;
                }

                try {
                  console.log("click")
                  setLoading(true);
                  setError("");

                  const userPayload = {
                    name: registerData.fullName,
                    email: registerData.email,
                    password: registerData.password,
                  };

                  const res = await API.post("/api/auth/register", userPayload);

                  console.log("Register success:", res.data);

                  setMode("verify");
                } catch (err) {
                  setError(err?.response?.data?.message || err?.response?.data?.msg);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Create Account
            </button>

            <SocialLogin />

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-accent font-medium cursor-pointer hover:underline"
              >
                Login
              </span>
            </div>
          </div>
        )}

        {/* VERIFY */}
        {mode === "verify" && (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              We’ve sent a verification link to your email.
              <br />
              Please verify your account to continue.
            </p>

            <button
              className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              onClick={() => {
                onClose();
                setMode("login");
              }}
            >
              Done
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-border" />

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthDialog;
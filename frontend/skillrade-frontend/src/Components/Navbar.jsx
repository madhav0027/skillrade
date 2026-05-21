import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../authcontext/AuthContext";
import AuthDialog from "../auth/AuthDialog";

export default function Navbar() {
  const { user, logout ,login } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const [isopen, setisopen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authloading, setauthloading] = useState(true);
  const [authOpen, setauthopen] = useState(false);

  useEffect(() => {
    console.log(user)
    // const fetchUser = async () => {
    //   try {
    //     const res = await API.get("api/user")
    //     setuser(res.data);
    //   } catch (err) {
    //     console.error("Auth error:", err);
    //   } finally {
    //     setauthloading(false);
    //   }
    // };

    // fetchUser();
  });

  // ⏳ LOADING SCREEN (ONLY WHILE AUTH IS CHECKING)
  // if (authloading) {
  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-green-500" />
  //         <p className="text-sm text-white/70">Checking authentication…</p>
  //       </div>o
  //     </div>
  //   );
  // }

  // ✅ NAVBAR RENDERS AFTER AUTH LOAD
  return (
    <>
          <AuthDialog open={authOpen} onClose={() => setauthopen(false)}/>
    <nav className="bg-black/95 fixed w-full z-20 top-0 border-b border-white/10 print:hidden">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-white">
            Skill<span className="text-green-500">rade</span>
          </span>
        </a>

        {/* Right Section */}
        <div className="flex items-center md:order-2 space-x-3">
  <div className="relative">
          {/* Avatar */}
          <div
            onClick={() => {if(!user) 
                setauthopen(true) 
              else {
                setIsOpen(!isOpen)}
              }
              }
            className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-semibold cursor-pointer hover:opacity-90"
          >
          {user?.profilepic ? (
              <img
                src={user?.profilepic}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              "U"
            )}
          </div>

          {/* Dropdown (if logged in) */}
{isOpen && user && (
  <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-white/10 bg-gray-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
    
    {/* Top User Info */}
    <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-green-500/10 to-emerald-500/5">
      <div className="flex items-center gap-3">
        <img
          src={
            user?.profilepic?.length > 0
              ? user.profilepic
              : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fstorage%2Fimg%2Fthumb%2Fabstract-user-flat-3.png"
          }
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border border-green-500/30"
        />

        <div>
          <h3 className="text-white font-semibold text-sm">
            {user?.username || "User"}
          </h3>

          <p className="text-gray-400 text-xs">
            {user?.email || "user@email.com"}
          </p>
        </div>
      </div>
    </div>

    {/* Menu Items */}
        <div className="p-2 space-y-1">
          <button
            onClick={() => (window.location.href = "/profile")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <div className="text-left">
              <p className="font-medium">My Profile</p>
              <p className="text-xs text-gray-500">
                View your public profile
              </p>
            </div>
          </button>

          <button
            onClick={() => (window.location.href = "/settings")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <div className="text-left">
              <p className="font-medium">Settings</p>
              <p className="text-xs text-gray-500">
                Manage your account
              </p>
            </div>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <div className="text-left">
              <p className="font-medium">Logout</p>
              <p className="text-xs text-red-400/70">
                Sign out from account
              </p>
            </div>
          </button>
        </div>
      </div>
    )}
    </div>
          {/* User Dropdown */}
          {isopen && (
            <div className="absolute right-4 top-16 w-48 bg-gray-900/95 backdrop-blur border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/10">
                <span className="block text-white font-semibold">
                  {user.name}
                </span>
                <span className="block text-gray-400 text-xs truncate">
                  {user.email}
                </span>
              </div>

              <ul className="p-2 text-sm">
                <li>
                  <a
                    href="/Dashboard"
                    className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/10"
                  >
                    Dashboard
                  </a>
                </li>

                <li>
                  <a
                    href="/settings"
                    className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/10"
                  >
                    Settings
                  </a>
                </li>

                <li className="mt-1">
                  <button
                    onClick={handlelogut}
                    className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>

        {/* Main Menu */}
        <div
          className={`fixed md:static inset-0 z-40 bg-black/95 transition-all ${
            menuOpen ? "block" : "hidden"
          } md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8 p-6 md:p-0 text-lg">
            {[
              ["Dashboard", "/Dashboard"],
              ["Learn", "/learn"],
              user ? ["Skills", "/skills"] : ["Skills","/"],
              ["Community", "/community"],
              ["About", "/about"],
            ].map(([label, link]) => (
              <li key={label}>
                <a
                  href={link}
                  className="block px-4 py-3 rounded-xl text-white/80 hover:text-green-400"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

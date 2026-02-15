import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isopen, setisopen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setuser] = useState({});
  const [authloading, setauthloading] = useState(true);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const handlelogut = (e) => {
    e.preventDefault();
    logout();
    navigate("/", { replace: true });
    window.location.reload();
  };


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setauthloading(false);
        return;
      }

      try {
        const res = await API.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setuser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setauthloading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  // ⏳ LOADING SCREEN (ONLY WHILE AUTH IS CHECKING)
  if (authloading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-green-500" />
          <p className="text-sm text-white/70">Checking authentication…</p>
        </div>
      </div>
    );
  }

  // ✅ NAVBAR RENDERS AFTER AUTH LOAD
  return (
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
          {user.username?.length > 0 ? (
            <button
              onClick={() => setisopen(!isopen)}
              className="flex text-sm rounded-full focus:ring-2 focus:ring-green-500"
            >
              <img
                className="w-9 h-9 rounded-full object-cover"
                src={user.profilepic}
                alt="user"
              />
            </button>
          ) : (
            <div>
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg ml-2"
              >
                Signup
              </button>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg ml-2"
              >
                Login
              </button>
            </div>
          )}

          {/* User Dropdown */}
          {isopen && (
            <div className="absolute right-4 top-16 w-48 bg-gray-900/95 backdrop-blur border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/10">
                <span className="block text-white font-semibold">
                  {user.username}
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
              ["Skills", "/skills"],
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
  );
}

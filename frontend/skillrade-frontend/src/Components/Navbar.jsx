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

  const [authloading,setauthloading] = useState(true)

  const token = localStorage?.getItem("token");
  const id = localStorage?.getItem("id");

  const handlelogut = (e) => {
    e.preventDefault();
    logout();
    navigate("/", { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    if(!token)
        setauthloading(false);

    try{

        if (token) {
            API.get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res) => setuser(res.data));
        }
    }finally{
        setauthloading(false)
    }
  }, [id]);

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
            className={`flex text-sm rounded-full focus:ring-2 focus:ring-green-500 ${
                menuOpen ? "hidden md:flex" : ""
              }`}
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
            <div className="absolute right-4 top-16 w-48 bg-gray-900/95 backdrop-blur border border-white/10 rounded-xl shadow-xl shadow-black/40 overflow-hidden z-50">
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
                    className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/10 hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>

                <li>
                  <a
                    href="/settings"
                    className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/10 hover:text-white"
                  >
                    Settings
                  </a>
                </li>

                <li className="mt-1">
                  <button
                    onClick={handlelogut}
                    className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-white"
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
          className={`fixed md:static inset-0 md:inset-auto z-40 bg-black/95 backdrop-blur transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          } md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8 p-6 md:p-0 text-lg">

            {/* Mobile Close */}
            <li className="md:hidden flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </li>

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
                  className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 md:hover:bg-transparent md:hover:text-green-400 transition"
                >
                  {label}
                </a>
              </li>
            ))}

            {menuOpen && (
              <>
                <li className="md:hidden border-t border-white/10 pt-2">
                  <a
                    href="/settings"
                    className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/10"
                  >
                    Settings
                  </a>
                </li>

                <li className="md:hidden">
                  <button
                    onClick={handlelogut}
                    className="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

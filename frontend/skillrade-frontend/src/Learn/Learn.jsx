import { useState, useEffect } from "react";
import API from "../api/api";
import { Menu, X, BookOpen } from "lucide-react";

// Simple markdown renderer (basic)
const renderContent = (text) => {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-xl md:text-2xl font-semibold mt-8 text-white"
        >
          {line.replace("## ", "")}
        </h2>
      );
    }

    if (line.startsWith("```")) return null;

    if (
      line.trim().startsWith("#include") ||
      line.includes("console.log") ||
      line.includes("print(")
    ) {
      return (
        <pre
          key={i}
          className="bg-black/60 border border-gray-800 text-green-400 p-4 rounded-xl mt-4 text-xs md:text-sm overflow-x-auto"
        >
          {line}
        </pre>
      );
    }

    return (
      <p key={i} className="mt-3 text-gray-300 text-sm md:text-base leading-relaxed">
        {line}
      </p>
    );
  });
};

const Learn = () => {
  const [activeLang, setActiveLang] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    API.get("/learn").then((res) => {
      setData(res.data);
      if (res.data.length > 0) {
        setActiveLang(res.data[0].contentname);
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex">

      {/* 📱 Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <h1 className="font-semibold text-white text-lg truncate">
          {activeLang}
        </h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-green-600/20 text-green-400"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-0 z-50 md:static md:z-0
          bg-gray-900/90 backdrop-blur-xl border-r border-gray-800
          w-full md:w-80 p-6 overflow-y-auto
          ${sidebarOpen ? "block" : "hidden"} md:block
        `}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Learn</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 mb-6">
          <BookOpen className="text-green-400" />
          <h2 className="text-xl font-bold text-white">Learn</h2>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search content..."
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul className="space-y-2">
          {data
            .filter((item) =>
              item.contentname.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <li key={item._id}>
                <button
                  onClick={() => {
                    setActiveLang(item.contentname);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all
                    ${
                      activeLang === item.contentname
                        ? "bg-green-600/20 text-green-400 border border-green-600/40"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                >
                  {item.contentname}
                </button>
              </li>
            ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-10 pt-24 md:pt-12 pb-12">
        <div className="max-w-5xl mx-auto bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/40">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {activeLang}
          </h1>

          {data.map(
            (item) =>
              item.contentname === activeLang && (
                <p
                  key={item._id}
                  className="text-gray-400 mb-8 text-sm md:text-base"
                >
                  {item.contentintro}
                </p>
              )
          )}

          {data.map(
            (item) =>
              item.contentname === activeLang && (
                <div key={item._id}>{renderContent(item.content)}</div>
              )
          )}
        </div>
      </main>
    </div>
  );
};

export default Learn;

import React, { useState, useEffect, useMemo } from "react";
import API from "../api/api";
import { Menu, X, BookOpen, Code2, Cpu } from "lucide-react";

const WEB_LANGUAGES = [
  "javascript",
  "typescript",
  "php",
  "html",
  "css",
  "react",
  "node.js",
];

const SYSTEM_LANGUAGES = [
  "c",
  "c++",
  "rust",
  "go",
  "zig",
  "java",
  "python",
  "C#",
  "Rust",
  "go"
];

const renderContent = (text) => {
  const lines = text.split("\n");

  let elements = [];
  let codeBuffer = [];
  let inCodeBlock = false;

  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${index}`}
            className="bg-black border border-gray-800 rounded-xl p-4 overflow-x-auto mt-5"
          >
            <code className="text-green-400 text-sm whitespace-pre-wrap">
              {codeBuffer.join("\n")}
            </code>
          </pre>,
        );

        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }

      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`heading-${index}`}
          className="text-2xl font-bold text-white mt-8 mb-3"
        >
          {line.replace("## ", "")}
        </h2>,
      );

      return;
    }

    elements.push(
      <p
        key={`paragraph-${index}`}
        className="text-gray-300 leading-relaxed mt-3"
      >
        {line}
      </p>,
    );
  });

  return elements;
};

const Learn = () => {
  const [data, setData] = useState([]);
  const [activeLang, setActiveLang] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchLearningContent = async () => {
      try {
        const response = await API.get("/api/learn");

        const filtered = response.data.filter((item) => {
          const lang = item.contentname.toLowerCase();

          return (
            WEB_LANGUAGES.includes(lang) ||
            SYSTEM_LANGUAGES.includes(lang)
          );
        });

        setData(filtered);

        if (filtered.length > 0) {
          setActiveLang(filtered[0].contentname);
        }
      } catch (error) {
        console.error("Failed to fetch learning content:", error);
      }
    };

    fetchLearningContent();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.contentname
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [data, search]);

  const activeContent = data.find(
    (item) => item.contentname === activeLang,
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-gray-900">
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-white font-semibold truncate">
          {activeLang || "Learn"}
        </h1>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-green-500/20 text-green-400"
        >
          <Menu size={20} />
        </button>
      </header>

      <aside
        className={`
          fixed md:static inset-0 z-50 md:z-0
          w-full md:w-80
          bg-gray-900/95 backdrop-blur-xl
          border-r border-gray-800
          overflow-y-auto
          p-6
          ${sidebarOpen ? "block" : "hidden"} md:block
        `}
      >
        <div className="flex md:hidden items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">
            Learning Center
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 mb-6">
          <BookOpen className="text-green-400" />

          <h2 className="text-white text-2xl font-bold">
            Learning Center
          </h2>
        </div>

        <input
          type="text"
          placeholder="Search language..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-gray-800
            border border-gray-700
            text-gray-200
            placeholder-gray-500
            focus:outline-none
            focus:border-green-500
            mb-6
          "
        />

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="text-blue-400" size={18} />

            <h3 className="text-blue-400 font-semibold">
              Web Development
            </h3>
          </div>

          <ul className="space-y-2">
            {filteredData
              .filter((item) =>
                WEB_LANGUAGES.includes(
                  item.contentname.toLowerCase(),
                ),
              )
              .map((item) => (
                <li key={item._id}>
                  <button
                    onClick={() => {
                      setActiveLang(item.contentname);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full text-left px-4 py-2.5 rounded-xl transition-all
                      ${
                        activeLang === item.contentname
                          ? "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                          : "text-gray-300 hover:bg-gray-800"
                      }
                    `}
                  >
                    {item.contentname}
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="text-orange-400" size={18} />

            <h3 className="text-orange-400 font-semibold">
              System Programming
            </h3>
          </div>

          <ul className="space-y-2">
            {filteredData
              .filter((item) =>
                SYSTEM_LANGUAGES.includes(
                  item.contentname.toLowerCase(),
                ),
              )
              .map((item) => (
                <li key={item._id}>
                  <button
                    onClick={() => {
                      setActiveLang(item.contentname);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full text-left px-4 py-2.5 rounded-xl transition-all
                      ${
                        activeLang === item.contentname
                          ? "bg-orange-500/20 border border-orange-500/30 text-orange-400"
                          : "text-gray-300 hover:bg-gray-800"
                      }
                    `}
                  >
                    {item.contentname}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-4 md:px-10 pt-24 md:pt-10 pb-12">
        <div className="max-w-5xl mx-auto bg-gray-900/70 border border-gray-800 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {activeContent?.contentname}
          </h1>

          <p className="text-gray-400 mb-8 leading-relaxed">
            {activeContent?.contentintro}
          </p>

          <div>
            {activeContent?.content &&
              renderContent(activeContent.content)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;
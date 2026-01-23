import React, { useState, useEffect } from "react";
import API from "../api/api";


// Simple markdown renderer (basic)
const renderContent = (text) => {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## "))
      return <h2 key={i} className="text-xl font-semibold mt-6">{line.replace("## ", "")}</h2>;

    if (line.startsWith("```"))
      return null;

    if (line.trim().startsWith("#include") || line.includes("console.log") || line.includes("print("))
      return (
        <pre key={i} className="bg-gray-900 text-green-400 p-4 rounded mt-3 text-sm overflow-x-auto">
          {line}
        </pre>
      );

    return <p key={i} className="mt-2 text-gray-700">{line}</p>;
  });
};

const Learn = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeLang, setActiveLang] = useState("C");
  const [search, setSearch] = useState("");
  const [data,setdata] = useState([]);

  useEffect(() => {
    API.get('/learn')
        .then(res => setdata(res.data))
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeLang]);

  console.log(data)

  return (
    <div className="flex min-h-screen bg-gray-100">
         <aside className="w-80 bg-white border-r px-4 py-6 overflow-y-auto">
         <h2 className="text-xl font-bold mb-4">Learn</h2>

         {/* Search */}
         <input
           type="text"
           placeholder="Search language..."
           className="w-full mb-4 px-3 py-2 border rounded"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />

         {/* Expand / Collapse */}
         <button
           onClick={() => setExpanded(!expanded)}
           className="font-semibold mb-2"
         >
           Learn {expanded ? "▼" : "▶"}
         </button>
                {expanded && (
          <ul className="ml-3 space-y-2">
            {data.map((lang) => (
              <li key={lang._id}>
                <button
                  onClick={() => setActiveLang(lang.contentname)}
                  className={`w-full text-left px-3 py-2 rounded text-sm
                    ${
                      activeLang === lang.contentname
                        ? "bg-black text-white"
                        : "hover:bg-gray-200"
                    }`}
                >
                  {lang.contentname}
                </button>
              </li>
            ))}
          </ul>
        )}

        </aside>

      <main className="flex-1 p-10 bg-white overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">{activeLang}</h1>
        {data.map((item) =>
            item.contentname === activeLang && (
                <p key={item.contentname} className="text-gray-600 mb-6">
                {item.contentintro}
                </p>
            )
        )}

            {
            data.map((item) =>
                item.contentname === activeLang ? (
                <div key={item.id} className="prose max-w-none">
                    {renderContent(item.content)}
                </div>
                ) : null
            )
            }

      </main>        
    </div>
  );
};

export default Learn;

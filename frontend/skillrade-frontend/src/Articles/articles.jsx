import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Search,
  X,
} from "lucide-react";

export default function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [search, setSearch] = useState("");

    // Dummy Articles Data
    const articles = [
    {
        id: 1,
        title: "Is C Programming Dead in 2026?",
        author: "Aman Verma",
        date: "May 8, 2026",
        category: "C Language",
        image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
        short:
        "Many developers think C is outdated, but the reality is very different.",
        content: `
    C programming still powers operating systems, embedded systems, kernels, and high-performance applications. 
    Despite newer languages like Rust and Go becoming popular, C remains one of the fastest and most efficient languages.

    Tech companies continue to rely on C for low-level system development because of its direct memory access and performance advantages.

    The rise of IoT devices, robotics, and embedded hardware has actually increased the demand for C developers in specialized industries.

    While beginners may choose modern languages first, C is far from dead — it remains the foundation of computer science.
        `,
    },

    {
        id: 2,
        title: "Node.js Breakthrough: Why Developers Love It",
        author: "Sarah Khan",
        date: "May 6, 2026",
        category: "Node.js",
        image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        short:
        "Node.js continues to dominate backend development with speed and scalability.",
        content: `
    Node.js changed backend development by allowing JavaScript to run on servers. 
    Its event-driven architecture makes it ideal for real-time applications and APIs.

    Companies like Netflix, PayPal, and LinkedIn use Node.js because of its scalability and fast performance.

    The huge npm ecosystem gives developers access to thousands of open-source packages, reducing development time dramatically.

    With modern frameworks like Next.js and NestJS growing rapidly, Node.js remains one of the strongest backend technologies in 2026.
        `,
    },

    {
        id: 3,
        title: "Why React Still Rules Frontend Development",
        author: "David Roy",
        date: "May 4, 2026",
        category: "React",
        image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
        short:
        "React remains the most popular frontend library among developers worldwide.",
        content: `
    React simplified frontend development with reusable components and fast rendering using the virtual DOM.

    Developers love React because it provides flexibility, strong community support, and a massive ecosystem.

    Modern tools like Next.js, React Query, and Zustand have made React applications even faster and easier to manage.

    Even with rising competitors like Svelte and Vue, React continues to dominate job markets and enterprise applications.
        `,
    },

    {
        id: 4,
        title: "Python vs JavaScript: Which One Should You Learn?",
        author: "Neha Sharma",
        date: "May 2, 2026",
        category: "Programming",
        image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        short:
        "Choosing between Python and JavaScript depends on your career goals.",
        content: `
    Python is widely used in AI, machine learning, automation, and data science because of its simple syntax and powerful libraries.

    JavaScript dominates web development and powers both frontend and backend applications through Node.js.

    If you want to become a web developer, JavaScript is essential. 
    If your focus is AI, automation, or data analysis, Python is often the better choice.

    Both languages are highly in-demand, beginner-friendly, and excellent for starting a software development career.
        `,
    },

    {
        id: 5,
        title: "The Rise of Rust Programming Language",
        author: "Kunal Mehta",
        date: "April 30, 2026",
        category: "Rust",
        image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        short:
        "Rust is gaining massive popularity because of memory safety and performance.",
        content: `
    Rust is becoming one of the fastest-growing programming languages in the tech industry.

    Developers prefer Rust because it prevents memory leaks and segmentation faults without sacrificing performance.

    Major companies like Microsoft and Amazon are adopting Rust for systems programming and cloud infrastructure.

    Rust is especially attractive for developers who want the performance of C++ with better safety and modern tooling.
        `,
    },

    {
        id: 6,
        title: "Why TypeScript Became Essential for Large Projects",
        author: "Ritika Singh",
        date: "April 27, 2026",
        category: "TypeScript",
        image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
        short:
        "TypeScript is now the preferred choice for scalable JavaScript applications.",
        content: `
    TypeScript adds static typing to JavaScript, helping developers catch errors before deployment.

    Large companies prefer TypeScript because it improves maintainability and developer productivity.

    Frameworks like Angular use TypeScript by default, while React and Node.js developers increasingly adopt it for safer codebases.

    As applications grow larger and more complex, TypeScript has become almost essential for professional development teams.
        `,
    },
    ];

  // Search Filter
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-10">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Latest Articles
            </h1>
            <p className="text-gray-400 mt-2">
              Explore trending stories, insights, and knowledge
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-3.5 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl pl-11 pr-4 py-3 outline-none focus:border-green-500 transition"
            />
          </div>
        </div>

        {/* Article List */}
        {!selectedArticle ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <span className="inline-block px-3 py-1 text-xs bg-green-600/20 text-green-400 rounded-full border border-green-500/20 mb-4">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Short Desc */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {article.short}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {article.author}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.date}
                    </div>
                  </div>

                  {/* Read Button */}
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
                  >
                    <BookOpen size={18} />
                    Read Full Article
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Full Article View */
          <div className="max-w-4xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Banner */}
            <div className="relative h-80">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />

              {/* Close */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition"
              >
                <X />
              </button>
            </div>

            {/* Article Body */}
            <div className="p-8 md:p-10">
              {/* Category */}
              <span className="inline-block px-4 py-1 text-sm bg-green-600/20 text-green-400 rounded-full border border-green-500/20 mb-5">
                {selectedArticle.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl font-bold text-white leading-tight mb-6">
                {selectedArticle.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 border-b border-gray-800 pb-6">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  {selectedArticle.author}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  {selectedArticle.date}
                </div>
              </div>

              {/* Article Content */}
              <div className="space-y-6 text-gray-300 leading-8 text-lg">
                {selectedArticle.content
                  .trim()
                  .split("\n")
                  .map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
              </div>

              {/* Back Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="mt-10 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white transition"
              >
                ← Back to Articles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// src/App.jsx

import React from "react";
import { Code2, BookOpen, Terminal, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative border-b border-gray-800/50 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-16 pt-12 md:pt-20">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Learn to Code <span className="text-green-500">for Free</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Tutorials, thousands of coding problems, structured courses,
            technical interview experiences, and much more — all in one place.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/Dashboard")}
              className="group flex items-center gap-2 rounded-lg bg-blue-500 px-7 py-3.5 font-semibold text-white hover:bg-green-700 transition-all"
            >
              Start Learning
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── QUICK ACCESS CARDS ──────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 grid gap-6 md:grid-cols-3">
          <div className="group rounded-xl border border-gray-800 bg-gray-900/40 p-7 hover:border-green-700/60 transition-all hover:shadow-xl hover:shadow-green-950/20">
            <div className="mb-4 inline-block rounded-lg bg-green-900/40 p-3">
              <BookOpen className="h-7 w-7 text-green-400" />
            </div>
            <h3 className="text-xl text-white font-bold mb-2">
              Tutorials & Articles
            </h3>
            <p className="text-gray-400">
              Well-explained content on Programming language...
            </p>
            <a
              href="/articles"
              className="mt-4 inline-flex items-center text-green-400 hover:text-green-300"
            >
              Explore →
            </a>
          </div>

          <div className="group rounded-xl border border-gray-800 bg-gray-900/40 p-7 hover:border-green-700/60 transition-all hover:shadow-xl hover:shadow-green-950/20">
            <div className="mb-4 inline-block rounded-lg bg-green-900/40 p-3">
              <Terminal className="h-7 w-7 text-green-400" />
            </div>
            <h3 className="text-xl text-white font-bold mb-2">Quiz Problems</h3>
            <p className="text-gray-400">3500+ quiz problems with solutions.</p>
            <a
              href="/quizlist"
              className="mt-4 inline-flex items-center text-green-400 hover:text-green-300"
            >
              Start Solving →
            </a>
          </div>

          <div className="group rounded-xl border border-gray-800 bg-gray-900/40 p-7 hover:border-green-700/60 transition-all hover:shadow-xl hover:shadow-green-950/20">
            <div className="mb-4 inline-block rounded-lg bg-green-900/40 p-3">
              <Code2 className="h-7 w-7 text-green-400" />
            </div>
            <h3 className="text-xl text-white font-bold mb-2">
              Structured Courses
            </h3>
            <p className="text-gray-400">
              Complete roadmaps: DSA, Full Stack, Android, Competitive
              Programming...
            </p>
            <a
              href="/course"
              className="mt-4 inline-flex items-center text-green-400 hover:text-green-300"
            >
              Browse Courses →
            </a>
          </div>
        </div>
      </section>

      {/* You can continue adding more sections: Popular Topics, Top Articles, Recommended Courses, Footer etc. */}

      {/* Footer placeholder */}
      <footer className="border-t border-gray-800 bg-gray-950 py-12 text-center text-gray-500 text-sm">
        <p>
          © 2026 Skillrade - Pathak&pos;s Private Limited, All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default HomePage;

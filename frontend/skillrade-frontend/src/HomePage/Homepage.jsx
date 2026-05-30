import React from "react";
import {
  Code2,
  BookOpen,
  ChevronRight,
  Rocket,
  Users,
  Trophy,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const courses = [
    "Data Structures & Algorithms",
    "Full Stack Development",
    "Android Development",
    "Machine Learning",
    "System Design",
    "Competitive Programming",
  ];

  const roadmaps = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Android Developer",
    "Data Scientist",
    "Competitive Programmer",
  ];

  const technologies = [
    "React",
    "Node.js",
    "JavaScript",
    "Java",
    "Python",
    "MongoDB",
    "Express",
    "MySQL",
    "Tailwind CSS",
    "Firebase",
    "Git",
    "Docker",
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-5 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Learn to Code
            <span className="block text-green-500">
              Build Real Projects
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
            Tutorials, coding challenges, structured roadmaps, interview
            preparation, projects, and everything you need to become a
            professional software developer.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/Dashboard")}
              className="group flex items-center gap-2 rounded-lg bg-green-600 px-8 py-4 font-semibold hover:bg-green-700 transition"
            >
              Start Learning
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-4xl font-bold text-green-400">500+</h2>
            <p className="text-gray-400 mt-2">Articles</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-green-400">50+</h2>
            <p className="text-gray-400 mt-2">Courses</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-green-400">3500+</h2>
            <p className="text-gray-400 mt-2">Problems</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-green-400">25K+</h2>
            <p className="text-gray-400 mt-2">Students</p>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-7 hover:border-green-600 transition">
            <BookOpen className="h-10 w-10 text-green-400 mb-4" />

            <h3 className="text-xl font-bold mb-3">
              Tutorials & Articles
            </h3>

            <p className="text-gray-400">
              Well-structured tutorials covering programming fundamentals,
              web development, DSA, databases, and more.
            </p>

            <a
              href="/articles"
              className="inline-block mt-5 text-green-400"
            >
              Explore →
            </a>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-7 hover:border-green-600 transition">
            <Code2 className="h-10 w-10 text-green-400 mb-4" />

            <h3 className="text-xl font-bold mb-3">
              Coding Practice
            </h3>

            <p className="text-gray-400">
              Solve coding challenges, improve problem-solving skills,
              and prepare for technical interviews.
            </p>

            <a
              href="/practice"
              className="inline-block mt-5 text-green-400"
            >
              Start Practicing →
            </a>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-7 hover:border-green-600 transition">
            <Layers className="h-10 w-10 text-green-400 mb-4" />

            <h3 className="text-xl font-bold mb-3">
              Structured Courses
            </h3>

            <p className="text-gray-400">
              Follow complete learning paths designed by industry
              professionals.
            </p>

            <a
              href="/course"
              className="inline-block mt-5 text-green-400"
            >
              Browse Courses →
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-20 bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-14">
            Featured Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-600 transition"
              >
                <h3 className="text-xl font-bold mb-3">
                  {course}
                </h3>

                <p className="text-gray-400">
                  Comprehensive lessons, projects, quizzes, and
                  interview preparation.
                </p>

                <button className="mt-5 text-green-400">
                  View Course →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAPS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-14">
            Learning Roadmaps
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {roadmaps.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center hover:border-green-600 transition"
              >
                <Rocket className="mx-auto mb-4 text-green-400" />

                <h3 className="font-semibold text-lg">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SKILLRADE */}
      <section className="py-20 bg-gray-900/40">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Skillrade?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Trophy className="text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Industry-Focused Content
              </h3>
              <p className="text-gray-400">
                Learn technologies and skills used by real companies.
              </p>
            </div>

            <div>
              <Users className="text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Community Learning
              </h3>
              <p className="text-gray-400">
                Learn with thousands of students and developers.
              </p>
            </div>

            <div>
              <Rocket className="text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Project Based
              </h3>
              <p className="text-gray-400">
                Build real applications and strengthen your portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12">
            Popular Technologies
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="px-5 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-400 transition"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12">
            Student Success Stories
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <p className="text-gray-400">
                “The DSA roadmap helped me crack coding interviews.”
              </p>
              <h4 className="mt-4 font-semibold">
                Aman Sharma
              </h4>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <p className="text-gray-400">
                “The best platform for learning web development.”
              </p>
              <h4 className="mt-4 font-semibold">
                Priya Verma
              </h4>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <p className="text-gray-400">
                “Roadmaps made learning much easier and structured.”
              </p>
              <h4 className="mt-4 font-semibold">
                Rohit Singh
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-5">
          <h2 className="text-5xl font-bold">
            Start Your Coding Journey Today
          </h2>

          <p className="mt-5 text-lg text-gray-100">
            Learn programming, build projects, and prepare for interviews —
            completely free.
          </p>

          <button
            onClick={() => navigate("/Dashboard")}
            className="mt-8 bg-white text-black px-8 py-4 rounded-lg font-bold hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-gray-950 py-10 text-center text-gray-500 text-sm">
        <p>
          © 2026 Skillrade - Pathak's Private Limited. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;

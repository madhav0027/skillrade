import React, { useEffect, useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { useParams } from "react-router-dom";
import API from "../api/api";

// Markdown renderer
const renderContent = (text = "") => {
  const lines = text.split("\n");
  let elements = [];
  let codeBuffer = [];
  let inCodeBlock = false;

  lines.forEach((line, i) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={i} className="bg-black/60 p-4 rounded-xl mt-4 overflow-x-auto">
            {codeBuffer.join("\n")}
          </pre>
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
        <h2 key={i} className="text-xl font-semibold mt-6 text-white">
          {line.slice(3)}
        </h2>
      );
      return;
    }

    elements.push(
      <p key={i} className="mt-2 text-gray-300">
        {line}
      </p>
    );
  });

  return elements;
};

const CourseViewer = () => {
  const { courseId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [courses, setCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [unlocked,setUnlocked] = useState(false);

  // Fetch courses ONCE
  useEffect(() => {
    API.get("/api/course")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  // Find selected course
  const selectedCourse = courses.find(
    (course) => course.slug === courseId
  );

  // Extract topics safely
  const courseTopics = selectedCourse?.lessons || [];

  const activeTopic = courseTopics[currentIndex];


  // Reset index when course changes
  useEffect(() => {
    setCurrentIndex(0);
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 10) {
          setUnlocked(true);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
  }, [courseId]);
  
  const goNext = () => {
    if (currentIndex < courseTopics.length - 1) {
      setCurrentIndex((prev) => prev + 1);
     setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 0);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* 📱 Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 px-4 py-3 flex justify-between">
        <h1 className="text-sm">{activeTopic?.title || "Course"}</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* 🔥 Sidebar */}
      <aside className={`
        fixed md:static z-50 md:z-0
        bg-gray-900 border-r border-gray-800
        w-full md:w-80 p-6 overflow-y-auto
        ${sidebarOpen ? "block" : "hidden"} md:block
      `}>
        <div className="flex justify-between md:hidden mb-4">
          <h2>Topics</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 mb-6">
          <BookOpen className="text-green-400" />
          <h2 className="text-xl font-bold uppercase">
            {courseId} Course
          </h2>
        </div>

        <ul className="space-y-2">
          {courseTopics.map((topic, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setCurrentIndex(index);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm
                  ${currentIndex === index
                    ? "bg-green-600/20 text-green-400"
                    : "text-gray-300 hover:bg-gray-800"
                  }`}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* 🎥 Main Content */}
      <main className="flex-1 p-4 md:p-10 mt-16 md:mt-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">

          {activeTopic ? (
            <>
              {/* 🎥 Video */}
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-800">
                <iframe
                  className="w-full h-full"
                  src={activeTopic.video}
                  title="Course Video"
                  allowFullScreen
                />
              </div>

              {/* 📌 Title */}
              <h1 className="text-2xl md:text-3xl font-bold">
                {activeTopic.title}
              </h1>

              {/* 📝 Transcript */}
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                <h2 className="text-green-400 mb-2 font-semibold">Transcript</h2>
                <p className="text-gray-400 text-sm whitespace-pre-line">
                  {activeTopic.transcript}
                </p>
              </div>

              {/* 📘 Notes */}
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                <h2 className="text-green-400 mb-3 font-semibold">Notes</h2>
                {renderContent(activeTopic.content)}
              </div>

              {/* 🔥 Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className={`px-5 py-2 rounded-lg text-sm font-medium
                    ${currentIndex === 0
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                    }`}
                >
                  ⬅ Previous
                </button>

                <button
                  onClick={goNext}
                  disabled={!unlocked || currentIndex === courseTopics.length - 1}
                  className={`px-5 py-2 rounded-lg text-sm font-medium
                    ${ !unlocked || currentIndex === courseTopics.length - 1
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500 text-white"
                    }`}
                >
                  Next ➡
                </button>
              </div>

            </>
          ) : (
            <div className="text-center text-gray-400">
              No course content found.
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default CourseViewer;
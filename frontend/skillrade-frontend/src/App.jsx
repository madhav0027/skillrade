import "./App.css";
import { AuthProvider } from "./authcontext/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Components/Navbar";
import SkillSelector from "./skills/Skills";
import SkillForm from "./skills/adminskill";
import About from "./about/About";
import Learn from "./Learn/Learn";
import Quiz from "./quiz/Quiz";
import Community from "./community/Community";
import Settings from "./settings/Settings";
import ThankYou from "./about/Thankyou";
import HomePage from "./HomePage/Homepage";
import React from "react";
import CoursesSection from "./CourseSelection/CourseSection";
import CourseViewer from "./CourseSelection/CourseViewer";
import ArticlesPage from "./Articles/articles";
import QuizList from "./quizlist/Quizlist";
import LearnPost from "./Learn/LearnPost";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main className="mt-18">
            <Routes>
              <Route path='/learnpost' element={<LearnPost/>}/>
              <Route path="/" element={<HomePage />} />
              <Route path="/quizlist" element={<QuizList />} />
              <Route path="/articles" element={<ArticlesPage/>}/>
              <Route path="/course" element={<CoursesSection />} />
              <Route path="/courses/:courseId" element={<CourseViewer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/community" element={<Community />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/skills" element={<SkillSelector />} />
              <Route path="/about" element={<About />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
            <Routes>
              <Route path="/skilladmin" element={<SkillForm />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

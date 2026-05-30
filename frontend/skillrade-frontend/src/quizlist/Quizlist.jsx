import React, { useEffect, useState, useMemo } from "react";
import { Star, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../authcontext/AuthContext";

export default function QuizList() {
  const [quizData, setQuizData] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSkillId = location.state?.skillId || null;

  useEffect(() => {
    if (user) {
      API.get("api/quizzes").then((res) => {
        setQuizData(res.data);
      });
    }
  }, [user]);

  const levelOrder = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };

  const difficultyMap = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };

  // FILTER LOGIC
  const filteredQuizzes = useMemo(() => {
    let data = [...quizData];

    if (selectedSkillId) {
      data = data.filter(
        (quiz) => quiz.SkillId === selectedSkillId
      );
    }

    return data.sort(
      (a, b) => levelOrder[a.level] - levelOrder[b.level]
    );
  }, [quizData, selectedSkillId]);

  const renderStars = (difficulty) => (
    <div className="flex items-center gap-1">
      {[...Array(3)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < difficulty
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-600"
          }
        />
      ))}
    </div>
  );

  const handleOpenQuiz = (quiz) => {
    navigate("/quiz", {
      state: {
        skillId: quiz.SkillId,
        level: quiz.level,
        title: quiz.title,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            Skill Quiz Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Practice programming quizzes and improve your skills
          </p>
          {selectedSkillId}
        </div>

        <div className="space-y-4">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz._id}
              onClick={() => handleOpenQuiz(quiz)}
              className="group bg-gray-900/70 border border-gray-800 hover:border-green-500 rounded-2xl px-6 py-5 transition-all duration-300 backdrop-blur-xl cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-green-400 transition">
                    {quiz.title}
                  </h2>

                </div>

                <div className="hidden md:flex">
                  {renderStars(difficultyMap[quiz.level])}
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      Solved
                    </p>

                    <p className="text-lg font-bold text-green-400">
                      {quiz.passed || 0}/
                      {quiz.questions?.length || 0}
                    </p>
                  </div>

                  <ChevronRight className="text-gray-500 group-hover:text-white transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
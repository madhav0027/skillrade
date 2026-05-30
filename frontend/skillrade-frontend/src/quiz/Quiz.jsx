import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [quizId, setquizId] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();

  const SkillId = state?.skillId;
  const title = state?.title;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!SkillId) return;

        const res = await API.get(
          `api/quizzes/skill/${SkillId}`
        );

        const quiz = res.data;
        setquizId(quiz.quizId);

        const allQuestions = quiz.questions.map(
          (q, index) => ({
            ...q,
            index,
          })
        );

        setQuizData(allQuestions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, [SkillId]);

  const question =
    quizData[current]?.questionText || "";

  // NEXT
  const handleNext = () => {
    setAnswers({
      ...answers,
      [current]: userAnswer,
    });

    setUserAnswer("");

    if (current + 1 < quizData.length) {
      setCurrent((prev) => prev + 1);
    }
  };

  // FINAL SUBMIT
  const handleFinalSubmit = async () => {
    const finalAnswers = {
      ...answers,
      [current]: userAnswer,
    };

    try {
      const res = await API.post(
        "api/quizzes/skill/submit",
        {
          quizId,
          answers: finalAnswers,
        }
      );

      setResult(res.data);
      setShowResult(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">

      <div className="relative w-full max-w-4xl bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/40">

        {/* QUIZ */}
        {!showResult && quizData.length > 0 && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                {title}
              </h2>

              <p className="text-gray-400 mt-2">
                Question {current + 1} /{" "}
                {quizData.length}
              </p>
            </div>

            {/* Question */}
            <p className="text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed whitespace-pre-line">
              {question}
            </p>

            {/* Input */}
            <input
              value={userAnswer}
              onChange={(e) =>
                setUserAnswer(e.target.value)
              }
              placeholder="Type your answer..."
              className="w-full md:w-2/3 bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none mb-8"
            />

            {/* Buttons */}
            <div className="flex items-center justify-between">
              {current + 1 < quizData.length ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-full text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleFinalSubmit}
                  className="px-6 py-3 rounded-full text-lg font-medium bg-green-600 hover:bg-green-700 text-white transition"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </>
        )}

        {/* RESULT */}
        {showResult && result && (
          <div className="text-center py-12">

            <h2 className="text-4xl font-bold text-white mb-6">
              Quiz Completed 🎉
            </h2>

            <p className="text-gray-400 text-lg mb-10">
              Here is your performance summary
            </p>

            {/* Score */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-lg">
                Score
              </p>

              <p className="text-2xl font-bold text-green-400">
                {result.score} / {result.total}
              </p>
            </div>

            {/* Accuracy */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-lg">
                Accuracy
              </p>

              <p className="text-2xl font-bold text-blue-400">
                {result.percentage}%
              </p>
            </div>

            {/* Status */}
            <div className="mb-8">
              {result.passed ? (
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <CheckCircle />
                  <span className="text-xl font-semibold">
                    Passed
                  </span>
                </div>
              ) : (
                <span className="text-red-400 text-xl font-semibold">
                  Failed
                </span>
              )}
            </div>

            {/* Buttons */}
            {!result.passed && (
              <button
                onClick={() => {
                  setCurrent(0);
                  setAnswers({});
                  setShowResult(false);
                }}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white mr-4"
              >
                Restart Quiz
              </button>
            )}

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
            >
              Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
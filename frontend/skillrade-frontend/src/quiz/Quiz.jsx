// Quiz.jsx

import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [iscorrect, setiscorrect] = useState(false);
  const [submitbtn, setsubmitbtn] = useState(true);
  const [showResult, setShowResult] = useState(false);

  // All flattened questions
  const [quizData, setquizData] = useState([]);

  const [correctans, setcorrectans] = useState(0);

  const navigate = useNavigate();
  const { state } = useLocation();

  const SkillId = state?.skillId;
  const level = state?.level;
  const title = state?.title;

  // Fetch Quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!SkillId) return;

        const res = await API.get(
          `api/quizzes/skill/${SkillId}`
        );

        console.log("API DATA:", res.data);

        // Filter level safely
        const filteredQuiz = res.data.filter(
          (quiz) =>
            quiz.level?.trim().toLowerCase() ===
            level?.trim().toLowerCase()
          );

        console.log("FILTERED QUIZ:", filteredQuiz);

        // Flatten all questions
        const allQuestions = filteredQuiz.flatMap((quiz) =>
          quiz.questions.map((q) => ({
            ...q,
            quizId: quiz._id,
          }))
        );

        console.log("ALL QUESTIONS:", allQuestions);

        setquizData(allQuestions);
      } catch (error) {
        console.log("Quiz Fetch Error:", error);
      }
    };

    fetchQuiz();
  }, [SkillId, level]);

  // Current Question
  const question =
    quizData[current]?.questionText || "";

  // Submit
  const handleSubmit = async () => {
    try {
      if (!quizData[current]) return;

      const quizid = quizData[current]?.quizId;

      const correctAnswer =
        quizData[current]?.correctans
          ?.trim()
          .toLowerCase();

      const answer = userAnswer
        .trim()
        .toLowerCase();

      // Wrong Answer
      if (answer !== correctAnswer) {
        setiscorrect(false);
        return;
      }

      setsubmitbtn(false);

      const res = await API.post(
        "api/quizzes/skill/submit",
        {
          _id: quizid,
          answer: userAnswer,
        }
      );

      console.log("SUBMIT RESPONSE:", res.data);

      if (res.data.passed === true) {
        setiscorrect(true);

        setcorrectans((prev) => prev + 1);

        // Next Question
        if (current + 1 < quizData.length) {
          setTimeout(() => {
            setCurrent((prev) => prev + 1);
            setUserAnswer("");
            setsubmitbtn(true);
            setiscorrect(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setShowResult(true);
          }, 1000);
        }
      }
    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-4xl bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/40">
        
        {/* Loading */}
        {quizData.length === 0 && !showResult && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white">
              Loading Quiz...
            </h2>

            <p className="text-gray-400 mt-3">
              No quiz found for this level
            </p>
          </div>
        )}

        {/* Quiz */}
        {!showResult && quizData.length > 0 && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                {title}
              </h2>

              <p className="text-gray-400 capitalize mt-2">
                {level} Level Quiz
              </p>
            </div>

            {/* Question Number */}
            <h3 className="text-lg text-green-400 font-medium mb-3">
              Question {current + 1} / {quizData.length}
            </h3>

            {/* Question */}
            <p className="text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed whitespace-pre-line">
              {question.replace(/\\n/g, "\n")}
            </p>

            {/* Input */}
            <input
              type="text"
              placeholder="Type your answer..."
              value={userAnswer}
              onChange={(e) =>
                setUserAnswer(e.target.value)
              }
              className={`w-full md:w-2/3 bg-gray-800 border rounded-xl px-5 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none mb-8 ${
                iscorrect
                  ? "border-green-500"
                  : "border-gray-700"
              }`}
            />

            {/* Submit */}
            <div className="flex items-center justify-between">
              <button
                onClick={submitbtn ? handleSubmit : null}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${
                  submitbtn
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>

            {/* Correct Badge */}
            {iscorrect && (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-green-600/20 border border-green-600/40 px-4 py-2 rounded-xl">
                <CheckCircle className="text-green-400" />

                <span className="text-green-400 font-medium">
                  Correct!
                </span>
              </div>
            )}
          </>
        )}

        {/* Result */}
        {showResult && (
          <div className="text-center py-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Quiz Completed 🎉
            </h2>

            <p className="text-gray-400 text-lg mb-8">
              Great job completing the quiz
            </p>

            {/* Correct Answers */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-lg">
                Correct Answers
              </p>

              <p className="text-2xl font-bold text-green-400">
                {correctans} / {quizData.length}
              </p>
            </div>

            {/* Accuracy */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-400 text-lg">
                Accuracy
              </p>

              <p className="text-2xl font-bold text-blue-400">
                {quizData.length > 0
                  ? Math.round(
                      (correctans / quizData.length) * 100
                    )
                  : 0}
                %
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() =>
                navigate("/", { replace: true })
              }
              className="px-8 py-4 rounded-xl text-lg font-medium text-white bg-green-600 hover:bg-green-700 transition"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
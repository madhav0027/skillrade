import { useEffect, useState } from "react";
import API from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [iscorrect, setiscorrect] = useState(false);
  const [submitbtn, setsubmitbtn] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [quizData, setquizData] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const SkillId = state?.skillId;

  useEffect(() => {
    API.get(`/quizzes/skill/${SkillId}`).then((res) =>
      setquizData(res.data)
    );

    if (iscorrect) {
      const timer = setTimeout(() => {
        setiscorrect(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [iscorrect, current]);

  const handleSubmit = async () => {
    const quizid = quizData[current]?._id;

    if (
      userAnswer.trim().toLowerCase() ===
      quizData[current]?.questions[0].correctans.toLowerCase()
    ) {
      setsubmitbtn(false);

      await API.post("quizzes/skill/submit", {
        _id: quizid,
        answer: userAnswer,
      }).then((res) => {
        if (res.passed === true) setiscorrect(true);
      });
    }
  };

  const handleNext = () => {
    if (current + 1 < quizData?.length) {
      setCurrent(current + 1);
      setUserAnswer("");
      setsubmitbtn(true);
    } else {
      setShowResult(true);
    }
  };

  const question =
    quizData[current]?.questions[0]?.questionText || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-4xl bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/40">

        {/* Quiz */}
        {!showResult && (
          <>
            <h3 className="text-lg text-green-400 font-medium mb-3">
              {question ? `Question ${current + 1}` : ""}
            </h3>

            <p className="text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed">
              {question || "No more updated quiz"}
            </p>

            {question && (
              <>
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full md:w-2/3 bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-600 mb-8"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={submitbtn ? handleSubmit : null}
                    className={`px-6 py-3 rounded-full text-lg font-medium transition-all
                      ${
                        submitbtn
                          ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/40"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Submit
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-4 rounded-full bg-green-600 hover:bg-green-700 transition shadow-lg shadow-green-900/40"
                  >
                    <ArrowRight className="text-black" />
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* Correct Animation */}
        {iscorrect && (
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-green-600/20 border border-green-600/40 px-4 py-2 rounded-xl">
            <CheckCircle className="text-green-400" />
            <span className="text-green-400 font-medium">Correct!</span>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="text-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Quiz Completed 🎉
            </h2>

            <button
              onClick={() => navigate("/", { replace: true })}
              className="px-8 py-4 rounded-xl text-lg font-medium text-white bg-green-600 hover:bg-green-700 transition shadow-lg shadow-green-900/40"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

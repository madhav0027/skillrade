import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Quiz() {
  const [skill, setSkill] = useState("");
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [iscorrect, setiscorrect] = useState(false);
  const [submitbtn,setsubmitbtn] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [quizData, setquizData] = useState([]);

  const navigate = useNavigate();

  const { state } = useLocation();
  const SkillId = state?.skillId;


  useEffect(() => {
    API.get(`/quizzes/skill/${SkillId}`)
      .then(res => setquizData(res.data));
      
    if(iscorrect){
      const timer = setTimeout(() => {
        setiscorrect(false);
      }, 1000); 
      
      // Cleanup the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [iscorrect,current]);

  const handleSubmit = async () => {
    const quizid = quizData[current]?._id;
    if (
      userAnswer.trim().toLowerCase() ===
      quizData[current]?.questions[0].correctans.toLowerCase()
    ) {
      setsubmitbtn(false);
      
      console.log(quizid)
      
      await API.post("quizzes/skill/submit",{
        _id:quizid,
        answer:userAnswer
      })
      .then((res) => {
        if(res.passed === true)
          setiscorrect(true);            
      })
    }

  };
  
  const handleNext = () => {

    if (current + 1 < quizData?.length) {
        setCurrent(current + 1);
        setUserAnswer("")
        setsubmitbtn(true)
      } else {
          setShowResult(true);
        }
      }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-5xl min-h-[70vh] flex flex-col justify-center">
        
        {/* Quiz */}
        {!showResult && (
          <>
            <h3 className="text-2xl font-semibold mb-6">
              {quizData[current]?.questions[0]?.questionText.length > 0 ?`Question ${current + 1}` : ``}
            </h3>

            <p className="mb-10 text-3xl font-bold text-gray-800 leading-relaxed">
              {quizData[current]?.questions[0]?.questionText.length > 0 ? quizData[current]?.questions[0]?.questionText : "No More Updated Quiz"}
            </p>

          {
            quizData[current]?.questions[0]?.questionText.length > 0 ?
            <>
            <input
              type="text"
              className="w-50 border p-2 text-xl rounded mb-8"
              placeholder="Your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <div className="w-full flex flex-co-2 justify-between">
              <button
                onClick={submitbtn ? handleSubmit:null}
                className={`${submitbtn ? "w-min rounded-full bg-green-600 text-white p-5 text-xl hover:bg-green-700":"w-min rounded-full bg-gray-600 cursor-not-allowed opacity-75 text-white p-5 text-xl "}`}
                >
                submit
              </button>

              <button
                onClick={handleNext}
                className="w-min rounded-full bg-green-600 text-white p-5 text-xl hover:bg-green-700"
                >
                <FaArrowRight color="black" />
              </button>
            </div>
            </>:''}
          </>
        )}

{
  iscorrect && 
        <div className="absolute w-fit h-fit right-8">
          <img className="object-cover" src="../public/gif/confetti_react.gif" alt="" />
        </div>
}

        {/* Result */}
        {showResult && (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Quiz Completed 🎉
            </h2>

            <button
              onClick={() => {
                navigate("/",{replace:true})
              }}
              className="bg-blue-600 text-white px-8 py-4 text-xl rounded hover:bg-blue-700"
            >
              Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

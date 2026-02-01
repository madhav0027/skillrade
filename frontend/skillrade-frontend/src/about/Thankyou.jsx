import { useLocation, Navigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();

  if (!location.state?.fromFeedback) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-10 md:p-14 shadow-2xl shadow-black/40 text-center max-w-xl">

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20">
          <CheckCircle className="h-9 w-9 text-green-400" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Thank you for your feedback!
        </h1>

        <p className="text-gray-400 text-base md:text-lg mb-8">
          We really appreciate your time and thoughts.  
          You’re helping Skillrade grow better 🚀
        </p>

        <button
          onClick={() => window.location.replace("/")}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium text-white bg-green-600 hover:bg-green-700 transition shadow-lg shadow-green-900/40"
        >
          Go to Dashboard
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ThankYou;

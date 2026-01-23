import { useLocation, Navigate } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();

  if (!location.state?.fromFeedback) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Thank you for your feedback! 🙌</h1>
      <p className="text-gray-600 mt-2">We really appreciate it.</p>
    </div>
  );
};

export default ThankYou;

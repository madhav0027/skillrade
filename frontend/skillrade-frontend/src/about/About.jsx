import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Info } from "lucide-react";

const About = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    feedback: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/user/feedback", {
      username: formData.username,
      email: formData.email,
      feedback: formData.feedback,
    });

    if (res.data.status === "DONE") {
      navigate("/thank-you", { state: { fromFeedback: true } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl space-y-12">
        {/* About Section */}
        <section className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/40 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20">
            <Info className="h-8 w-8 text-green-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Skillrade
          </h1>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            <span className="font-semibold text-white">Skillrade</span> is a
            platform to{" "}
            <span className="text-green-400 font-medium">
              learn and earn credits
            </span>{" "}
            by exchanging skills with others. Our mission is to build a strong,
            collaborative community where people teach, learn, grow together,
            and unlock new opportunities through knowledge sharing.
          </p>
        </section>

        {/* Feedback Section */}
        <section className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-green-400" />
            <h2 className="text-2xl font-semibold text-white">
              Share Your Feedback
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-600"
              />
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Feedback
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Share your thoughts..."
                rows="4"
                required
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-600 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-medium text-lg text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-900/40"
            >
              Submit Feedback
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default About;

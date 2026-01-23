import React, { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);

    // Reset form (you can later connect this to backend/API)
    setFormData({
      username: "",
      email: "",
      feedback: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* About Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Skillrade
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">Skillrade</span> is a
            platform to <strong>learn and earn credits</strong> by exchanging
            skills with others. We aim to build a strong community where people
            can teach, learn, grow together, and unlock opportunities through
            collaboration and knowledge sharing.
          </p>
        </section>

        {/* Feedback Section */}
        <section className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Share Your Feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Feedback
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Share your thoughts..."
                rows="4"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
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

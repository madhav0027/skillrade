// LearnPost.jsx
import React, { useState } from "react";
import axios from "axios";
import API from "../api/api";

const LearnPost = () => {
  const [formData, setFormData] = useState({
    contentname: "",
    contentintro: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Data to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/api/learn", {
        contentname: formData.contentname,
        contentintro: formData.contentintro,
        content: formData.content,
      });

      setMessage("Learn post created successfully!");
      console.log(response.data);

      // Reset form
      setFormData({
        contentname: "",
        contentintro: "",
        content: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to create learn post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ color:"white", maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Create Learn Post</h2>

      <form onSubmit={handleSubmit}>
        {/* Content Name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Content Name</label>
          <input
            type="text"
            name="contentname"
            value={formData.contentname}
            onChange={handleChange}
            placeholder="Enter content name"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Content Intro */}
        <div style={{ marginBottom: "15px" }}>
          <label>Content Intro</label>
          <textarea
            name="contentintro"
            value={formData.contentintro}
            onChange={handleChange}
            placeholder="Enter intro"
            required
            rows="3"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Content */}
        <div style={{ marginBottom: "15px" }}>
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter full content"
            required
            rows="6"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "green" }}>{message}</p>
      )}
    </div>
  );
};

export default LearnPost;
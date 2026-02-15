// components/admin/SkillForm.jsx
/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import API from "../api/api";

const initialFormData = {
  name: "",
  domian: "Programming",
  description: "",
  category: "",
};

export default function SkillForm({ initialData = {}, isEditing = false }) {
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...initialData,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.description.trim()
    ) {
      seterror("Filed Can't be Empty");
      return;
    }

    try {
      setIsSubmitting(true);

      if (!isEditing) {
        setFormData(initialFormData); // reset after successful add

        console.log(formData);

        API.post("/skill", {
          name: formData.name,
          domain: formData.domian,
          category: formData.category,
          description: formData.description,
        }).then((res) => {
          console.log(res);
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <center>
      <div className="bg-white dark:bg-gray-800 w-150 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isEditing ? "Edit Skill" : "Add New Skill"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skill Name */}
          <div>
            <h1>{error}</h1>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Skill Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g. React, Python, UI/UX Design"
              required
            />
          </div>
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Frontend, Backend, DevOps, Design..."
              list="skill-categories"
              required
            />
            <datalist id="skill-categories">
              <option value="Frontend" />
              <option value="Backend" />
              <option value="DevOps" />
              <option value="Mobile" />
              <option value="Database" />
              <option value="Design" />
              <option value="Testing" />
              <option value="Cloud" />
              <option value="Other" />
            </datalist>
          </div>
          {/* Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Domain
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Programming", "Management"].map((domain) => (
                <label
                  key={domain}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-lg border cursor-pointer transition ${
                    formData.domian === domain // ← fixed: domain (not domian)
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="domain"
                    value={domain}
                    checked={formData.domian === domain} // ← here too
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="capitalize">{domain}</span>
                </label>
              ))}
            </div>
          </div>{" "}
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              placeholder="Brief description about the skill..."
            />
          </div>
          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : isEditing ? (
                "Update Skill"
              ) : (
                "Add Skill"
              )}
            </button>
          </div>
        </form>
      </div>
    </center>
  );
}

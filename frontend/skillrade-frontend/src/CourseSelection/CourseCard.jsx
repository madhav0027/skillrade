// src/components/CourseCard.jsx
import React from "react";
import { ChevronRight } from "lucide-react";

function CourseCard({ name, description, slug }) {
  return (
    <div className="group rounded-xl border border-gray-800 bg-gray-900/40 p-7 
      hover:border-green-700/60 transition-all hover:shadow-xl hover:shadow-green-950/20">

      {/* <div className="mb-4 inline-block rounded-lg bg-green-900/40 p-3">
        <Icon className="h-7 w-7 text-green-400" />
      </div> */}

      {/* Title */}
      <h3 className="text-xl text-white font-bold mb-2">
        {name}
      </h3>

      {/* Description */}
      <p className="text-gray-400">
        {description}
      </p>

      {/* Button */}
      <a
        href={`courses/${slug}`}
        className="mt-4 inline-flex items-center text-green-400 hover:text-green-300"
      >
        Start Course
        <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

export default CourseCard;
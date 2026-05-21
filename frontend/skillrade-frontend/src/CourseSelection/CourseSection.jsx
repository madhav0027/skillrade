// src/components/CoursesSection.jsx
import React, { useEffect, useState } from "react";
import { Code2, Database, Cpu } from "lucide-react";
import CourseCard from "./CourseCard";
import API from "../api/api";
import { useAuth } from "../authcontext/AuthContext";
import AuthDialog from "../auth/AuthDialog";

function CoursesSection() {
  const [courses,setcourses] = useState();
  const [authOpen, setauthopen] = useState(false);

  const {user} = useAuth();

  useEffect(() => {
    API.get("/api/course")
      .then(res => setcourses(res.data))
    
  },[])

  return (
    <>
    {
    !user ? 

    <AuthDialog open={!user ? true : false} onClose={() => setauthopen(false)}/>
    :
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Popular Courses
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {user && courses && courses.map((course) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </div>

      </div>
    </section>
        }
    </>
  );
}

export default CoursesSection;
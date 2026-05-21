const mongoose = require("mongoose");
const Course = require("./src/models/Course");

async function seedCourses() {
  try {
    await mongoose.connect("mongodb+srv://himadhavpathak:kiqbekmgbltovwil@skillradecluster.zdt34cf.mongodb.net/?appName=Skillradecluster");

    await Course.deleteMany();

    await Course.insertMany([
      {
        name: "C++",
        slug: "cpp",
        description: "Learn C++ from basics",

        lessons: [
          {
            title: "Introduction to C++",
            video: "https://www.youtube.com/embed/ZzaPdXTrSb8",
            transcript: "Intro to C++...",
            content: "## C++ Basics\n```cpp\n#include<iostream>\n```",
            duration: 600,
            order: 1,
          },
        ],

        totalDuration: 600,
      },

      {
        name: "DSA",
        slug: "dsa",
        description: "Data Structures and Algorithms",

        lessons: [
          {
            title: "Arrays Introduction",
            video: "https://www.youtube.com/embed/8hly31xKli0",
            transcript: "Arrays are linear data structures...",
            content: "## Arrays\nStore elements in contiguous memory.",
            duration: 500,
            order: 1,
          },
          {
            title: "Binary Search",
            video: "https://www.youtube.com/embed/P3YID7liBug",
            transcript: "Binary search works on sorted arrays...",
            content: "## Binary Search\nDivide and conquer.",
            duration: 700,
            order: 2,
          },
        ],

        totalDuration: 1200,
      },
    ]);

    console.log("✅ Courses Seeded Successfully");
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

seedCourses();
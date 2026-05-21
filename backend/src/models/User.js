const mongoose = require("mongoose");

const lessonProgressSchema = new mongoose.Schema({
  lessonId: mongoose.Schema.Types.ObjectId,
  watchedTime: { type: Number, default: 0 }, // seconds
  completed: { type: Boolean, default: false },
});

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  lessons: [lessonProgressSchema],

  completed: { type: Boolean, default: false },
  certificateIssued: { type: Boolean, default: false },

  enrolledAt: { type: Date, default: Date.now },
});

const User = new mongoose.Schema(
  {
    profilepic: {
      type: String,
      default:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F8847%2F8847419.png&f=1&nofb=1&ipt=8010999c9ad8769037d0997fcb7e0dc00302df15a4534b664af19f2b768f9759",
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    credits: {
      type: Number,
      default: 0,
    },
    isverifed: {
      type: Boolean,
      required: true,
      default: false,
    },
    roles: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    qualification: {
      type: String,
    },
    verificationToken: String,
    verifyTokenExpiry: Date,
  
    refreshToken: String,
    courses: [courseProgressSchema],

  },
  { timestamps: true },
);

module.exports = mongoose.model("User", User);

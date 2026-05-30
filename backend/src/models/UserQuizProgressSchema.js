const mongoose = require("mongoose");

const UserQuizProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  SkillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  answeredQuestions: {
    type: [Number], // indexes of questions solved
    default: [],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserQuizProgress", UserQuizProgressSchema);
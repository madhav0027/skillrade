const Quiz = require("../models/Quiz");
const User = require("../models/User");
const UserQuizProgress = require("../models/UserQuizProgressSchema");
const UserSkill = require("../models/UserSkill");


//Admin (RBAC Setup)
exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    if (error) res.status(500).json({ message: "Cannot Create Quiz" });
  }
};
exports.getuserbyskill = async (req, res) => {
  try {
    const { SkillId } = req.params;
    const userId = req.user.userId;

    console.log("userid", userId, "skillid", SkillId);

    // Get quiz for skill (NO level system anymore)
    const quiz = await Quiz.findOne({
      SkillId,
    });

    if (!quiz) {
      return res.status(404).json({
        message: "No quiz found for this skill.",
      });
    }

    // Get user progress (only for answered questions tracking)
    let progress = await UserQuizProgress.findOne({
      userId,
      SkillId,
      quizId: quiz._id,
    });

    if (!progress) {
      progress = await UserQuizProgress.create({
        userId,
        SkillId,
        quizId: quiz._id,
        answeredQuestions: [],
      });
    }

    // Normalize answered indexes
    const answered = (progress.answeredQuestions || []).map(Number);

    // Filter ONLY unanswered questions
    const remainingQuestions = quiz.questions.filter(
      (_, index) => !answered.includes(index)
    );

    return res.status(200).json({
      quizId: quiz._id,
      title: quiz.title,
      questions: remainingQuestions,
      total: quiz.questions.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Can't Get User Quiz",
    });
  }
};

exports.getskillbyuser = async (req, res) => {

  try {

    const userid = await req.user.userId;

    // Get user's current skill level
    const userSkills = await UserSkill.find({ userId: userid }).select(
      "level SkillId"
    );

     const userProgress = await UserQuizProgress.find({
      userId:userid,
    });

    // Map: quizId -> answered question indexes
    const progressMap = {};

    userProgress.forEach((p) => {
      progressMap[p.quizId.toString()] =
        (p.answeredQuestions || []).map(Number);
    });
   
// Get ALL quizzes (no skill filtering)
    const quizzes = await Quiz.find();

    // Remove answered questions
    const filteredQuizzes = quizzes
      .map((quiz) => {
        const answered =
          progressMap[quiz._id.toString()] || [];

        const remainingQuestions =
          quiz.questions.filter(
            (_, index) =>
              !answered.includes(index)
          );

        return {
          ...quiz.toObject(),
          questions: remainingQuestions,
        };
      })
      .filter((q) => q.questions.length > 0); // remove completed quizzes

    return res.status(200).json(filteredQuizzes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Can't Get User Quiz",
    });
  }
};

exports.submitFullQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user.userId;

    const quiz = await Quiz.findById({_id:quizId});

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found" });
    }

    let correct = 0;

    quiz.questions.forEach((q, index) => {
      const userAns =
        (answers[index] || "")
          .trim()
          .toLowerCase();

      const correctAns =
        q.correctans
          .trim()
          .toLowerCase();

      if (userAns === correctAns) {
        correct++;
      }
    });

    const total = quiz.questions.length;
    const percentage =
      (correct / total) * 100;

    const passed = percentage >= 60;

    // update user skill progress
    await UserSkill.findOneAndUpdate(
      {
        userId,
        SkillId: quiz.SkillId,
      },
      {
        progress: percentage,
        status: passed
          ? "Completed"
          : "In-Progress",
      }
    );

    res.json({
      score: correct,
      total,
      percentage,
      passed,
    });
  } catch (err) {
    res.status(500).json({
      message: "Quiz submission failed",
      error: err.message,
    });
  }
};

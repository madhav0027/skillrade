const Quiz = require("../models/Quiz");
const Quizattempt = require("../models/Quizattempt");
const User = require("../models/User");
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

    const userid = req.user.userid;

    const progress = await UserSkill.findOne({
      userId: userid,
      SkillId: SkillId,
    });

    if (progress.progress >= 50) {
      await UserSkill.findOneAndUpdate(
        { userId: userid, SkillId: SkillId },
        {
          level: "advanced",
        },
      );
    } else if (progress.progress >= 10) {
      await UserSkill.findOneAndUpdate(
        { userId: userid, SkillId: SkillId },
        {
          level: "intermediate",
        },
      );
    }

    const passedAttempts = await Quizattempt.find({
      userId: userid,
      passed: true,
    }).select("quizId");

    const userskillevel = await UserSkill.find({ userId: userid }).select(
      "level",
    );

    const passedQuiz = passedAttempts.map((q) => q.quizId);

    const quizbyskill = await Quiz.find({
      SkillId,
      level: userskillevel[0].level,
      _id: { $nin: passedQuiz },
    });
    res.status(200).json(quizbyskill);
  } catch (error) {
    if (error) res.status(500).json({ message: "Can't Get User" });
  }
};

exports.submitquiz = async (req, res) => {
  try {
    const { _id, answer } = req.body;
    const userId = req.user.userid;
    let passed = false;
    const quiz = await Quiz.findOne({ _id });

    if (!quiz) res.status(404).json({ message: "Quiz not Found!!" });
    let i;
    for (i = 0; i < quiz.questions.length; i++) {
      if (
        answer.trim().toLowerCase() ===
        quiz.questions[i].correctans.trim().toLowerCase()
      ) {
        passed = true;
      }
    }

    const alreadypassed = await Quizattempt.findOne({
      userId,
      quizId: _id,
      passed: true,
    });
    if (alreadypassed) res.status(400).json({ message: "already passed" });

    await Quizattempt.create({
      userId,
      quizId: _id,
      passed,
    });

    if (passed) {
      await User.findByIdAndUpdate(
        userId,
        { $inc: { credits: 10 } },
        { new: true },
      );
    }

    const quizpassed = await Quizattempt.countDocuments({
      userId: userId,
      passed: true,
    }).select("quizId");

    await UserSkill.findOneAndUpdate(
      {
        userId,
        SkillId: quiz.SkillId,
      },
      {
        progress: quizpassed / quiz.questions.length,
        status: "In-Progress",
      },
    );

    res.json({
      passed,
      total: quiz.questions.length,
    });
  } catch (error) {
    if (error)
      res.status(500).json({ message: "Failed to Submit quiz" + error });
  }
};

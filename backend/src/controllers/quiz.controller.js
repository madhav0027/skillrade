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

    const userid = await req.user.userId;

    console.log("userid "+userid + "skillid "+SkillId)
    let progressDoc = await UserSkill.findOne({ userId: userid, SkillId:SkillId });

    console.log("progress"+progressDoc)

    if (!progressDoc) {
      return res.status(404).json({
        message: "No skill progress found for this user.",
      });
    }

    let newLevel = "beginner";
    if (progressDoc.progress >= 50) newLevel = "advanced";
    else if (progressDoc.progress >= 10) newLevel = "intermediate";

    if (progressDoc.level !== newLevel) {
      progressDoc.level = newLevel;
      await progressDoc.save();
    }

    const passedAttempts = await Quizattempt.find({
      userId: userid,
      passed: true,
    }).select("quizId");

    const passedQuizIds = passedAttempts.map((q) => q.quizId);

    // Get user's current skill level
    const userSkills = await UserSkill.find({ userId: userid }).select(
      "level SkillId"
    );
    const userSkill = userSkills.find((s) => s.SkillId.toString() === SkillId);

    if (!userSkill) {
      return res.status(404).json({
        message: "Skill not found for this user.",
      });
    }

    // Fetch quizzes for this skill and level that user hasn't passed yet
    const quizBySkill = await Quiz.find({
      SkillId,
      level: userSkill.level,
      _id: { $nin: passedQuizIds },
    });

    console.log(quizBySkill)

    res.status(200).json(quizBySkill);

  } catch (error) {
    if (error) res.status(500).json({ message: "Can't Get User" });

    console.log(error)
  }
};

exports.getskillbyuser = async (req, res) => {

  try {

    const userid = await req.user.userid;


    const passedAttempts = await Quizattempt.find({
      userId: userid,
      passed: false,
    }).select("quizId");

    const passedQuizIds = passedAttempts.map((q) => q.quizId);

    // Get user's current skill level
    const userSkills = await UserSkill.find({ userId: userid }).select(
      "level SkillId"
    );

    // Fetch quizzes for this skill and level that user hasn't passed yet
    const quizBySkill = await Quiz.find({
      _id: { $nin: passedQuizIds },
    });

    res.status(200).json(quizBySkill);

  } catch (error) {
    if (error) res.status(500).json({ message: "Can't Get User" });

    console.log(error)
  }
};

exports.submitquiz = async (req, res) => {
  try {
    const { _id, answer } = req.body;
    const userId = await req.user.userId;
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

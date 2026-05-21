const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Feedback = require("../models/Feedback");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.user = async (req, res) => {

  console.log(req.user)
  console.log(req.cookies)
  const user = await User.findById(req.user.userId).select("-password");
  res.json({
    username: user.username,
    email: user.email,
    profilepic: user.profilepic,
    qualification: user.qualification,
  });
};

exports.userupdate = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { qualification } = req.body;

    console.log(req.file);

    const updateData = {};

    if (qualification && qualification.trim().length > 0) {
      updateData.qualification = qualification.trim();
    }

    if (req.file) {
      updateData.profilepic = `${process.env.R2_PUBLIC_URL}/${req.file.key}`;
    }
    await User.findByIdAndUpdate(userId, updateData);

    res.status(200).json({
      status: "DONE",
      message: "User has been Updated",
    });

  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.userfeedback = async (req, res) => {
  const { username, email, feedback } = req.body;

  await Feedback.create({
    username: username,
    email: email,
    feedback: feedback,
  });

  const mailoptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Skillrade Feedback",
    text: `Thank you for your feedback ${username} We Consider Your Feedback as our priority `,
  };

  await transporter.sendMail(mailoptions);

  res.status(200).json({ status: "DONE", message: "Thanks" });
};

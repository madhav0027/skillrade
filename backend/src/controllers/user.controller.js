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
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) res.status(401).json({ message: "Failed to Fetch !!" });

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const userId = payload.userid;
  const user = await User.findOne({ _id: userId }).select("-password");
  res.json({
    username: user.username,
    email: user.email,
    profilepic: "http://localhost:5000" + user.profilepic,
    qualification: user.qualification,
  });
};

exports.userupdate = async (req, res) => {
  const userId = req.user.userid;

  const { username, qualification } = req.body;
  let profile;

  if (req.file) profile = `/uploads/${req.file.filename}`;

  await User.findOneAndUpdate(
    { _id: userId },
    {
      username: username,
      profilepic: profile,
      qualification: qualification,
    },
  );

  res.status(200).json({
    status: "DONE",
    message: "User has been Updated",
  });
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

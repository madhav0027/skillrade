const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require('crypto')
const { generateAccessToken, generateRefreshToken } = require("../utils/generatetoken");

//MailSetup

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    console.log(name)

    const existinguser = await User.findOne({ email });
    if (existinguser)
      return res.status(409).json({ message: "User already Exist!!" });

    const hashedpassword = await bcrypt.hash(password, 12);

    const verificationToken = await crypto.randomBytes(32).toString("hex");
    console.log(verificationToken);

    await User.create({
      username: name,
      password: hashedpassword,
      email: email,
      verificationToken:verificationToken,
      verifyTokenExpiry:Date.now() + 1000 * 60 * 60 // 1 hour
    });

    const mailoptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Skillrade Email Verification",
      text: `Please Click In this URL To verify your email 
                    ${process.env.SERVER_URL}/api/auth/verify?token=${verificationToken}`,
    };

    await transporter.sendMail(mailoptions);

    res.status(201).json({
      message: "Registered SucessFully! Check your email to verify.",
    });
  } catch (err) {
    if (err) {
      res.status(500).json({
        message: `Server Error ${err}`,
      });
    }
  }
};

exports.verify = async (req, res) => {
  const token = req.query.token;
console.log(token)

  try {
    const user = await User.findOne({
      verificationToken:req.query.token,
    })

    console.log(user)

    if (!user) return res.status(400).send("Invalid token");

    user.isverifed = true;
    user.verificationToken = null;
    user.verifyTokenExpiry = null;

    await user.save();

    res
      .status(200)
      .send({ message: `Greetings Your is Verified` });
  } catch (error) {
    if (error) res.status(500).json({ message: "error in verifymail"+error });
  }
};

exports.logout = async (req,res) => {

    try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await User.updateOne(
        { refreshToken: refreshToken },
        { $unset: { refreshToken: "" } }
      );
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
}

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.sendStatus(403);

    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(decoded.userId);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path:'/',
      maxAge: 15 * 60 * 1000,
    });

    res.json({ msg: "Token refreshed" });
  } catch {
    res.sendStatus(403);
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) res.status(401).json({ message: "Invalid Credentials !!" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      res.status(401).json({ message: "Invalid Credentials !!" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path:'/',
        maxAge: 15 * 60 * 1000,
        });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path:'/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user._id,
        profilepic:user.profilepic,
        name: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

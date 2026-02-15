const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
    const { username, password, email } = req.body;

    if (!username || !password || !email)
      return res.status(400).json({ message: "All Fields are Required!!!" });

    //Check if user Already Exist
    const existinguser = await User.findOne({ email });
    if (existinguser)
      return res.status(409).json({ message: "User already Exist!!" });

    const hashedpassword = await bcrypt.hash(password, 12);

    const mailverify = jwt.sign({ usermail: email }, process.env.MAIL_SECRET, {
      expiresIn: "15d",
    });

    await User.create({
      username: username,
      password: hashedpassword,
      email: email,
    });

    const mailoptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Skillrade Email Verification",
      text: `Please Click In this URL To verify your email 
                    http://localhost:5000/api/auth/verify?token=${mailverify}`,
    };

    await transporter.sendMail(mailoptions);

    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (err) {
    if (err) {
      res.status(500).json({
        message: `Server Error ${err}`,
      });
    }
  }
};

exports.mail = async (req, res) => {
  const token = req.query.token;

  if (!token) res.status(404).json({ message: "Verify Token is Expired" });

  const payload = jwt.verify(token, process.env.MAIL_SECRET);

  try {
    const isverified = await User.findOne({ email: payload.usermail });
    if (isverified.isverifed)
      res.status(401).json({ message: "User Already Verified!!" });

    await User.findOneAndUpdate(
      { email: payload.usermail },
      { isverifed: true },
    );

    res
      .status(200)
      .send({ message: `Greetings Your ${payload.usermail} is Verified` });
  } catch (error) {
    if (error) res.status(500).json({ message: "error in verifymail" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(409).json({ message: "All Fields are Required!!" });

    const Userexist = await User.findOne({ email });

    if (!Userexist) res.status(401).json({ message: "Invalid Credentials !!" });

    const isPasswordMatch = await bcrypt.compare(password, Userexist.password);
    if (!isPasswordMatch)
      res.status(401).json({ message: "Invalid Credentials !!" });

    const token = jwt.sign(
      {
        userid: Userexist._id,
        roles: Userexist.roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      Userexist: {
        id: Userexist._id,
        profilepic: Userexist.profilepic,
        username: Userexist.username,
        email: Userexist.email,
        credits: Userexist.credits,
        isverified: Userexist.isverifed,
        roles: Userexist.roles,
      },
    });
  } catch (err) {
    if (err)
      res.status(500).json({ message: `"Internal Server Error" ${err}` });
  }
};

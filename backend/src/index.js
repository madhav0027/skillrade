require("dotenv").config();
const express = require("express");
const connection = require("./config/db,js");
const cors = require("cors");
const authroutes = require("./routes/auth.routes");
const skillroutes = require("./routes/skill.routes");
const quizroutes = require("./routes/quiz.routes");
const learnroutes = require("./routes/learn.routes");
const userroutes = require("./routes/user.routes");
const path = require("path");
const morgan = require("morgan");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    // origin: (origin, cb) => {
    //   if (!origin || origin.endsWith(".vercel.app")) {
    //     cb(null, true)
    //   } else {
    //     cb(new Error("Not allowed by CORS"))
    //   }
    // }
  }),
);

app.use("/api/auth", authroutes);
app.use("/api/skill", skillroutes);
app.use("/api/quizzes", quizroutes);
app.use("/api/learn", learnroutes);
app.use("/api/user", userroutes);

connection();

app.get("/", (req, res) => {
  res.json({
    message: "Skillrade is Running!!",
  });
});

module.exports = app;

const router = require("express").Router();
const quizcontroller = require("../controllers/quiz.controller");
const authMiddleware = require("../middleware/auth.middleware");

//ADMIN
router.post("/", quizcontroller.createQuiz);

//getuserquiz
router.get("/" , authMiddleware, quizcontroller.getskillbyuser);

//getuserskill
router.get("/skill/:SkillId", authMiddleware, quizcontroller.getuserbyskill);


//User
router.post("/skill/submit", authMiddleware, quizcontroller.submitquiz);

module.exports = router;

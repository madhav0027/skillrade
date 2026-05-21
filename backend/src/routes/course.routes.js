const router = require("express").Router();
const { getallcourse } = require("../controllers/course.controller");
const isadmin = require("../middleware/admin.middleware");
const authMiddleware = require("../middleware/auth.middleware");


// router.post("/", authMiddleware, isadmin("admin"), LearnController.learn);
router.get("/", getallcourse);

module.exports = router;

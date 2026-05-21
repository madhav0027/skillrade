const router = require("express").Router();
const usercontroller = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/",authMiddleware ,usercontroller.user);

router.put(
  "/update",
  authMiddleware,
  upload.single("avatar"),
  usercontroller.userupdate,
);


router.post("/feedback", usercontroller.userfeedback);

module.exports = router;

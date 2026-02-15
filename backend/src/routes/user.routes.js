const router = require("express").Router();
const usercontroller = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/", usercontroller.user);

router.put(
  "/update",
  upload.single("avatar"),
  authMiddleware,
  usercontroller.userupdate,
);

router.post("/feedback", usercontroller.userfeedback);

module.exports = router;

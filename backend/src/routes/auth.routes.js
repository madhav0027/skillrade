const router = require('express').Router();
const authController = require("../controllers/auth.controller");
const verifyMiddleware = require('../middleware/verify.middleware');


router.post("/register",authController.register);
router.post("/login",verifyMiddleware,authController.login);

router.get("/verify",authController.mail);


module.exports = router;
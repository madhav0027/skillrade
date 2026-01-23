const router = require('express').Router();
const usercontroller = require("../controllers/user.controller");
const authMiddleware = require('../middleware/auth.middleware');

router.get('/',usercontroller.user);

router.put('/update',authMiddleware,usercontroller.userupdate);

router.post('/feedback',usercontroller.userfeedback);

module.exports = router;
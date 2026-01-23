const router = require('express').Router();
const LearnController = require("../controllers/learn.controller");
const isadmin = require('../middleware/admin.middleware');
const authMiddleware = require('../middleware/auth.middleware');


router.post("/",authMiddleware,isadmin('admin'),LearnController.learn);
router.get("/",LearnController.getalllearn);


module.exports = router;
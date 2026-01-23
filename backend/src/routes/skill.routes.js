const router = require('express').Router();

const skillController = require("../controllers/skill.controller");
const isadmin = require('../middleware/admin.middleware');
const authmiddleware = require("../middleware/auth.middleware");

//Admin Skill adder
router.post('/',authmiddleware,isadmin('admin'),skillController.createskill);

//public skills
router.get('/',skillController.getallSkills);

router.post('/choose',authmiddleware,skillController.chooseSkill);
router.get('/myskill',authmiddleware,skillController.getmyskills);

module.exports = router;
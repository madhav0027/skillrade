const router = require('express').Router();

const skillController = require("../controllers/skill.controller");
const authmiddleware = require("../middleware/auth.middleware");

//Admin Skill adder
router.post('/',skillController.createskill);

//public skills
router.get('/',skillController.getallSkills);

router.post('/choose',authmiddleware,skillController.chooseSkill);
router.get('/myskill',authmiddleware,skillController.getmyskills);

module.exports = router;
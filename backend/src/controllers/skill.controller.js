const Skills = require("../models/Skills");
const UserSkill = require("../models/UserSkill");

exports.createskill = async (req, res) => {
  //Create only by admin {Build RBAC Later}
  try {
    const { name, domain, category, description } = req.body;

    await Skills.create({
      name,
      domain,
      category,
      description,
    });

    res.status(201).json({ message: "New Skill Created!!" });
  } catch (error) {
    if (error)
      res
        .status(500)
        .json({ message: "Internal Error Can't Create Skill" + error });
  }
};

exports.getallSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.json(skills);
  } catch (error) {
    if (error) res.status(500).json({ message: "Failed to Fetch Skill" });
  }
};

//Select Skill

exports.chooseSkill = async (req, res) => {
  try {
    const { SkillId } = req.body;
    const userId = req.user.userid;
    const exist = await UserSkill.findOne({ SkillId, userId });

    if (exist) res.status(409).json({ message: "Skill already Selected" });

    const userskill = await UserSkill.create({
      SkillId,
      userId,
    });

    res.status(201).json(userskill);
  } catch (error) {
    if (error)
      res.status(500).json({ message: "Failed to Select Skill " + error });
  }
};

exports.getmyskills = async (req, res) => {
  try {
    const userskills = await UserSkill.find({
      userId: req.user.userid,
    }).populate("SkillId");
    res.json(userskills);
  } catch (error) {
    if (error)
      res.status(500).json({ message: "Failed to Fetch user skills" + error });
  }
};

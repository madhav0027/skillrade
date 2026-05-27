const Learn = require("../models/Learn");

exports.learn = async (req, res) => {
  const { content, contentname, contentintro } = req.body;

  try {
    if (!content || !contentname || !contentintro)
      return res.status(500).json({ message: "Invalid Data" });

    await Learn.create({
      content: content,
      contentname: contentname,
      contentintro: contentintro,
    });

    res.status(200).json({ message: "New Learning Content is Added" });
  } catch (error) {
    if (error)
      res.status(500).json({ message: "Failed to Add Learning Content" + error});
  }
};

exports.getalllearn = async (req, res) => {
  try {
    const learncontent = await Learn.find();
    res.json(learncontent);
  } catch (error) {
    if (error) res.status(500).json({ message: "Failed to fetch Content" });
  }
};

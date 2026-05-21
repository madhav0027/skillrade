const Course = require("../models/Course");

exports.Course = async (req, res) => {
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
      res.status(500).json({ message: "Failed to Add Learning Content" });
  }
};

exports.getallcourse = async (req, res) => {
  try {
    const course = await Course.find();
    console.log(course)
    res.json(course);
  } catch (error) {
    if (error) res.status(500).json({ message: "Failed to fetch Content" });
  }
};

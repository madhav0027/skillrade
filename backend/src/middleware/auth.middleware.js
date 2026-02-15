const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("No Token Provide");
  // res.status(401).json({message:"No Token Provide!!"})

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log(decode);
    next();
  } catch (error) {
    if (error) res.status(500).json({ message: "Internal Server Error" });
  }
};

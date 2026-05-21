const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

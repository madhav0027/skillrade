const User = require("../models/User");

module.exports = async (req, res, next) => {
  await User.findOne({ email: req.body.email }).then((data) => {
    if (!data.isverifed)
      res.status(403).json({
        code: "EMAIL_NOT_VERIFIED",
        message: "Email is Not Verified",
      });
    else next();
  });
};

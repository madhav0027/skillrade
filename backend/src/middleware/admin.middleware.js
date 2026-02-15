const isadmin = (...props) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!props.includes(req.user.roles)) {
      return res.status(403).json({
        status: "fail",
        message: "you dont have authentication",
      });
    }

    next();
  };
};

module.exports = isadmin;

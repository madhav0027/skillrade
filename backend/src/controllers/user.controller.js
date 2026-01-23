const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.user = async(req,res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token)
        res.status(401).json({message:"Failed to Fetch !!"});

    const payload = jwt.verify(token,process.env.JWT_SECRET);

    const userId = payload.userid
    console.log(userId)
    const user = await User.findOne({_id:userId}).select("-password")
    console.log(user)
    res.json(user);

}


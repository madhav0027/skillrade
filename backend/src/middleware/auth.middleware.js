const jwt = require("jsonwebtoken");

module.exports = async (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if(!token)
        res.status(401).json({message:"No Token Provide!!"})

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        if(err)
            res.status(500).json({message:"Internal Server Error"+err})
    }
}
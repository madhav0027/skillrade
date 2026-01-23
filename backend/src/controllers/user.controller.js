const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host:"smtp.mail.yahoo.com",
    port:process.env.SMTP_PORT,
    secure:false,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
})

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

exports.userupdate = async(req,res) => {
    const userId = req.user.userid;
    const {username,Profilepic,qualification} = req.body;
    console.log(qualification)
    const updateuser = await User.findOneAndUpdate({_id:userId},{
        username:username,
        profilepic:Profilepic,
        qualification:qualification
    })

    res.status(200).json({
        status:"DONE",
        message:"User has been Updated"
    })
}

exports.userfeedback = async(req,res) => {

    const {username,email,feedback} = req.body;

    const feedbacksave = await Feedback.create({
        username:username,
        email:email,
        feedback:feedback
    })

    const mailoptions = {
        from:process.env.SMTP_USER,
        to:email,
        subject:"Skillrade Thankyou For Your Feedback",
        text:`We Consider Your Feedback as our priority `
    }

    await transporter.sendMail(mailoptions)    

    res.status(200).json({status:"DONE",message:"Thanks"})
}
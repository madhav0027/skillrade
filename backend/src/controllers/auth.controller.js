const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {

    try{
        const {username,password,email} = req.body;

        if(!username  || !password || !email)
            return res.status(400).json({message:"All Fields are Required!!!"});

        //Check if user Already Exist
        const existinguser = await User.findOne({email});
        if(existinguser)
            return res.status(409).json({message:"User already Exist!!"})

        const hashedpassword = await bcrypt.hash(password,12);

        const user = await User.create({
            username:username,
            password:hashedpassword,
            email:email
        });

        res.status(201).json({
            message:"User Created Successfully"
        });
        
    }
    catch(err){
        if(err){
            res.status(500).json({
                message:`Server Error`
            })
        }
    }
}

exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        
        if(!email || !password)
            res.status(409).json({message:"All Fields are Required!!"})
        
        const Userexist = await User.findOne({email});
        if(!Userexist)
            res.status(401).json({message:"Invalid Credentials !!"});
        
        const isPasswordMatch = await bcrypt.compare(password,Userexist.password);
        if(!isPasswordMatch)
            res.status(401).json({message:"Invalid Credentials !!"});

        const token = jwt.sign(
            {userid:Userexist._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        res.json({
            token,
            Userexist:{
                id:Userexist._id,
                username:Userexist.username,
                email:Userexist.email,
                credits:Userexist.credits
            }
        })
    }catch(err){
        if(err)
            res.status(500).json({message:`"Internal Server Error" ${err}`});
    }
}
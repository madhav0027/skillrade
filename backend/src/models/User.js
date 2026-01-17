const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        credits:{
            type:Number,
            default:0
        },
        isverifed:{
            type:Boolean,
            required:true,
            default:false
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",User);
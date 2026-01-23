const mongoose = require('mongoose');

const Feedback = new mongoose.Schema(
    {
        username:{
            type:String
        },
        email:{
            type:String
        },
        feedback:{
            type:String
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("feedback",Feedback);
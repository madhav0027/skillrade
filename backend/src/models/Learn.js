const mongoose = require('mongoose')

const LearnSchema = mongoose.Schema(
    {
        contentname:{
            type:String,
            required:true,
        },
        contentintro:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        skillId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Skill",
            required:true
        }
    }
)

module.exports = mongoose.model("Learn",LearnSchema);
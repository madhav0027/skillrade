const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema(
    {
        qtype:{
            type:String,
            enum:['mcq','scenario'],
            required:true
        },
        questionText:{
            type:String,
            required:true
        },
        options:{
            type:String,
        },
        correctans:{
            type:String,
            required:true
        }
    },
    {_id:false}
)

const Quizschema = mongoose.Schema(
    {
        SkillId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Skill",
            required:true
        },
        level:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        questions:[QuestionSchema]
    },
    {timestamps:true}
)

module.exports = mongoose.model("Quiz",Quizschema)
const mongoose = require("mongoose");

const QuizAttemptSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        quizId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Quiz',
            required:true
        },
        passed:{
            type:Boolean
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("Quizattempt",QuizAttemptSchema);
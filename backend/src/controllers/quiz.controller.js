const Quiz = require("../models/Quiz");
const Quizattempt = require("../models/Quizattempt");
const User = require("../models/User");


//Admin (RBAC Setup)
exports.createQuiz = async (req,res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);

    } catch (error) {
        if(error)
            res.status(500).json({message:"Cannot Create Quiz"})        
    }
}

exports.getuserbyskill = async (req,res) => {
    try {
        const {SkillId} = req.params;

        const quizbyskill = await Quiz.findOne({SkillId})
        console.log(quizbyskill)
        res.status(200).json(quizbyskill);
    } catch (error) {
        if(error)
            res.status(500).json({message:"Can't Get User"})
    }
}

exports.submitquiz = async (req,res) => {
    try {
        const {_id,answer} = req.body;
        const userId = req.user.userid;
        
        const quiz = await Quiz.findOne({_id});
        console.log(quiz.questions.length)

        if(!quiz)
            res.status(404).json({message:"Quiz not Found!!"});

            for(i=0; i< quiz.questions.length;i++){
                if(answer[i] === quiz.questions[i].correctans)
                    passed=true;
            }

            // quiz.questions.foreach((q,index) => {
            //     if(answer[index] === q.correctans){
            //         passed = true;
                    
            //     }
            // })

        const alreadypassed = await Quizattempt.findOne({userId,quizId:_id,passed:true})        
        if(alreadypassed)
            res.status(400).json({message:"already passed"});
        else if(passed){
            const credits = await User.findByIdAndUpdate(
            userId ,
            { $inc: { credits: 10 } },
            { new: true }
        )}     


        const attempt = await Quizattempt.create({
            userId,
            quizId:_id,
            passed
        })
        res.json({
            passed,
            total:quiz.questions.length
        })
    } catch (error) {
        if(error)
            res.status(500).json({message:"Failed to Submit quiz"+error})
    }
}
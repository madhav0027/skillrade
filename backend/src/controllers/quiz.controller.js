const Quiz = require("../models/Quiz");
const Quizattempt = require("../models/Quizattempt");
const User = require("../models/User");
const UserSkill = require("../models/UserSkill");


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

        const userid = req.user.userid;

        const passedAttempts = await Quizattempt.find({
            userId:userid,
            passed:true
        }).select("quizId")

        const passedQuiz = passedAttempts.map(q => q.quizId)

        const quizbyskill = await Quiz.find({SkillId,_id:{$nin:passedQuiz}})
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

        const alreadypassed = await Quizattempt.findOne({userId,quizId:_id,passed:true})        
        if(alreadypassed)
            res.status(400).json({message:"already passed"});

        const attempt = await Quizattempt.create({
            userId,
            quizId:_id,
            passed
        })

        if(passed){
            const credits = await User.findByIdAndUpdate(
            userId ,
            { $inc: { credits: 10 } },
            { new: true }
        )}
        
        const skillupdate = await UserSkill.findOneAndUpdate(
            {
                userId,
                SkillId:quiz.SkillId
            },
            {
                progress:100/quiz.questions.length,
                status:"In-Progress"
            }
        )
        console.log(skillupdate)

        res.json({
            passed,
            total:quiz.questions.length
        })
    } catch (error) {
        if(error)
            res.status(500).json({message:"Failed to Submit quiz"+error})
    }
}
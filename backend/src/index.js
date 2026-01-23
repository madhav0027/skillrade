require("dotenv").config();
const express = require("express");
const connection = require("./config/db,js");
const cors = require("cors");
const authroutes = require("./routes/auth.routes");
const skillroutes = require("./routes/skill.routes");
const quizroutes = require("./routes/quiz.routes");
const learnroutes = require('./routes/learn.routes');
const usercontroller = require('./controllers/user.controller')
const morgan = require("morgan")
const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('tiny'))
app.use(express.json());
app.use(cors());

app.use('/api/auth',authroutes);
app.use('/api/skill',skillroutes);
app.use('/api/quizzes',quizroutes);
app.use('/api/learn',learnroutes);
app.get('/api/user',usercontroller.user);

connection();

app.get("/",(req,res)=>{
    res.json({
        message:"Skillrade is Running!!"
    })
})


app.listen(PORT,(err) => {
    if(err){
        console.error(err)
        process.exit(1);
    }

    console.log("SERVER RUNNING IN PORT"+PORT);
})

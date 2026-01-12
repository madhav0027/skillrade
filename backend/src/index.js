require("dotenv").config();
const express = require("express");
const connection = require("./config/db,js");

const app = express();

const PORT = process.env.PORT || 5000;

connection();

app.listen(PORT,(err) => {
    if(err){
        console.error(err)
        process.exit(1);
    }

    console.log("SERVER RUNNING IN PORT"+PORT);
})

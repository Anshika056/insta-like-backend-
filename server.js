const express = require("express");
const dotenv = require("dotenv")
const app = express();
dotenv.config({path:"./config.env"})
const port =  process.env.PORT || 5000
require("./database/connect")




app.get("/",(req,res)=>{
    res.send("hello!")
})


app.listen(port,()=>{
    console.log(`listening to server at ${port}`);
})
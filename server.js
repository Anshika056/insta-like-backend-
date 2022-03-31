const express = require("express");
const dotenv = require("dotenv")
const app = express();
dotenv.config({path:"./config.env"})
const port =  process.env.PORT || 5000
require("./database/connect")

const authroutes = require("./routes/user");
const usersroutes = require("./routes/users");


app.use(express.json());
// app.use(cors())
app.use(express.urlencoded({ extended: true }));

const user = require("./models/userSchema")

app.get("/",(req,res)=>{
    res.send("hello!")
})

app.use("/api",authroutes)
app.use("/api",usersroutes);

app.listen(port,()=>{
    console.log(`listening to server at ${port}`);
})
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const db = process.env.MONGODB;

mongoose.connect(db,{
       // useNewUrlParser:true,
   // useCreateIndex: true,
   // useUnifiedTopology:true,
   // useFindAndModify: false
}).then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err)
})
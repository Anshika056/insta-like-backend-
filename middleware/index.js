const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.middleware = async (req,res,next)=>{
    try{
      const tokenreq = req.headers.authorization;
      if(!tokenreq){
          return res.status(400).json("token is required");
      }
      const verifytoken = await jwt.verify(tokenreq,process.env.SECRET_KEY,(err,user)=>{
          if(err){
              res.status(400).json(err)
          }
          req.user = user;                        //will check if the user requested is similar to the user got and will get user id
          next();
          console.log(user);
      });
      

    }catch(err){
        res.status(400).json("something went wrong");
    }
}
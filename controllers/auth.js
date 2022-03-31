const user = require("../models/userSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")

//user register
exports.signup=async (req,res)=>{
    try{
      const {username,email,password} = req.body
      if(!username||!email||!password){
          return res.status(400).json("enter all details")
      }
      else if(!validator.isEmail(email)){
          return res.status(400).json("invaild email")
      }
      const newuser = new user({username,email,password})
      
      const token = jwt.sign({                                        //generation of token
        id:user._id
       },process.env.SECRET_KEY, {expiresIn:"1d"})

      const theUser=await newuser.save()
      console.log(theUser,token);
      res.status(200).send("User Signedup")
    }catch(err){
        console.log(err)
    const splitedErr = err.message.split(" ");
    if (splitedErr[11] == "email:" || splitedErr[11] == "mobile:")
      res.status(400).send("existing user with given email or mobile");
  }
    }

//user login
exports.login=async(req,res)=>{
  try{
    const {email,password}=req.body
    if(!email||!password){
      return res.status(400).body("please enter the details");
    } //vaildate the mail
    else if(!validator.isEmail(email))
      return res.status(400).send("invalid email")
    const User = await user.findOne({email:email});
      if(!User){
         return res.status(400).json("Invaild details")
     }
     console.log(User)
    // console.log(password,User.password)
    const compass =  await bcrypt.compare(req.body.password, User.password)
      if(!compass){
        return res.status(400).json("Invaild details")
    }
    const token = jwt.sign({                                        //generation of token
      id:User._id
     },process.env.SECRET_KEY, {expiresIn:"1d"})

    res.status(200).json({user:User,token});
    console.log(User)
     
  }
  catch(err){
    console.log(err)
    res.status(400).json("something went wrong")
  }
}

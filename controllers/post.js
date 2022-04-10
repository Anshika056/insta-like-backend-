const Post =require("../models/posts");


exports.addposts = async (req,res)=>{
    try{
    const post = req.body

    const newpost = new Post({...post, createdAt: new Date().toISOString()})

    const savedpost = await newpost.save();
    if(!savedpost){
        res.status(400).json("post not created")
    }
    console.log(savedpost)
    res.status(200).json("post created")

    }catch(err){
        console.log(err)
        res.status(400).json("something went wrong");
    }
}
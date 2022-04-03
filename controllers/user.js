const user = require("../models/userSchema");

exports.updateuser = async (req,res)=>{
    try{
       const {id} =req.params
       if(req.body.userid === id){
       if(req.body.password){
           try{
            req.body.password = bcrypt.hash(req.body.password,12);
           }catch(err){
               res.status(400).json(err)
           }
       }
       const updateduser = await user.findByIdAndUpdate(id,{ $set:req.body },{new:true})
       if(updateduser){
        res.status(400).json("user not updated")
       }
       res.status(200).json("user updated")
       }
       else{
           return res.send("you cann only update your account");
       }
    }
    catch(err){
        console.log(err)
        res.status(400).json("something went wrong")
    }
}


exports.deleteduser = async (req,res)=>{
    try{
      const {id} = req.params
      if(req.body.userid === id){
           const deleteduser = await user.findByIdAndDelete(id);
           console.log(deleteduser)
           if(!deleteduser)
           res.status(400).json("not deleted")
           res.status(200).json("user deleted")
      }else{
          res.send("you can only delete your account")
      }
    }catch(err){
      console.log(err)
        res.status(400).json("user not deleted");
    }
}


exports.followuser = async (req, res) => {
  if (req.body.userid !== req.params.id) {
    try {
      const usertofollow = await user.findById(req.params.id);
      const usertofollowing = await user.findById(req.body.userid);
      datatosend=[]
      if (!usertofollow.followers.includes(req.body.userid)) {
        await usertofollow.updateOne({ $push: { followers:req.body.userid}});
        await usertofollowing.updateOne({ $push: { followings: req.params.id } });
        console.log(datatosend)
        res.status(200).json(datatosend);
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};



exports.unfollowuser = async (req, res) => {
    if (req.body.userid !== req.params.id) {
      try {
        const usertofollow = await user.findById(req.params.id);
        const usertounfollowing = await user.findById(req.body.userid);
        if (usertofollow.followers.includes(req.body.userid)) {
          await usertofollow.updateOne({ $pull: { followers: req.body.userid } });
          await usertounfollowing.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  }

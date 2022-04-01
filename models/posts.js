const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userSchema"
    },
    image:{
        type:String
    },
    caption:{
        type:string
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true});


module.exports=mongoose.model("posts",postSchema);
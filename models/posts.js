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
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comment:{
        type:[String],
        default:[]
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});


module.exports=mongoose.model("posts",postSchema);
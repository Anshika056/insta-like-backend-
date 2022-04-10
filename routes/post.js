const express = require("express");
const { addposts } = require("../controllers/post");
const router = express.Router()


router.post("/createpost",addposts)


module.exports=router
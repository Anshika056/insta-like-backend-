const express = require("express");
const { followuser, unfollowuser, updateuser, deleteduser } = require("../controllers/user");
const router = express.Router()

router.put("/update/;id",updateuser)

router.delete("/delete/:id",deleteduser)

router.post("/follow/:id",followuser)

router.post("/unfollow/:id",unfollowuser)

module.exports=router
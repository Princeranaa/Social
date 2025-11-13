const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middelwares/auth.middelware");

router.post("/", authenticateUser, createPost)



module.exports = router;
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middelwares/auth.middelware");
const { createPost } = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage()});

router.post("/", authenticateUser, upload.single("image"), createPost)


module.exports = router;
const postModel = require("../model/post.model");

exports.createPost = async (req,res) => {
   const file = req.file;
   console.log("file received++++++++",  file)    
}
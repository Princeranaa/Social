const postModel = require("../model/post.model");
const generateCaption = require("../service/ai.service");
const { uploadFile } = require("../config/imagekit");
const { v4: uuidv4 } = require("uuid");

exports.createPost = async (req, res) => {
  const file = req.file;

  const base64ImageFile = new Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(base64ImageFile);
  const result = await uploadFile(file.buffer, `${uuidv4()}`);

  const post = await postModel.create({
    image: result.url,
    caption,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    if (!comment) return res.json({ message: `Comment can't be an empty` });

    const newComment = new Comment({
      comment,
      author: req.userId,
    });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }
    res.json(newComment);
  } catch (error) {
    throw new Error(`problem with creation of comment`);
  }
};

module.exports = { createComment };

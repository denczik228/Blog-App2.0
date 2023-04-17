const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");


const createPosts = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ message: "Title and text are required" });
    }

    const user = await User.findById(req.userId);

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      author: req.userId,
    });

    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    res.json(newPostWithoutImage);
  } catch (error) {
    res.status(500).json({ message: "Problem with creation of post" });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt')
    const popularposts = await Post.find().limit(5).sort('-views')
    if (!posts) {
      return res.json({message:'No posts yet'})
    }
    res.json({ posts, popularposts });
  } catch (error) {
    throw new error(`Problem with searching of all posts`)
  }
}

const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc:{views:1}
    })
    res.json(post)
  } catch (error) {
    throw new error(`Problem with getting post by id function`)
  }
}

const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => { return Post.findById(post._id) })
    )
    res.json(list)
  } catch (error) {
    throw new error(`Problem with getting my post`)
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if(!post) return res.json({message: `Post doesn't exist`})
    
    await User.findByIdAndUpdate(req.userId, {
      $pull:{posts:req.params.id},
    })

    res.json({message:`Post was deleted`});
  } catch (error) {
    throw new error(`Proble with deleting of post`)
  }
}

const updatePosts = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    //console.log({ title, text, id });

    if (!title || !text || !id) {
      return res.status(400).json({ message: "Title, text and id are required" });
    }

    const post = await Post.findByIdAndUpdate({ _id: id }, {
      title: title,
      text:text,
    },{new:true});
    
    res.json(post);
  } catch (error) {
    res.json({ message: `Problem with updating of post` });
  }
};

const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    const comments = await Comment.find({
      _id: { $in: post.comments },
    }).populate("author");
    res.json(comments);
  } catch (error) {
    throw new Error({ message: `Problem with getting comments of post` });
  }
};

const deleteComments = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findByIdAndDelete(commentId).populate(
      "author"
    );

    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: commentId } },
      { new: true }
    ).populate("author");

    res
      .status(200)
      .json({ message: "Comment has been deleted", comment, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPosts,
  getAll,
  getById,
  getMyPosts,
  deletePost,
  updatePosts,
  getPostComments,
  deleteComments,
};
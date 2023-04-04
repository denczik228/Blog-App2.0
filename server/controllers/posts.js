const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const path = require('path');

const createPosts = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId);
        
        if (req.files) {
          // Get the file that was set to our field named "image"
          const { image } = req.files;

          // If no image submitted, exit
          if (!image) return res.sendStatus(400);
          
          let fileName = req.files.image.name;
          req.files.image.mv(path.join(__dirname,'..','uploads', fileName))

          const newPostWithImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl:fileName,
            author:req.userId,
          });

          await newPostWithImage.save();
          await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithImage },
          });
          return res.json(newPostWithImage);
        }

        const newPostWithOutImage = new Post(
            {
                username: user.username,
                title,
                text,
                imgUrl: '',
                author:req.userId,
            }
        )
        await newPostWithOutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push:{posts:newPostWithOutImage},
        })
        res.json(newPostWithOutImage);
    } catch (error) {
        res.json({message: `Problem with creation of post`});
    }
}

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
    const { title, text, id } = req.body
    const post = await Post.findById(id);
    
    if (req.files) {
      // Get the file that was set to our field named "image"
      const { image } = req.files;

      // If no image submitted, exit
      if (!image) return res.sendStatus(400);
          
      let fileName = req.files.image.name;
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
      post.imgUrl = fileName || ''
    }
    post.title = title
    post.text = text
    
    await post.save()
    res.json(post);
  } catch (error) {
    throw new error({message:`problem with updating of post`})
  }
}

const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment)
      })
    )
    res.json(list)
  } catch (error) {
     throw new error({ message: `problem with getting comments of post` });
  }
}

const deleteComments = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    console.log(postId, commentId);
  try {
    const comment = await Comment.findByIdAndDelete({ _id: commentId });

    const post = await Post.findByIdAndUpdate({ _id: postId }, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: "Comment has been deleted", comment, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

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
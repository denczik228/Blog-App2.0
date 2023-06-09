const express = require("express");
const {
  createPosts,
  getAll,
  getById,
  getMyPosts,
  deletePost,
  updatePosts,
  getPostComments,
  deleteComments,
} = require("../controllers/posts");
const authMiddleware = require("../utils/checkAuth");

const router = express.Router();

router.post("/", authMiddleware, createPosts );
router.get("/", getAll);
router.get('/:id', getById);
router.get('/user/me', authMiddleware, getMyPosts);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, updatePosts)
router.get('/comments/:id', getPostComments )
router.delete('/:postId/comments/:commentId', authMiddleware, deleteComments)

module.exports = router;

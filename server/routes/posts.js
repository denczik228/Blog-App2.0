const express = require("express");
const { createPosts, getAll, getById, getMyPosts, deletePost} = require("../controllers/posts");
const authMiddleware = require("../utils/checkAuth");

const router = express.Router();

router.post("/", authMiddleware, createPosts );
router.get("/", getAll);
router.get('/:id', getById);
router.get('/user/me', authMiddleware, getMyPosts);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;

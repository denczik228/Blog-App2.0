const express = require("express");
const { createPosts, getAll, getById} = require("../controllers/posts");
const authMiddleware = require("../utils/checkAuth");

const router = express.Router();

router.post("/", authMiddleware, createPosts );
router.get("/", getAll);
router.get('/:id', getById);

module.exports = router;

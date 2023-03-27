const express = require("express");
const { createPosts, getAll } = require("../controllers/posts");
const authMiddleware = require("../utils/checkAuth");

const router = express.Router();

router.post("/", authMiddleware, createPosts );
router.get("/", getAll)

module.exports = router;

const express = require('express')
const createComment = require('../controllers/comments')
const authMiddleware = require('../utils/checkAuth')
const router = express.Router()

router.post('/:id', authMiddleware, createComment)

module.exports=router
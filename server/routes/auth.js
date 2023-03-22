const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/auth');
const authMiddleware = require('../utils/checkAuth');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getme',authMiddleware, getMe)

module.exports = router
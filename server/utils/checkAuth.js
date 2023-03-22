const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next()
    } catch (error) {
        throw new error(error)
    }
}
}

module.exports = authMiddleware
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
        let token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
       try {
         if (token) {
           const decoded = jwt.verify(token, process.env.JWT_SECRET);
           req.userId = decoded?.id;
           next();
         }
       } catch (error) {
         throw new Error(
           `Unsuccessful authorization, session is timeout - please login`
         );
       }
  
}

module.exports = authMiddleware
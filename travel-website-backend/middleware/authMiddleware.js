
const jwt = require('jsonwebtoken');

const authMiddleware = {
  authenticate: (req, res, next) => {

    const userId=req.cookies['token'];
    req.user=null;
    if(!userId) return next();
    const token=userId;

    const user=jwt.verify(token, process.env.JWT_SECRET);
    
    req.user=user;
    next();
  },

  authorize: (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    };
  }
};

module.exports = authMiddleware;
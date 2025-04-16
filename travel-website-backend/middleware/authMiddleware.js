const jwt = require('jsonwebtoken');

const authMiddleware = {
  // Middleware to check if the user is authenticated
  authenticate: (req, res, next) => {
    const token = req.cookies['token'];
    req.user = null;

    if (!token) return next(); // No token, move to next middleware (user stays unauthenticated)

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info to request
    } catch (err) {
      console.error("Invalid token:", err.message);
      // Optionally: res.clearCookie('token');
      req.user = null;
    }

    next();
  },

  // Middleware to protect routes based on roles
  authorize: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      next();
    };
  }
};

module.exports = authMiddleware;

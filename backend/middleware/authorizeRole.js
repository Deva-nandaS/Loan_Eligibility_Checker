const jwt = require("jsonwebtoken");
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    try {
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Invalid role",
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};
module.exports = authorizeRole;

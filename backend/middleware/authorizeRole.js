const jwt = require("jsonwebtoken");

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

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

// const jwt = require("jsonwebtoken");

// const roleMiddleware = (req, res, next, ...roles) => {
//   return
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;

//     if (!roles.includes(req.user.role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid role",
//         data: null,
//       });
//     }
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Invalid role", data: null });
//   }
// };

// module.exports = roleMiddleware;

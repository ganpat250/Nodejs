import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(500).json({
      message: "❌Access denied❌",
      details: "Authorization token not found!!!!",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "❌Access denied❌",
        details: "Authorization invalid or expired token!!!!!",
      });
    }
    req.user = decoded;
    next();
  });
};

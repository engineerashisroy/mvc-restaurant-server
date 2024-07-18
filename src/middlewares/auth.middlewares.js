import jwt from "jsonwebtoken";
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.header("Authorization");
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.decoded = decoded;
    next();
  });
};

export default verifyJWT;

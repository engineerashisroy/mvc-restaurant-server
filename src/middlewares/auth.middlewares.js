import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

//verify Token middlewares
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.header("Authorization");
  console.log(authHeader)
  // if (!authHeader) {
  //   return res.status(403).json({ message: "forbided access" });
  // }
  const token = authHeader.split(" ")[1];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "forbidden access token" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "forbided access token" });
    }

    req.decoded = decoded;
    next();
  });
};
//verify Admin
export const verifyAdmin=async(req, res, next)=>{
  const email=req.decoded.email;
  console.log(email)
  const query={email:email};
  const user=await User.findOne(query)
  const isAdmin=user?.role==='admin';
  if(!isAdmin){
    return res.status(403).send({message:"forbidden access to admin"})
  }
  next()
}
// exports [ verifyJWT]

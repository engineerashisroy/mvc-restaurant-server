import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const port = process.env.PORT || 3001;
//middlewares
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public/temp"));
app.use(cookieParser());
//just test route
app.get("/", (req, res) => {
  res.send("hello express");
});
//route calling

app.use("/api/v1", userRouter);
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("connection failed to Mongodb database", error);
  });

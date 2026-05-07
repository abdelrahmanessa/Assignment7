import express from "express";
import { connectToDatabase ,syncDatabase} from "./database/connection.js";
import userRouter from "./module/user/user.controller.js";
import postRouter from "./module/post/post.controller.js";
import commentRouter from "./module/comment/comment.js";
import "./models/relation.js";
export const bootstrap = async () => {

const app = express();
await connectToDatabase();
await syncDatabase();
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");        
});
}
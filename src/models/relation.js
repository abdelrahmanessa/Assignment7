import Post from "./postmodel.js";
import Comment from "./commentmodel.js";
import { usermodel } from "./usermodel.js";


Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });
usermodel.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(usermodel, { foreignKey: "userId" });

usermodel.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(usermodel, { foreignKey: "userId" });

export { Post, Comment, usermodel };
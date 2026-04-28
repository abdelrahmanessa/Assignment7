import Post from "./postmodel.js";
import Comment from "./commentmodel.js";


Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

export { Post, Comment };   
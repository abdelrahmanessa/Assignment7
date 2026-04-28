import  { Router } from "express";
import postmodel from "../../models/postmodel.js";
import commentmodel from "../../models/commentmodel.js";
import { sequelize } from "../../database/connection.js";
import { Comment } from "../../models/relation.js";
const router = Router();

//1. Create newPost(using new instanceandsave)(Getthepostdatafromthebody). (0.5Grade)

router.post('/posts', async (req, res) => {
let { title, content, userId } = req.body;
let newPost = await postmodel.build({ title, content, userId });
await newPost.save();
if(newPost){
    res.json({message:"Post created successfully", post:newPost})
}
else{   
    res.json({message:"Post creation failed"})
}

});
//deleteapostbyid. (0.5Grade)
router.delete('/posts/:id', async (req, res) => {

    let { id } = req.params;
    let { userId } = req.body;
    let verifyPost = await postmodel.findByPk(id);

    if (!verifyPost) {
        return res.json({ message: "Post not found" });
    }

    if (verifyPost.userId != userId) {
        return res.json({ message: "You are not allowed to delete this post" });
    }

    await verifyPost.destroy();

    res.json({ message: "Post deleted successfully" });

});
router.get('/posts', async (req, res) => {

    try {

        let posts = await postmodel.findAll({
            attributes: {
                include: [
                    [
                        sequelize.fn('COUNT', sequelize.col('comments.id')),
                        'commentsCount'
                    ]
                ]
            },
            include: [
                {
                    model: commentmodel,
                    attributes: []
                }
            ],
            group: ['post.id']
        });

        res.json({
            message: "Posts retrieved successfully",
            posts
        });

    } catch (error) {

        res.json({
            message: error.message
        });

    }

});
export default router;

import  { Router } from "express";
import  Comment  from "../../models/commentmodel.js";
import { sequelize } from "../../database/connection.js";
import postmodel from "../../models/postmodel.js";
import { usermodel } from "../../models/usermodel.js";
const router = Router();

router.post('/comments', async (req, res) => {
    let comment = req.body;
    console.log(req.body);
    let newComment = await Comment.bulkCreate(comment);
    if(newComment){
        res.json({message:"Comment created successfully", comment:newComment})
    }
    else{   
        res.json({message:"Comment creation failed"})
    }
});

router.patch('/comments/:commentId', async (req, res) => {

    try {

        let { commentId } = req.params;
        let { content, userId } = req.body;
        let comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.json({ message: "Comment not found" });
        }

       else if (comment.userId != userId) {
            return res.json({ message: "You are not allowed to update this comment" });
        }
        comment.content = content;
await comment.save();
        res.json({
            message: "Comment updated successfully",
            comment
        });

    } catch (error) {

        res.json({
            message: error.message
        });

    }

});

router.post('/comments/find-or-create', async (req, res) => {
    let {postId, userId, content} = req.body;
  let [comment,created] = await Comment.findOrCreate({
   where: { postId, userId, content }, 
    defaults:{postId, userId, content}
    });
     if(created){
        res.json({message:"Comment created successfully", comment})
    }
    else{
        res.json({message:"Comment found successfully", comment})
    }

  })

  router.get('/comments/search', async (req, res) => {

    try {

        let { word } = req.query;

        let comments = await Comment.findAndCountAll({

            where: {
                content: sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('content')),
                    'LIKE',
                    `%${word.toLowerCase()}%`
                )
            }

        });

        res.json({
            message: "Comments retrieved successfully",
            comments
        });

    } catch (error) {

        res.json({
            message: error.message
        });

    }

});

router.get('/comments/newest/:postId', async (req, res) => {

    try {

        let { postId } = req.params;

        let comments = await Comment.findAll({

            where: { postId },

            limit: 3,

            order: [['createdAt', 'DESC']]

        });

        res.json({
            message: "Comments retrieved successfully",
            comments
        });

    } catch (error) {

        res.json({
            message: error.message
        });

    }

});

router.get('/comments/details/:id', async (req, res) => {

    try {

        let { id } = req.params;

        let comment = await Comment.findByPk(id, {

            include: [

                {
                    model: usermodel,
                    attributes: ['id', 'name']
                },

                {
                    model: postmodel,
                    attributes: ['id', 'title']
                }

            ]

        });

        res.json({
            message: "Comment retrieved successfully",
            comment
        });

    } catch (error) {

        res.json({
            message: error.message
        });

    }

});
    
export default router;
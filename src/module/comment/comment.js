
import  { Router } from "express";
import  Comment  from "../../models/commentmodel.js";
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
    where: { postId, userId }, 
    defaults:{postId, userId, content}
    });
     if(created){
        res.json({message:"Comment created successfully", comment})
    }
    else{
        res.json({message:"Comment found successfully", comment})
    }

  })
    
export default router;
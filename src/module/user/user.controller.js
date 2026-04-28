import { Router } from "express";
import { usermodel } from "../../models/usermodel.js";
const router = Router();
//reateanewuser(usingbuildandsave)(makesurethattheemaildoesnotexistbefore)
router.post('/user-signup',async (req,res)=>{
    let {name,email,password} = req.body;
    let existingUser = await usermodel.findOne({where:{email}});
    if(existingUser){
        return res.json({   
            message:"User with this email already exists"
        })
    }
   let signedupuser = await usermodel.build({name,email,password})
   await signedupuser.save();
   if(signedupuser){
    res.json({
        message:"User signed up successfully",
        user:signedupuser
    })
   }
   else{
    res.json({
        message:"User signup failed"
    })
   }
})

//2-CreateorupdatebasedonPKanduseskipvalidationoption
router.put('/users/:id', async (req, res) => {

    try {

        let { id } = req.params;
        let { name, email, role } = req.body;

        let [user, created] = await usermodel.upsert(
            { id, name, email, role },
            { validate: false }
        );

        if (created) {
            res.json({
                message: "User created successfully",
                user
            });
        } else {
            res.json({
                message: "User updated successfully",
                user
            });
        }

    } catch (error) {

        res.json({
            message: error.message
        });

    }

});
//3-WriteanAPIendpointtofindauserbytheiremailaddress

router.get('/users/by-email', async (req, res) => {
    let { email } = req.query;
    let user = await usermodel.findOne({ where: { email } });
    if (user) {
        res.json({
            message: "User found successfully",
            user
        });
    } else {
        res.json({
            message: "User not found"
        });
    }
});

//4 - retrie user by id expect role 
router.get('/users/:id', async (req, res) => {

    try {

        let { id } = req.params;

        let user = await usermodel.findByPk(id, {
            attributes: { exclude: ['role'] }
        });

        if (user) {
            res.json({
                message: "User found successfully",
                user
            });
        } else {
            res.json({
                message: "User not found"
            });
        }

    } catch (error) {

        res.json({
            message: error.message
        });

    }

});
export default router;
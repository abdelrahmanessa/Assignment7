
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection.js";
import commentmodel from "./commentmodel.js";
class Post extends Model {}
 Post.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING
    },
    content:{
        type:DataTypes.TEXT
    },
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'users',
            key:'id'
        }
    }
    ,createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
},
{
    sequelize,
    paranoid:true,
    modelName:'Post'
},

)

export default Post;



// import { DataTypes } from "sequelize";
// import { sequelize } from "../database/connection";

// export const postmodel = sequelize.define('post', {
// id:{
//     type:DataTypes.INTEGER,
//     autoIncrement:true,
//     primaryKey:true
// },
// title:{
//     type:DataTypes.STRING
// },
// content:{
//     type:DataTypes.TEXT


// },
// userid:{
//     type:DataTypes.INTEGER,
//     references:{
//         model:'users',
//         key:'id'
//     }
// }
// ,createdAt: {
//   type: DataTypes.DATE
// },
// updatedAt: {
//   type: DataTypes.DATE
// }
// })
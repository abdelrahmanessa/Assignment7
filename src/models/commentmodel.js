// import { sequelize } from "../database/connection";

// export const comment = sequelize.define('comment',{
// id:{
//     type:DataTypes.INTEGER,
//     autoIncrement:true,
//     primaryKey:true
// },
//     content:{
//     type :DataTypes.TEXT

// },
// userid:{
//     type:DataTypes.INTEGER,
//     references:{
//         model:'users',
//         key:'id'
//     }
// },
// postid:{
//     type:DataTypes.INTEGER,
//     references:{        
//         model:'posts',
//         key:'id'
//     }
// }   
// ,createdAt: {
//   type: DataTypes.DATE
// },
// updatedAt: {
//   type: DataTypes.DATE
// }
// });

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection.js";
import Post from "./postmodel.js";
class Comment extends Model{}
  Comment.init({
    id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
},
    content:{
    type :DataTypes.TEXT
    },
userId:{
    type:DataTypes.INTEGER,
    references:{
        model:'users',
        key:'id'
    }
},
postId:{
    type:DataTypes.INTEGER,
    references:{            
        model:'posts',
        key:'id'
    }
}
    // ,createdAt: {
    // type: DataTypes.DATE,
    // allowNull: false
    // },
    // updatedAt: {
    // type: DataTypes.DATE,
    // allowNull: false
    // }
},
{
    sequelize,
    modelName:'Comment'
})

export default Comment;
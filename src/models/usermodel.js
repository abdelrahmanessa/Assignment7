import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const usermodel = sequelize.define('user', {
id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    
},
name:{
    type:DataTypes.STRING,
},
email:{
    type:DataTypes.STRING,
    allowNull:false,
unique:true,
validate:{
    isEmail:true
}

},
password:{
    type:DataTypes.STRING,
   validate:{
    checkPasswordLength(value){
        if(value.length<=6)
        {
            throw new Error("Password should be at least 6 characters long");
        }
    }
   }
},
role:{
    type: DataTypes.ENUM('user', 'admin'), // ENUM definition
}
,createdAt: {
  type: DataTypes.DATE
},
updatedAt: {
  type: DataTypes.DATE
}
})
usermodel.beforeCreate((user)=>{

    function  checkNameLength(value){
        if(value.length < 2){
            throw new Error("Name should be at least 2 characters long");
        }
}
  checkNameLength(user.name);

}

)
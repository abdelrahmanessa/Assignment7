import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('assignment7', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
 export const connectToDatabase = async () => {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
 }

 export const syncDatabase = async () => {

    try {
        let {usermodel} = await import("../models/usermodel.js");
        let {postmodel} = await import("../models/postmodel.js");
        let {comment} = await import("../models/commentmodel.js");
        await sequelize.sync();
    } catch (error) {
        console.error('Error syncing database:', error);
    }
 }
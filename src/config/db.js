import mysql from "mysql2"
import { configDotenv } from "dotenv";
configDotenv();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error)=>{
    if(error){
        return console.log("Error: DB connection failed" , error);
    }
    console.log("Database connected successfully");
}); 

export default connection;
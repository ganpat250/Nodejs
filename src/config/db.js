import mysql from "mysql";
import { configDotenv } from "dotenv";
configDotenv();
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
connection.connect((error) => {
  if (error) {
    return console.log("❌Database connection Failed❌ :" + error.stack);
  }
  console.log("✅Database connection successfully✅");
});

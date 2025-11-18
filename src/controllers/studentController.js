import { connection } from "../config/db.js";
export const Home = (req, res) => {
  res.json({
    message: "⭐Welcome to Student Management System⭐",
    brief: "In this system you perform the following operations:",
    operations: [
      "1.Register a student",
      "2.See all students in the system",
      "3.See a student by using his id",
      "4.Update the information of students",
      "5.deleting a student",
    ],
  });
};

export const addStudent = (req, res) => {
  const { full_names, age, sex, city } = req.body;
  if (!full_names || !age || !sex) {
    return res.status(400).send("⛔Missing data or invalid credentials⛔");
  }
  const sql =
    "INSERT INTO `Students`(`full_names`,`age`,`sex`,`City`) VALUES(?,?,?,?);";
  const values = [full_names, age, sex, city];
  connection.query(sql, values, (error, result) => {
    if (error) {
      return res.status(500).send("⛔Error while inserting in DB⛔ \n" + error);
    }
    res
      .status(201)
      .send(
        "✅Student Registered successfully✅:" +
          ` Insert ID :${result.insertId}`
      );
  });
};

export const getStudents = (req,res)=>{
  const sql = "SELECT * FROM `Students`;";
  connection.query(sql, (error, result) => {
    if (error) {
      return res
        .status(500)
        .send("⛔Error fetching data in DB!!!!!⛔\n" + error);
    }
    if (result.length === 0) {
      return res.status(404).send("⛔DB is empty!!!!⛔");
    }
    res.status(200).json({
      message: "✅Students fetched successfully✅",
      results: result,
    });
  });
};

export const getStudentsById = (req,res)=>{
  const studID = req.params.id;
  const sql = "SELECT * FROM `Students` WHERE id = ?;";
  const value = [studID];
  connection.query(sql, value, (error, result) => {
    if (error) {
      return res
        .status(500)
        .send("⛔Error retrieving a student in DB⛔:\n" + error);
    }
    if (result.length === 0) {
      return res.status(404).send("⛔Student Not Found,Try Again⛔");
    }
    res.status(200).json({
      message: "✅Student Retrieved Successfully✅",
      results: result,
    });
  });  
};

export const updateStudent = (req,res)=>{
  const studID = req.params.id;
  const { full_names, age, sex, city } = req.body;
  const sql =
    "UPDATE `Students` SET `full_names` = ?, `age` = ? , `sex` = ?, `City` = ? WHERE id = ?";
  const values = [full_names, age, sex, city, studID];
  connection.query(sql, values, (error, result) => {
    if (error) {
      return res.status(500).send("⛔Update Failed,Try Again⛔:\n" + error);
    }
    if(result.affectedRows === 0){
      return res.status(404).send("⛔Student Not Found⛔");
    }
    res
      .status(201)
      .send(`✅Update operation for student_id:${studID} went successfully✅`);
  }); 
};
export const deleteStudent = (req,res)=>{
  const studID = req.params.id;
  const sql = "DELETE FROM `Students` WHERE id = ?;";
  connection.query(sql, [studID], (error, result) => {
    if (error) {
      return res.status(500).send("⛔Delete failed⛔:\n" + error);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("⛔Student Not Found, Try Again⛔");
    }
    res.status(200).json({
      message: "✅Delete operation went successfully✅",
      DeletedId: studID
    });
  });
};
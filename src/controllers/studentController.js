import connection from "../config/db.js";
export const Home = (req,res)=>{
res.json({
    message: "Welcome to student management system",
    features: [
        "1.Create a student: http://localhost:8080/add-student using POST method!!",
        "2.View all students: http://localhost:8080/students using GET method!!",
        "3.View one student: http://localhost:8080/student/{student_id} using GET method",
        "4.Update student info: http://localhost:8080/update-student/{student_id} using PUT method",
        "5.Delete a student: http://localhost:8080/delete-student/{student_id} using DELETE method"
    ],
    Notice: "Its Required to login via http://localhost:8080/login to get an authorization token!!!"

});
};
export const addStudent = (req,res)=>{
    const { full_names,age,sex,city } = req.body;
    if(!full_names || !age || !sex){
        return res.status(404).send("Error: missing full names,age or sex");
    }
    const sql = "INSERT INTO `Students`(`full_names`,`age`,`sex`,`City`) VALUES(?,?,?,?);";
    const values = [full_names,age,sex,city];
    connection.query(sql,values,(error,result)=>{
        if(error){
            return res.status(500).json({
                message: "Adding student failed:",
                error: error.sqlMessage
            });
        }
        res.status(201).json({
            message: `Student Created successfully, id:${result.insertId}`,
        });
    });
};
export const getAllStudents = (req,res)=>{
    const sql = "SELECT * FROM `Students`;";
    connection.query(sql,(error,result)=>{
        if(error){
           return res.status(500).json({
            message: "Error retrieving students",
            error: error.sqlMessage
           });
        }
        res.status(200).json({
            message: "Student retrieved successfully",
            result: result
        });
    });
};
export const getStudentById = (req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM `Students` WHERE id = ?;";
    const value = [id];
    connection.query(sql,value,(error,result)=>{
        if(error){
            return res.status(500).send("Error fetching students by id")
        }else if(result.length === 0){
            return res.status(404).send("Student Not Found!!")
        }
        res.status(200).json({
            message: "Student retrieved successfully by id",
            result: result
        });
    });
};
export const updateStudent = (req,res)=>{
    const id = req.params.id;
    const { full_names,age,sex,city } = req.body;
    if(!full_names || !age || !sex){
        return res.status(500).send("Error: missing full names ,age or sex");
    }
    const sql = "UPDATE `Students` SET `full_names`= ?,`age`= ?,`sex`= ?, `City`= ? WHERE id = ?;"
    const values = [full_names,age,sex,city,id];
    connection.query(sql,values,(error,result)=>{
        if(error){
            return res.status(500).json({
                message: "Error updating a student",
                error: error.sqlMessage
            });
        }
        if(result.affectedRows === 0){
            return res.status(404).json({
                message: "Error updating:",
                error: "Student Not Found"
            });
        }
        res.status(200).send("Update Operation went successfully");
    });
};
export const deleteStudent = (req,res)=>{
    const id = req.params.id;
    const sql = "DELETE FROM `Students` WHERE id = ?";
    const value = [id];
    connection.query(sql,value,(error)=>{
        if(error){
          return res.status(404).json({
            message: "Error deleting a student",
            error: error.sqlMessage
          });  
        }
        res.status(200).json({
            message: `Student deleted successfully, id:${id}`,
        });
    });

};
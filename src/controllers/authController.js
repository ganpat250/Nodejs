import jwt from "jsonwebtoken";
const login = (req,res)=>{
    const { username,password } = req.body;
    const correctUser = "admin";
    const correctPass = "123";
    if(!username || !password){
        return res.status(401).send("Authentication credentials not found!!!")
    }else if(username !== correctUser || password !== correctPass){
        return res.status(403).send("Invalid username or password!!!!")
    }
    const token = jwt.sign({
        username: username,
        role: "admin"
    },process.env.JWT_SECRET,{
        expiresIn: "24hr"
    });
    res.status(200).json({
        message: "Login successfully",
        token: token,
    });
}
export default login;
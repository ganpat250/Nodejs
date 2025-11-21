import jwt from "jsonwebtoken";
const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({
            message: "Access denied",
            error: "Authorization token not found!!",
            solution: "Go to http://localhost:8080/login to get a token!!!"
        });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
        if(error){
            return res.status(401).json({
                message: "Access Denied",
                error: "Invalid or expired token!!!",
                details: error,
                solution: "Go to http://localhost:8080/login to get a new token!!!"                
            });
        }
        req.user = decoded;
        next();
    });
}
export default authMiddleware;
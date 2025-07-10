import jwt from "jsonwebtoken";

const generateToken =(userID:string)=>{
    return jwt.sign({userID:userID},process.env.JWT_SECRET as string,{expiresIn:"1 day"})
}

export default generateToken;

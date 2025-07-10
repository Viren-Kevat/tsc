import { error, log } from "console"
import prisma from "../prisma/index"
import setCookie from "../utils/cookieToken.js"
import { Request, Response } from "express";
const safeUser = {
    name:true,
    email:true,
    phone:true
}
interface User{
    id?:string,
    name?:string,
    email?:string,
    phone?:string |null
    // password?:string
}
interface SignUpRequestBody {
    name: string;
    email: string;
    password: string;
}
interface UpdateUser{
    name?:string,
    email?:string,
}

const signUp = async (
    req: Request <{},{},SignUpRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: "Name, email, and password are required" });
            return;
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        setCookie(user, res);
    } catch (err) {
        console.log(err);
    }
};
const updateById = async (req:Request<{id:string},{},UpdateUser>,res:Response):Promise<void>=>{
    try{
        const {id} = req.params;
        const data = req.body;
        if(!id){
            throw new Error("id required")
        }
        const updateUser = await prisma.user.update(
            {
                where : {id},
                data:data
            }
        )
        res.status(200).send({user:updateUser}).json({
            updateUser
        })
        
    }catch(err){
        console.log(err);
        
    }
}


const deleteById = async (req:Request<{id:string},{},{}>,res:Response):Promise<void>=>{
    try{
        const {id} = req.params;
        const del = await prisma.user.delete({
            where:{id}
        })
        console.log("deleted");
    }catch(err){
        console.log("error",err);
        
    }
}

const findById = async (req:Request<{id:string},{},{}>,res:Response):Promise<void>=>{
   try{
        const {id}=req.params;
        const srch:User | null = await prisma.user.findFirst({
            where:{id},
            select:safeUser
            
        })
        if(!srch){
            res.status(404).json({error:"user not found"})
            return
        }
        srch.id = undefined;
    
        res.status(200).json({
            srch:srch
        })
        console.log(srch);
        
   }catch(err){
    console.log("err : ",err);
    
   }
}

export {signUp,updateById,deleteById,findById};
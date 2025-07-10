import express from "express";
import { Response,Request } from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/userRoutes";
const app = express();
const Port: Number = 3000;


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api",userRoutes);
app.put("/api",userRoutes);

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello Prisma!")
})



app.listen(Port,()=>{
    console.log(`http/localhost:${Port}`);
    
})

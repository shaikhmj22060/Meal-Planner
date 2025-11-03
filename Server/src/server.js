import app from "./app.js";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cors from "cors"
import cookieParser from "cookie-parser"

app.use(cors({
    credentials:true
}))

dotenv.config();
connectDB();
app.use(cookieParser())

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
});
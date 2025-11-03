import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn  = await mongoose.connect(process.env.MONGO_URI,{dbName:"Meal-Planner"});
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch (error) {
        return console.log(error.message)
    }
};

export default connectDB;
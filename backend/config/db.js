import mongoose from "mongoose";  // import mongoose

const connectDB = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URI)// connect to Mongoose
        console.log("MongoDB connected...");

    }catch (error){
        console.log(`Error: ${error.message}`); // console error message if it doesn't connect
        process.exit(1); // Stop to connect to Mongoose
    }
}


export default connectDB; // export connectDB
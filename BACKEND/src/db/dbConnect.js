import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


// Connect to the database

const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
         console.log(`\nMongoDB connected: !! DB HOST : ${connectionInstance.connection.host}`) //this will print the host of the database 
         
         //assigment is to console.log the host of the database that is connectionInstance

    } catch (error) {
        console.error("MongoDB connection error :: index.js : ", error.message)
        process.exit(1) //this will exit the process with a failure code. for example, if the process is a web server, it will stop the server
    }
}


export default connectDB;
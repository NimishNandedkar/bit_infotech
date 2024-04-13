import dotenv from "dotenv";

import connectDB from "./db/dbConnect.js";
import { app } from "./app.js";


dotenv.config({
    path: "./env"
}); //this is used to load the environment variables from the .env file

const port = process.env.PORT || 8000;

connectDB().then(() => {
    
    app.on("error", (error) => {
        console.log("Error in express server ", error);
        throw error;
    });

    app.listen(port, () => {
        console.log(`server is running on ---> http://localhost:${port}`)
    })
}).catch((error) => {
    console.error("Mongo DB  connection  failed !!! : ", error);
});
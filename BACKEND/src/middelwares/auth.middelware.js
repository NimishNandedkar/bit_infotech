//authentaction middelware

import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


const getCurrentUser = async (req, res, next) => {
    
       try {
         const token = req.cookies?.token || req.headers["Authorization"]?.replace("Bearer ", "");
         console.log(req.cookies?.token);
 
         if (!token) {
             console.log("No token provided");
             return res
             .status(400)
             .json({
                 status: "failed",
                 message: "Unauthorized :: No token provided",
             });
         }
          //verify the token
         const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
         
         if (!decodedToken) {
                return res
                .status(400)
                .json({
                    status: "failed",
                    message: "Unauthorized :: Invalid token",
                });
            }
 
         console.log(decodedToken + "decodedToken");
 
         const user = await User.findById(decodedToken._id).select("-password");
         console.log(user);
         
         if (!user) {
             return res
             .status(401)
             .json({
                 status: "failed",
                 message: "session expired, please login again",
             });
         }   
 
         req.user = user;
         next();      
       } catch (error) {
            console.log(error + "error in getCurrentUser");
            return res
            .status(400)
            .json({
                status: "failed",
                message: "Unauthorized :: Invalid token",
            });
       }   
}

export default getCurrentUser;
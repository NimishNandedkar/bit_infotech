import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
    
        const role = req.body.email;
        const password = req.body.password;
        console.log(role + "  role" + ' ' + password + ' password');


        if(role === "admin") {

        const admin = await User.findOne({ email: role, password: password });
        console.log(admin + "admin");

        //create a jwt token
        const token = jwt.sign({ email: admin.email}, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });

        console.log(token + "token");

        const options = {
            httpOnly: true, // only accessible by server
            secure: true,  // only works on https cookie is not modifiable
        }
    

        if (admin) {
            req
            .cookie("token", token, options)
            .status(200)
            .json({
                status: "success",
                message: "Admin logged in successfully",
            })
            next();
        } else {
            return res
            .status(400)
            .json({
                status: "failed",
                message: "Unauthorized :: Invalid token",
            });
        }
    }else{
        next();
    }
}

export { isAdmin };

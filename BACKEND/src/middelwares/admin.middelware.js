import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
    const { email } = req.body;

    if (email === "admin") {
        const admin = await User.findOne({ email });

        if (admin) {
            // create a jwt token
            const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET, {
                expiresIn: "1h",
            });

            const options = {
                httpOnly: true, // only accessible by server
                secure: true,  // only works on https, cookie is not modifiable
            };

            console.log(token);

            res
            .cookie("token", token, options)
            .status(200)
            .json({
                status: "success",
                message: "Admin logged in successfully",
            });
            next();
        } else {
            return res
            .status(400)
            .json({
                status: "failed",
                message: "Unauthorized :: Invalid email or password",
            });
        }
    } else {
        next();
    }
}

export { isAdmin };

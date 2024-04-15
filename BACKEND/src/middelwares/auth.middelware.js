//authentaction middelware

import { User } from "../models/user.model.js";

const getCurrentUser = async (req, res, next) => {
    try {
        const userid = req.cookies.userid;
        console.log(userid);
        const user = await User.findById(userid);
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
        
        return true
        
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized :: getCurrentUser failed",
        });
    }
}

export default getCurrentUser;
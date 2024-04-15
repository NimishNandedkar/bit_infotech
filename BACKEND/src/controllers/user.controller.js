
import { User } from "../models/user.model.js";



const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if ([name, password, email].some((field) => field?.trim() === "")) {
            console.log([name, password, email].some((field) => field?.trim() === ""));
            return res.status(400).json({
                status: "failed",
                message: "Please provide all the required fields",
            }); 
        }

        const userExists = await User.findOne({ email
        });

        if (userExists) {
            return res.status(400).json({
                status: "failed",
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "User not created",
            });
        }

        return res.status(201).json({
            status: "success",
            data: {
                user,
            },
            message: "User created successfully",
        });
        
    } catch (error) {
         console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if ([email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all the required fields",
            });
        }

        const user = await User.findOne({
            email,
            password,
        })

        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid credentials",
            });
        }
        
        //store user id in cookie
        const userId = user._id;

       
        return res
        .cookie("userid", userId)
        .status(200)
        .json({
            status: "success",
            data: {
                user,
            },
            message: "User logged in successfully",
        });

        
    } catch (error) {
        console.log(error);
    }
}

const logoutUser = async (req, res) => {
    try {
        //remove user id from session

        return res
        .clearCookie('userid')
        .status(200).json({
            status: "success",
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

export { registerUser, loginUser, logoutUser};
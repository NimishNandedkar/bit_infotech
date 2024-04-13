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

export { registerUser };
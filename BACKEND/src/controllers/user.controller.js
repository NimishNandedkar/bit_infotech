
import { User } from "../models/user.model.js";

// const generateToken = async (userId) => {
//     try {

//         const user = await User.findById(userId)
//         if (!user) {
//             return res.status(404).json({
//                 status: "failed",
//                 message: "User not found",
//             });
//         }

//         const token = user.generateJWTToken();
//         return token;

//     } catch (error) {
//         console.log(error + "error in generateToken");
//     }
// }



const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const token = await user.generateJWTToken();
        return token;
    } catch (error) {
        throw new Error("Error in generateToken: " + error.message);
    }
};

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

        const userExists = await User.findOne({
            email
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

        const createduser = await User.findById(user._id).select(
            "-password" // exclude password and refreshtokens from user object
        )

        if (!createduser) {
            return res.status(500).json({
                status: "failed",
                message: "User could not be created",
            });
        }


        return res.status(201).json({
            status: "success",
            data: { createduser },
            message: "User created successfully",
        });

    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log(req.body);

        if ([email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all the required fields",
            });
        }

        const user = await User.findOne({ email });

        if (user.role === "admin") {
            // create a jwt token
            const token = generateToken(user._id).then((token) => {
                console.log(token);

                const options = {
                    httpOnly: true, // only accessible by server
                    secure: true,  // only works on https, cookie is not modifiable
                };

                console.log(options);

                // Store token in session
                req.session.token = true;
                req.session.user = user;    

                 res
                    .cookie("token", token, options)
                    .status(200)
                    .json({
                        status: "success",
                        data: {
                            user: {
                                _id: user._id,
                                email: user.email,
                                role: user.role
                                // Add any other relevant user data here
                            },
                            token,
                        },
                        message: "Admin logged in successfully",
                    });

                    console.log({
                        user: {
                            _id: user._id,
                            email: user.email,
                            role: user.role
                        },
                        user
                    });
            });
        }else {
        // Check if user exists
        console.log(user.role);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found in database",
            });
        }

        const isPassValid = await user.verifyPassword(password);

        if (!isPassValid) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid password",
            });
        }

        // Generate token
        const token = await generateToken(user._id);

        const loggedinuser = await User.findById(user._id).select(
            "-password" // exclude password and refreshtokens from user object
        )

        if (!loggedinuser) {
            return res.status(500).json({
                status: "failed",
                message: "User could not be logged in",
            });
        }

        const options = {
            httpOnly: true, // only accessible by server
            secure: true,  // only works on https cookie is not modifiable
        }
    

        // Store token in session
        req.session.token = true;
        req.session.user = user;

        // Send response with token and user data
        return res
            .cookie("token", token, options)
            .status(200)
            .json({
                status: "success",
                data: {
                    user: {
                        _id: user._id,
                        email: user.email,
                        // Add any other relevant user data here
                    },
                    token,
                },
                message: "User logged in successfully",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        // Clear the cookie         
        return res
            .clearCookie("token")
            .status(200)
            .json({
                status: "success",
                message: "User logged out successfully",
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};


export { registerUser, loginUser, logoutUser };
import { Project } from "../models/projectfile.model.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../utils/fileupload.js";
import jwt from "jsonwebtoken";

 const uploadFile = async (req, res) => {
    try {
        const { title, description, projectType } = req.body;
        const fileLocalPath = req.file?.path;
        console.log(req.body)
        console.log(req.file)
        console.log(description)
        console.log(projectType);
       
       

        const token = req.cookies?.token;
        console.log(token);
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const userid  = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(userid);
        console.log(user);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }



        // Check if all required fields are provided
        if ([title, description, projectType, fileLocalPath].some(field => field?.trim() === "" || undefined || null) ) {
            console.log([title, description, projectType].some(field => field?.trim() === ""));
            return res.status(400).json({
                message: "Please provide all the required fields",
            });
        }

        // Upload file to Cloudinary
        const fileUpload = await uploadCloudinary(fileLocalPath);

        // Check if file upload was successful
        if (!fileUpload) {
            console.log("File upload failed");
            return res.status(501).json({ message: "File upload failed" });
        }

        // Save file details to database
        const project = await Project.create({
            username: user.name.value,
            title,
            description,
            projectType,
            file: fileUpload.url, // Use file URL or other relevant property
        });

        // Check if file details were saved successfully
        if (!project) {
            return res.status(500).json({ message: "File details could not be saved" });
        }

        // Send success response
        res.status(201).json({ message: "File uploaded successfully" });

    } catch (error) {
        // Log and send error response
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { uploadFile };

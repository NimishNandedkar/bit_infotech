import { BlogDetail } from "../models/blog.model.js";
import uploadCloudinary from "../utils/fileupload.js";
import {v2 as cloudinary} from 'cloudinary';


const createBlog = async(req,res) =>{
    try {

        const {blogTitle , blogContent , category} = req.body ;

        const headerImagefile = req.file?.path ; 

        console.log(req.file);
        console.log(req.body, "form req.body");
    

        console.log("blogTitle:", blogTitle);
        console.log("headerImage:", headerImagefile);
        console.log("blogContent:", blogContent);
        console.log("category:", category);


        if ([blogTitle , headerImagefile , blogContent , category].some((field) => field?.trim() === "" || undefined || null )) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all the required fields",
            });
        }


        const imageUpload = await uploadCloudinary(headerImagefile) ;

        if (!imageUpload) {

            console.log("File upload failed ");

            return res.status(500).json({message : "File upload failed"})
            
        } 

        console.log(imageUpload.url , "this log is from blog controller");

        const blog = await BlogDetail.create({
            blogTitle , 
            headerImage:imageUpload.url,
            blogContent , 
            category,
        });

        if (!blog) {
            return res.status(400).json({
                status: "failed",
                message: "blog not created",
            });
        }
        
       // console.log(blog.toJSON(), "blog data which is uploaded");
        
        return res.status(201).json({
            status: "success",
            data: {
                blog,
            },
            message: "blog created successfully",
        });

        
    } catch (error) {

        // console.log(error);

        

        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            
        });
    }
}


const showblogdata = async (req, res) => {
   try {
        // Check if an ID is provided in the request parameters
        const { id } = req.params;

        if (id) {
            // Find the blog by ID
            const blog = await BlogDetail.findById(id);
            
            // Check if the blog with the provided ID exists
            if (!blog) {
                return res.status(404).json({
                    status: "error",
                    message: "Blog not found",
                });
            }

            // Send the retrieved blog as a JSON response
            return res.status(200).json({
                status: "success",
                data: blog,
                message: "Blog retrieved successfully",
            });
        } else {
            // Find all documents in the BlogDetail collection
            const allBlogs = await BlogDetail.find();

            // Send the retrieved data as a JSON response
            return res.status(200).json({
                status: "success",
                data: allBlogs,
                message: "All blogs retrieved successfully",
            });
        }
    } catch (error) {
        // Handle server error
        console.error("Error fetching blogs:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }

    
};

// const updateBlog = async (req, res) => {
//     try {
//         const blogId = req.params.id;

//         const { blogTitle, blogContent, category } = req.body;

//         const headerImagefile = req.file ? req.file.path : null;
        
//         if (!blogTitle || !headerImagefile || !blogContent || !category) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "Please provide all the required fields",
//             });
//         }

//         // Assuming uploadCloudinary is a function to upload image to cloudinary
//         const imageUpload = await uploadCloudinary(headerImagefile);

//         if (!imageUpload) {
//             console.log("File upload failed ");
//             return res.status(500).json({ message: "File upload failed" });
//         }

//         const updateFields = {
//             blogTitle,
//             headerImage: imageUpload.url, // Assuming you store the image URL in the headerImage field
//             blogContent,
//             category,
//         };

//         const updateResult = await BlogDetail.updateOne({ _id: blogId }, updateFields);

//         if (updateResult.n === 0) {
//             return res.status(404).json({
//                 status: "failed",
//                 message: "Blog not found",
//             });
//         }

//         res.status(200).json({
//             status: "success",
//             data: updateResult,
//             message: "Blog Updated",
//         });

//     } catch (error) {
//         if (error.name === 'CastError') {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "Invalid Blog ID",
//             });
//         }
//         console.error("Error updating blog:", error);
//         res.status(500).json({
//             status: "error",
//             message: "Internal server error",
//         });
//     }
// };



const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { blogTitle, blogContent, category } = req.body;

        // Check if any of the required fields are missing
        if (!blogTitle && !blogContent && !category) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide at least one field to update",
            });
        }

        const updateFields = {};
        
        // Add fields to updateFields object only if they are provided in the request body
        if (blogTitle) updateFields.blogTitle = blogTitle;
        if (blogContent) updateFields.blogContent = blogContent;
        if (category) updateFields.category = category;

        // If a file is uploaded, update the headerImage field
        if (req.file) {
            const headerImagefile = req.file.path;
            
            // Assuming uploadCloudinary is a function to upload image to cloudinary
            const imageUpload = await uploadCloudinary(headerImagefile);

            if (!imageUpload) {
                console.log("File upload failed ");
                return res.status(500).json({ message: "File upload failed" });
            }

            updateFields.headerImage = imageUpload.url; // Assuming you store the image URL in the headerImage field
        }

        const updateResult = await BlogDetail.updateOne({ _id: blogId }, { $set: updateFields });

        if (updateResult.n === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Blog not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: updateResult,
            message: "Blog Updated",
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                status: "failed",
                message: "Invalid Blog ID",
            });
        }
        console.error("Error updating blog:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};





const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id; // Assuming the blog ID is passed as a request parameter

        const blog = await BlogDetail.findOne({_id:blogId})

        console.log(blog.headerImage);

       
        // Delete associated image from Cloudinary
        try {
            await cloudinary.uploader.destroy(blog.headerImage);
        } catch (error) {
            console.error("Error in Cloudinary:", error);
            // Handle Cloudinary deletion error
        }
        

        const deleteResult = await BlogDetail.deleteOne({ _id: blogId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Blog not found",
            });
        }

        

        res.status(200).json({
            status: "success",
            data: deleteResult,
            message: "Blog deleted",
        });
        
        // console.log(blog.headerImage)
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};




export { createBlog , showblogdata , deleteBlog , updateBlog};
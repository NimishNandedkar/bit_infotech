import { Router } from "express";
import { createBlog , deleteBlog, showblogdata, updateBlog } from "../controllers/blog.controller.js";
import upload from "../middelwares/multer.middleware.js";
import getCurrentUser from "../middelwares/auth.middelware.js";
import { getBlogById, getBlogs,  } from "../controllers/getblogs.controller.js";


// Note if you are uploading file in form data kindy put "upload.single('headerImage')" is method parameter

const blogRouter = Router();

//Route to create blog 
blogRouter.route("/createblog").post( upload.single('headerImage') ,createBlog);

// Route for fetching all blogs
blogRouter.route("/blogDetail").get(showblogdata);

// Route for fetching a specific blog by ID
blogRouter.route("/blogDetail/:id").get(showblogdata);

// Delete a blog by ID
blogRouter.route("/deleteblog/:id").delete(deleteBlog);


//Route to Update Blog 
blogRouter.route("/updateblog/:id").patch(  upload.single('headerImage')  , updateBlog);




export default blogRouter;
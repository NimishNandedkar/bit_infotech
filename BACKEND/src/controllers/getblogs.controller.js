import { BlogDetail } from "../models/blog.model.js";

const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogDetail.find();
        res.status(200).json({
            status: "success",
            data: blogs,
        });
    } catch (error) {
        console.log(error + "error in getBlogs");
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        console.log(req.params.id);
        const { id }  = req.params; // Directly destructure id from req.params
        console.log(id);
        const blog = await BlogDetail.findById(id).exec();
        if (!blog) {
            return res.status(404).json({
                status: "failed",
                message: "Blog not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: blog,
        });
    } catch (error) {
        console.log(error + "error in getBlogById");
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
        });
    }
};



export { getBlogs, getBlogById };
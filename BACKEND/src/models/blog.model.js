import mongoose from "mongoose";


const BlogSchema = new mongoose.Schema(
{
    blogTitle: {
        type: String,
        required: true,
        trim: true,
    },
    headerImage: {
        type: String,
        required: true,
        trim: true,
    },
    blogContent: {
        type: String,
        required: true,
        trim: true,
    },
    category:{
        type: String,
        required: true,
        trim: true,
    }
}, 
{timestamps:true});


export const BlogDetail = mongoose.model("BlogDetail", BlogSchema);
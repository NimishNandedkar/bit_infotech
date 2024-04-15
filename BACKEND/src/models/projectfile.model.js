import mongoose from 'mongoose';


const ProjectFileSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    file:{
        type: String,
        required: true
    },
    projectType:{
        type: String,
        required: true
    },


},{timestamps: true})

export const Project = mongoose.model('Projectupload',ProjectFileSchema)
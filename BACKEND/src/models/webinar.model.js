// Require Mongoose
import mongoose from "mongoose";

// Define schema for the webinar/seminar
const webinarSchema = new mongoose.Schema({

    title :{
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

// Define the model
export const Webinar = mongoose.model('Webinar', webinarSchema);

import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({

    imageUrl: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    hostName: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    twitter: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    instagram: {
        type: String,
    },
    postal: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
},
    { timestamps: true });


export const Events = mongoose.model('Events', EventSchema);
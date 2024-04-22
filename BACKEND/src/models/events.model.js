
import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({

    ImageUrl: {
        type: String,
        required: true,
    },
    EventName: {
        type: String,
        required: true,
    },
    HostName: {
        type: String,
        required: true,
    },
    Agenda: {
        type: String,
    },
    EventDate: {
        type: Date,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Website: {
        type: String,
    },
    Twitter: {
        type: String,
    },
    LinkedIn: {
        type: String,
    },
    Instagram: {
        type: String,
    },
    Postal: {
        type: String,
        required: true,
    },
    Categories: {
        type: String,
    },
    RegistereUsers: {
        type: Array,
    },

},
    { timestamps: true });


export const Events = mongoose.model('Events', EventSchema);
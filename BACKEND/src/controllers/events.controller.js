import jwt from "jsonwebtoken";
import { Events } from "../models/events.model.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../utils/fileupload.js";





const createEvents = async (req, res) => {
    try {
        const eventData = {
            eventName: req.body.eventName,
            hostName: req.body.hostName,
            subject: req.body.subject,
            eventDate: req.body.eventDate,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            description: req.body.description,
            website: req.body.website,
            twitter: req.body.twitter,
            linkedIn: req.body.linkedIn,
            instagram: req.body.instagram,
            postal: req.body.postal,
            categories: req.body.categories,
        };

        console.log(req.body);
        const fileLocalPath = req.file?.path;
        const fileUpload = await uploadCloudinary(fileLocalPath);
        console.log(fileUpload);

        if (!fileUpload) {
            return res.status(501).json({ message: "File upload failed" });
        }
        console.log(fileUpload.url);

        const newEvent = await Events.create({
            ...eventData,
            imageUrl: fileUpload.url, // Ensure the property name matches the schema
        });

        if (!newEvent) {
            return res.status(500).json({
                status: "failed",
                message: "Event could not be created",
            });
        }

        return res.status(201).json({
            status: "success",
            data: {
                newEvent
            }
        });

    } catch (error) {
        res.status(400).json({ message: error.message + "error in createEvents" });
    }
}

const getEvents = async (req, res) => {
    try {

        const events = await Events.find();

        if (!events) {
            return res.status(404).json({
                status: "failed",
                message: "No events found",
            });
        }

        // const data = events.map((event) => {
        //     return {
        //         id: event._id,
        //         EventName: event.eventName,
        //         Agenda: event.Agenda,
        //         Image: event.ImageUrl,
        //         EventDate: event.EventDate,
        //         CreatedAt: event.createdAt,
        //         Description : event.description
        //     }
        // });

        // console.log(data);
        return res.status(200).json({
            status: "success",
            data: events,
            message: "All events retrieved successfully",
        });

        // return res.status(200).json({
        //     status: "success",
        //     data:data,
        //     message: "All events retrieved successfully",
        // });

    } catch (error) {
        console.log(error.message + "error in getEvents");
    }


}

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findById(id).exec();

        if (!event) {
            return res.status(404).json({
                status: "failed",
                message: "Event not found",
            });
        }

        return res.status(200).json({
            status: "success",
            data: event,
        });

    } catch (error) {
        console.log(error.message + "error in getEventById");
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
       const event = await Events.findByIdAndDelete(id).exec();
        if (!event) {
            return res.status(404).json({
                status: "failed",
                message: "Event not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Event deleted",
        });

    }
    catch (error) {
        console.log(error.message + "error in deleteEvent");
    }
}

const updateEvent = async (req, res) => {
    try {
        
        console.log(req.body); // Log request body for debugging purposes

        // Handle file upload if available
        const fileLocalPath = req.file.path;
        console.log(fileLocalPath);

        const imageUrl = req.body.imageUrl;
        console.log(imageUrl);
        

        if (fileLocalPath) {

            const fileUpload = await uploadCloudinary(fileLocalPath);

            if (!fileUpload) {
                return res.status(501).json({ message: "File upload failed" });
            }
            
            imageUrl = fileUpload.url;
        }

        // Update imageUrl in req.body if uploaded
        if (imageUrl) {
            req.body.imageUrl = imageUrl;
        }
        const updatedData = req.body;
        const { id } = req.params;
        const event = await Events.updateOne({_id: id}, { $set: updatedData });
        console.log(event);
        if (!event) {
            return res.status(404).json({
                status: "failed",
                message: "Event not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Event updated",
            data: event,
        });
    } catch (error) {
        console.error(error.message + "error in updateEvent");
        return res.status(500).json({ message: "Internal server error" });
    }
}


const registerEvent = async (req, res) => {
    try {

        console.log(req.headers);
        console.log(req.cookies);
        const { id } = req.params;
        const token = req.cookies?.token || req.headers["Authorization"]?.replace("Bearer ", "");
        console.log(token);

        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized: No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded._id).exec();

        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found",
            });
        }

        const event = await Events.findById(id).exec();

        if (!event) {
            return res.status(404).json({
                status: "failed",
                message: "Event not found",
            });
        }
        console.log(event);
        event.registeredUsers.push(decoded._id);
        await event.save();

        return res.status(200).json({
            status: "success",
            message: "Event registered",
        });
    }
    catch (error) {
        console.error("Error in registerEvent:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

const getRegisteredUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findById(id).populate("registeredUsers").exec();

        if (!event) {
            return res.status(404).json({
                status: "failed",
                message: "Event not found",
            });
        }

        return res.status(200).json({
            status: "success",
            data: event.registeredUsers,
        });

    } catch (error) {
        console.log(error.message + "error in getRegisteredUsers");
    }
}


export { createEvents, getEvents, getEventById, deleteEvent, updateEvent, registerEvent , getRegisteredUsers};
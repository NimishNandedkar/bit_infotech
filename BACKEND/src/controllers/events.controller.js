import jwt from "jsonwebtoken";
import { Events } from "../models/events.model.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../utils/fileupload.js";




const createEvents = async (req, res) => {

    const event = {
        EventName: req.body.EventName,
        HostName: req.body.HostName,
        Agenda: req.body.Agenda,
        EventDate: req.body.EventDate,
        Address: req.body.Address,
        City: req.body.City,
        State: req.body.State,
        Description: req.body.Description,
        Website: req.body.Website,
        Twitter: req.body.Twitter,
        LinkedIn: req.body.LinkedIn,
        Instagram: req.body.Instagram,
        Postal: req.body.Postal,
        Categories: req.body.Categories,
    };
    const fileLocalPath = req.file?.path;
    const fileUpload = await uploadCloudinary(fileLocalPath);
    console.log(fileUpload);

    if (!fileUpload) {
        return res.status(501).json({ message: "File upload failed" });
    }
    // get current user

    // const token = req.cookies?.token;
    // console.log(token);

    // if (!token) {
    //     return res.status(401).json({
    //         message: "Unauthorized",
    //     });
    // }

    // const userid = jwt.verify(token, process.env.TOKEN_SECRET);

    // const user = await User.findById(userid);
    // console.log(user);

    // if (!user) {
    //     return res.status(404).json({
    //         message: "User not found",
    //     });
    // }

    try {
        const newEvent = await Events.create({
            ...event,
            ImageUrl: fileUpload.url,
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



export { createEvents, getEvents, getEventById, deleteEvent };
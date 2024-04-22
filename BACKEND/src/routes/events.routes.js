import { Router } from "express";
import upload from "../middelwares/multer.middleware.js";
import { createEvents, deleteEvent, getEventById, getEvents } from "../controllers/events.controller.js";

const eventRouter = Router();


// Route to create event


// create Event
eventRouter.route("/createEvent")
.post( 
    upload.single('ImageUrl'),
    createEvents
);
// get all events
eventRouter.route("/getEvents").get( getEvents);

// get event by id
eventRouter.route("/getEvent/:id").get( getEventById);

// delete event by id
eventRouter.route("/deleteEvent/:id").delete( deleteEvent);

export default eventRouter;
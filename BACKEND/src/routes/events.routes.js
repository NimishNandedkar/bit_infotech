import { Router } from "express";
import upload from "../middelwares/multer.middleware.js";
import  getCurrentUser  from "../middelwares/auth.middelware.js";
import { createEvents, deleteEvent, getEventById, getEvents, getRegisteredUsers, registerEvent, updateEvent } from "../controllers/events.controller.js";

const eventRouter = Router();


// Route to create event


// create Event
eventRouter.route("/createEvent")
  .post( 
    upload.single('imageUrl'), // Use 'imageUrl' to match the name attribute in the form
    createEvents
  );

// get all events
eventRouter.route("/getEvents").get( getEvents);

// get event by id
eventRouter.route("/getEvent/:id").get( getEventById );

// delete event by id
eventRouter.route("/deleteEvent/:id").delete( deleteEvent);

//register for event
eventRouter.route("/registerEvent/:id").post( registerEvent );

//get all registered users for an event

eventRouter.route("/getRegisteredUsers/:id").get( getRegisteredUsers );

//update event
eventRouter.route("/updateEvent/:id").patch( upload.single('imageUrl'), updateEvent);


export default eventRouter;
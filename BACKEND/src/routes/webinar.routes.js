import { Router } from "express";
import { createWebinar , getWebinarData, registerForWebinar} from "../controllers/webinar.controller.js";
import getCurrentUser from "../middelwares/auth.middelware.js";

const router = Router();

//Routes to post webinar data 
router.route("/create-webinar/").post(createWebinar);

//Routes to resgiter for webinar 
router.route("/webinar-register/:id").post(registerForWebinar)


//Route to get  the Webinar data 
router.route("/get-webinar/").get(getWebinarData)


export default router
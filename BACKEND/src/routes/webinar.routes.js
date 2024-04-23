import { Router } from "express";
import { createWebinar , deleteWebinar, getWebinarData, registerForWebinar, updateWebinar} from "../controllers/webinar.controller.js";
import getCurrentUser from "../middelwares/auth.middelware.js";

const router = Router();

//Routes to post webinar data 
router.route("/create-webinar/").post(createWebinar);

//Routes to resgiter for webinar 
router.route("/webinar-register/:id").post(registerForWebinar)


//Route to get  the Webinar data 
router.route("/get-webinar/").get(getWebinarData)

//Route to get  the Webinar data by id
router.route("/get-webinar/:id").get(getWebinarData)

//Route to Delete Webinar
router.route("/delete-webinar/:id").delete(deleteWebinar)

//Rotue to update the Webinar data 
router.route("/update-webinar/:id").patch(updateWebinar)






export default router
import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import getCurrentUser from "../middelwares/auth.middelware.js";
import { uploadFile } from "../controllers/fileUpload.controller.js";
import upload from "../middelwares/multer.middelware.js";
import { isAdmin } from "../middelwares/admin.middelware.js";
import { getBlogById, getBlogs } from "../controllers/getblogs.controller.js";


const router = Router();

router.route("/register").post(
    registerUser
)

router.route("/login").post(
 loginUser
)

router.route("/logout").post(
    getCurrentUser, logoutUser
)

router.route("/student-corner").post(
    getCurrentUser, upload.single('file'), uploadFile
)

router.route("/blogs").get(
     getBlogs
)

router.route("/blogs/:id").get(
     getBlogById
)

export default router;
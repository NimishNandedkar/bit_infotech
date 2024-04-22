import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Webinar } from './models/webinar.model.js';


import session from 'express-session';
// import { Store } from 'express-session';
import jwt from 'jsonwebtoken';



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,      // credentials are set to true to allow cookies to be sent with the requests
}))

app.use(express.json({
    limit: "1000kb", // limit the body of the request to 16kb
}));

app.use(express.urlencoded({
    extended: true, // parse the URL-encoded data with the querystring library
}));

app.use(express.static('public')); //this is used to serve static files like images, css, js files

app.use(cookieParser()); // this is used the parse the cookies that are sent with the request

app.use(session({        // this is used to create a session middleware
    secret: "this is a secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    // store: new Store(),
    name: "session",
}))




// routes import

import userRouter from './routes/user.routes.js';
import blogRouter from './routes/blog.routes.js';
import { User } from './models/user.model.js';
import eventRouter from './routes/events.routes.js';
import webinarRouter from './routes/webinar.routes.js'


// routes declaration

app.use('/api/v1/user', userRouter);

app.use('/api/v1/blogs', blogRouter)

app.use('/api/v1/events', eventRouter)

app.use('/api/v1/webinars', webinarRouter)





app.get('/', async (req, res) => {
   try {
    
     const sessiontoken = req.cookies?.token || req.headers["Authorization"]?.replace("Bearer ", "");
     if (!sessiontoken) {
            
            return res
                .status(400)
                .json({
                    status: "failed",
                    message: "session expired, please login again",
                });
        }
 
 
     const decodedToken = jwt.verify(sessiontoken, process.env.TOKEN_SECRET);
 
     console.log(decodedToken + "decodedToken");
 
     const user = await User.findById(decodedToken._id).select("-password");
     console.log(user);
 
     if (!user) {
         return res
             .status(401)
             .json({
                 status: "failed",
                 message: "no user found with this token",
             });
     }
 
     req.user = user;
     return res.status(200).json({
         status: "success",
         message: "user is logged in",
         token: sessiontoken,
 
     });
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
   }
})


export { app };
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();

app.use(cors({

    origin: process.env.CORS_ORIGIN,
    credentials: true,      // credentials are set to true to allow cookies to be sent with the requests
}))

app.use(express.json({
    limit: "100kb", // limit the body of the request to 16kb
}));

app.use(express.urlencoded({
    extended: true, // parse the URL-encoded data with the querystring library
}));

app.use(express.static('public')); //this is used to serve static files like images, css, js files
app.use(cookieParser()); // this is used the parse the cookies that are sent with the request



// routes import

import userRouter from './routes/user.routes.js';

// routes declaration

app.use('/api/v1/user', userRouter);

export { app };
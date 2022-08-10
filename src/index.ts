// external imports
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// internal imports
import config from './config';
import { routeNotFoundHandler, errorHandler } from './middlewares/common/errorHandler';
import { setCurrentUser } from './middlewares/common/rbacHandler';
// importing routers
import authRouter from './router/auth.router';
import cafeRouter from './router/cafe.router';
import newsfeedRouter from './router/newsfeed.router';
import commentRouter from './router/comment.router';
// import messengerRouter from './router/messenger.router';
// hub method imports
import socketConnection from './hub/socket-connection';

// initialize app & server
const app = express();
const server = http.createServer(app);
dotenv.config();

// database connection
let db: any; // db instance
mongoose
    .connect(config.connectionString, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    })
    .then(res => {
        console.log('===> database successfully connected');
        db = res.connection.db;
    })
    .catch((err) => {
        console.log('===> db connection error: ', err.message);
        server.close();
    });

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuring cors
const corsOptions = {
    origin: ['http://localhost:3000', 'https://developers-cafe-bd.vercel.app'],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// parse cookie
app.use(cookieParser(config.cookieSecret));

app.use(setCurrentUser);

// routing setup
app.use('/auth', authRouter);
app.use('/cafe/products', cafeRouter);
app.use('/newsfeed/posts', newsfeedRouter);
app.use('/newsfeed/posts/:postId/comments', commentRouter);
// app.use('/messenger', messengerRouter);

// 404 - route not found error handler
app.use(routeNotFoundHandler);

// error handler
app.use(errorHandler);

// web socket connection
socketConnection(server);

// listen to server
server.listen(config.port, () => {
    console.log(`===> app listening to port ${config.port}`);
});

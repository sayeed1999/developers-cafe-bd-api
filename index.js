// external imports
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// internal imports
const { routeNotFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
// const { jwtUnboxer } = require('./middlewares/common/rbacHandler');
// importing routers
const authRouter = require('./router/auth.router');
const cafeRouter = require('./router/cafe.router');
const newsfeedRouter = require('./router/newsfeed.router');
const messengerRouter = require('./router/messenger.router');

// initialize app & server
const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
// const io = require("socket.io")(server);
// global.io = io;

// database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('===> database successfully connected'))
    .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
// app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// configuring cors
const corsOptions = {
    origin: ['http://localhost:3000', 'http://developers-cafe-bd.vercel.app'],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routing setup
app.use('/auth', authRouter);
// app.use('/cafe', cafeRouter);
app.use('/newsfeed', newsfeedRouter);
// app.use('/messenger', messengerRouter);

// 404 - route not found error handler
app.use(routeNotFoundHandler);

// app.use(jwtUnboxer);

// error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`===> app listening to port ${process.env.PORT}`);
});

// external imports
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// internal imports
const config = require('./config');
const { routeNotFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const { setCurrentUser } = require('./middlewares/common/rbacHandler');
// importing routers
const authRouter = require('./router/auth.router');
const cafeRouter = require('./router/cafe.router');
const newsfeedRouter = require('./router/newsfeed.router');
const commentRouter = require('./router/comment.router');
const messengerRouter = require('./router/messenger.router');
// hub method imports
const socketConnection = require('./hub/socket-connection');
// initialize app & server
const app = express();
const server = http.createServer(app);
dotenv.config();
// database connection
mongoose
    .connect(config.mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('===> database successfully connected');
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
// set view engine
// app.set('view engine', 'ejs');
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
// export = {};
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// external imports
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// internal imports
const config_1 = __importDefault(require("./config"));
const errorHandler_1 = require("./middlewares/common/errorHandler");
const rbacHandler_1 = require("./middlewares/common/rbacHandler");
// importing routers
const auth_router_1 = __importDefault(require("./router/auth.router"));
const cafe_router_1 = __importDefault(require("./router/cafe.router"));
const newsfeed_router_1 = __importDefault(require("./router/newsfeed.router"));
const comment_router_1 = __importDefault(require("./router/comment.router"));
// import messengerRouter from './router/messenger.router';
// hub method imports
// import socketConnection from './hub/socket-connection';
// initialize app & server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
dotenv_1.default.config();
// database connection
mongoose_1.default
    .connect(config_1.default.mongoConnectionString, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
})
    .then(() => {
    console.log('===> database successfully connected');
})
    .catch((err) => {
    console.log('===> db connection error: ', err.message);
    server.close();
});
// request parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// configuring cors
const corsOptions = {
    origin: ['http://localhost:3000', 'https://developers-cafe-bd.vercel.app'],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// set view engine
// app.set('view engine', 'ejs');
// set static folder
// app.use(express.static(path.join(__dirname, 'public')));
// parse cookie
app.use((0, cookie_parser_1.default)(config_1.default.cookieSecret));
app.use(rbacHandler_1.setCurrentUser);
// routing setup
app.use('/auth', auth_router_1.default);
app.use('/cafe/products', cafe_router_1.default);
app.use('/newsfeed/posts', newsfeed_router_1.default);
app.use('/newsfeed/posts/:postId/comments', comment_router_1.default);
// app.use('/messenger', messengerRouter);
// 404 - route not found error handler
app.use(errorHandler_1.routeNotFoundHandler);
// error handler
app.use(errorHandler_1.errorHandler);
// web socket connection
// socketConnection(server);
// listen to server
server.listen(config_1.default.port, () => {
    console.log(`===> app listening to port ${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map
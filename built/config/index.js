"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
const config = {
    port: process.env.PORT,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
    cookieSecret: process.env.COOKIE_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiry: process.env.JWT_EXPIRY,
    },
    logs: {},
    redis: {},
    email: {},
};
exports.default = config;
// export default config;
// ;
//# sourceMappingURL=index.js.map
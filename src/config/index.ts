import dotenv from 'dotenv';

const envFound = dotenv.config();
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
    logs: {

    },
    redis: {

    },
    email: {

    },
};

export default config;
// export default config;
// ;

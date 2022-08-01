import dotenv from 'dotenv';

import Config from '../interfaces/config.interface';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config: Config = {
    port: process.env.PORT,

    connectionString: process.env.MONGO_CONNECTION_STRING_DEV,
    
    databaseName: process.env.DATABASE_NAME,
    
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

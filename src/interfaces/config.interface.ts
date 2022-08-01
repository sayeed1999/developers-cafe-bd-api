interface Config {
    port: string;
    connectionString: string;
    databaseName: string;
    cookieSecret: string;
    jwt: {
        secret: string;
        expiry: string;
    };
    logs: {};
    redis: {};
    email: {};
}

export default Config;

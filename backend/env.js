import dotenv from "dotenv";
dotenv.config();



class Environment {
    constructor(envProps) {
        this.PORT = envProps.PORT;
        this.BASE_URL = envProps.BASE_URL;
        this.MONOGDB_URI = envProps.MONOGDB_URI;
        this.JWT_SECRET = envProps.JWT_SECRET;
        this.JWT_EXPIRATION = envProps.JWT_EXPIRATION;
        this.JWT_REFRESH_SECRET = envProps.JWT_REFRESH_SECRET;
        this.AWS_ACCESS_KEY_ID = envProps.AWS_ACCESS_KEY_ID;
        this.AWS_SECRET_ACCESS_KEY = envProps.AWS_SECRET_ACCESS_KEY;
        this.AWS_REGION = envProps.AWS_REGION;
        this.AWS_BUCKET_NAME = envProps.AWS_BUCKET_NAME;
    }
}

const environment = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL || "http://localhost:",
    MONOGDB_URI: process.env.MONOGDB_URI || "mongodb://localhost:27017/bookShelfDB",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME

};

export const env = new Environment(environment);
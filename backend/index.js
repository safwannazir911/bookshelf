import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import { env } from './env.js';
import { dbConnect } from './database/db.connect.js';
import userRoutes from './routes/User.routes.js';
import bookRoutes from './routes/Book.routes.js';
import feedRoutes from './routes/Feed.routes.js'

const app = express();
const apiVersion = '/api/v1';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

dbConnect()



app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Bookshelf API",
        version: apiVersion,
        baseUrl: env.BASE_URL
    });
}
);

app.use(`${apiVersion}/user`, userRoutes);
app.use(`${apiVersion}/book`, bookRoutes);
app.use(`${apiVersion}/feed`, feedRoutes);


app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.BASE_URL}${env.PORT}`);
}
);




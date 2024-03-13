import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser

// Components
import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ["http://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

// Middleware
app.use(bodyParser.json({ limit: '10mb', extended: true }));
// I can upload the up to 10 MB photos without payload error 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Increase payload size limit for URL-encoded
app.use('/', Router);

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

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
  origin: ["https://deploy-mern-1whq.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true // 'CREDENTIALS' should be 'credentials'
}));



// Middleware
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});
app.use(bodyParser.json({ limit: '10mb', extended: true })); 
// i can upload the upto 10 mb photos withoulad playload error 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
 // Increase payload size limit for URL-encoded
app.use('/', Router);

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

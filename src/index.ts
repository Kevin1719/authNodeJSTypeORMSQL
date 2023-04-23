import express from 'express';
import * as bodyParser from 'body-parser';
const userRoutes = require('./Routes/User.routes');
import { createConnection } from 'typeorm';
import { User } from './Entities/User.entity';
import dotenv from 'dotenv';
dotenv.config();

// establish database connection
createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    logging: false,
    synchronize: false, // disable auto table creation
}).then(() => {
    console.log('Database connection established');
    const app = express();
    app.use(bodyParser.json());
    app.use('/api/auth', userRoutes);
    const port = process.env.PORT;
    app.listen(port,() => {
        console.log(`Listening on ${port}`);
    })
}).catch((err) => {
    console.error('Error connecting to database:', err);
});






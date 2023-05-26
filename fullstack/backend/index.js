import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userController from "./controllers/userController.js";
import projectController from "./controllers/projectController.js";
import taskController from "./controllers/taskController.js";
import cors from 'cors';

const app = express();

app.use(express.json())

dotenv.config();

connectDB();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    },
}

app.use(cors(corsOptions));

app.use('/api/users', userController);

app.use('/api/projects', projectController);

app.use('/api/tasks', taskController);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server running in port 4000')
})
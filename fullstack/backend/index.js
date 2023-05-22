import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userController from "./controllers/userController.js";
import projectController from "./controllers/projectController.js";

const app = express();

app.use(express.json())

dotenv.config();

connectDB();

app.use('/api/users', userController);

app.use('/api/projects', projectController);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server running in port 4000')
})
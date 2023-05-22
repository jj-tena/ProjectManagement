import express from "express";
import {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    updateState
} from "../services/taskService.js"; 
import checkAuth from "../middleware/checkAuth.js";

const taskController = express.Router();

taskController.post('/', checkAuth, addTask);

taskController
    .route('/:id')
    .get(checkAuth, getTask)
    .put(checkAuth, updateTask)
    .delete(checkAuth, deleteTask);

taskController.post('/state/:id', checkAuth, updateState);

export default taskController;
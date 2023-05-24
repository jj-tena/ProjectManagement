import Project from "../models/Project.js";
import Task from "../models/Task.js";

const addTask = async (req, res) => {
    const {project} = req.body;
    const projectFound = await Project.findById(project);
    if (!projectFound) {
        const error = new Error("Project not found");
        return res.status(404).json({msg: error.message});
    }
    if (projectFound.creator.toString() !== req.user._id.toString()) {
        const error = new Error("You are not allowed to create tasks for this project");
        return res.status(403).json({msg: error.message}); 
    }
    try {
        const task = await Task.create(req.body);
        return res.status(200).json(task);
    } catch (error) {
        return res.status(404).json({msg: error.message});
    }
};

const getTask = async (req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate("project");
    if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({msg: error.message});
    }
    if (task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error("You are not allowed to get this task");
        return res.status(403).json({msg: error.message});
    }
    return res.status(200).json(task);
};

const updateTask = async (req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate("project");
    if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({msg: error.message});
    }
    if (task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error("You are not allowed to get this task");
        return res.status(403).json({msg: error.message});
    }
    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.launchDate = req.body.launchDate || task.launchDate;
    try {
        const taskUpdated = await task.save();
        return res.status(200).json(taskUpdated);

    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
};

const deleteTask = async (req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate("project");
    if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({msg: error.message});
    }
    if (task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error("You are not allowed to get this task");
        return res.status(403).json({msg: error.message});
    }
    try {
        await task.deleteOne();
        return res.status(200).json({msg: "Task deleted"});

    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
};

const updateState = async (req, res) => {};

export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    updateState
};
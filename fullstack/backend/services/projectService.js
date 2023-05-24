import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user._id);
    res.json(projects);
};

const createProject = async (req, res) => {
    const project = new Project(req.body);
    project.creator = req.user._id;
    try {
        const projectSaved = await project.save();
        return res.status(200).json(projectSaved);
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
};

const getProject = async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({msg: 'Project not found'});
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Action not allowed');
        return res.status(401).json({msg: error.message});
    }
    return res.json(project);
};

const updateProject = async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({msg: 'Project not found'});
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Action not allowed');
        return res.status(401).json({msg: error.message});
    }
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.launchDate = req.body.launchDate || project.launchDate;
    project.client = req.body.client || project.client;
    try {
        const projectUpdated = await project.save();
        return res.json(projectUpdated);
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
};

const deleteProject = async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({msg: 'Project not found'});
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Action not allowed');
        return res.status(401).json({msg: error.message});
    }
    try {
        await project.deleteOne();
        return res.json({msg: "Project deleted"});
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
};

const addCollaborator = async (req, res) => {

};

const deleteCollaborator = async (req, res) => {

};

const getTasks = async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({msg: 'Project not found'});
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Action not allowed');
        return res.status(401).json({msg: error.message});
    }
    try {
        const tasks = await Task.find().where("project").equals(id)
        return res.json(tasks);
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
};

export {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    getTasks
}
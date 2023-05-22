import express from 'express';

import {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    getTasks
} from "../services/projectService.js";

import checkAuth from '../middleware/checkAuth.js';

const projectController = express.Router();

projectController
    .route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, createProject);

projectController
    .route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, updateProject)
    .delete(checkAuth, deleteProject);

projectController.get('/tasks/:id', checkAuth, getTasks);

projectController.post('/add-collaborator/:id', checkAuth, addCollaborator);

projectController.post('/delete-collaborator/:id', checkAuth, deleteCollaborator);

export default projectController;

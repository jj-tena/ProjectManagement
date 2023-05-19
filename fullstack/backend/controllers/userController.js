import express from "express";
import { register, login, verify, forgotPassword, modifyPassword, profile } from "../services/userService.js";
import checkAuth from "../middleware/checkAuth.js";

const userController = express.Router();

userController.post('/', register);
userController.post('/login', login);
userController.get('/verify/:token', verify);
userController.post('/forgot-password', forgotPassword);
userController.post('/forgot-password/:token', modifyPassword);
userController.get('/profile', checkAuth, profile);

export default userController;
import express from "express";
import { createUser } from "../services/userService.js";

const userController = express.Router();

userController.post('/', createUser)

export default userController;
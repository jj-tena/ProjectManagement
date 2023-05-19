import User from "../models/User.js"
import { generateId } from "../utils/generateId.js";
import { generateJWT } from "../utils/generateJWT.js";

const register = async (req, res) => {
    const {email} = req.body;
    const userFound = await User.findOne({email});
    if (userFound) {
        const error = new Error('User already registered');
        return res.status(400).json({msg: error.message});
    } 
    try {
        const user = new User(req.body);
        user.token = generateId();
        const userSaved = await user.save();
        res.send(userSaved);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) {
        const error = new Error("User does not exist");
        return res.status(404).json({msg: error.message});
    }
    if (!user.verified) {
        const error = new Error("This account has not been confirmed");
        return res.status(404).json({msg: error.message});
    }
    if (!await user.checkPassword(password)){
        const error = new Error("Wrong password");
        return res.status(404).json({msg: error.message});
    }
    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWT(user.email)
    });
}

const verify = async (req, res) => {
    const {token} = req.params;
    const userVerified = await User.findOne({token});
    if (!userVerified) {
        const error = new Error("Token not valid");
        return res.status(403).json({msg: error.message});
    }
    try {
        userVerified.verified = true;
        userVerified.token = "";
        await userVerified.save();
        return res.json({msg: "User verified"});
    } catch (error) {
        return res.status(403).json({msg: error.message});
    }
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    const userFound = await User.findOne({email});
    if (!userFound) {
        const error = new Error("User not found");
        return res.status(403).json({msg: error.message});
    }
    try {
        userFound.token = generateJWT();
        await userFound.save();
        res.json({msg: "We have sent you an email with the instructions to change your password"})
    } catch (error) {
        return res.status(403).json({msg: error.message});
    }
}

const modifyPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const userFound = await User.findOne({token});
    if (!userFound) {
        const error = new Error("User not found");
        return res.status(403).json({msg: error.message});
    }
    try {
        userFound.password = password;
        userFound.token = "";
        await userFound.save();
        return res.json({msg: "Password modified"});
    } catch (error) {
        return res.status(403).json({msg: error.message});
    }
}

const profile = async (req, res) => {
    const {user} = req;
    res.json(user);
}

export {
    register,
    login,
    verify,
    forgotPassword,
    modifyPassword,
    profile
}
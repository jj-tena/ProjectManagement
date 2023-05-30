import User from "../models/User.js"
import { generateId } from "../utils/generateId.js";
import { generateJWT } from "../utils/generateJWT.js";
import { emailForgotPassword, emailRegister } from "../utils/sendEmail.js";

const register = async (req, res) => {
    const {email} = req.body;
    const userFound = await User.findOne({email});
    if (userFound) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    } 
    try {
        const user = new User(req.body);
        user.token = generateId();
        const userSaved = await user.save();
        const {name, email, token} = userSaved;
        emailRegister({name, email, token});
        res.send({msg: 'Usuario creado correctamente. Revisa tu email para confirmar tu cuenta'});
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
    const {id} = req.params;
    const userVerified = await User.findOne({token: id});
    if (!userVerified) {
        const error = new Error("Token no válido");
        return res.status(403).json({msg: error.message});
    }
    try {
        userVerified.verified = true;
        userVerified.token = "";
        await userVerified.save();
        return res.json({msg: "Usuario verificado"});
    } catch (error) {
        return res.status(403).json({msg: error.message});
    }
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    const userFound = await User.findOne({email});
    if (!userFound) {
        const error = new Error("Usuario no encontrado");
        return res.status(403).json({msg: error.message});
    }
    try {
        userFound.token = generateId();
        await userFound.save();
        emailForgotPassword({
            email: userFound.email,
            name: userFound.name,
            token: userFound.token
        })
        return res.json({msg: "Te hemos enviado un email con las instrucciones para cambiar tu contraseña"})
    } catch (error) {
        return res.status(403).json({msg: error.message});
    }
}

const modifyPassword = async (req, res) => {
    console.log('HOLA')
    const {token} = req.params;
    const {password} = req.body;
    const userFound = await User.findOne({token});
    if (!userFound) {
        const error = new Error("Usuario no encontrado");
        return res.status(403).json({msg: error.message});
    }
    try {
        userFound.password = password;
        userFound.token = "";
        await userFound.save();
        return res.json({msg: "Contraseña modificada correctamente"});
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
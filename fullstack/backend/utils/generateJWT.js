import jwt from "jsonwebtoken";

const generateJWT = (email) => {
    console.log(email);
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export {
    generateJWT
};
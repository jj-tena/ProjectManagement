import mongoose from "mongoose";
import User from "./User.js";

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 
    description: {
        type: String,
        required: true,
        trim: true,
    }, 
    launchDate: {
        type: Date,
        default: Date.now(),
    }, 
    client: {
        type: String,
        required: true,
        trim: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    collaborators: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
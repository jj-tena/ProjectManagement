import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
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
    completed: {
        type: Boolean,
        default: false,
    }, 
    launchDate: {
        type: Date,
        default: Date.now(),
    }, 
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
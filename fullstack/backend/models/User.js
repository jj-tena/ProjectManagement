import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    }, 
    verified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function(password) {
    console.log(this.password);
    console.log(password);
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
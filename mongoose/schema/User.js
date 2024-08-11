import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Email must be valid'
        }
    }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);
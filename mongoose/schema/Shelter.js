import mongoose from "mongoose";
import validator from "validator";

const shelterSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Staff ID is required'],
        unique: true,
        ref: 'User'
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Shelter name is required'],
        unique: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Email must be valid'
        }
    },
    phoneNumber: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Phone number is required'],
        unique: true
    },
    address:{
        street: {
            type: mongoose.Schema.Types.String,
            required: [true, 'Street is required']
        },
        city: {
            type: mongoose.Schema.Types.String,
            required: [true, 'City is required']
        },
        zipCode: {
            type: mongoose.Schema.Types.String,
            required: [true, 'Zip code is required']
        }
    },
    createdAt: {
        type: mongoose.Schema.Types.String,
        default: Date.now()
    },
    updatedAt: {
        type: mongoose.Schema.Types.String,
        default: Date.now()
    }
})

shelterSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
})

export const Shelter = mongoose.models.Shelter || mongoose.model("Shelter", shelterSchema);
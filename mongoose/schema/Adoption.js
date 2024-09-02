import mongoose from "mongoose";
import validator from "validator";
import { Pet } from "./Pet";
import { Updock } from "next/font/google";

const adoptionSchema = new mongoose.Schema({
    adopterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    adoptionFee: {
        type: mongoose.Schema.Types.Number
        
    },
    adoptionDate: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },
    status: {
        type: mongoose.Schema.Types.String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    note: {
        type: mongoose.Schema.Types.String,
        maxlength: 200
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    }
})

adoptionSchema.pre('save', async function (next) {
    this.updatedAt = Date.now()
    next()
})

export const Adoption =  mongoose.models.Adoption || mongoose.model('Adoption', adoptionSchema) 
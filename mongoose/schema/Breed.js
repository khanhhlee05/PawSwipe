import mongoose from "mongoose";
import validator from "validator";

const breedSchema = new mongoose.Schema({
    breed: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Breed is required'],
        unique: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Description is required'],
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

breedSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const Breed = mongoose.models.Breed || mongoose.model('Breed', breedSchema);
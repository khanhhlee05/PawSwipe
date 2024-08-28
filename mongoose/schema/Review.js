import mongoose from "mongoose";
import validator from "validator";

const reviewSchema = new mongoose.Schema({
    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shelter",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
)

export const Review = mongoose.models.Review || mongoose.models("Review", reviewSchema);
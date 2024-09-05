import mongoose from 'mongoose';
import validator from  'validator';

const swipedRightSchem = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value)
        }
    },

    petId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }]
})

export const SwipedRight = mongoose.models.SwipedRight || mongoose.model("SwipedRight", swipedRightSchem);
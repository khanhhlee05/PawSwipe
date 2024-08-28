import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Email must be valid'
        }
    },
    firstName: {
        type: mongoose.Schema.Types.String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [50, 'First name must be at most 50 characters long']
    },

    lastName: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [50, 'Last name must be at most 50 characters long']
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    swipedRight: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    phoneNumber: {
        type: mongoose.Schema.Types.String,
        validate: {
            validator: (value) => validator.isMobilePhone(value),
            message: 'Phone number must be valid'
        }
    },
    address: {
        street: {
            type: mongoose.Schema.Types.String,
            maxlength: [100, 'Street must be at most 100 characters long']
        },
        city: {
            type: mongoose.Schema.Types.String,
            maxlength: [50, 'City must be at most 50 characters long']
        },
        zipcode: {
            type: mongoose.Schema.Types.String,
            validate: {
                validator: (value) => validator.isPostalCode(value, 'US'),
                message: 'Zipcode must be a valid US postal code'
            }
        }
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum: ['user', 'admin', 'shelter'],
        required: [true, "Role must be valid"]
    },

    adoptionHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adoption'
    }],

    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],

    lastLogin: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
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

export const User = mongoose.models.User || mongoose.model('User', userSchema);
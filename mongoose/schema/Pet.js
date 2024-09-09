import mongoose from "mongoose";
import validator from "validator";

const PetSchema = new mongoose.Schema({
     name: {
          type: mongoose.Schema.Types.String,
          required: [true, 'Name is required'],
          minlength: 3,
          maxlength: 50
     },
     shelter: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Shelter',
          required: [true, 'Shelter is required']
     },
     age: {
          type: mongoose.Schema.Types.Number,
          required: [true, 'Age is required'],
          min: 0,
          max: 150
     },
     breed: {
          type: mongoose.Schema.Types.String,
          ref: 'Breed',
          required: [true, 'Breed is required']
     },
     size: {
          type: mongoose.Schema.Types.String,
          required: [true, 'Size is required'],
          enum: ['Small', 'Medium', 'Large']
     },
     gender: {
          type: mongoose.Schema.Types.String,
          required: [true, 'Gender is required'],
          enum: ['Male', 'Female', 'Unknown']
     },
     description: {
          type: mongoose.Schema.Types.String,
          minlength: 10,
          maxlength: 2000
     },
     photoUrl: {
          type: mongoose.Schema.Types.String,
          required: [true, 'Photo URL is required'],
          validate: {
               validator: (value) => validator.isURL(value),
               message: 'Photo URL must be valid'
          }
     },
     medicalHistory: {
          Vaccinations: [{
               Date: {
                    type: mongoose.Schema.Types.Date
               },
               Name: {
                    type: mongoose.Schema.Types.String
               }
          }]
     },
     adoptStatus: {
          type: mongoose.Schema.Types.Boolean,
          default: false
     },
     behavioralTrait: {
          type: mongoose.Schema.Types.String,
          enum: ['Active', 'Lazy', 'Playful', 'Calm', 'Defensive']
     },
     adoptionFee: {
          type: mongoose.Schema.Types.Number,
     },
     specialNote: {
          type: mongoose.Schema.Types.String,
          maxlength: 200
     },
     createdAt: {
          type: mongoose.Schema.Types.Date,
          default: Date.now
     },

     updatedAt: {
          type: mongoose.Schema.Types.Date,
          default: Date.now
     }
})

PetSchema.pre("save", function (next) {
     this.updatedAt = Date.now();
     next();
});

export const Pet = mongoose.models.Pet || mongoose.model("Pet", PetSchema);
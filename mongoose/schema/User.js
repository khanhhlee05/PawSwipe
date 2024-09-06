import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: [true, "Email is required"],
    unique: true,
  },
  firstName: {
    type: mongoose.Schema.Types.String,
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [50, "First name must be at most 50 characters long"],
  },

  lastName: {
    type: mongoose.Schema.Types.String,
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
  },
  password: {
    type: mongoose.Schema.Types.String,
    // required: [true, "Password is required"],
  },
 
  phoneNumber: {
    type: mongoose.Schema.Types.String,
    validate: {
      validator: (value) => validator.isMobilePhone(value),
      message: "Phone number must be valid",
    },
  },
  address: {
    street: {
      type: mongoose.Schema.Types.String,
      maxlength: [100, "Street must be at most 100 characters long"],
    },
    city: {
      type: mongoose.Schema.Types.String,
      maxlength: [50, "City must be at most 50 characters long"],
    },
    zipCode: {
      type: mongoose.Schema.Types.String,
      validate: {
        validator: (value) => validator.isPostalCode(value, "US"),
        message: "Zipcode must be a valid US postal code",
      },
    },
  },
  role: {
    type: mongoose.Schema.Types.String,
    enum: ["user", "admin", "shelter"],
    // required: [true, "Role must be valid"],
  },

  preferences: {
    minAge: {
      type: mongoose.Schema.Types.String,
      enum: ["puppy", "teen", "adult"],
    },

    breed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Breed",
    },
    size: {
      type: mongoose.Schema.Types.String,
      enum: ["small", "medium", "large"],
    },
    gender: {
      type: mongoose.Schema.Types.String,
      enum: ["male", "female"],
    },
    //ADD MORE IF HAVE IDEA
  },


  lastLogin: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  const salt = bcrypt.genSaltSync();
  if (!this.password) {
    next();
  }
  this.password = bcrypt.hashSync(this.password.trim(), salt);
  next();
});

userSchema.statics.login = async function (email, password){
  const user = await this.findOne({email})
  if (user){
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
          return user;
      }
      throw Error("Incorrect Password")
  }
  throw Error("This email was not found.")
}


export const User = mongoose.models.User || mongoose.model("User", userSchema);

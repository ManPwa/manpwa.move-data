const mongoose = require("mongoose");
const baseSchema = require("./baseModel");

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            require: [true, "Please add the user name"]
        },
        password: { 
            type: String, 
            require: [true, "Please add user password"]
        },
        email: { 
            type: String, 
            required: [true, "Please add email address"],
            unique: [true, "Email address already taken"]
        },
        date_of_birth: { type: Date, default: null },
        avatar_url: { type: String, default: null },
        is_admin: { type: Boolean, default: null },
        gender: { type: Boolean, default: null }
    },
    {
        versionKey: false
    }
);

userSchema.add(baseSchema)

module.exports = mongoose.model("User", userSchema, "user");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    {
        timestamps: true
    },
);


const User = mongoose.model("User", userSchema)
module.exports = User;
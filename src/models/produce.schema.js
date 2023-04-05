const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema(
    {
        produceName: {
            type: String,
            required: true,
        },
        quantityAvailable: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Fishery", "Poultry", "Piggery", "Crop"],
        },
    },
    {
        timestamps: true
    },
);


const Produce = mongoose.model("Produce", produceSchema)
module.exports = Produce;
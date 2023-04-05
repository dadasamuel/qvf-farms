const mongoose = require("mongoose");
const Produce = require("./produce.schema");
const User = require("./user.schema");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        produceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Produce",
        },
        quantityRequired: {
            type: Number,
            required: true,
        },
        orderId: {
            type: String,
            required: true
        },
        orderPrice: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    },
);


const Order = mongoose.model("Order", orderSchema)
module.exports = Order;
const Order = require("../models/order.schema")
const Produce = require("../models/produce.schema")
const User = require("../models/user.schema")



exports.orderProduce = async (req, res) => {
    try {
        const { produceId, userId, quantityRequired } = req.body
        const produce = await Produce.findOne({ _id: produceId })
        if (!produce) {
            return res.status(404).json({
                message: `Produce with ID ${produceId} not found`
            })
        }
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(404).json({
                message: `User with ID ${userId} not found`
            })
        }
        const orderId = Math.floor(Math.random() * 1000)
            .toString()
            .substring(0, 10);

        const orderPrice = produce.price * quantityRequired
        const newOrder = await Order.create({
            orderPrice, quantityRequired, orderId, produceId, userId
        })
        return res.status(201).json({
            message: `Order created successfully. Your order with ID ${orderId} is priced ${orderPrice} naira `,
            newOrder, userId, produceId
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

exports.updateOrder = async (req, res) => {

    try {
        const { orderId, produceId } = req.query;
        const { quantityRequired } = req.body
        const produce = await Produce.findOne({ _id: produceId })
        if (!produce) {
            return res.status(404).json({
                message: `Produce with ID ${produceId} not found`
            })
        }
        const updatedOrderPrice = produce.price * quantityRequired
        const orderUpdate = await Order.findOneAndUpdate(
            { orderId },
            { quantityRequired, orderPrice: updatedOrderPrice },
            {
                new: true
            })
        console.log(updatedOrderPrice)

        //orderUpdate.save(orderPrice)
        return res.status(201).json({
            message: `Order created successfully. Your order with ID ${orderId} is priced ${updatedOrderPrice} naira `,
            orderUpdate, produceId,
            orderPrice: updatedOrderPrice
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}


exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params
    try {
        const deleteOrder = await Order.findOneAndDelete({ orderId })
        return res.status(201).json({
            message: "Deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.viewAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();
        return res.status(200).json({
           Result:{
            allOrders
           } 
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
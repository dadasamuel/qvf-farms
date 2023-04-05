const Produce = require("../models/produce.schema");

exports.addProduce = async (req, res) => {
    try {
        const { produceName, quantityAvailable, price, category } = req.body
        const produceExist = await Produce.findOne({ produceName })
        if (produceExist) {
            return res.status(400).json({
                message: `${produceName} already exist.`
            })
        }
        const newProduce = await Produce.create({
            produceName, quantityAvailable, price, category
        })
        return res.status(201).json({
            message: "Produce added to database",
            newProduce,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.allProduce = async (req, res) => {
    try {
        const allProduce = await Produce.find().sort({ category: 1 });
        return res.status(200).json({
            Result: allProduce
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

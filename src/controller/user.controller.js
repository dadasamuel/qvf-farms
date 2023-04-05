const { validateUserSignup, validateUserLogin } = require("../../Middlewares/joi.validate");
const User = require("../models/user.schema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const Produce = require("../models/produce.schema");
const Order = require("../models/order.schema");
dotenv.config()

exports.signUp = async (req, res) => {
    try {
        const {firstName, lastName, emailAddress, phoneNumber, password, role} = req.body
        await validateUserSignup.validateAsync(req.body)
        const emailExist = await User.findOne({ emailAddress })
        if (emailExist) {
            return res.status(400).json({
                message: `User with ${emailAddress} already exist.`
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            firstName, lastName, emailAddress, phoneNumber, password: hashedPassword, role
        })
        newUser.set("password", undefined);
        return res.status(201).json({
            message: "User Created Successfully",
            newUser,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
try {
    const { emailAddress, password } = req.body
    await validateUserLogin.validateAsync(req.body)
    const user = await User.findOne({ emailAddress })
    if (!user) {
        return res.status(404).json({
            message: "User does not exist"
        })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }
    const userData = { id: user._id, role: user.role }
    const token = await jwt.sign(userData, process.env.JWT_SECRETKEY, { expiresIn: "10m" })
    console.log(token.split(" "))
    return res.status(200).json({
        message: "Logged in successfully",
        token
    })
} catch (error) {
    return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
    });
}
}

exports.viewAllUsers = async (req, res) => {
    try {
        const viewUsers = await User.find({}, "-password");
        return res.status(200).json({
            Result:{
                viewUsers
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

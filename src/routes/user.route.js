const express = require("express");
const { authorize, authenticate } = require("../../Middlewares/authenticate.middleware");
const { signUp, login} = require("../controller/user.controller");
const { allProduce } = require("../controller/produce.controller");
const { orderProduce, updateOrder, deleteOrder } = require("../controller/order.controller");


const router = express.Router();
router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/all-produce", authenticate, allProduce);
router.post("/order-produce", authenticate, orderProduce)
router.put("/update-order",authenticate, updateOrder)
router.delete("/delete-order/:orderId",authenticate, deleteOrder)

module.exports = router
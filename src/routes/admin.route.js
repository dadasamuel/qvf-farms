const express = require("express");
const { authorize, authenticate } = require("../../Middlewares/authenticate.middleware");
const { addProduce } = require("../controller/produce.controller");
const { viewAllUsers } = require("../controller/user.controller");
const { viewAllOrders } = require("../controller/order.controller");


const router = express.Router();
router.post("/add-produce", authenticate, authorize, addProduce);
router.get("/view-users",authenticate, authorize, viewAllUsers )
router.get("/view-orders", authenticate, authorize, viewAllOrders)
module.exports = router;
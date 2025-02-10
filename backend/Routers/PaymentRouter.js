const express = require("express");
const PaymentRouter = express.Router();
const {paypalWebhookHandler} = require("../controller/PaymentController");


PaymentRouter.post("/payment",paypalWebhookHandler);


module.exports = {PaymentRouter}
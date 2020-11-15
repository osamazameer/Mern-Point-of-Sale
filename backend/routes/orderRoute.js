const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

router.get("/", async (req, res) => {
    try {
        const orderData = await Order.find({});
        res.send({
            data: orderData,
            message: "Has been saved on DB"
        });
    }
    catch (e) {
        res.send(e);
    }
})


router.post("/", async (req, res) => {
    const { products, Bill } = req.body
    console.log(products);
    try {

        const orderedData = new Order({
            products: products,
            bill: Bill
        });
        console.log(orderedData)

        products.forEach(async product => {
            const DBproduct = await Product.findById(product._id)
            console.log(DBproduct.productQty);
            console.log(product.Qty);

            const newQty = Number(DBproduct.productQty) - Number(product.Qty);
            DBproduct.productQty = Number(newQty);
            DBproduct.save();


        });
        //console.log(orderedData);
        await orderedData.save();
        res.send(orderedData);
    }
    catch (e) {
        res.send({
            message: "Error Occurred",
            error: e,
        });
    }
})


router.get("/:id", async (req, res) => {
    try {
        const orderData = await Order.findOne({ _id: req.params.id });
        console.log(req.params.id);
        if (orderData == null && orderData == "") {
            res.status(404).send({
                message: `No Product with this id = ${req.params.id}`,
            });
        }

        res.send(orderData);
    }
    catch (e) {
        res.send(e);
    }

})

module.exports = router;

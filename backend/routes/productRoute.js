const express = require("express");
const router = express.Router();
const Products = require("../models/productModel");

router.get("/", async (req, res) => {
    try {
        const productData = await Products.find({});
        res.send({
            data: productData,
            message: "Has been saved on DB"
        });
    }
    catch (e) {
        res.send(e);
    }
})


router.post("/", async (req, res) => {
    const { productId, productName, unitPrice, productQty } = req.body
    try {
        const productData = new Products({
            productId: productId,
            productName: productName,
            unitPrice: unitPrice,
            productQty: productQty,
        });
        await productData.save();
        res.send(productData);
    }
    catch (e) {
        res.send({
            message: "Error Occurred",
            error: e,
        });
    }
})



router.post("/addQty", async (req, res) => {
    const { productQty } = req.body
    try {
        const productData = new Products({
            productQty: productQty,
        });
        await productData.save();
        res.send(productData);
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
        const productData = await Products.find({ productId: req.params.id });
        console.log(req.params.id);
        if (productData == null && productData == "") {
            res.status(404).send({
                message: `No Product with this id = ${req.params.id}`,
            });
        }

        res.send(productData);
    }
    catch (e) {
        res.send(e);
    }

})

router.delete("/:id", async (req, res) => {
    try {
        const productData = await Products.findOne({
            productId: req.params.id
        });
        if (productData == null && productData == "") {
            res.status(404).send({
                message: `No Product with this id = ${req.params.id}`,
            });
        }
        productData.remove();
        res.send({
            message: `Product with id = ${req.params.id} has been removed`
        });
    }
    catch (e) {
        res.send(e);
    }

})


router.post("/:id", async (req, res) => {
    try {
        const productData = await Products.findOne({
            productId: req.params.id
        });
        if (productData == null && productData == "") {
            res.status(404).send({
                message: `No Product with this id = ${req.params.id}`,
            });
        }
        productData.productId = req.body.productId
        productData.productName = req.body.productName
        productData.unitPrice = req.body.unitPrice
        productData.productQty = req.body.productQty
        productData.save();
        res.send({
            message: `Product with id = ${req.params.id} has been updated`,
            data: productData,
        });
    }
    catch (e) {
        res.send(e);
    }

})
module.exports = router;
